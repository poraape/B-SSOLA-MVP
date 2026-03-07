import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { InstitutionalMetricEvent } from '../../domain/metrics/types';

const { mockLogTriageEvent } = vi.hoisted(() => ({
  mockLogTriageEvent: vi.fn(),
}));

vi.mock('../../domain/metrics/logger', () => ({
  logTriageEvent: mockLogTriageEvent,
}));

import { logDecisionEvent } from '../loggerService';

describe('logDecisionEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns payload with timestamp and logs mapped triage event when flowId exists', () => {
    const nowSpy = vi.spyOn(Date, 'now').mockReturnValue(1700000000000);

    const payload = logDecisionEvent({
      category: 'saude_bem_estar',
      level: 'HIGH',
      type: 'standard',
      emergency: false,
      flowId: 'flow_febre',
      priority: 'critical',
    });

    expect(payload.timestamp).toBe(1700000000000);
    expect(mockLogTriageEvent).toHaveBeenCalledTimes(1);

    const mapped = mockLogTriageEvent.mock.calls[0]?.[0] as InstitutionalMetricEvent;
    expect(mapped).toEqual({
      flowId: 'flow_febre',
      categoryId: 'saude_bem_estar',
      flowType: 'standard',
      level: 'HIGH',
      priority: 'critical',
      timestamp: 1700000000000,
    });

    nowSpy.mockRestore();
  });

  it('does not call triage logger when flowId is absent', () => {
    const payload = logDecisionEvent({
      category: 'saude_bem_estar',
      type: 'standard',
      emergency: false,
      priority: 'low',
    });

    expect(typeof payload.timestamp).toBe('number');
    expect(mockLogTriageEvent).not.toHaveBeenCalled();
  });
});
