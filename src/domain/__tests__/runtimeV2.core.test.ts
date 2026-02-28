import { describe, expect, it } from "vitest";
import type { FlowSpecV2 } from "../contracts/flowSpecV2";
import { applyEscalationRules, buildRuntimeV2, buildRuntimeV2ById, resolveNext } from "../flows/runtimeV2";

const baseSpec: FlowSpecV2 = {
  meta: {
    id: "flow_runtime_core_test",
    categoryId: "convivencia_conflitos",
    subcategoryId: "bullying",
    title: "Runtime Core Test",
    description: "Sanity runtime",
    severity: "MODERATE",
    keywords: ["runtime"],
    status: "EXISTING",
  },
  risk: {
    modelVersion: "risk-heuristic-v1",
    baselineSeverity: "MODERATE",
    escalationRules: [
      {
        id: "rule_escalate",
        ifAny: ["signal_escalate"],
        then: { riskLevel: "HIGH" },
        rationale: "Escalate on signal",
      },
      {
        id: "rule_default",
        then: { riskLevel: "MODERATE" },
        rationale: "Default",
      },
    ],
    protectiveFactors: [],
    riskSignals: [],
    recommendedActionsByRisk: { MODERATE: [], HIGH: [], CRITICAL: [] },
    recommendedServiceTagsByRisk: { MODERATE: [], HIGH: [], CRITICAL: [] },
  },
  steps: [
    {
      id: "q1",
      type: "question",
      question: "Pergunta?",
      actions: [{ label: "Sim", next: "o1" }],
      riskSignals: ["signal_escalate"],
    },
  ],
  outcomes: [
    {
      id: "o1",
      label: "Outcome 1",
      description: "Done",
      actions: ["A"],
      timeline: "Imediato",
      riskLevel: "MODERATE",
      flags: [],
    },
  ],
};

describe("runtimeV2 core hardening", () => {
  it("escalates by matching rule and falls back to default", () => {
    expect(applyEscalationRules("MODERATE", ["signal_escalate"], baseSpec.risk.escalationRules)).toBe("HIGH");
    expect(applyEscalationRules("MODERATE", [], baseSpec.risk.escalationRules)).toBe("MODERATE");
  });

  it("throws when default rule is missing", () => {
    expect(() =>
      applyEscalationRules("MODERATE", [], [
        {
          id: "rule_only",
          then: { riskLevel: "HIGH" },
          rationale: "No default",
        },
      ])
    ).toThrow("rule_default");
  });

  it("throws for question step without actions", () => {
    const invalidSpec: FlowSpecV2 = {
      ...baseSpec,
      meta: { ...baseSpec.meta, id: "flow_runtime_invalid_actions" },
      steps: [
        {
          id: "q1",
          type: "question",
          question: "Pergunta?",
          riskSignals: [],
        },
      ],
    };

    expect(() => buildRuntimeV2(invalidSpec)).toThrow("sem actions");
  });

  it("resolves outcome transitions and final risk", () => {
    const runtime = buildRuntimeV2(baseSpec);
    const result = resolveNext(runtime, "q1", "Sim");
    expect(result.outcome?.id).toBe("o1");
    expect(result.finalRiskLevel).toBe("HIGH");
  });

  it("buildRuntimeV2ById throws for unknown flow id", () => {
    expect(() => buildRuntimeV2ById("flow_missing")).toThrow("nao encontrado");
  });
});

