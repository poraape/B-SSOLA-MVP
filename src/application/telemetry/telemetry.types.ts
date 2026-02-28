export type TelemetryEventName =
  | 'session_start'
  | 'step_advance'
  | 'flow_selected'
  | 'result_reached'
  | 'session_abandoned'
  | 'referral_copied';

export type TelemetryEvent = {
  sessionId: string;
  timestamp: string;
  event: TelemetryEventName;
  step?: string;
  flowId?: string;
  priority?: string;
  metadata?: Record<string, string>;
};

export interface ITelemetryProvider {
  track(event: TelemetryEvent): Promise<void> | void;
}

