import { InstitutionalMetricEvent, InstitutionalPriority } from './types';

const STORAGE_KEY = 'bussola_metrics_v1';
const VALID_PRIORITIES: InstitutionalPriority[] = ['low', 'moderate', 'high', 'critical'];

function getSafePriority(priority?: string): InstitutionalPriority | undefined {
  if (!priority) return undefined;
  return VALID_PRIORITIES.includes(priority as InstitutionalPriority)
    ? (priority as InstitutionalPriority)
    : 'low';
}

function sanitizeEvent(event: InstitutionalMetricEvent): InstitutionalMetricEvent {
  return {
    flowId: event.flowId,
    categoryId: event.categoryId,
    flowType: event.flowType,
    level: event.level,
    priority: getSafePriority(event.priority),
    timestamp: event.timestamp,
  };
}

export function logTriageEvent(event: InstitutionalMetricEvent): void {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: InstitutionalMetricEvent[] = existingRaw
      ? JSON.parse(existingRaw)
      : [];

    const sanitized = sanitizeEvent(event);
    existing.push(sanitized);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    if (process.env.NODE_ENV !== 'production') {
      console.info('[Metrics] Evento institucional registrado:', sanitized);
    }
  } catch (error) {
    console.warn('[Metrics] Falha ao registrar evento institucional', error);
  }
}

export function clearMetrics(): void {
  localStorage.removeItem(STORAGE_KEY);
}
