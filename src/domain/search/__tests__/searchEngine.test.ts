import { describe, expect, it } from 'vitest';
import { searchFlows } from '../searchEngine';
import type { Category, Flow } from '../../../types';

function createFlow(overrides?: Partial<Flow>): Flow {
  return {
    meta: {
      id: 'flow_febre',
      categoryId: 'saude_bem_estar',
      subcategory: 'Febre',
      type: 'standard',
      title: 'Febre e mal-estar',
      keywords: ['temperatura', 'infeccao'],
      ...overrides?.meta,
    },
    riskModel: { usedLevels: ['LOW'], defaultLevel: 'LOW' },
    triage: { maxQuestions: 0, questions: [] },
    results: {},
    ...overrides,
  };
}

describe('searchFlows', () => {
  const categories: Category[] = [
    {
      id: 'saude_bem_estar',
      label: 'Saúde e Bem-Estar',
      riskGroup: 'medical',
      icon: 'heart',
      subcategories: [],
    },
  ];

  it('returns empty when term is empty or too short', () => {
    const flows = [createFlow()];
    expect(searchFlows(flows, categories, '')).toEqual([]);
    expect(searchFlows(flows, categories, 'a')).toEqual([]);
  });

  it('matches by title, keyword, category label and subcategory', () => {
    const flow = createFlow();
    const flows = [flow];

    expect(searchFlows(flows, categories, 'mal-estar')).toHaveLength(1);
    expect(searchFlows(flows, categories, 'temperatura')).toHaveLength(1);
    expect(searchFlows(flows, categories, 'Bem-Estar')).toHaveLength(1);
    expect(searchFlows(flows, categories, 'Febre')).toHaveLength(1);
  });

  it('returns empty when there is no match', () => {
    const flows = [createFlow()];
    expect(searchFlows(flows, categories, 'violencia')).toEqual([]);
  });
});
