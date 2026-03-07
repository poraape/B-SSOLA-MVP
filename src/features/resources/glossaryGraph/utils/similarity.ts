import { tokenizePtBr } from './tokenizerPtBr';
import type { GlossaryNode } from './types';

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value));

const tokenSetOverlap = (left: string[], right: string[]): number => {
  if (left.length === 0 || right.length === 0) {
    return 0;
  }

  const leftSet = new Set(left);
  const rightSet = new Set(right);

  let intersection = 0;
  for (const token of leftSet) {
    if (rightSet.has(token)) {
      intersection += 1;
    }
  }

  const union = leftSet.size + rightSet.size - intersection;
  return union === 0 ? 0 : intersection / union;
};

export interface SimilarityParams {
  source: GlossaryNode;
  target: GlossaryNode;
  hasExplicitRelation?: boolean;
}

export const calculateSimilarity = ({
  source,
  target,
  hasExplicitRelation = false,
}: SimilarityParams): number => {
  const sourceTokens = tokenizePtBr(source.text);
  const targetTokens = tokenizePtBr(target.text);

  const overlap = tokenSetOverlap(sourceTokens, targetTokens);
  const categoryBoost = source.category === target.category ? 0.15 : 0;
  const explicitBoost = hasExplicitRelation ? 0.2 : 0;

  return clamp01(overlap + categoryBoost + explicitBoost);
};
