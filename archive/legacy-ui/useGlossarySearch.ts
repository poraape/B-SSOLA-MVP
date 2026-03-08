// src/features/resources/hooks/useGlossarySearch.ts

import { useMemo } from 'react';

import { GlossaryItem } from '../data/glossary';
import { fuzzyMatch } from '../utils/searchUtils';

interface UseGlossarySearchOptions {
  includeRelated?: boolean;
  regionFilter?: string;
}

export const useGlossarySearch = (
  data: GlossaryItem[],
  search: string,
  selectedCategory: string,
  options: UseGlossarySearchOptions = {}
) => {
  // Memoizar categorias (recalculada apenas se data mudar)
  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(data.map((item) => item.category)))];
  }, [data]);

  // Memoizar resultados filtrados (recalculada apenas se search/category mudar)
  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      // Busca fuzzy em term e definition
      const matchesSearch =
        search === '' ||
        fuzzyMatch(search, item.term) ||
        fuzzyMatch(search, item.definition);

      // Filtro por categoria
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Filtro regional (opcional)
      const matchesRegion =
        !options.regionFilter ||
        item.regionalContext?.includes(options.regionFilter);

      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [data, search, selectedCategory, options.regionFilter]);

  return {
    categories,
    filteredItems,
    totalResults: filteredItems.length,
  };
};
