import { glossaryGraph } from './graph';
import { normalizeText } from '../utils/normalizeText';
import type { EdgeType, GlossaryEdge, GlossaryGraph, GlossaryNode } from '../utils/types';

const slugByNormalizedTerm = new Map(
  Object.values(glossaryGraph.nodes).map((node) => [normalizeText(node.term), node.slug])
);

export const getNodeBySlug = (slug: string): GlossaryNode | undefined =>
  glossaryGraph.nodes[slug];

export const getNodeByTerm = (term: string): GlossaryNode | undefined => {
  const slug = slugByNormalizedTerm.get(normalizeText(term));
  return slug ? glossaryGraph.nodes[slug] : undefined;
};

export const getNeighbors = (
  slug: string,
  types?: EdgeType[]
): GlossaryEdge[] => {
  const outgoing = glossaryGraph.adjacency[slug] ?? [];
  const incoming = glossaryGraph.backlinks[slug] ?? [];
  const combined = [...outgoing, ...incoming];

  if (!types?.length) {
    return combined;
  }

  const allowed = new Set(types);
  return combined.filter((edge) => allowed.has(edge.type));
};

export const getBacklinks = (slug: string, types?: EdgeType[]): GlossaryEdge[] => {
  const backlinks = glossaryGraph.backlinks[slug] ?? [];

  if (!types?.length) {
    return backlinks;
  }

  const allowed = new Set(types);
  return backlinks.filter((edge) => allowed.has(edge.type));
};

export const getSubgraph = (
  rootSlug: string,
  hops = 1,
  types?: EdgeType[]
): GlossaryGraph => {
  const visited = new Set<string>([rootSlug]);
  let frontier = [rootSlug];

  for (let hop = 0; hop < hops; hop += 1) {
    const nextFrontier = new Set<string>();

    for (const slug of frontier) {
      for (const edge of getNeighbors(slug, types)) {
        const neighborSlug = edge.from === slug ? edge.to : edge.from;
        if (!visited.has(neighborSlug)) {
          visited.add(neighborSlug);
          nextFrontier.add(neighborSlug);
        }
      }
    }

    frontier = Array.from(nextFrontier);
    if (frontier.length === 0) {
      break;
    }
  }

  const nodes: Record<string, GlossaryNode> = {};
  for (const slug of visited) {
    const node = glossaryGraph.nodes[slug];
    if (node) {
      nodes[slug] = node;
    }
  }

  const edges = glossaryGraph.edges.filter(
    (edge) => visited.has(edge.from) && visited.has(edge.to) && (!types?.length || types.includes(edge.type))
  );

  const adjacency: Record<string, GlossaryEdge[]> = {};
  const backlinks: Record<string, GlossaryEdge[]> = {};

  for (const slug of visited) {
    adjacency[slug] = edges.filter((edge) => edge.from === slug);
    backlinks[slug] = edges.filter((edge) => edge.to === slug);
  }

  return { nodes, edges, adjacency, backlinks };
};

export { glossaryGraph };
