export type InstitutionalPriority = 'low' | 'moderate' | 'high' | 'critical';

export interface InstitutionalMetricEvent {
  flowId: string;
  categoryId: string;
  flowType: string;
  level?: string;
  priority?: InstitutionalPriority;
  timestamp: number;
}
