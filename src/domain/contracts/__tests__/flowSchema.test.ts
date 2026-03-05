import { describe, expect, it } from 'vitest';
import { FlowFileSchema, validateFlowFile } from '../flowSchema.zod';

describe('flowSchema.zod', () => {
  it('accepts valid flow file shape', () => {
    const validFlow = {
      meta: {
        id: 'flow_teste',
        title: 'Fluxo de teste',
        type: 'standard',
        categoryId: 'saude_emocional',
        subcategoryId: 'ansiedade',
        keywords: [],
      },
      questions: [
        {
          id: 'q1',
          text: 'Pergunta?',
          options: [{ label: 'Sim', level: 'alto' }],
        },
      ],
      results: {
        alto: {
          severity: 'alto',
          primaryService: null,
          secondaryService: null,
          schoolActions: ['Acionar rede'],
        },
      },
    };

    expect(() => FlowFileSchema.parse(validFlow)).not.toThrow();
  });

  it('rejects flow without questions', () => {
    const invalidFlow = {
      meta: {
        id: 'flow_teste',
        title: 'Fluxo de teste',
        type: 'standard',
        categoryId: 'saude_emocional',
        subcategoryId: 'ansiedade',
        keywords: [],
      },
      questions: [],
      results: {},
    };

    expect(() => validateFlowFile(invalidFlow, 'flow_teste.json')).toThrow(/at least one question/i);
  });
});
