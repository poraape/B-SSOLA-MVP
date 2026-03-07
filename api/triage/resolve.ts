import type { TriageResolveRequest, TriageResolveResponse } from '../../src/server/contracts/triage';
import { isTriageResolveRequest } from '../../src/server/contracts/triage';
import { executeTriageResolve } from '../../src/server/services/triageResolveService';
import {
  getTraceId,
  parseRequestBody,
  setJsonContentType,
  type VercelLikeRequest,
  type VercelLikeResponse,
} from '../../src/server/utils/http';

export default function handler(req: VercelLikeRequest, res: VercelLikeResponse<TriageResolveResponse>): void {
  setJsonContentType(res);

  const rawBody = parseRequestBody(req.body);
  const payload = (rawBody && typeof rawBody === 'object'
    ? (rawBody as Partial<TriageResolveRequest>)
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

  if (!isTriageResolveRequest(rawBody)) {
    res.status(400).json({
      ok: false,
      traceId,
      error: {
        code: 'INVALID_REQUEST',
        message: 'Payload inválido para execução de triagem.',
      },
    });
    return;
  }

  try {
    const data = executeTriageResolve(rawBody.input);
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
        message: 'Falha ao processar a decisão.',
      },
    });
  }
}
