import { runDecision, type FlowInput } from '../../../application/decisionOrchestrator';
import type { FlowState } from '../../../domain/flows/flowEngine';
import type { PremiumResult } from '../../../domain/flows/premiumEngine';
import {
  isTriageResolveResponse,
  type TriageResolveRequest,
  type TriageResolveOutput,
} from '../../../server/contracts/triage';

const TRIAGE_RESOLVE_API_PATH = '/api/triage/resolve';
const REQUEST_TIMEOUT_MS = 3000;

const isTriageApiEnabled = (): boolean => {
  return (
    import.meta.env.VITE_FEATURE_TRIAGE_API === 'true' ||
    import.meta.env.VITE_FEATURE_DECISION_API === 'true'
  );
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

const runLocalFallback = (input: FlowInput): TriageResolveOutput => {
  return runDecision(input);
};

export async function runTriageWithFacade(
  input: Extract<FlowInput, { mode: 'flow' }>
): Promise<FlowState | null>;
export async function runTriageWithFacade(
  input: Extract<FlowInput, { mode: 'result' }>
): Promise<PremiumResult | null>;
export async function runTriageWithFacade(input: FlowInput): Promise<TriageResolveOutput> {
  if (!isTriageApiEnabled() || typeof fetch !== 'function') {
    return runLocalFallback(input);
  }

  const requestPayload: TriageResolveRequest = {
    traceId: createTraceId(),
    input,
  };

  try {
    const response = await fetchWithTimeout(TRIAGE_RESOLVE_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      return runLocalFallback(input);
    }

    const responseBody = (await response.json()) as unknown;
    if (!isTriageResolveResponse(responseBody) || !responseBody.ok) {
      return runLocalFallback(input);
    }

    return responseBody.data;
  } catch {
    return runLocalFallback(input);
  }
}
