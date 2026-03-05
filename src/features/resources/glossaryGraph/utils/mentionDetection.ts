import { normalizeText } from './normalizeText';
import type { GlossaryEdge, NodeBuildContext } from './types';

interface MentionCandidate {
  slug: string;
  normalizedTerm: string;
}

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildCandidates = (context: NodeBuildContext): MentionCandidate[] =>
  Object.entries(context.nodes)
    .map(([slug, node]) => ({
      slug,
      normalizedTerm: normalizeText(node.term),
    }))
    .sort((left, right) => right.normalizedTerm.length - left.normalizedTerm.length);

export const buildMentionEdges = (context: NodeBuildContext): GlossaryEdge[] => {
  const edges: GlossaryEdge[] = [];
  const candidates = buildCandidates(context);

  for (const [fromSlug, node] of Object.entries(context.nodes)) {
    const normalizedText = ` ${normalizeText(node.text)} `;
    const consumedRanges: Array<{ start: number; end: number }> = [];

    for (const candidate of candidates) {
      if (candidate.slug === fromSlug) {
        continue;
      }

      const pattern = new RegExp(`(^|\\s)${escapeRegex(candidate.normalizedTerm)}(?=\\s|$)`, 'g');
      const match = pattern.exec(normalizedText);

      if (!match || typeof match.index !== 'number') {
        continue;
      }

      const start = match.index;
      const end = start + match[0].length;
      const overlapsConsumed = consumedRanges.some(
        (range) => start < range.end && end > range.start
      );

      if (overlapsConsumed) {
        continue;
      }

      consumedRanges.push({ start, end });

      edges.push({
        from: fromSlug,
        to: candidate.slug,
        type: 'mention',
        weight: 0.4,
      });
    }
  }

  return edges;
};
