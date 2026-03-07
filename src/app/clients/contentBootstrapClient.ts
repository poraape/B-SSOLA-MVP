import mapTilesConfig from '../../data/v2/map-tiles.json';
import { loadModel } from '../../domain/model/loadModel';
import {
  isContentBootstrapResponse,
  type ContentBootstrapPayload,
  type ContentBootstrapRequest,
} from '../../server/contracts/contentBootstrap';

const CONTENT_BOOTSTRAP_API_PATH = '/api/content/bootstrap';
const REQUEST_TIMEOUT_MS = 3000;

const isContentBootstrapApiEnabled = (): boolean => {
  return import.meta.env.VITE_FEATURE_CONTENT_BOOTSTRAP_API === 'true';
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

const loadLocalBootstrap = (): ContentBootstrapPayload => {
  const model = loadModel();
  return {
    model: {
      version: model.version,
      meta: model.meta,
      uiConfig: model.uiConfig,
      searchConfig: model.searchConfig,
      institution: {
        name: model.institution.name,
      },
    },
    network: {
      tileUrl: mapTilesConfig.tileUrl,
      attributionHtml: mapTilesConfig.attributionHtml,
    },
  };
};

export async function loadContentBootstrapWithFacade(): Promise<ContentBootstrapPayload> {
  if (!isContentBootstrapApiEnabled() || typeof fetch !== 'function') {
    return loadLocalBootstrap();
  }

  const requestPayload: ContentBootstrapRequest = {
    traceId: createTraceId(),
  };

  try {
    const response = await fetchWithTimeout(CONTENT_BOOTSTRAP_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      return loadLocalBootstrap();
    }

    const responseBody = (await response.json()) as unknown;
    if (!isContentBootstrapResponse(responseBody) || !responseBody.ok) {
      return loadLocalBootstrap();
    }

    return responseBody.data;
  } catch {
    return loadLocalBootstrap();
  }
}
