import type {
  ContentBootstrapRequest,
  ContentBootstrapResponse,
} from '../../src/server/contracts/contentBootstrap';
import { isContentBootstrapRequest } from '../../src/server/contracts/contentBootstrap';
import { executeContentBootstrap } from '../../src/server/services/contentBootstrapService';
import {
  getTraceId,
  parseRequestBody,
  setJsonContentType,
  type VercelLikeRequest,
  type VercelLikeResponse,
} from '../../src/server/utils/http';

export default function handler(
  req: VercelLikeRequest,
  res: VercelLikeResponse<ContentBootstrapResponse>
): void {
  setJsonContentType(res);

  const rawBody = parseRequestBody(req.body);
  const payload = (rawBody && typeof rawBody === 'object'
    ? (rawBody as Partial<ContentBootstrapRequest>)
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

  if (!isContentBootstrapRequest(rawBody)) {
    res.status(400).json({
      ok: false,
      traceId,
      error: {
        code: 'INVALID_REQUEST',
        message: 'Payload inválido para bootstrap de conteúdo.',
      },
    });
    return;
  }

  try {
    const data = executeContentBootstrap();
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
        message: 'Falha ao carregar bootstrap de conteúdo.',
      },
    });
  }
}
