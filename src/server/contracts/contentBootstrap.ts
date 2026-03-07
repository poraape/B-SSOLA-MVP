import type { AppModel } from '../../types';

export interface ContentBootstrapRequest {
  traceId?: string;
}

interface ContentBootstrapError {
  code: 'METHOD_NOT_ALLOWED' | 'INVALID_REQUEST' | 'INTERNAL_ERROR';
  message: string;
}

export interface ContentBootstrapPayload {
  model: {
    version: AppModel['version'];
    meta: AppModel['meta'];
    uiConfig?: AppModel['uiConfig'];
    searchConfig?: AppModel['searchConfig'];
    institution: Pick<AppModel['institution'], 'name'>;
  };
  network: {
    tileUrl: string;
    attributionHtml: string;
  };
}

export type ContentBootstrapResponse =
  | {
      ok: true;
      traceId: string;
      data: ContentBootstrapPayload;
    }
  | {
      ok: false;
      traceId: string;
      error: ContentBootstrapError;
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isContentBootstrapErrorCode = (value: unknown): value is ContentBootstrapError['code'] => {
  return value === 'METHOD_NOT_ALLOWED' || value === 'INVALID_REQUEST' || value === 'INTERNAL_ERROR';
};

export const isContentBootstrapRequest = (value: unknown): value is ContentBootstrapRequest => {
  if (!isRecord(value)) return false;
  return value.traceId === undefined || typeof value.traceId === 'string';
};

export const isContentBootstrapResponse = (value: unknown): value is ContentBootstrapResponse => {
  if (!isRecord(value)) return false;
  if (value.ok === true) {
    return typeof value.traceId === 'string' && isRecord(value.data);
  }
  if (value.ok === false) {
    return (
      typeof value.traceId === 'string' &&
      isRecord(value.error) &&
      isContentBootstrapErrorCode(value.error.code) &&
      typeof value.error.message === 'string'
    );
  }
  return false;
};
