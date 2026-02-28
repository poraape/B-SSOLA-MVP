import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpProvider, LocalStorageProvider } from '../telemetry/telemetryProviders';
import type { TelemetryEvent } from '../telemetry/telemetry.types';

const STORAGE_KEY = 'bussola_metrics_v1';

function createEvent(): TelemetryEvent {
  return {
    sessionId: 'sess-1',
    timestamp: '2026-01-01T00:00:00.000Z',
    event: 'session_start',
  };
}

function createStorage() {
  const store = new Map<string, string>();
  return {
    getItem: vi.fn((key: string) => (store.has(key) ? store.get(key)! : null)),
    setItem: vi.fn((key: string, value: string) => {
      store.set(key, value);
    }),
    removeItem: vi.fn((key: string) => {
      store.delete(key);
    }),
    clear: vi.fn(() => {
      store.clear();
    }),
  };
}

describe('LocalStorageProvider', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('tracks, reads and clears events from storage', () => {
    const localStorage = createStorage();
    vi.stubGlobal('window', { localStorage });

    const provider = new LocalStorageProvider();
    const event = createEvent();

    provider.track(event);
    const events = provider.readEvents();

    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject(event);

    provider.clear();
    expect(provider.readEvents()).toEqual([]);
  });

  it('handles malformed JSON payload safely', () => {
    const localStorage = createStorage();
    localStorage.setItem(STORAGE_KEY, '{bad-json');
    vi.stubGlobal('window', { localStorage });

    const provider = new LocalStorageProvider();
    expect(provider.readEvents()).toEqual([]);

    provider.track(createEvent());
    expect(provider.readEvents()).toHaveLength(1);
  });

  it('is a no-op when window/localStorage are unavailable', () => {
    vi.unstubAllGlobals();
    const provider = new LocalStorageProvider();

    expect(() => provider.track(createEvent())).not.toThrow();
    expect(provider.readEvents()).toEqual([]);
    expect(() => provider.clear()).not.toThrow();
  });
});

describe('HttpProvider', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('warns once and does not throw when endpoint is not configured', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const provider = new HttpProvider();

    await provider.track(createEvent());
    await provider.track(createEvent());

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toContain('VITE_TELEMETRY_ENDPOINT não definido');
  });

  it('posts telemetry event when endpoint is configured', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const provider = new HttpProvider('https://telemetry.example/events');

    await provider.track(createEvent());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://telemetry.example/events');
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('warns when HTTP response is not ok', async () => {
    const fetchMock = vi.fn(async () => ({ ok: false, status: 500 }));
    vi.stubGlobal('fetch', fetchMock);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const provider = new HttpProvider('https://telemetry.example/events');

    await provider.track(createEvent());

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toContain('status 500');
  });

  it('warns and recovers from network errors', async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error('network down');
    });
    vi.stubGlobal('fetch', fetchMock);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const provider = new HttpProvider('https://telemetry.example/events');

    await provider.track(createEvent());

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toContain('network down');
  });
});
