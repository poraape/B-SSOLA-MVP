import { describe, it, expect } from 'vitest';
import { validateModel } from '../model/validateModel';

function createValidModel(): any {
  return {
    version: '1.0.0',
    meta: { appName: 'Teste' },
    categories: [{ id: 'cat1', label: 'Categoria 1', riskGroup: 'social' }],
    services: [{ id: 'svc1', name: 'Serviço 1' }],
    flows: [
      {
        meta: {
          id: 'flow1',
          title: 'Fluxo 1',
          type: 'standard',
          categoryId: 'cat1',
        },
        questions: [],
        results: {
          low: {
            severity: 'baixa',
            schoolActions: ['Ação 1'],
            primaryService: 'svc1',
          },
        },
      },
    ],
  };
}

describe('Model Validation', () => {
  it('deve lançar erro se categoryId inexistente', () => {
    const model = createValidModel();
    model.flows[0].meta.categoryId = 'nao_existe';

    expect(() => validateModel(model)).toThrow();
  });

  it('deve lançar erro para version inválida', () => {
    const model = { ...createValidModel(), version: '2.0.0' };

    expect(() => validateModel(model)).toThrow(
      'Modelo versão 2.0.0 incompatível com app (suporta ^1.0.0)'
    );
  });

  it('deve lançar erro para service id duplicado', () => {
    const model = createValidModel();
    model.services = [...model.services, { id: 'svc1', name: 'Serviço duplicado' }];

    expect(() => validateModel(model)).toThrow('Model inválido: service id duplicado: svc1');
  });

  it('deve lançar erro para service sem name', () => {
    const model = createValidModel();
    model.services = [{ id: 'svc1', name: '' }];

    expect(() => validateModel(model)).toThrow('Model inválido: service svc1 com name ausente.');
  });

  it('deve lançar erro para category sem label', () => {
    const model = createValidModel();
    model.categories = [{ id: 'cat1', label: '' }];

    expect(() => validateModel(model)).toThrow('Model inválido: category cat1 com label ausente.');
  });

  it('deve lançar erro para flow.meta sem title', () => {
    const model = createValidModel();
    model.flows = [
      {
        ...model.flows[0],
        meta: {
          ...model.flows[0].meta,
          title: '',
        },
      },
    ];

    expect(() => validateModel(model)).toThrow('Model inválido: flow flow1 com meta.title ausente.');
  });
});
