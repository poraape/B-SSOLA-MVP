import type { GlossaryItem } from '../../data/glossary';

export type GlossaryNode = {
  slug: string;
  term: string;
  category: string;
  audienceLevel: 'leigo' | 'técnico';
  text: string;
};

export type EdgeType = 'explicit' | 'inferred' | 'mention' | 'category';

export type GlossaryEdge = {
  from: string;
  to: string;
  type: EdgeType;
  weight: number;
};

export type GlossaryGraph = {
  nodes: Record<string, GlossaryNode>;
  edges: GlossaryEdge[];
  adjacency: Record<string, GlossaryEdge[]>;
  backlinks: Record<string, GlossaryEdge[]>;
};

export interface NodeBuildContext {
  nodes: Record<string, GlossaryNode>;
  itemBySlug: Record<string, GlossaryItem>;
  slugByTerm: Map<string, string>;
  slugByNormalizedTerm: Map<string, string>;
}
