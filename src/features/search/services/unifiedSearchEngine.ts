import { faqData } from '../../resources/data/faq';
import { glossaryData } from '../../resources/data/glossary';

export interface FAQSearchResult {
  id: string;
  type: 'faq';
  title: string;
  question: string;
  answer: string;
  description?: string;
  category: string;
  tags?: string[];
  url: string;
  score: number;
}

export interface GlossarySearchResult {
  id: string;
  type: 'glossary';
  title: string;
  term: string;
  definition: string;
  description?: string;
  category: string;
  url: string;
  score: number;
}

export type UnifiedSearchResult = FAQSearchResult | GlossarySearchResult;

function calculateScore(item: { term?: string; question?: string }, query: string): number {
  const text = (item.term || item.question || '').toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  if (text === lowerQuery) return 100;
  if (text.startsWith(lowerQuery)) return 80;
  if (text.includes(lowerQuery)) return 60;
  return 40;
}

export function searchFAQ(query: string): FAQSearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  return faqData
    .filter(item => {
      const matchesSearch =
        item.question.toLowerCase().includes(lowerQuery) ||
        item.answer.toLowerCase().includes(lowerQuery) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery));
      return matchesSearch;
    })
    .map(item => ({
      id: item.id,
      type: 'faq' as const,
      title: item.question,
      question: item.question,
      answer: item.answer,
      description: item.answer.slice(0, 150),
      category: item.category,
      tags: item.tags,
      url: `/recursos?tab=faq&q=${encodeURIComponent(item.id)}`,
      score: calculateScore(item, query)
    }))
    .sort((a, b) => b.score - a.score);
}

export function searchGlossary(query: string): GlossarySearchResult[] {
  const lowerQuery = query.toLowerCase();
  
  return glossaryData
    .filter(item => {
      const matchesSearch =
        item.term.toLowerCase().includes(lowerQuery) ||
        item.definition.toLowerCase().includes(lowerQuery);
      return matchesSearch;
    })
    .map(item => ({
      id: item.term,
      type: 'glossary' as const,
      title: item.term,
      term: item.term,
      definition: item.definition,
      description: item.definition.slice(0, 150),
      category: item.category,
      url: `/recursos?tab=glossary&termo=${encodeURIComponent(item.term)}`,
      score: calculateScore(item, query)
    }))
    .sort((a, b) => b.score - a.score);
}

export function unifiedSearch(query: string): UnifiedSearchResult[] {
  const faqResults = searchFAQ(query);
  const glossaryResults = searchGlossary(query);
  
  return [...faqResults, ...glossaryResults].sort((a, b) => b.score - a.score);
}


export type SearchFilterType = 'all' | 'faq' | 'glossary';

export function searchByType(
  query: string,
  type: SearchFilterType
): UnifiedSearchResult[] {
  if (type === 'faq') return searchFAQ(query);
  if (type === 'glossary') return searchGlossary(query);
  return unifiedSearch(query);
}
