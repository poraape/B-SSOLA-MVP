import type { GlossaryItem } from '../../data/glossary';
import { buildCategoryEdges } from './categoryEdges';
import { buildExplicitEdges } from './explicitEdges';
import { buildInferredEdges } from './inferredEdges';
import { buildMentionEdges } from './mentionDetection';
import { normalizeText } from './normalizeText';
import { buildUniqueSlugMap } from './slugify';
import type { GlossaryEdge, GlossaryGraph, GlossaryNode, NodeBuildContext } from './types';

const makeText = (item: GlossaryItem): string =>
  [
    item.definition,
    item.context,
    item.practicalExample,
    item.regionalContext,
    item.legalReference,
    item.whoMakes,
    item.visualAid,
    item.signsToWatch,
    item.location,
    item.frequency,
    ...(item.regionalVariations ?? []),
    ...(item.relatedTerms ?? []),
  ]
    .filter(Boolean)
    .join(' ');

const buildNodeContext = (glossary: GlossaryItem[]): NodeBuildContext => {
  const slugByTerm = buildUniqueSlugMap(glossary.map((item) => item.term));

  const nodes: Record<string, GlossaryNode> = {};
  const itemBySlug: Record<string, GlossaryItem> = {};
  const slugByNormalizedTerm = new Map<string, string>();

  for (const item of glossary) {
    const slug = slugByTerm.get(item.term);
    if (!slug) {
      continue;
    }

    nodes[slug] = {
      slug,
      term: item.term,
      category: item.category,
      audienceLevel: item.audienceLevel,
      text: makeText(item),
    };

    itemBySlug[slug] = item;
    slugByNormalizedTerm.set(normalizeText(item.term), slug);
  }

  return {
    nodes,
    itemBySlug,
    slugByTerm,
    slugByNormalizedTerm,
  };
};

const dedupeEdges = (edges: GlossaryEdge[]): GlossaryEdge[] => {
  const merged = new Map<string, GlossaryEdge>();

  for (const edge of edges) {
    const key = `${edge.from}->${edge.to}:${edge.type}`;
    const current = merged.get(key);

    if (!current || edge.weight > current.weight) {
      merged.set(key, edge);
    }
  }

  return Array.from(merged.values());
};

const createAdjacency = (nodes: Record<string, GlossaryNode>, edges: GlossaryEdge[]) => {
  const adjacency: Record<string, GlossaryEdge[]> = {};
  const backlinks: Record<string, GlossaryEdge[]> = {};

  for (const slug of Object.keys(nodes)) {
    adjacency[slug] = [];
    backlinks[slug] = [];
  }

  for (const edge of edges) {
    adjacency[edge.from]?.push(edge);
    backlinks[edge.to]?.push(edge);
  }

  return { adjacency, backlinks };
};

const deepFreezeGraph = (graph: GlossaryGraph): GlossaryGraph => {
  Object.freeze(graph.edges);

  for (const node of Object.values(graph.nodes)) {
    Object.freeze(node);
  }

  for (const edgeList of Object.values(graph.adjacency)) {
    Object.freeze(edgeList);
  }

  for (const edgeList of Object.values(graph.backlinks)) {
    Object.freeze(edgeList);
  }

  Object.freeze(graph.nodes);
  Object.freeze(graph.adjacency);
  Object.freeze(graph.backlinks);
  return Object.freeze(graph);
};

export const buildGlossaryGraph = (glossary: GlossaryItem[]): GlossaryGraph => {
  const context = buildNodeContext(glossary);
  const nodes = Object.values(context.nodes);

  const explicitEdges = buildExplicitEdges(glossary, context);
  const explicitPairs = new Set(
    explicitEdges.map((edge) => [edge.from, edge.to].sort().join('::'))
  );

  const mentionEdges = buildMentionEdges(context);
  const inferredEdges = buildInferredEdges(nodes, {
    topK: 5,
    threshold: 0.35,
    explicitPairs,
  });
  const categoryEdges = buildCategoryEdges(nodes);

  const edges = dedupeEdges([
    ...explicitEdges,
    ...mentionEdges,
    ...inferredEdges,
    ...categoryEdges,
  ]);

  const { adjacency, backlinks } = createAdjacency(context.nodes, edges);

  return deepFreezeGraph({
    nodes: context.nodes,
    edges,
    adjacency,
    backlinks,
  });
};

export type { GlossaryEdge, GlossaryGraph, GlossaryNode } from './types';
