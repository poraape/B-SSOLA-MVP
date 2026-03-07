export interface VercelLikeRequest {
  method?: string;
  body?: unknown;
}

export interface VercelLikeResponse<TBody> {
  status: (code: number) => VercelLikeResponse<TBody>;
  json: (body: TBody) => void;
  setHeader?: (name: string, value: string) => void;
}

export const createTraceId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `trace_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const parseRequestBody = (body: unknown): unknown => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body;
};

export const getTraceId = <TPayload extends { traceId?: string }>(
  payload: Partial<TPayload> | null
): string => {
  if (payload?.traceId && typeof payload.traceId === 'string') {
    return payload.traceId;
  }
  return createTraceId();
};

export const setJsonContentType = <TBody>(
  res: VercelLikeResponse<TBody>
): void => {
  if (res.setHeader) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
  }
};
