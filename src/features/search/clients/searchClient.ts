import type { SearchFilterType } from '../services/unifiedSearchEngine';
import type { UnifiedSearchResult } from '../types/searchTypes';
import { isSearchApiResponse, type SearchApiRequest } from '../../../server/contracts/search';

type LocalSearchByTypeFn = (
  query: string,
  type: SearchFilterType
) => UnifiedSearchResult[];

const SEARCH_API_PATH = '/api/search';
const REQUEST_TIMEOUT_MS = 3000;

let localSearchByTypeFn: LocalSearchByTypeFn | null = null;

const isSearchApiEnabled = (): boolean => {
  return import.meta.env.VITE_FEATURE_SEARCH_API === 'true';
};

const createTraceId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `trace_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const fetchWithTimeout = async (input: string, init: RequestInit): Promise<Response> => {
  if (typeof AbortController !== 'function') {
    return fetch(input, init);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

const getLocalSearchByType = async (): Promise<LocalSearchByTypeFn> => {
  if (localSearchByTypeFn) {
    return localSearchByTypeFn;
  }
  const module = await import('../services/unifiedSearchEngine');
  localSearchByTypeFn = module.searchByType;
  return localSearchByTypeFn;
};

const runLocalFallback = async (
  query: string,
  type: SearchFilterType
): Promise<UnifiedSearchResult[]> => {
  const localSearchByType = await getLocalSearchByType();
  return localSearchByType(query, type);
};

export async function searchWithFacade(
  query: string,
  type: SearchFilterType
): Promise<UnifiedSearchResult[]> {
  if (!isSearchApiEnabled() || typeof fetch !== 'function') {
    return runLocalFallback(query, type);
  }

  const requestPayload: SearchApiRequest = {
    traceId: createTraceId(),
    query,
    type,
  };

  try {
    const response = await fetchWithTimeout(SEARCH_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      return runLocalFallback(query, type);
    }

    const responseBody = (await response.json()) as unknown;
    if (!isSearchApiResponse(responseBody) || !responseBody.ok) {
      return runLocalFallback(query, type);
    }

    return responseBody.data;
  } catch {
    return runLocalFallback(query, type);
  }
}
