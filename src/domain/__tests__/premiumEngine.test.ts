import { describe, it, expect } from 'vitest';
import { enrichPremium } from '../flows/premiumEngine';

describe('Premium Engine', () => {
  it('deve gerar prioridade baseada em level', () => {
    const result: any = {
      level: 'CRITICAL',
      severity: 'alta',
      schoolActions: [],
      primaryService: null,
      secondaryService: null,
    };

    const flow: any = {
      meta: {
        type: 'standard',
        categoryId: 'categoria_teste',
      },
    };

    const enriched = enrichPremium(result, flow);

    expect(enriched?.priority).toBe('high');
  });
});
