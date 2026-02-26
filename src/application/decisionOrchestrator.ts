import { Flow, TriageResult, Category } from '../types';
import { FlowState, processAnswer } from '../domain/flows/flowEngine';
import { enrichPremium, PremiumResult } from '../domain/flows/premiumEngine';
import { applyRiskHeuristics } from '../domain/risk/riskRules';
import { getValidatedModel } from '../domain/model/loadModel';

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
    return processAnswer(input.flow, input.state, input.questionId, input.optionLabel);
  }

  return enrichPremium(input.result, input.flow, input.category, input.guardrailTriggered);
}
