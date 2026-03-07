import type { NetworkServicesRequest, NetworkServicesResponse } from '../../src/server/contracts/network';
import { isNetworkServicesRequest } from '../../src/server/contracts/network';
import { executeNetworkServices } from '../../src/server/services/networkService';
import {
  getTraceId,
  parseRequestBody,
  setJsonContentType,
  type VercelLikeRequest,
  type VercelLikeResponse,
} from '../../src/server/utils/http';

export default function handler(req: VercelLikeRequest, res: VercelLikeResponse<NetworkServicesResponse>): void {
  setJsonContentType(res);

  const rawBody = parseRequestBody(req.body);
  const payload = (rawBody && typeof rawBody === 'object'
    ? (rawBody as Partial<NetworkServicesRequest>)
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

  if (!isNetworkServicesRequest(rawBody)) {
    res.status(400).json({
      ok: false,
      traceId,
      error: {
        code: 'INVALID_REQUEST',
        message: 'Payload inválido para consulta de rede.',
      },
    });
    return;
  }

  try {
    const data = executeNetworkServices();
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
        message: 'Falha ao carregar serviços da rede.',
      },
    });
  }
}
