import { getCategories, getFlows } from '../../../domain/flows/selectors';
import { searchFlows } from '../../../domain/search/searchEngine';
import { faqData } from '../../resources/data/faq';
import { glossaryData } from '../../resources/data/glossary';
import type {
  FAQSearchResult,
  FlowSearchResult,
  GlossarySearchResult,
  UnifiedSearchResult,
} from '../types/searchTypes';

export type SearchFilterType = 'all' | 'flow' | 'faq' | 'glossary';

function calculateScore(item: { term?: string; question?: string; title?: string }, query: string): number {
  const text = (item.term || item.question || item.title || '').toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (text === lowerQuery) return 100;
  if (text.startsWith(lowerQuery)) return 80;
  if (text.includes(lowerQuery)) return 60;
  return 40;
}

function searchFAQ(query: string): FAQSearchResult[] {
  const lowerQuery = query.toLowerCase();

  const results = faqData
    .map((item): FAQSearchResult | null => {
      const matchesSearch =
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery));

      if (!matchesSearch) return null;

      return {
        id: item.id,
        type: 'faq',
        title: item.question,
        question: item.question,
        answer: item.answer,
        description: item.answer.slice(0, 150),
        category: item.category,
        tags: item.tags,
        url: `/recursos?tab=faq&open=${encodeURIComponent(item.id)}`,
        score: calculateScore(item, query),
      };
    })
    .filter((result): result is FAQSearchResult => result !== null);

  return results.sort((a, b) => b.score - a.score);
}

function searchGlossary(query: string): GlossarySearchResult[] {
  const lowerQuery = query.toLowerCase();

  const results = glossaryData
    .map((item): GlossarySearchResult | null => {
      const matchesSearch =
        item.term.toLowerCase().includes(lowerQuery) ||
        item.definition.toLowerCase().includes(lowerQuery);

      if (!matchesSearch) return null;

      return {
        id: item.term,
        type: 'glossary',
        title: item.term,
        term: item.term,
        definition: item.definition,
        description: item.definition.slice(0, 150),
        category: item.category,
        url: `/recursos?tab=glossary&term=${encodeURIComponent(item.term)}`,
        score: calculateScore(item, query),
      };
    })
    .filter((result): result is GlossarySearchResult => result !== null);

  return results.sort((a, b) => b.score - a.score);
}

function searchFlowResults(query: string): FlowSearchResult[] {
  const flows = searchFlows(getFlows(), getCategories(), query);

  return flows.map((flow) => ({
    id: flow.meta.id,
    type: 'flow',
    title: flow.meta.title,
    description: flow.meta.subcategory,
    category: flow.meta.categoryId,
    categoryLabel: flow.meta.subcategory,
    url: `/fluxo/${flow.meta.id}`,
    score: calculateScore({ title: flow.meta.title }, query),
  }));
}

export function unifiedSearch(query: string): UnifiedSearchResult[] {
  if (query.trim().length < 2) return [];

  return [
    ...searchFAQ(query),
    ...searchGlossary(query),
    ...searchFlowResults(query),
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

export function searchByType(query: string, type: SearchFilterType): UnifiedSearchResult[] {
  if (type === 'all') {
    return unifiedSearch(query);
  }

  return unifiedSearch(query).filter((result) => result.type === type);
}
