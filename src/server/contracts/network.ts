import type { Service } from '../../types';

export interface NetworkServicesRequest {
  traceId?: string;
}

interface NetworkServicesError {
  code: 'METHOD_NOT_ALLOWED' | 'INVALID_REQUEST' | 'INTERNAL_ERROR';
  message: string;
}

export type NetworkServicesResponse =
  | {
      ok: true;
      traceId: string;
      data: Service[];
    }
  | {
      ok: false;
      traceId: string;
      error: NetworkServicesError;
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isNetworkErrorCode = (value: unknown): value is NetworkServicesError['code'] => {
  return value === 'METHOD_NOT_ALLOWED' || value === 'INVALID_REQUEST' || value === 'INTERNAL_ERROR';
};

export const isNetworkServicesRequest = (value: unknown): value is NetworkServicesRequest => {
  if (!isRecord(value)) return false;
  return value.traceId === undefined || typeof value.traceId === 'string';
};

export const isNetworkServicesResponse = (value: unknown): value is NetworkServicesResponse => {
  if (!isRecord(value)) return false;
  if (value.ok === true) {
    return typeof value.traceId === 'string' && Array.isArray(value.data);
  }
  if (value.ok === false) {
    return (
      typeof value.traceId === 'string' &&
      isRecord(value.error) &&
      isNetworkErrorCode(value.error.code) &&
      typeof value.error.message === 'string'
    );
  }
  return false;
};
