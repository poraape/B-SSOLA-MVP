import { InstitutionalMetricEvent } from './types';

const STORAGE_KEY = 'bussola_metrics_v1';

export function getAllMetrics(): InstitutionalMetricEvent[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
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
