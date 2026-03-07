import { getServices } from '../../../domain/flows/selectors';
import type { Service } from '../../../types';
import {
  isNetworkServicesResponse,
  type NetworkServicesRequest,
} from '../../../server/contracts/network';

const NETWORK_SERVICES_API_PATH = '/api/network/services';
const REQUEST_TIMEOUT_MS = 3000;

const isNetworkApiEnabled = (): boolean => {
  return import.meta.env.VITE_FEATURE_NETWORK_API === 'true';
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

const runLocalFallback = (): Service[] => {
  return getServices();
};

export async function loadNetworkServicesWithFacade(): Promise<Service[]> {
  if (!isNetworkApiEnabled() || typeof fetch !== 'function') {
    return runLocalFallback();
  }

  const requestPayload: NetworkServicesRequest = {
    traceId: createTraceId(),
  };

  try {
    const response = await fetchWithTimeout(NETWORK_SERVICES_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      return runLocalFallback();
    }

    const responseBody = (await response.json()) as unknown;
    if (!isNetworkServicesResponse(responseBody) || !responseBody.ok) {
      return runLocalFallback();
    }

    return responseBody.data;
  } catch {
    return runLocalFallback();
  }
}
