import { InstitutionalMetricEvent } from './types';
import { telemetryService } from '../../application/telemetry/TelemetryService';
import { TelemetryEvent } from '../../application/telemetry/telemetry.types';

function isResultEvent(event: TelemetryEvent): boolean {
  return event.event === 'result_reached' && Boolean(event.flowId);
}

export function getAllMetrics(): InstitutionalMetricEvent[] {
  const events = telemetryService.getLocalEvents().filter(isResultEvent);

  return events.map(event => ({
    flowId: event.flowId as string,
    categoryId: event.metadata?.categoryId || 'unknown',
    flowType: event.metadata?.flowType || 'unknown',
    level: event.step || undefined,
    priority:
      event.priority === 'low' ||
      event.priority === 'moderate' ||
      event.priority === 'high' ||
      event.priority === 'critical'
        ? event.priority
        : undefined,
    timestamp: Date.parse(event.timestamp) || Date.now(),
  }));
}

export function aggregateByPriority() {
  const events = getAllMetrics();

  return events.reduce(
    (acc, event) => {
      if (!event.priority) return acc;

      acc[event.priority] = (acc[event.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}

export function aggregateByCategory() {
  const events = getAllMetrics();

  return events.reduce(
    (acc, event) => {
      acc[event.categoryId] = (acc[event.categoryId] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
}
