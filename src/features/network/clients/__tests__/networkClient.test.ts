import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Service } from '../../../../types';

const { mockGetServices } = vi.hoisted(() => ({
  mockGetServices: vi.fn(),
}));

vi.mock('../../../../domain/flows/selectors', () => ({
  getServices: mockGetServices,
}));

import { loadNetworkServicesWithFacade } from '../networkClient';

const localServices: Service[] = [
  {
    id: 'service-1',
    name: 'Serviço 1',
    category: 'institucional',
    type: 'interno',
    contact: {
      phone: '11 1111-1111',
      email: null,
      website: null,
      alternatePhone: null,
      otherPhones: [],
    },
    location: {
      address: 'Rua A, 123',
      lat: -23.5,
      lng: -46.48,
    },
  },
];

describe('loadNetworkServicesWithFacade', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  it('uses local fallback when feature flag is disabled', async () => {
    vi.stubEnv('VITE_FEATURE_NETWORK_API', 'false');
    mockGetServices.mockReturnValue(localServices);

    const result = await loadNetworkServicesWithFacade();

    expect(result).toEqual(localServices);
    expect(mockGetServices).toHaveBeenCalledTimes(1);
  });

  it('uses API result when feature flag is enabled and response is valid', async () => {
    vi.stubEnv('VITE_FEATURE_NETWORK_API', 'true');
    mockGetServices.mockReturnValue(localServices);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        traceId: 'trace_123',
        data: [
          {
            ...localServices[0],
            id: 'service-2',
            name: 'Serviço 2',
          },
        ],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await loadNetworkServicesWithFacade();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('service-2');
    expect(mockGetServices).not.toHaveBeenCalled();
  });

  it('falls back to local services when API fails', async () => {
    vi.stubEnv('VITE_FEATURE_NETWORK_API', 'true');
    mockGetServices.mockReturnValue(localServices);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      }),
    );

    const result = await loadNetworkServicesWithFacade();

    expect(result).toEqual(localServices);
    expect(mockGetServices).toHaveBeenCalledTimes(1);
  });
});
