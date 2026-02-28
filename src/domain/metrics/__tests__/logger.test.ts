import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { InstitutionalMetricEvent } from '../types';

const {
  mockTrack,
  mockClearLocalEvents,
  mockDebug,
  mockError,
} = vi.hoisted(() => ({
  mockTrack: vi.fn(),
  mockClearLocalEvents: vi.fn(),
  mockDebug: vi.fn(),
  mockError: vi.fn(),
}));

vi.mock('../../../application/telemetry/TelemetryService', () => ({
  telemetryService: {
    track: mockTrack,
    clearLocalEvents: mockClearLocalEvents,
  },
}));

vi.mock('../systemLogger', () => ({
  systemLogger: {
    debug: mockDebug,
    error: mockError,
  },
}));

import { clearMetrics, logTriageEvent } from '../logger';

describe('metrics logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sanitizes priority and tracks telemetry event', () => {
    const event: InstitutionalMetricEvent = {
      flowId: 'flow_febre',
      categoryId: 'saude',
      flowType: 'standard',
      level: 'alto',
      priority: 'invalid' as never,
      timestamp: 1,
    };

    logTriageEvent(event);

    expect(mockTrack).toHaveBeenCalledTimes(1);
    expect(mockTrack.mock.calls[0]?.[0]).toMatchObject({
      event: 'result_reached',
      flowId: 'flow_febre',
      step: 'alto',
      priority: 'low',
      metadata: {
        categoryId: 'saude',
        flowType: 'standard',
        level: 'alto',
      },
    });
    expect(mockDebug).toHaveBeenCalledTimes(1);
  });

  it('handles track failures without crashing', () => {
    mockTrack.mockImplementation(() => {
      throw new Error('track fail');
    });

    logTriageEvent({
      flowId: 'flow_febre',
      categoryId: 'saude',
      flowType: 'standard',
      level: 'alto',
      priority: 'high',
      timestamp: 1,
    });

    expect(mockError).toHaveBeenCalledTimes(1);
    expect(mockError.mock.calls[0]?.[0]).toContain('Metrics event failed');
  });

  it('clears local metrics through telemetry service', () => {
    clearMetrics();
    expect(mockClearLocalEvents).toHaveBeenCalledTimes(1);
  });
});
