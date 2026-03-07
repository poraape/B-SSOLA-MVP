import { useMemo } from 'react';
import type { GlossaryItem } from '../../data/glossary';
import { glossaryData } from '../../data/glossary';
import { buildSearchIndex, type GlossaryIndex } from '../utils/buildSearchIndex';
import { glossarySearchIndex } from '../data/glossaryIndex';
import { levenshteinDistance, normalizeText, tokenize } from '../utils/textTokenizer';

export interface UseGlossarySearchOptions {
  query: string;
  data?: GlossaryItem[];
  category?: GlossaryItem['category'] | 'all';
  audienceLevel?: GlossaryItem['audienceLevel'] | 'all';
  limit?: number;
}

export interface ScoredGlossaryResult {
  item: GlossaryItem;
  score: number;
  matchedTokens: string[];
}

export interface UseGlossarySearchResult {
  results: ScoredGlossaryResult[];
  total: number;
  categories: GlossaryItem['category'][];
}

const SYNONYM_MAP: Record<string, string[]> = {
  ansiedade: ['panico', 'pânico', 'crise', 'nervosismo'],
  bullying: ['assedio', 'assédio', 'intimidacao', 'intimidação'],
  violencia: ['violência', 'agressao', 'agressão', 'abuso'],
  suicidio: ['suicídio', 'autolesao', 'autolesão', 'automutilacao', 'automutilação'],
  autismo: ['tea', 'neurodiversidade'],
  tdah: ['hiperatividade', 'atencao', 'atenção'],
  lgpd: ['privacidade', 'dados', 'sigilo'],
  conselho: ['ct', 'conselho tutelar'],
  caps: ['capsi', 'caps i', 'saude mental', 'saúde mental'],
};

const expandWithSynonyms = (queryTokens: string[]): string[] => {
  const expanded = new Set(queryTokens);

  for (const token of queryTokens) {
    const synonyms = SYNONYM_MAP[token] ?? [];
    for (const synonym of synonyms) {
      expanded.add(normalizeText(synonym));
    }
  }

  return Array.from(expanded);
};

const getFuzzyTokenScore = (queryToken: string, indexItem: GlossaryIndex): number => {
  if (queryToken.length < 4) {
    return 0;
  }

  let bestDistance = Number.POSITIVE_INFINITY;

  for (const token of indexItem.tokenFrequency.keys()) {
    if (Math.abs(token.length - queryToken.length) > 2) {
      continue;
    }

    const distance = levenshteinDistance(queryToken, token);

    if (distance < bestDistance) {
      bestDistance = distance;
    }

    if (bestDistance === 0) {
      return 0;
    }
  }

  if (bestDistance === 1) {
    return 1.3;
  }

  if (bestDistance === 2) {
    return 0.7;
  }

  return 0;
};

const rankResult = (
  query: string,
  queryTokens: string[],
  indexItem: GlossaryIndex
): ScoredGlossaryResult => {
  const normalizedQuery = normalizeText(query);
  let score = 0;
  const matchedTokens = new Set<string>();

  if (normalizedQuery.length > 0) {
    if (indexItem.termNormalized === normalizedQuery) {
      score += 14;
    } else if (indexItem.termNormalized.includes(normalizedQuery)) {
      score += 8;
    }
  }

  for (const token of queryTokens) {
    const exactFrequency = indexItem.tokenFrequency.get(token) ?? 0;
    const prefixMatches = Array.from(indexItem.tokenFrequency.keys()).filter(
      (itemToken) => itemToken.startsWith(token) && itemToken !== token
    ).length;

    if (exactFrequency > 0) {
      matchedTokens.add(token);
      score += Math.min(exactFrequency, 5) * 2;
    }

    if (prefixMatches > 0) {
      matchedTokens.add(token);
      score += Math.min(prefixMatches, 3) * 0.8;
    }

    const normalizedContent = normalizeText(indexItem.content);
    if (normalizedContent.includes(token)) {
      score += 0.5;
    }

    score += getFuzzyTokenScore(token, indexItem);
  }

  return {
    item: indexItem.item,
    score,
    matchedTokens: Array.from(matchedTokens),
  };
};

export const useGlossarySearch = (
  options: UseGlossarySearchOptions
): UseGlossarySearchResult => {
  const {
    query,
    data = glossaryData,
    category = 'all',
    audienceLevel = 'all',
    limit = 20,
  } = options;

  const index = useMemo(
    () => (data === glossaryData ? glossarySearchIndex : buildSearchIndex(data)),
    [data]
  );

  const categories = useMemo(
    () => Array.from(new Set(data.map((item) => item.category))),
    [data]
  );

  const results = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    const baseTokens = tokenize(normalizedQuery, {
      removeStopwords: true,
      minTokenLength: 2,
    });
    const queryTokens = expandWithSynonyms(baseTokens);

    const filteredIndex = index.filter((entry) => {
      const categoryPass = category === 'all' || entry.category === category;
      const audiencePass =
        audienceLevel === 'all' || entry.audienceLevel === audienceLevel;
      return categoryPass && audiencePass;
    });

    const scored = filteredIndex
      .map((entry) => rankResult(query, queryTokens, entry))
      .filter((result) => {
        if (normalizedQuery.length === 0) {
          return true;
        }

        return result.score > 0;
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.item.term.localeCompare(b.item.term, 'pt-BR');
      });

    return scored.slice(0, limit);
  }, [index, query, category, audienceLevel, limit]);

  return {
    results,
    total: results.length,
    categories,
  };
};
