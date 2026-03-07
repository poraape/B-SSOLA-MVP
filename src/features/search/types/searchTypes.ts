export type SearchResultType = 'flow' | 'faq' | 'glossary';

export interface BaseSearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description?: string;
  category?: string;
  url: string;
  score: number;
}

export interface FlowSearchResult extends BaseSearchResult {
  type: 'flow';
  categoryLabel?: string;
}

export interface FAQSearchResult extends BaseSearchResult {
  type: 'faq';
  question: string;
  answer: string;
  tags?: string[];
}

export interface GlossarySearchResult extends BaseSearchResult {
  type: 'glossary';
  term: string;
  definition: string;
  category?: string;
}

export type UnifiedSearchResult =
  | FlowSearchResult
  | FAQSearchResult
  | GlossarySearchResult;
