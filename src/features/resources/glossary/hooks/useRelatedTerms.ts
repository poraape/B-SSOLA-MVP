import { useMemo } from 'react';
import { glossaryData, type GlossaryItem } from '../../data/glossary';
import { getRelatedTerms } from '../utils/relatedTermsEngine';
import { normalizeText } from '../utils/textTokenizer';

export interface UseRelatedTermsOptions {
  glossary?: GlossaryItem[];
  limit?: number;
}

const resolveTerm = (
  term: GlossaryItem | string | null | undefined,
  glossary: GlossaryItem[]
): GlossaryItem | undefined => {
  if (!term) {
    return undefined;
  }

  if (typeof term !== 'string') {
    return term;
  }

  const normalizedTerm = normalizeText(term);

  return glossary.find(
    (candidate) => normalizeText(candidate.term) === normalizedTerm
  );
};

export const useRelatedTerms = (
  term: GlossaryItem | string | null | undefined,
  options: UseRelatedTermsOptions = {}
): GlossaryItem[] => {
  const glossary = options.glossary ?? glossaryData;
  const limit = options.limit ?? 5;

  return useMemo(() => {
    const resolvedTerm = resolveTerm(term, glossary);

    if (!resolvedTerm) {
      return [];
    }

    return getRelatedTerms(resolvedTerm, { glossary, limit });
  }, [term, glossary, limit]);
};
