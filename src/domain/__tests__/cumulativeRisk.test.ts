import { describe, it, expect } from 'vitest';
import { applyRiskHeuristics } from '../risk/riskRules';
import { Flow, TriageResult } from '../../types';
import { PremiumResult } from '../flows/premiumEngine';

const baseFlow: Flow = {
  meta: {
    id: 'test_flow',
    categoryId: 'convivencia_conflitos',
    subcategory: 'teste',
    type: 'standard',
    title: 'Teste',
    keywords: []
  },
  riskModel: { usedLevels: ['low', 'moderate', 'high', 'critical'], defaultLevel: 'low' },
  triage: { maxQuestions: 1, questions: [] },
  results: {}
};

function makeResult(
  severity: string,
  flags: NonNullable<TriageResult['uiFlags']> = {},
  priority: 'low' | 'moderate' | 'high' | 'critical' = 'low'
): PremiumResult {
  return {
    severity,
    priority,
    primaryService: null,
    secondaryService: null,
    schoolActions: [],
    notifyManagement: false,
    institutionalScript: [],
    uiFlags: flags
  };
}

describe('Cumulative Risk Heuristics', () => {
  it('severity alto + categoria violencia must force notify (score >= 5)', () => {
    const result = applyRiskHeuristics(
      makeResult('alto'),
      baseFlow
    );

    expect(result.notifyManagement).toBe(true);
    expect(['high', 'critical']).toContain(result.priority);
  });

  it('severity critico must reach at least high', () => {
    const result = applyRiskHeuristics(
      makeResult('critico'),
      baseFlow
    );

    expect(['high', 'critical']).toContain(result.priority);
  });

  it('severity baixo alone must not escalate to high', () => {
    const result = applyRiskHeuristics(
      makeResult('baixo'),
      baseFlow
    );

    expect(['low', 'moderate']).toContain(result.priority);
    expect(result.priority).not.toBe('high');
    expect(result.priority).not.toBe('critical');
  });

  it('showGuardrail contributes but not alone critical', () => {
    const result = applyRiskHeuristics(
      makeResult('moderado', { showGuardrail: true }),
      baseFlow
    );

    expect(result.priority).not.toBe('critical');
  });

  it('score >= 8 should escalate to critical', () => {
    const heavyFlow: Flow = {
      ...baseFlow,
      meta: {
        ...baseFlow.meta,
        type: 'security_emergency'
      }
    };

    const result = applyRiskHeuristics(
      makeResult('iminente', { showGuardrail: true }),
      heavyFlow
    );

    expect(result.priority).toBe('critical');
    expect(result.notifyManagement).toBe(true);
  });
});
