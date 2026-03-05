import { describe, expect, it } from 'vitest';
import type { Flow } from '../../../types';
import type { PremiumResult } from '../../flows/premiumEngine';
import { computeRiskScore, minPriorityForScore } from '../riskScore';

const baseFlow: Flow = {
  meta: {
    id: 'flow_test_risk',
    categoryId: 'emergencias_seguranca',
    subcategory: 'incendio_evacuacao',
    type: 'medical_emergency',
    title: 'Flow de teste de risco',
    keywords: [],
  },
  riskModel: {
    usedLevels: ['moderado', 'alto', 'iminente'],
    defaultLevel: 'moderado',
  },
  triage: {
    maxQuestions: 1,
    questions: [],
  },
  results: {},
};

const baseResult: PremiumResult = {
  severity: 'baixo',
  priority: 'low',
  notifyManagement: false,
  primaryService: null,
  secondaryService: null,
  schoolActions: [],
  institutionalScript: [],
};

describe('riskScore - computeRiskScore()', () => {
  it('adds severity, emergency type and ui flags factors', () => {
    const breakdown = computeRiskScore(
      {
        ...baseResult,
        severity: 'alto',
        uiFlags: { showGuardrail: true, confidential: true, avoidRetraumatization: true },
      },
      baseFlow,
    );

    expect(breakdown.total).toBe(10);
    expect(breakdown.factors.map(f => f.code)).toEqual(
      expect.arrayContaining([
        'SEVERITY_alto',
        'FLOW_MEDICAL_EMERGENCY',
        'RISK_GROUP_emergency',
        'FLAG_SHOW_GUARDRAIL',
        'FLAG_CONFIDENTIAL',
        'FLAG_AVOID_RETRAUMATIZATION',
      ]),
    );
  });

  it('falls back to unknown severity baseline and respects hard cap', () => {
    const breakdown = computeRiskScore(
      {
        ...baseResult,
        severity: 'invalido',
      },
      baseFlow,
    );

    expect(breakdown.factors.map(f => f.code)).toContain('SEVERITY_invalido');
    expect(breakdown.total).toBeLessThanOrEqual(100);
  });
});

describe('riskScore - minPriorityForScore()', () => {
  it('maps thresholds correctly', () => {
    expect(minPriorityForScore(2)).toBe('low');
    expect(minPriorityForScore(3)).toBe('moderate');
    expect(minPriorityForScore(5)).toBe('high');
    expect(minPriorityForScore(8)).toBe('critical');
  });
});
