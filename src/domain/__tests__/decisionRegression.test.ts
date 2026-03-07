import { describe, it, expect } from 'vitest';
import { applyRiskHeuristics } from '../risk/riskRules';
import type { PremiumResult } from '../flows/premiumEngine';
import { emergencyFlow, emergencyResult } from './fixtures/emergencyMedical.fixture';
import { baselineFlow, baselineResult } from './fixtures/baseline.fixture';

describe('Decision Regression Tests (P0/P1)', () => {
  it('P0: medical emergency must elevate priority to at least high', () => {
    const result = applyRiskHeuristics(
      { ...emergencyResult },
      emergencyFlow
    );

    expect(['high', 'critical']).toContain(result.priority);
  });

  it('P0: medical emergency must force notifyManagement', () => {
    const result = applyRiskHeuristics(
      { ...emergencyResult },
      emergencyFlow
    );

    expect(result.notifyManagement).toBe(true);
  });

  it('P0: critical priority must force notifyManagement', () => {
    const critical: PremiumResult = {
      ...emergencyResult,
      priority: 'critical'
    };

    const result = applyRiskHeuristics(
      critical,
      emergencyFlow
    );

    expect(result.notifyManagement).toBe(true);
  });

  it('P1: standard baseline must remain low if no rule applies', () => {
    const result = applyRiskHeuristics(
      { ...baselineResult },
      baselineFlow
    );

    expect(result.priority).toBe('low');
    expect(result.notifyManagement).toBe(false);
  });

  it('P1: appliedRules should register rule codes when applied', () => {
    const result = applyRiskHeuristics(
      { ...emergencyResult },
      emergencyFlow
    );

    expect(result.appliedRules?.length).toBeGreaterThan(0);
  });
});
