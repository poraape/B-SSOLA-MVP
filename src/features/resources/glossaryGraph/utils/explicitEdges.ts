import type { GlossaryItem } from '../../data/glossary';
import { normalizeText } from './normalizeText';
import type { GlossaryEdge, NodeBuildContext } from './types';

const resolveRelatedSlug = (
  relatedTerm: string,
  glossaryContext: NodeBuildContext
): string | undefined => {
  const normalizedRelated = normalizeText(relatedTerm);

  const exact = glossaryContext.slugByNormalizedTerm.get(normalizedRelated);
  if (exact) {
    return exact;
  }

  for (const [normalizedTerm, slug] of glossaryContext.slugByNormalizedTerm.entries()) {
    if (
      normalizedTerm.includes(normalizedRelated) ||
      normalizedRelated.includes(normalizedTerm)
    ) {
      return slug;
    }
  }

  return undefined;
};

export const buildExplicitEdges = (
  glossary: GlossaryItem[],
  glossaryContext: NodeBuildContext
): GlossaryEdge[] => {
  const edges: GlossaryEdge[] = [];

  for (const item of glossary) {
    const from = glossaryContext.slugByTerm.get(item.term);
    if (!from || !item.relatedTerms?.length) {
      continue;
    }

    for (const relatedTerm of item.relatedTerms) {
      const to = resolveRelatedSlug(relatedTerm, glossaryContext);

      if (!to) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn(`[glossaryGraph] relatedTerms não resolvido: "${relatedTerm}" em "${item.term}"`);
        }
        continue;
      }

      if (to === from) {
        continue;
      }

      edges.push({
        from,
        to,
        type: 'explicit',
        weight: 0.8,
      });
    }
  }

  return edges;
};
