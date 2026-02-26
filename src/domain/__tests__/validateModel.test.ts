import { describe, it, expect } from 'vitest';
import { validateModel } from '../model/validateModel';

describe('Model Validation', () => {
  it('deve lançar erro se categoryId inexistente', () => {
    const model: any = {
      version: '1.0.0',
      categories: [],
      services: [],
      flows: [
        {
          meta: { id: 'flow1', categoryId: 'nao_existe', type: 'standard' },
          results: {},
        },
      ],
    };

    expect(() => validateModel(model)).toThrow();
  });
});
