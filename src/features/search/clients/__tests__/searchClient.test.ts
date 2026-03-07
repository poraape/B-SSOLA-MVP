import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { UnifiedSearchResult } from '../../types/searchTypes';

const mockSearchByType = vi.fn();

vi.mock('../../services/unifiedSearchEngine', () => ({
  searchByType: mockSearchByType,
}));

import { searchWithFacade } from '../searchClient';

const localResults: UnifiedSearchResult[] = [
  {
    id: 'flow_febre',
    type: 'flow',
    title: 'Febre',
    description: 'Mal-estar',
    category: 'saude_bem_estar',
    url: '/fluxo/flow_febre',
    score: 60,
  },
];

describe('searchWithFacade', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  it('uses local fallback when feature flag is disabled', async () => {
    vi.stubEnv('VITE_FEATURE_SEARCH_API', 'false');
    mockSearchByType.mockReturnValue(localResults);

    const result = await searchWithFacade('febre', 'flow');

    expect(result).toEqual(localResults);
    expect(mockSearchByType).toHaveBeenCalledWith('febre', 'flow');
  });

  it('uses API result when feature flag is enabled and response is valid', async () => {
    vi.stubEnv('VITE_FEATURE_SEARCH_API', 'true');
    mockSearchByType.mockReturnValue(localResults);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        traceId: 'trace_123',
        data: [
          {
            ...localResults[0],
            id: 'faq-1',
            type: 'faq',
            title: 'Pergunta',
            question: 'Pergunta',
            answer: 'Resposta',
          },
        ],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await searchWithFacade('pergunta', 'all');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]?.type).toBe('faq');
    expect(mockSearchByType).not.toHaveBeenCalled();
  });

  it('falls back to local search when API fails', async () => {
    vi.stubEnv('VITE_FEATURE_SEARCH_API', 'true');
    mockSearchByType.mockReturnValue(localResults);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      }),
    );

    const result = await searchWithFacade('febre', 'flow');

    expect(result).toEqual(localResults);
    expect(mockSearchByType).toHaveBeenCalledWith('febre', 'flow');
  });
});
