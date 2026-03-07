import { FlowState, processAnswer } from '../domain/flows/flowEngine';
import { enrichPremium, PremiumResult } from '../domain/flows/premiumEngine';
import { getValidatedModel } from '../domain/model/loadModel';
import { assertInvariants } from '../domain/risk/invariants';
import { applyRiskHeuristics } from '../domain/risk/riskRules';
import { Flow, TriageResult, Category } from '../types';

export type FlowInput =
  | {
      mode: 'flow';
      flow: Flow;
      state: FlowState;
      questionId: string;
      optionLabel: string;
    }
  | {
      mode: 'result';
      result: TriageResult | null;
      flow: Flow;
      category?: Category;
      guardrailTriggered?: boolean;
    };

type InvariantViolationTelemetryPayload = {
  event: 'invariant_violation';
  flowId: string;
  metadata: { message: string };
};

function isDevelopmentRuntime(): boolean {
  const nodeEnv =
    globalThis &&
    typeof globalThis === 'object' &&
    'process' in globalThis &&
    typeof globalThis.process === 'object' &&
    globalThis.process !== null &&
    'env' in globalThis.process &&
    typeof globalThis.process.env === 'object' &&
    globalThis.process.env !== null &&
    'NODE_ENV' in globalThis.process.env
      ? String(globalThis.process.env.NODE_ENV)
      : '';

  return nodeEnv === 'development' || nodeEnv === 'test';
}

function trackInvariantViolation(payload: InvariantViolationTelemetryPayload): void {
  if (typeof window === 'undefined') return;

  void import('./telemetry/TelemetryService')
    .then(({ telemetryService }) => {
      telemetryService.track(payload);
    })
    .catch(() => {
      // telemetria nunca pode interromper a decisão
    });
}

/**
 * Orquestra a execução do fluxo (resposta de pergunta) e o pós-processamento de resultado.
 * @param input - Payload de execução em modo `flow` ou `result`.
 * @returns Próximo estado do fluxo, resultado premium enriquecido ou `null` em falha segura.
 */
export function runDecision(input: FlowInput): FlowState | PremiumResult | null {
  // Garante que o modelo carregado continue passando pelo pipeline validado atual.
  const model = getValidatedModel();
  void model;
  void applyRiskHeuristics;

  if (input.mode === 'flow') {
    try {
      return processAnswer(input.flow, input.state, input.questionId, input.optionLabel);
    } catch {
      return null;
    }
  }

  try {
    const result = enrichPremium(input.result, input.flow, input.category, input.guardrailTriggered);

    if (!result) {
      return null;
    }

    try {
      assertInvariants(result);
    } catch (error) {
      if (isDevelopmentRuntime()) {
        throw error;
      }

      const normalizedPriority =
        result.priority === 'critical' || result.priority === 'high'
          ? result.priority
          : 'high';
      const safeResult: PremiumResult = {
        ...result,
        priority: normalizedPriority,
      };

      trackInvariantViolation({
        event: 'invariant_violation',
        flowId: input.flow.meta.id,
        metadata: {
          message: error instanceof Error ? error.message : String(error),
        },
      });

      return safeResult;
    }

    return result;
  } catch {
    return null;
  }
}
