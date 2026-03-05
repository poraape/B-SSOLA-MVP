import { searchFlows } from '../../../domain/search/searchEngine';
import { getFlows, getCategories } from '../../../domain/flows/selectors';
import { faqData } from '../../resources/data/faq';
import { glossaryData } from '../../resources/data/glossary';
import type {
  UnifiedSearchResult,
  FlowSearchResult,
  FAQSearchResult,
  GlossarySearchResult,
} from '../types/searchTypes';

function calculateScore(term: string, text: string, isTitleMatch = false): number {
  const lowerTerm = term.toLowerCase().trim();
  const lowerText = text.toLowerCase();

  if (!lowerTerm || !lowerText) return 0;
  if (lowerText === lowerTerm) return 100;
  if (lowerText.startsWith(lowerTerm)) return 80;
  if (lowerText.includes(lowerTerm)) return isTitleMatch ? 70 : 50;

  const termWords = lowerTerm.split(/\s+/).filter(Boolean);
  if (termWords.length === 0) return 0;

  const matchedWords = termWords.filter((word) => lowerText.includes(word));
  if (matchedWords.length > 0) {
    return Math.max(30, (matchedWords.length / termWords.length) * 40);
  }

  return 0;
}

function buildDescription(text: string): string {
  return text.length <= 150 ? text : `${text.slice(0, 150)}...`;
}

function searchFAQs(term: string): FAQSearchResult[] {
  return faqData
    .map((item) => {
      const questionScore = calculateScore(term, item.question, true);
      const answerScore = calculateScore(term, item.answer, false);
      const tagsScore = item.tags?.some((tag) => calculateScore(term, tag, false) > 0)
        ? 30
        : 0;

      const maxScore = Math.max(questionScore, answerScore, tagsScore);
      if (maxScore === 0) return null;

      return {
        id: item.id,
        type: 'faq',
        title: item.question,
        question: item.question,
        answer: item.answer,
        description: buildDescription(item.answer),
        category: item.category,
        tags: item.tags,
        url: `/recursos?tab=faq&open=${item.id}`,
        score: maxScore,
      } satisfies FAQSearchResult;
    })
    .filter((item): item is FAQSearchResult => item !== null);
}

function searchGlossary(term: string): GlossarySearchResult[] {
  return glossaryData
    .map((item) => {
      const termScore = calculateScore(term, item.term, true);
      const definitionScore = calculateScore(term, item.definition, false);
      const categoryScore = calculateScore(term, item.category, false);

      const maxScore = Math.max(termScore, definitionScore, categoryScore);
      if (maxScore === 0) return null;

      return {
        id: item.term,
        type: 'glossary',
        title: item.term,
        term: item.term,
        definition: item.definition,
        description: buildDescription(item.definition),
        category: item.category,
        url: `/recursos?tab=glossary&term=${encodeURIComponent(item.term)}`,
        score: maxScore,
      } satisfies GlossarySearchResult;
    })
    .filter((item): item is GlossarySearchResult => item !== null);
}

function searchFlowsUnified(term: string): FlowSearchResult[] {
  const flows = getFlows();
  const categories = getCategories();
  const results = searchFlows(flows, categories, term);

  return results.map((flow) => ({
    id: flow.meta.id,
    type: 'flow',
    title: flow.meta.title,
    description: flow.meta.subcategory,
    category: 'Decisor',
    categoryLabel: categories.find((c) => c.id === flow.meta.categoryId)?.label,
    url: `/fluxo/${flow.meta.id}`,
    score: 60,
  }));
}

export function unifiedSearch(term: string): UnifiedSearchResult[] {
  if (term.trim().length < 2) return [];

  const faqResults = searchFAQs(term);
  const glossaryResults = searchGlossary(term);
  const flowResults = searchFlowsUnified(term);

  return [...faqResults, ...glossaryResults, ...flowResults]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

export function searchByType(
  term: string,
  type: 'flow' | 'faq' | 'glossary' | 'all' = 'all',
): UnifiedSearchResult[] {
  const results = unifiedSearch(term);
  if (type === 'all') return results;
  return results.filter((result) => result.type === type);
}
