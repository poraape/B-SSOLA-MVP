import type {
  EscalationRuleV2,
  FlowSpecV2,
  OutcomeV2,
  RiskLevelV2,
} from "../contracts/flowSpecV2";
import { flowRegistry } from "../../registry/flowRegistry";

export type RuntimeStep = {
  id: string;
  type: "question" | "alert" | "decision" | "action";
  content?: string;
  action?: string;
  question?: string;
  actions: Array<{ label: string; next: string }>;
  riskSignals: string[];
};

export interface FlowRuntimeV2 {
  specId: string;
  meta: FlowSpecV2["meta"];
  risk: FlowSpecV2["risk"];
  steps: RuntimeStep[];
  outcomes: OutcomeV2[];
  initialStepId: string;
  stepById: Map<string, RuntimeStep>;
  outcomeById: Map<string, OutcomeV2>;
}

const hasAllSignals = (required: readonly string[] | undefined, detected: Set<string>): boolean => {
  if (!required || required.length === 0) return true;
  return required.every(signal => detected.has(signal));
};

const hasAnySignal = (required: readonly string[] | undefined, detected: Set<string>): boolean => {
  if (!required || required.length === 0) return true;
  return required.some(signal => detected.has(signal));
};

export function applyEscalationRules(
  baselineSeverity: RiskLevelV2,
  detectedSignals: readonly string[],
  escalationRules: readonly EscalationRuleV2[]
): RiskLevelV2 {
  const detected = new Set(detectedSignals);
  const defaultRule = escalationRules.find(rule => rule.id === "rule_default");

  if (!defaultRule) {
    throw new Error("FlowSpecV2 invalido: regra obrigatoria \"rule_default\" ausente.");
  }

  const matchingRule = escalationRules.find(rule => {
    if (rule.id === "rule_default") return false;
    return hasAllSignals(rule.ifAll, detected) && hasAnySignal(rule.ifAny, detected);
  });

  return matchingRule?.then.riskLevel || defaultRule.then.riskLevel || baselineSeverity;
}

export function buildRuntimeV2(spec: FlowSpecV2): FlowRuntimeV2 {
  const stepById = new Map<string, RuntimeStep>();
  const outcomeById = new Map<string, OutcomeV2>();

  const steps: RuntimeStep[] = spec.steps.map(step => {
    if (!Array.isArray(step.riskSignals)) {
      throw new Error(`FlowSpecV2 "${spec.meta.id}" invalido: step "${step.id}" sem riskSignals.`);
    }

    const actions = step.actions ? [...step.actions] : [];
    if (step.type === "question" && actions.length === 0) {
      throw new Error(`FlowSpecV2 "${spec.meta.id}" invalido: question "${step.id}" sem actions.`);
    }

    const runtimeStep: RuntimeStep = {
      id: step.id,
      type: step.type,
      content: step.content,
      action: step.action,
      question: step.question,
      actions,
      riskSignals: [...step.riskSignals],
    };

    stepById.set(runtimeStep.id, runtimeStep);
    return runtimeStep;
  });

  spec.outcomes.forEach(outcome => {
    outcomeById.set(outcome.id, outcome);
  });

  if (steps.length === 0) {
    throw new Error(`FlowSpecV2 \"${spec.meta.id}\" invalido: nao ha steps.`);
  }

  return {
    specId: spec.meta.id,
    meta: spec.meta,
    risk: spec.risk,
    steps,
    outcomes: [...spec.outcomes],
    initialStepId: steps[0].id,
    stepById,
    outcomeById,
  };
}

export function buildRuntimeV2ById(flowId: string): FlowRuntimeV2 {
  const spec = flowRegistry[flowId];
  if (!spec) {
    throw new Error(`FlowSpecV2 "${flowId}" nao encontrado no flowRegistry.`);
  }
  return buildRuntimeV2(spec as FlowSpecV2);
}

export function getInitialStep(runtime: FlowRuntimeV2): RuntimeStep {
  const step = runtime.stepById.get(runtime.initialStepId);
  if (!step) {
    throw new Error(`RuntimeV2 invalido: initialStepId \"${runtime.initialStepId}\" nao encontrado.`);
  }
  return step;
}

export function resolveNext(
  runtime: FlowRuntimeV2,
  currentStepId: string,
  answer: string
): { nextStep?: RuntimeStep; outcome?: OutcomeV2; finalRiskLevel: RiskLevelV2 } {
  const currentStep = runtime.stepById.get(currentStepId);
  if (!currentStep) {
    throw new Error(`Step atual \"${currentStepId}\" nao encontrado.`);
  }

  const detectedSignals = [...currentStep.riskSignals];

  if (currentStep.type !== "question") {
    const finalRiskLevel = applyEscalationRules(
      runtime.risk.baselineSeverity,
      detectedSignals,
      runtime.risk.escalationRules
    );

    return { nextStep: currentStep, finalRiskLevel };
  }

  const selectedAction = currentStep.actions.find(
    action => action.label === answer || action.next === answer
  );

  if (!selectedAction) {
    throw new Error(`Resposta \"${answer}\" nao encontrada no step \"${currentStepId}\".`);
  }

  const nextStep = runtime.stepById.get(selectedAction.next);
  if (nextStep) {
    detectedSignals.push(...nextStep.riskSignals);
  }

  const outcome = runtime.outcomeById.get(selectedAction.next);
  const finalRiskLevel = applyEscalationRules(
    runtime.risk.baselineSeverity,
    detectedSignals,
    runtime.risk.escalationRules
  );

  return { nextStep, outcome, finalRiskLevel };
}

