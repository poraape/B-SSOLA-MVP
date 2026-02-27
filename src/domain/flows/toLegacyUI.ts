import type { Flow } from "../../types";
import type { OutcomeV2, RiskLevelV2 } from "./flowSpecV2";
import type { FlowRuntimeV2 } from "./runtimeV2";

type LegacyFlowType = Flow["meta"]["type"];

function typeFromRuntime(runtime: FlowRuntimeV2): LegacyFlowType {
  if (runtime.meta.categoryId === "emergencias_seguranca") {
    if (
      runtime.meta.subcategoryId === "emergencia_medica" ||
      runtime.meta.subcategoryId === "convulsao_perda_consciencia"
    ) {
      return "medical_emergency";
    }
    return "security_emergency";
  }

  if (runtime.meta.severity === "CRITICAL" && runtime.meta.categoryId === "saude_bem_estar") {
    return "medical_emergency";
  }

  return "standard";
}

function riskToLegacyLevel(riskLevel: RiskLevelV2): string {
  if (riskLevel === "CRITICAL") return "iminente";
  if (riskLevel === "HIGH") return "alto";
  return "moderado";
}

function buildResult(outcome: OutcomeV2) {
  const level = riskToLegacyLevel(outcome.riskLevel);

  return {
    level,
    severity: level,
    primaryService: null,
    secondaryService: null,
    schoolActions: outcome.actions,
    summaryTag: outcome.label,
  };
}

export function toLegacyFlow(runtime: FlowRuntimeV2): Flow {
  const questionSteps = runtime.steps.filter(step => step.type === "question");

  const triageQuestions: Flow["triage"]["questions"] = questionSteps.map(step => ({
    id: step.id,
    text: step.question || "",
    options: step.actions.map(action => {
      const outcome = runtime.outcomeById.get(action.next);

      if (outcome) {
        return {
          label: action.label,
          level: riskToLegacyLevel(outcome.riskLevel),
        };
      }

      if (action.next.startsWith("flow_")) {
        return {
          label: action.label,
          nextFlow: action.next,
        };
      }

      return {
        label: action.label,
        next: action.next,
      };
    }),
  }));

  const results: Flow["results"] = {};

  runtime.outcomes.forEach(outcome => {
    const level = riskToLegacyLevel(outcome.riskLevel);
    const key = results[level] ? `${level}_${outcome.id}` : level;
    results[key] = buildResult(outcome);
  });

  const usedLevels = Object.keys(results);

  return {
    meta: {
      id: runtime.meta.id,
      categoryId: runtime.meta.categoryId,
      subcategoryId: runtime.meta.subcategoryId,
      subcategory: runtime.meta.subcategoryId,
      severity: runtime.meta.severity,
      type: typeFromRuntime(runtime),
      title: runtime.meta.title,
      keywords: runtime.meta.keywords,
    },
    riskModel: {
      usedLevels,
      defaultLevel: riskToLegacyLevel(runtime.risk.baselineSeverity),
    },
    triage: {
      maxQuestions: triageQuestions.length,
      questions: triageQuestions,
    },
    results,
  };
}

