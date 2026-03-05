import { describe, expect, it, vi } from 'vitest';
import type { Category, Flow } from '../../../../types';

const flowsMock: Flow[] = [
  {
    meta: {
      id: 'flow_bullying',
      categoryId: 'convivencia',
      subcategory: 'Bullying',
      type: 'standard',
      title: 'Bullying entre estudantes',
      keywords: ['conflito'],
    },
    riskModel: { usedLevels: ['LOW'], defaultLevel: 'LOW' },
    triage: { maxQuestions: 0, questions: [] },
    results: {},
  },
];

const categoriesMock: Category[] = [
  {
    id: 'convivencia',
    label: 'Convivência',
    riskGroup: 'violence',
    icon: 'users',
    subcategories: [],
  },
];

vi.mock('../../../../domain/flows/selectors', () => ({
  getFlows: () => flowsMock,
  getCategories: () => categoriesMock,
}));

vi.mock('../../../../domain/search/searchEngine', () => ({
  searchFlows: (flows: Flow[], _categories: Category[], term: string) =>
    term.toLowerCase().includes('bullying') ? flows : [],
}));

vi.mock('../../../resources/data/faq', () => ({
  faqData: [
    {
      id: 'faq-1',
      category: 'Geral',
      question: 'Como agir em caso de bullying?',
      answer: 'Acolha o estudante e siga o protocolo institucional.',
      tags: ['bullying'],
    },
    ...Array.from({ length: 29 }, (_, index) => ({
      id: `faq-${index + 2}`,
      category: 'Geral',
      question: `Tema recorrente ${index + 1}`,
      answer: 'Orientações gerais para tema institucional.',
      tags: ['tema'],
    })),
  ],
}));

vi.mock('../../../resources/data/glossary', () => ({
  glossaryData: [
    {
      term: 'Bullying',
      definition: 'Violência repetitiva entre pares no ambiente escolar.',
      category: 'Convivência',
      audienceLevel: 'leigo',
    },
  ],
}));

import { unifiedSearch, searchByType } from '../unifiedSearchEngine';

describe('unifiedSearchEngine', () => {
  it('returns empty array for terms shorter than 2 characters', () => {
    expect(unifiedSearch('')).toEqual([]);
    expect(unifiedSearch('a')).toEqual([]);
  });

  it('returns mixed result types and sorts by score descending', () => {
    const results = unifiedSearch('bullying');

    expect(results.length).toBeGreaterThanOrEqual(3);
    expect(results.some((result) => result.type === 'faq')).toBe(true);
    expect(results.some((result) => result.type === 'glossary')).toBe(true);
    expect(results.some((result) => result.type === 'flow')).toBe(true);

    for (let index = 1; index < results.length; index += 1) {
      expect(results[index - 1].score).toBeGreaterThanOrEqual(results[index].score);
    }
  });

  it('filters by type', () => {
    const faqOnly = searchByType('bullying', 'faq');
    expect(faqOnly.length).toBeGreaterThan(0);
    expect(faqOnly.every((result) => result.type === 'faq')).toBe(true);

    const flowOnly = searchByType('bullying', 'flow');
    expect(flowOnly).toHaveLength(1);
    expect(flowOnly[0].type).toBe('flow');
  });

  it('builds expected URLs for each type', () => {
    const results = unifiedSearch('bullying');

    const faq = results.find((result) => result.type === 'faq');
    const glossary = results.find((result) => result.type === 'glossary');
    const flow = results.find((result) => result.type === 'flow');

    expect(faq?.url).toMatch(/^\/recursos\?tab=faq&open=faq-\d+$/);
    expect(glossary?.url).toBe('/recursos?tab=glossary&term=Bullying');
    expect(flow?.url).toBe('/fluxo/flow_bullying');
  });

  it('limits output to 20 items', () => {
    expect(unifiedSearch('tema')).toHaveLength(20);
  });
});
