import { InstitutionalMetricEvent, InstitutionalPriority } from './types';
import { systemLogger } from './systemLogger';

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

    systemLogger.debug('Metrics event recorded', {
      flowId: sanitized.flowId,
      categoryId: sanitized.categoryId,
      priority: sanitized.priority,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    systemLogger.error('Metrics event failed', { error: message });
  }
}

export function clearMetrics(): void {
  localStorage.removeItem(STORAGE_KEY);
}
