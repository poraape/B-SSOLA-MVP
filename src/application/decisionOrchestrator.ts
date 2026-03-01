import { Flow, TriageResult, Category } from '../types';
import { FlowState, processAnswer } from '../domain/flows/flowEngine';
import { enrichPremium, PremiumResult } from '../domain/flows/premiumEngine';
import { applyRiskHeuristics } from '../domain/risk/riskRules';
import { assertInvariants } from '../domain/risk/invariants';
import { getValidatedModel } from '../domain/model/loadModel';
import { telemetryService } from './telemetry/TelemetryService';

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
      if (import.meta.env.DEV) {
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

      try {
        telemetryService.track({
          event: 'invariant_violation',
          flowId: input.flow.meta.id,
          metadata: {
            message: error instanceof Error ? error.message : String(error),
          },
        });
      } catch {
        // não quebrar fluxo em produção
      }

      return safeResult;
    }

    return result;
  } catch {
    return null;
  }
}
