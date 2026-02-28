import { describe, expect, it } from 'vitest';
import { computeRiskScore, minPriorityForScore } from '../risk/riskScore';
import { emergencyFlow, emergencyResult } from './fixtures/emergencyMedical.fixture';
import { baselineFlow, baselineResult } from './fixtures/baseline.fixture';

describe('riskScore', () => {
  it('computes deterministic baseline score with default severity fallback', () => {
    const breakdown = computeRiskScore({ ...baselineResult }, baselineFlow);

    expect(breakdown.total).toBe(1);
    expect(breakdown.factors.map(f => f.code)).toContain('SEVERITY_baixo');
  });

  it('adds emergency and ui flag factors', () => {
    const breakdown = computeRiskScore(
      {
        ...emergencyResult,
        severity: 'alto',
        uiFlags: { showGuardrail: true, confidential: true, avoidRetraumatization: true }
      },
      emergencyFlow
    );

    expect(breakdown.total).toBeGreaterThanOrEqual(7);
    expect(breakdown.factors.map(f => f.code)).toContain('FLOW_MEDICAL_EMERGENCY');
    expect(breakdown.factors.map(f => f.code)).toContain('FLAG_SHOW_GUARDRAIL');
  });

  it('maps score thresholds to minimum priority', () => {
    expect(minPriorityForScore(2)).toBe('low');
    expect(minPriorityForScore(3)).toBe('moderate');
    expect(minPriorityForScore(5)).toBe('high');
    expect(minPriorityForScore(8)).toBe('critical');
  });
});
