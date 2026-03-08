import { glossaryData, type GlossaryItem } from '../../data/glossary';
import { normalizeText } from './textTokenizer';
import { rankSemanticMatches } from './semanticSimilarity';

const resolveByReference = (
  reference: string,
  glossary: GlossaryItem[]
): GlossaryItem | undefined => {
  const normalizedReference = normalizeText(reference);

  const exactMatch = glossary.find(
    (item) => normalizeText(item.term) === normalizedReference
  );

  if (exactMatch) {
    return exactMatch;
  }

  return glossary.find((item) => {
    const normalizedTerm = normalizeText(item.term);
    return (
      normalizedTerm.includes(normalizedReference) ||
      normalizedReference.includes(normalizedTerm)
    );
  });
};

export interface RelatedTermsOptions {
  glossary?: GlossaryItem[];
  limit?: number;
}

export const getRelatedTerms = (
  term: GlossaryItem,
  options: RelatedTermsOptions = {}
): GlossaryItem[] => {
  const glossary = options.glossary ?? glossaryData;
  const limit = options.limit ?? 5;

  const merged = new Map<string, GlossaryItem>();

  for (const explicitReference of term.relatedTerms ?? []) {
    const resolved = resolveByReference(explicitReference, glossary);
    if (resolved && resolved.term !== term.term) {
      merged.set(resolved.term, resolved);
    }
  }

  const semanticMatches = rankSemanticMatches(term, glossary, limit * 2);

  for (const match of semanticMatches) {
    if (!merged.has(match.item.term)) {
      merged.set(match.item.term, match.item);
    }

    if (merged.size >= limit) {
      break;
    }
  }

  return Array.from(merged.values()).slice(0, limit);
};
