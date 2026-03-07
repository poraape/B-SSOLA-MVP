import type { GlossaryEdge, GlossaryNode } from './types';

export const buildCategoryEdges = (nodes: GlossaryNode[]): GlossaryEdge[] => {
  const byCategory = nodes.reduce<Record<string, GlossaryNode[]>>((acc, node) => {
    const group = acc[node.category] ?? [];
    group.push(node);
    acc[node.category] = group;
    return acc;
  }, {});

  const edges: GlossaryEdge[] = [];

  for (const categoryNodes of Object.values(byCategory)) {
    for (let index = 0; index < categoryNodes.length; index += 1) {
      const source = categoryNodes[index];
      const targets = categoryNodes
        .filter((candidate) => candidate.slug !== source.slug)
        .slice(0, 2);

      for (const target of targets) {
        edges.push({
          from: source.slug,
          to: target.slug,
          type: 'category',
          weight: 0.25,
        });
      }
    }
  }

  return edges;
};
