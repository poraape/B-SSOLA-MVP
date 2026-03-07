import { runDecision, type FlowInput } from '../../application/decisionOrchestrator';

import type { TriageResolveOutput } from '../contracts/triage';

export function executeTriageResolve(input: FlowInput): TriageResolveOutput {
  return runDecision(input);
}
