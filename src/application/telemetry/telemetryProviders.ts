import { ITelemetryProvider, TelemetryEvent } from './telemetry.types';

const STORAGE_KEY = 'bussola_metrics_v1';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParse(raw: string | null): TelemetryEvent[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TelemetryEvent[]) : [];
  } catch {
    return [];
  }
}

export class LocalStorageProvider implements ITelemetryProvider {
  public track(event: TelemetryEvent): void {
    if (!canUseStorage()) return;
    const existing = safeParse(window.localStorage.getItem(STORAGE_KEY));
    existing.push(event);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  public readEvents(): TelemetryEvent[] {
    if (!canUseStorage()) return [];
    return safeParse(window.localStorage.getItem(STORAGE_KEY));
  }

  public clear(): void {
    if (!canUseStorage()) return;
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export class HttpProvider implements ITelemetryProvider {
  private readonly endpoint?: string;
  private warnedMissingEndpoint = false;

  constructor(endpoint?: string) {
    this.endpoint = endpoint;
  }

  public async track(event: TelemetryEvent): Promise<void> {
    if (!this.endpoint) {
      if (!this.warnedMissingEndpoint) {
        this.warnedMissingEndpoint = true;
        console.warn('[telemetry] VITE_TELEMETRY_ENDPOINT não definido; envio HTTP desativado.');
      }
      return;
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        console.warn(`[telemetry] Falha ao enviar evento: status ${response.status}.`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[telemetry] Erro de envio HTTP: ${message}`);
    }
  }
}

