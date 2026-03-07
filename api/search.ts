import type { SearchApiRequest, SearchApiResponse } from '../src/server/contracts/search';
import { isSearchApiRequest } from '../src/server/contracts/search';
import { executeSearch } from '../src/server/services/searchService';
import {
  getTraceId,
  parseRequestBody,
  setJsonContentType,
  type VercelLikeRequest,
  type VercelLikeResponse,
} from '../src/server/utils/http';

export default function handler(req: VercelLikeRequest, res: VercelLikeResponse<SearchApiResponse>): void {
  setJsonContentType(res);

  const rawBody = parseRequestBody(req.body);
  const payload = (rawBody && typeof rawBody === 'object'
    ? (rawBody as Partial<SearchApiRequest>)
    : null);
  const traceId = getTraceId(payload);

  if (req.method !== 'POST') {
    res.status(405).json({
      ok: false,
      traceId,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Use POST para este endpoint.',
      },
    });
    return;
  }

  if (!isSearchApiRequest(rawBody)) {
    res.status(400).json({
      ok: false,
      traceId,
      error: {
        code: 'INVALID_REQUEST',
        message: 'Payload inválido para busca unificada.',
      },
    });
    return;
  }

  try {
    const data = executeSearch(rawBody.query, rawBody.type);
    res.status(200).json({
      ok: true,
      traceId,
      data,
    });
  } catch {
    res.status(500).json({
      ok: false,
      traceId,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Falha ao processar a busca.',
      },
    });
  }
}
