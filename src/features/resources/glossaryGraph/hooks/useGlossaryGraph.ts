import { useMemo } from 'react';
import {
  getBacklinks,
  getNeighbors,
  getNodeBySlug,
  getNodeByTerm,
  getSubgraph,
  glossaryGraph,
} from '../data';
import type { EdgeType } from '../utils/types';

export const useGlossaryGraph = () => {
  return useMemo(
    () => ({
      graph: glossaryGraph,
      getNodeBySlug,
      getNodeByTerm,
      getNeighbors,
      getBacklinks,
      getSubgraph,
      getNeighborsByTypes: (slug: string, types: EdgeType[]) => getNeighbors(slug, types),
    }),
    []
  );
};
