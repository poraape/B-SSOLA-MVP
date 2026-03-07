import type { FlowInput } from '../../application/decisionOrchestrator';
import type { FlowState } from '../../domain/flows/flowEngine';
import type { PremiumResult } from '../../domain/flows/premiumEngine';

export type TriageResolveOutput = FlowState | PremiumResult | null;

export interface TriageResolveRequest {
  traceId?: string;
  input: FlowInput;
}

interface TriageResolveError {
  code: 'METHOD_NOT_ALLOWED' | 'INVALID_REQUEST' | 'INTERNAL_ERROR';
  message: string;
}

export type TriageResolveResponse =
  | {
      ok: true;
      traceId: string;
      data: TriageResolveOutput;
    }
  | {
      ok: false;
      traceId: string;
      error: TriageResolveError;
    };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isTriageErrorCode = (value: unknown): value is TriageResolveError['code'] => {
  return value === 'METHOD_NOT_ALLOWED' || value === 'INVALID_REQUEST' || value === 'INTERNAL_ERROR';
};

const isFlowModeInput = (value: Record<string, unknown>): boolean => {
  return (
    value.mode === 'flow' &&
    isRecord(value.flow) &&
    isRecord(value.state) &&
    typeof value.questionId === 'string' &&
    typeof value.optionLabel === 'string'
  );
};

const isResultModeInput = (value: Record<string, unknown>): boolean => {
  if (value.mode !== 'result' || !isRecord(value.flow)) {
    return false;
  }

  if (value.result !== undefined && value.result !== null && !isRecord(value.result)) {
    return false;
  }

  if (value.category !== undefined && value.category !== null && !isRecord(value.category)) {
    return false;
  }

  if (
    value.guardrailTriggered !== undefined &&
    value.guardrailTriggered !== null &&
    typeof value.guardrailTriggered !== 'boolean'
  ) {
    return false;
  }

  return true;
};

export const isTriageResolveRequest = (value: unknown): value is TriageResolveRequest => {
  if (!isRecord(value)) return false;
  if (value.traceId !== undefined && typeof value.traceId !== 'string') return false;
  if (!isRecord(value.input)) return false;

  return isFlowModeInput(value.input) || isResultModeInput(value.input);
};

export const isTriageResolveResponse = (value: unknown): value is TriageResolveResponse => {
  if (!isRecord(value)) return false;
  if (value.ok === true) {
    return typeof value.traceId === 'string' && 'data' in value && value.data !== undefined;
  }
  if (value.ok === false) {
    return (
      typeof value.traceId === 'string' &&
      isRecord(value.error) &&
      isTriageErrorCode(value.error.code) &&
      typeof value.error.message === 'string'
    );
  }
  return false;
};
