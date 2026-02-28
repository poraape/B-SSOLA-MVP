import { describe, expect, it } from "vitest";
import { flowRegistry } from "../../registry/flowRegistry";
import { buildRuntimeV2ById } from "../flows/runtimeV2";

describe("flowRegistry sanity", () => {
  it("contains expected deterministic count and unique keys", () => {
    const keys = Object.keys(flowRegistry);
    expect(keys.length).toBe(39);
    expect(new Set(keys).size).toBe(39);
  });

  it("contains no empty flow specs and meta.id matches key", () => {
    for (const [id, spec] of Object.entries(flowRegistry)) {
      expect(spec.meta.id).toBe(id);
      expect(spec.steps.length).toBeGreaterThan(0);
      expect(spec.outcomes.length).toBeGreaterThan(0);
    }
  });

  it("builds runtime for every registered flow id", () => {
    for (const id of Object.keys(flowRegistry)) {
      const runtime = buildRuntimeV2ById(id);
      expect(runtime.specId).toBe(id);
      expect(runtime.steps.length).toBeGreaterThan(0);
    }
  });
});

