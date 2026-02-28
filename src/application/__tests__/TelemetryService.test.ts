import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TelemetryService } from '../telemetry/TelemetryService';
import type { TelemetryEvent } from '../telemetry/telemetry.types';

function createStorage(initial?: Record<string, string>) {
  const store = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    getItem: vi.fn((key: string) => (store.has(key) ? store.get(key)! : null)),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
  };
}

describe('TelemetryService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('reuses session id from sessionStorage when available', () => {
    const sessionStorage = createStorage({ bussola_session_id: 'sess-existing' });
    vi.stubGlobal('window', { sessionStorage });

    const localProvider = {
      track: vi.fn(),
      readEvents: vi.fn(() => [] as TelemetryEvent[]),
      clear: vi.fn(),
    };
    const httpProvider = { track: vi.fn() };

    const service = new TelemetryService(
      localProvider as never,
      httpProvider as never
    );

    expect(service.getSessionId()).toBe('sess-existing');
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });

  it('creates and persists session id when sessionStorage is empty', () => {
    const sessionStorage = createStorage();
    vi.stubGlobal('window', { sessionStorage });
    vi.stubGlobal('crypto', { randomUUID: () => 'uuid-new-session' });

    const localProvider = {
      track: vi.fn(),
      readEvents: vi.fn(() => [] as TelemetryEvent[]),
      clear: vi.fn(),
    };
    const httpProvider = { track: vi.fn() };

    const service = new TelemetryService(
      localProvider as never,
      httpProvider as never
    );

    expect(service.getSessionId()).toBe('uuid-new-session');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('bussola_session_id', 'uuid-new-session');
  });

  it('works in SSR-like environment without window', () => {
    vi.unstubAllGlobals();
    vi.stubGlobal('crypto', { randomUUID: () => 'uuid-ssr' });

    const localProvider = {
      track: vi.fn(),
      readEvents: vi.fn(() => [] as TelemetryEvent[]),
      clear: vi.fn(),
    };
    const httpProvider = { track: vi.fn() };

    const service = new TelemetryService(
      localProvider as never,
      httpProvider as never
    );

    expect(service.getSessionId()).toBe('uuid-ssr');
  });

  it('sanitizes metadata and sends event to both providers', async () => {
    const sessionStorage = createStorage({ bussola_session_id: 'sess-telemetry' });
    vi.stubGlobal('window', { sessionStorage });

    const localTrack = vi.fn();
    const httpTrack = vi.fn();
    const localProvider = {
      track: localTrack,
      readEvents: vi.fn(() => [] as TelemetryEvent[]),
      clear: vi.fn(),
    };
    const httpProvider = { track: httpTrack };

    const service = new TelemetryService(
      localProvider as never,
      httpProvider as never
    );

    const longValue = 'a'.repeat(350);
    service.track({
      event: 'result_reached',
      flowId: 'flow_febre',
      step: 'resultado',
      priority: 'high',
      metadata: {
        categoryId: 'saude',
        nomeAluno: 'should be removed',
        note: `  ${longValue}  `,
        empty: '   ',
      },
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(localTrack).toHaveBeenCalledTimes(1);
    expect(httpTrack).toHaveBeenCalledTimes(1);

    const sentEvent = localTrack.mock.calls[0]?.[0] as TelemetryEvent;
    expect(sentEvent.sessionId).toBe('sess-telemetry');
    expect(sentEvent.event).toBe('result_reached');
    expect(sentEvent.metadata?.categoryId).toBe('saude');
    expect(sentEvent.metadata?.nomeAluno).toBeUndefined();
    expect(sentEvent.metadata?.empty).toBeUndefined();
    expect(sentEvent.metadata?.note?.length).toBe(300);
  });

  it('does not throw when providers fail (sync and async)', async () => {
    const sessionStorage = createStorage({ bussola_session_id: 'sess-safe' });
    vi.stubGlobal('window', { sessionStorage });

    const localProvider = {
      track: vi.fn(() => {
        throw new Error('sync fail');
      }),
      readEvents: vi.fn(() => [] as TelemetryEvent[]),
      clear: vi.fn(),
    };
    const httpProvider = {
      track: vi.fn(async () => {
        throw new Error('async fail');
      }),
    };

    const service = new TelemetryService(
      localProvider as never,
      httpProvider as never
    );

    expect(() =>
      service.track({
        event: 'session_start',
        step: 'boot',
      })
    ).not.toThrow();

    await Promise.resolve();
    await Promise.resolve();
  });

  it('delegates local event read and clear', () => {
    const sessionStorage = createStorage({ bussola_session_id: 'sess-local' });
    vi.stubGlobal('window', { sessionStorage });

    const events: TelemetryEvent[] = [
      {
        sessionId: 'sess-local',
        timestamp: '2026-01-01T00:00:00.000Z',
        event: 'session_start',
      },
    ];

    const localProvider = {
      track: vi.fn(),
      readEvents: vi.fn(() => events),
      clear: vi.fn(),
    };
    const httpProvider = { track: vi.fn() };

    const service = new TelemetryService(
      localProvider as never,
      httpProvider as never
    );

    expect(service.getLocalEvents()).toEqual(events);
    service.clearLocalEvents();
    expect(localProvider.clear).toHaveBeenCalledTimes(1);
  });
});
