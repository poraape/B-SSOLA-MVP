import { describe, it, expect } from 'vitest';
import { applyRiskHeuristics } from '../risk/riskRules';

describe('Risk Rules', () => {
  it('emergência deve elevar prioridade mínima para high', () => {
    const result: any = {
      priority: 'low',
      notifyManagement: false,
      institutionalScript: [],
    };

    const flow: any = {
      meta: {
        type: 'medical_emergency',
        categoryId: 'categoria_emergencia',
      },
    };

    const adjusted = applyRiskHeuristics(result, flow);

    expect(adjusted.priority).toBe('high');
    expect(adjusted.notifyManagement).toBe(true);
    expect(adjusted.appliedRules).toContain('EMERGENCY_FORCE_HIGH');
  });

  it('prioridade critical deve registrar CRITICAL_FORCE_NOTIFY', () => {
    const adjusted = applyRiskHeuristics(
      { priority: 'critical', institutionalScript: [] } as any,
      { meta: { type: 'standard', categoryId: 'categoria_padrao' } } as any
    );

    expect(adjusted.notifyManagement).toBe(true);
    expect(adjusted.appliedRules).toContain('CRITICAL_FORCE_NOTIFY');
  });

  it('categoria de emergência em fluxo standard deve registrar CATEGORY_EMERGENCY_BUMP', () => {
    const adjusted = applyRiskHeuristics(
      { priority: 'low', institutionalScript: [] } as any,
      { meta: { type: 'standard', categoryId: 'foo_emergencia_bar' } } as any
    );

    expect(adjusted.priority).toBe('moderate');
    expect(adjusted.appliedRules).toContain('CATEGORY_EMERGENCY_BUMP');
  });
});
