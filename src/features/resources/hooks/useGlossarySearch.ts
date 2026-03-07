import { useMemo } from 'react';
import type { GlossaryItem } from '../data/glossary';
import { fuzzyMatch, normalizeText } from '../utils/searchUtils';

interface UseGlossarySearchOptions {
  includeRelated?: boolean;
  regionFilter?: string;
}

export function useGlossarySearch(
  data: GlossaryItem[],
  search: string,
  selectedCategory: string,
  options: UseGlossarySearchOptions = {}
) {
  const categories = useMemo(
    () => ['all', ...Array.from(new Set(data.map((item) => item.category))).sort((a, b) => a.localeCompare(b, 'pt-BR'))],
    [data]
  );

  const normalizedRegion = normalizeText(options.regionFilter ?? '');

  const filteredItems = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      const matchesRegion =
        !normalizedRegion ||
        normalizeText(item.regionalContext ?? '').includes(normalizedRegion);

      const matchesSearch =
        search.trim() === '' ||
        fuzzyMatch(search, item.term) ||
        fuzzyMatch(search, item.definition) ||
        fuzzyMatch(search, item.context ?? '') ||
        fuzzyMatch(search, item.practicalExample ?? '') ||
        (options.includeRelated === true &&
          (item.relatedTerms ?? []).some((related) => fuzzyMatch(search, related)));

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [data, normalizedRegion, options.includeRelated, search, selectedCategory]);

  return {
    categories,
    filteredItems,
    totalResults: filteredItems.length,
  };
}

export type { UseGlossarySearchOptions };
