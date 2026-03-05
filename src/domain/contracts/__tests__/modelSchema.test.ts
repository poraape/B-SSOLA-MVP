import { describe, expect, it } from 'vitest';
import { validateProtocolModelSchema } from '../modelSchema.zod';

describe('modelSchema.zod', () => {
  it('accepts minimal valid protocol model shape', () => {
    const model = {
      version: '1.0.0',
      meta: { appName: 'App', version: '1.0', scope: 'MVP', guardrailEnabled: true },
      categories: [
        {
          id: 'saude_emocional',
          label: 'Saúde Emocional',
          riskGroup: 'psychosocial',
          icon: 'heart',
          subcategories: [{ id: 'ansiedade', label: 'Ansiedade' }],
        },
      ],
      flows: [
        {
          meta: {
            id: 'flow_teste',
            categoryId: 'saude_emocional',
            subcategory: 'ansiedade',
            type: 'standard',
            title: 'Fluxo Teste',
            keywords: [],
          },
          riskModel: { usedLevels: ['moderado'], defaultLevel: 'moderado' },
          triage: {
            maxQuestions: 1,
            questions: [{ id: 'q1', text: 'Pergunta?', options: [{ label: 'Sim', level: 'alto' }] }],
          },
          results: {
            alto: {
              severity: 'alto',
              primaryService: null,
              secondaryService: null,
              schoolActions: ['Ação'],
            },
          },
        },
      ],
      services: [
        {
          id: 'svc-1',
          name: 'Serviço 1',
          category: 'saude',
          type: 'publico',
          contact: { phone: null },
          location: { address: 'Rua X', lat: null, lng: null },
        },
      ],
    };

    expect(() => validateProtocolModelSchema(model)).not.toThrow();
  });

  it('rejects invalid riskGroup', () => {
    const invalidModel = {
      version: '1.0.0',
      meta: { appName: 'App', version: '1.0', scope: 'MVP', guardrailEnabled: true },
      categories: [{ id: 'c1', label: 'C1', riskGroup: 'invalid', icon: 'i', subcategories: [] }],
      flows: [],
      services: [],
    };

    expect(() => validateProtocolModelSchema(invalidModel)).toThrow(/riskGroup/i);
  });
});
