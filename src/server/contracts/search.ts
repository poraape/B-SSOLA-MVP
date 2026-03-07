import type { SearchFilterType, UnifiedSearchResult } from '../../application/search/unifiedSearchEngine';

export interface SearchApiRequest {
  traceId?: string;
  query: string;
  type: SearchFilterType;
}

interface SearchApiError {
  code: 'METHOD_NOT_ALLOWED' | 'INVALID_REQUEST' | 'INTERNAL_ERROR';
  message: string;
}

export type SearchApiResponse =
  | {
      ok: true;
      traceId: string;
      data: UnifiedSearchResult[];
    }
  | {
      ok: false;
      traceId: string;
      error: SearchApiError;
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isSearchErrorCode = (value: unknown): value is SearchApiError['code'] => {
  return value === 'METHOD_NOT_ALLOWED' || value === 'INVALID_REQUEST' || value === 'INTERNAL_ERROR';
};

const isSearchFilterType = (value: unknown): value is SearchFilterType => {
  return value === 'all' || value === 'flow' || value === 'faq' || value === 'glossary';
};

export const isSearchApiRequest = (value: unknown): value is SearchApiRequest => {
  if (!isRecord(value)) return false;
  if (value.traceId !== undefined && typeof value.traceId !== 'string') return false;
  return typeof value.query === 'string' && isSearchFilterType(value.type);
};

export const isSearchApiResponse = (value: unknown): value is SearchApiResponse => {
  if (!isRecord(value)) return false;
  if (value.ok === true) {
    return typeof value.traceId === 'string' && Array.isArray(value.data);
  }
  if (value.ok === false) {
    return (
      typeof value.traceId === 'string' &&
      isRecord(value.error) &&
      isSearchErrorCode(value.error.code) &&
      typeof value.error.message === 'string'
    );
  }
  return false;
};
