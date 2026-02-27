import { describe, expect, it } from "vitest";
import { flow_abuso_sexual } from "../flows/flow_abuso_sexual";
import { flow_bullying } from "../flows/flow_bullying";
import { flow_febre } from "../flows/flow_febre";
import { buildRuntimeV2 } from "../flows/runtimeV2";
import { toLegacyFlow } from "../flows/toLegacyUI";
import type { FlowSpecV2, RiskLevelV2 } from "../flows/flowSpecV2";

function expectedLevel(riskLevel: RiskLevelV2): string {
  if (riskLevel === "CRITICAL") return "iminente";
  if (riskLevel === "HIGH") return "alto";
  return "moderado";
}

describe("runtime V2 adapter to legacy UI", () => {
  const specs: FlowSpecV2[] = [flow_abuso_sexual, flow_bullying, flow_febre];

  it("keeps UI-required fields and deterministic risk mapping", () => {
    for (const spec of specs) {
      const runtime = buildRuntimeV2(spec);
      const legacy = toLegacyFlow(runtime);

      expect(legacy.meta.id).toBe(spec.meta.id);
      expect(legacy.meta.categoryId).toBe(spec.meta.categoryId);
      expect(legacy.meta.subcategory).toBe(spec.meta.subcategoryId);
      expect(Array.isArray(legacy.triage.questions)).toBe(true);
      expect(legacy.triage.maxQuestions).toBe(legacy.triage.questions.length);
      expect(legacy.riskModel.defaultLevel).toBe(expectedLevel(spec.risk.baselineSeverity));

      for (const q of legacy.triage.questions) {
        expect(q.text).toBeTruthy();
        expect(q.text).not.toBe("undefined");
      }

      const resultValues = Object.values(legacy.results);
      expect(resultValues.length).toBeGreaterThan(0);

      for (const result of resultValues) {
        expect(result.summaryTag).toBeTruthy();
        expect(result.schoolActions).toBeTruthy();
      }

      for (const outcome of spec.outcomes) {
        const mapped = resultValues.find(result => result.summaryTag === outcome.label);
        expect(mapped).toBeDefined();
        expect(mapped?.level).toBe(expectedLevel(outcome.riskLevel));
      }
    }
  });
});
