import { describe, expect, it, vi } from 'vitest';

const { mockGetLocalEvents } = vi.hoisted(() => ({
  mockGetLocalEvents: vi.fn(),
}));

vi.mock('../../../application/telemetry/TelemetryService', () => ({
  telemetryService: {
    getLocalEvents: mockGetLocalEvents,
  },
}));

import { aggregateByCategory, aggregateByPriority, getAllMetrics } from '../aggregate';

describe('metrics aggregate', () => {
  it('maps result events into institutional metrics with sane defaults', () => {
    mockGetLocalEvents.mockReturnValue([
      {
        sessionId: 's1',
        timestamp: '2026-01-01T10:00:00.000Z',
        event: 'result_reached',
        flowId: 'flow_febre',
        step: 'alto',
        priority: 'high',
        metadata: { categoryId: 'saude', flowType: 'standard' },
      },
      {
        sessionId: 's2',
        timestamp: 'invalid-date',
        event: 'result_reached',
        flowId: 'flow_bullying',
        priority: 'urgent',
      },
      {
        sessionId: 's3',
        timestamp: '2026-01-01T10:00:00.000Z',
        event: 'flow_selected',
      },
    ]);

    const all = getAllMetrics();

    expect(all).toHaveLength(2);
    expect(all[0]).toMatchObject({
      flowId: 'flow_febre',
      categoryId: 'saude',
      flowType: 'standard',
      level: 'alto',
      priority: 'high',
    });
    expect(all[1]?.categoryId).toBe('unknown');
    expect(all[1]?.flowType).toBe('unknown');
    expect(all[1]?.priority).toBeUndefined();
    expect(typeof all[1]?.timestamp).toBe('number');
  });

  it('aggregates by priority and category', () => {
    mockGetLocalEvents.mockReturnValue([
      {
        sessionId: 's1',
        timestamp: '2026-01-01T10:00:00.000Z',
        event: 'result_reached',
        flowId: 'flow_febre',
        priority: 'high',
        metadata: { categoryId: 'saude', flowType: 'standard' },
      },
      {
        sessionId: 's2',
        timestamp: '2026-01-01T10:00:00.000Z',
        event: 'result_reached',
        flowId: 'flow_autolesao',
        priority: 'high',
        metadata: { categoryId: 'protecao', flowType: 'standard' },
      },
      {
        sessionId: 's3',
        timestamp: '2026-01-01T10:00:00.000Z',
        event: 'result_reached',
        flowId: 'flow_rede',
        metadata: { categoryId: 'saude', flowType: 'standard' },
      },
    ]);

    expect(aggregateByPriority()).toEqual({ high: 2 });
    expect(aggregateByCategory()).toEqual({ saude: 2, protecao: 1 });
  });
});
