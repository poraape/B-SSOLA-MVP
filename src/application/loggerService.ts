import { logTriageEvent } from '../domain/metrics/logger';
import { InstitutionalPriority } from '../domain/metrics/types';

export function logDecisionEvent(data: {
  category: string
  level?: string
  type: string
  emergency: boolean
  flowId?: string
  priority?: InstitutionalPriority
}) {
  const payload = {
    ...data,
    timestamp: Date.now(),
  };

  // mantém comportamento atual (console ou storage)
  // apenas encapsulado aqui
  if (payload.flowId) {
    logTriageEvent({
      flowId: payload.flowId,
      categoryId: payload.category,
      flowType: payload.type,
      level: payload.level,
      priority: payload.priority,
      timestamp: payload.timestamp,
    });
  }

  return payload;
}
