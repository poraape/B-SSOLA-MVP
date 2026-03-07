import { searchByType, type SearchFilterType, type UnifiedSearchResult } from '../../application/search/unifiedSearchEngine';

export function executeSearch(query: string, type: SearchFilterType): UnifiedSearchResult[] {
  return searchByType(query, type);
}
