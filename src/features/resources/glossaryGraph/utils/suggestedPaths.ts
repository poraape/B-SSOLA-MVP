import type { GlossaryGraph } from './types';

export interface SuggestedPath {
  id: 'same-category' | 'cross-category' | 'bridge';
  label: string;
  slugs: string[];
}

const unique = (items: string[]): string[] => Array.from(new Set(items));

export const suggestPaths = (
  graph: GlossaryGraph,
  slug: string
): SuggestedPath[] => {
  const node = graph.nodes[slug];
  if (!node) {
    return [];
  }

  const oneHop = graph.adjacency[slug] ?? [];

  const sameCategoryPath = unique([
    slug,
    ...(oneHop
      .map((edge) => graph.nodes[edge.to])
      .filter((target): target is typeof node => Boolean(target) && target.category === node.category)
      .slice(0, 2)
      .map((target) => target.slug)),
  ]).slice(0, 3);

  const crossCategoryCandidate = oneHop
    .map((edge) => ({ edge, target: graph.nodes[edge.to] }))
    .find(({ target }) => target && target.category !== node.category);

  const explicitFromCross = crossCategoryCandidate
    ? (graph.adjacency[crossCategoryCandidate.target.slug] ?? []).find((edge) => edge.type === 'explicit')
    : undefined;

  const crossCategoryPath = unique([
    slug,
    crossCategoryCandidate?.target.slug,
    explicitFromCross?.to,
  ].filter((value): value is string => Boolean(value))).slice(0, 3);

  const degreeBySlug = Object.entries(graph.adjacency)
    .map(([candidateSlug, edges]) => ({
      slug: candidateSlug,
      degree: edges.length + (graph.backlinks[candidateSlug]?.length ?? 0),
      category: graph.nodes[candidateSlug]?.category,
    }))
    .sort((left, right) => right.degree - left.degree);

  const bridge = degreeBySlug.find(
    (candidate) => candidate.slug !== slug && candidate.category !== node.category
  );

  const bridgeNeighbor = bridge
    ? (graph.adjacency[bridge.slug] ?? []).find(
      (edge) => graph.nodes[edge.to] && graph.nodes[edge.to].category !== node.category
    )
    : undefined;

  const bridgePath = unique([
    slug,
    bridge?.slug,
    bridgeNeighbor?.to,
  ].filter((value): value is string => Boolean(value))).slice(0, 3);

  return [
    {
      id: 'same-category',
      label: 'Mesmo tema',
      slugs: sameCategoryPath.length >= 2 ? sameCategoryPath : [slug],
    },
    {
      id: 'cross-category',
      label: 'Conexão entre categorias',
      slugs: crossCategoryPath.length >= 2 ? crossCategoryPath : [slug],
    },
    {
      id: 'bridge',
      label: 'Ponte conceitual',
      slugs: bridgePath.length >= 2 ? bridgePath : [slug],
    },
  ];
};
