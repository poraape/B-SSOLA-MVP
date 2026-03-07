import type { GlossaryItem } from '../../data/glossary';
import { normalizeText, tokenizeFields } from './textTokenizer';

export interface SimilarityBreakdown {
  tokenOverlap: number;
  categoryMatch: number;
  explicitRelatedTerm: number;
}

export interface SimilarityResult {
  item: GlossaryItem;
  score: number;
  breakdown: SimilarityBreakdown;
}

export interface SimilarityWeights {
  tokenOverlap: number;
  categoryMatch: number;
  explicitRelatedTerm: number;
}

const DEFAULT_WEIGHTS: SimilarityWeights = {
  tokenOverlap: 0.6,
  categoryMatch: 0.2,
  explicitRelatedTerm: 0.2,
};

const normalizedRelatedTerms = (item: GlossaryItem): string[] =>
  (item.relatedTerms ?? []).map((term) => normalizeText(term));

const buildTokenSet = (item: GlossaryItem): Set<string> =>
  new Set(
    tokenizeFields([
      item.term,
      item.definition,
      item.context,
      item.practicalExample,
      ...(item.regionalVariations ?? []),
      ...(item.relatedTerms ?? []),
    ])
  );

const scoreTokenOverlap = (left: Set<string>, right: Set<string>): number => {
  if (left.size === 0 || right.size === 0) {
    return 0;
  }

  let intersection = 0;
  for (const token of left) {
    if (right.has(token)) {
      intersection += 1;
    }
  }

  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
};

const scoreRelatedReference = (base: GlossaryItem, candidate: GlossaryItem): number => {
  const baseRelated = normalizedRelatedTerms(base);
  const candidateRelated = normalizedRelatedTerms(candidate);

  const baseTerm = normalizeText(base.term);
  const candidateTerm = normalizeText(candidate.term);

  const directReference =
    baseRelated.includes(candidateTerm) ||
    candidateRelated.includes(baseTerm);

  if (directReference) {
    return 1;
  }

  if (baseRelated.length === 0 || candidateRelated.length === 0) {
    return 0;
  }

  const candidateSet = new Set(candidateRelated);
  let shared = 0;

  for (const related of baseRelated) {
    if (candidateSet.has(related)) {
      shared += 1;
    }
  }

  return shared === 0
    ? 0
    : shared / Math.max(baseRelated.length, candidateRelated.length);
};

export const calculateSemanticSimilarity = (
  base: GlossaryItem,
  candidate: GlossaryItem,
  weights: SimilarityWeights = DEFAULT_WEIGHTS
): SimilarityResult => {
  const baseTokens = buildTokenSet(base);
  const candidateTokens = buildTokenSet(candidate);

  const tokenOverlap = scoreTokenOverlap(baseTokens, candidateTokens);
  const categoryMatch = base.category === candidate.category ? 1 : 0;
  const explicitRelatedTerm = scoreRelatedReference(base, candidate);

  const score =
    tokenOverlap * weights.tokenOverlap +
    categoryMatch * weights.categoryMatch +
    explicitRelatedTerm * weights.explicitRelatedTerm;

  return {
    item: candidate,
    score,
    breakdown: {
      tokenOverlap,
      categoryMatch,
      explicitRelatedTerm,
    },
  };
};

export const rankSemanticMatches = (
  base: GlossaryItem,
  glossary: GlossaryItem[],
  limit = 5,
  minScore = 0.06
): SimilarityResult[] => {
  const ranked = glossary
    .filter((candidate) => candidate.term !== base.term)
    .map((candidate) => calculateSemanticSimilarity(base, candidate))
    .filter((result) => result.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return ranked;
};
