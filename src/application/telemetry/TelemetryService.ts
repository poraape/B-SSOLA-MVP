import { HttpProvider, LocalStorageProvider } from './telemetryProviders';
import { TelemetryEvent, TelemetryEventName } from './telemetry.types';

type TrackInput = Omit<TelemetryEvent, 'sessionId' | 'timestamp' | 'event'> & {
  event: TelemetryEventName;
};

const PII_KEY_PATTERN = /(nome|name|cpf|matricula|student|aluno|telefone|phone|email)/i;
const MAX_METADATA_VALUE_LENGTH = 300;

function getSessionIdStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return window.sessionStorage;
}

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const random = Math.random().toString(36).slice(2, 10);
  return `sess_${Date.now()}_${random}`;
}

function sanitizeMetadata(metadata?: Record<string, string>): Record<string, string> | undefined {
  if (!metadata) return undefined;
  const sanitized: Record<string, string> = {};

  for (const [key, value] of Object.entries(metadata)) {
    if (PII_KEY_PATTERN.test(key)) continue;

    const normalizedValue = String(value).trim();
    if (!normalizedValue) continue;

    sanitized[key] = normalizedValue.slice(0, MAX_METADATA_VALUE_LENGTH);
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

export class TelemetryService {
  private readonly localProvider: LocalStorageProvider;
  private readonly httpProvider: HttpProvider;
  private readonly sessionId: string;

  constructor(localProvider?: LocalStorageProvider, httpProvider?: HttpProvider) {
    this.localProvider = localProvider ?? new LocalStorageProvider();
    this.httpProvider = httpProvider ?? new HttpProvider(import.meta.env.VITE_TELEMETRY_ENDPOINT);
    this.sessionId = this.resolveSessionId();
  }

  private resolveSessionId(): string {
    const storage = getSessionIdStorage();
    const storageKey = 'bussola_session_id';

    if (!storage) return generateSessionId();

    const existing = storage.getItem(storageKey);
    if (existing) return existing;

    const created = generateSessionId();
    storage.setItem(storageKey, created);
    return created;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public track(input: TrackInput): void {
    const event: TelemetryEvent = {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      event: input.event,
      step: input.step,
      flowId: input.flowId,
      priority: input.priority,
      metadata: sanitizeMetadata(input.metadata),
    };

    void Promise.allSettled([
      Promise.resolve().then(() => this.localProvider.track(event)),
      Promise.resolve().then(() => this.httpProvider.track(event)),
    ]);
  }

  public getLocalEvents(): TelemetryEvent[] {
    return this.localProvider.readEvents();
  }

  public clearLocalEvents(): void {
    this.localProvider.clear();
  }
}

export const telemetryService = new TelemetryService();
