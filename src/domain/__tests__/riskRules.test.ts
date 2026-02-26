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
  });
});
