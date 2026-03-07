import { calculateSimilarity } from './similarity';
import { tokenizePtBr } from './tokenizerPtBr';
import type { GlossaryEdge, GlossaryNode } from './types';

interface InferredEdgeOptions {
  topK?: number;
  threshold?: number;
  explicitPairs?: Set<string>;
}

const pairKey = (left: string, right: string): string =>
  [left, right].sort().join('::');

const buildTokenBuckets = (nodes: GlossaryNode[]): Map<string, Set<string>> => {
  const buckets = new Map<string, Set<string>>();

  for (const node of nodes) {
    const tokens = new Set(tokenizePtBr(node.text));

    for (const token of tokens) {
      const bucket = buckets.get(token) ?? new Set<string>();
      bucket.add(node.slug);
      buckets.set(token, bucket);
    }
  }

  return buckets;
};

export const buildInferredEdges = (
  nodes: GlossaryNode[],
  options: InferredEdgeOptions = {}
): GlossaryEdge[] => {
  const topK = options.topK ?? 5;
  const threshold = options.threshold ?? 0.35;
  const explicitPairs = options.explicitPairs ?? new Set<string>();

  const bySlug = new Map(nodes.map((node) => [node.slug, node]));
  const pairScore = new Map<string, number>();

  const tokenBuckets = nodes.length > 400 ? buildTokenBuckets(nodes) : null;

  for (const source of nodes) {
    const candidates = new Set<string>();

    if (tokenBuckets) {
      for (const token of new Set(tokenizePtBr(source.text))) {
        for (const candidateSlug of tokenBuckets.get(token) ?? []) {
          if (candidateSlug !== source.slug) {
            candidates.add(candidateSlug);
          }
        }
      }
    } else {
      for (const candidate of nodes) {
        if (candidate.slug !== source.slug) {
          candidates.add(candidate.slug);
        }
      }
    }

    const scored = Array.from(candidates)
      .map((candidateSlug) => {
        const target = bySlug.get(candidateSlug);
        if (!target) {
          return null;
        }

        const explicitKey = pairKey(source.slug, target.slug);
        const similarity = calculateSimilarity({
          source,
          target,
          hasExplicitRelation: explicitPairs.has(explicitKey),
        });

        return { source: source.slug, target: target.slug, score: similarity };
      })
      .filter((entry): entry is { source: string; target: string; score: number } => Boolean(entry))
      .filter((entry) => entry.score >= threshold)
      .sort((left, right) => right.score - left.score)
      .slice(0, topK);

    for (const entry of scored) {
      const key = pairKey(entry.source, entry.target);
      const current = pairScore.get(key) ?? 0;
      if (entry.score > current) {
        pairScore.set(key, entry.score);
      }
    }
  }

  return Array.from(pairScore.entries()).map(([key, score]) => {
    const [from, to] = key.split('::');
    return {
      from,
      to,
      type: 'inferred' as const,
      weight: score,
    };
  });
};
