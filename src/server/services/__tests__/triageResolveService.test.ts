import { describe, expect, it, vi } from 'vitest';
import type { FlowInput } from '../../../application/decisionOrchestrator';

const { mockRunDecision } = vi.hoisted(() => ({
  mockRunDecision: vi.fn(),
}));

vi.mock('../../../application/decisionOrchestrator', () => ({
  runDecision: mockRunDecision,
}));

import { executeTriageResolve } from '../triageResolveService';

describe('executeTriageResolve', () => {
  it('delegates triage resolution to runDecision as single source of truth', () => {
    const input = { mode: 'flow' } as FlowInput;
    const expected = { flowId: 'flow_febre' };
    mockRunDecision.mockReturnValue(expected);

    const output = executeTriageResolve(input);

    expect(mockRunDecision).toHaveBeenCalledTimes(1);
    expect(mockRunDecision).toHaveBeenCalledWith(input);
    expect(output).toBe(expected);
  });
});
