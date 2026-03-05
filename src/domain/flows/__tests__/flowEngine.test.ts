import { describe, expect, it } from 'vitest';
import type { Flow } from '../../../types';
import { loadModel } from '../../model/loadModel';
import { initFlow, processAnswer } from '../flowEngine';

function getFlow(flowId: string): Flow {
  const flow = loadModel().flows.find(candidate => candidate.meta.id === flowId);
  if (!flow) throw new Error(`Flow not found in model: ${flowId}`);
  return flow;
}

describe('flowEngine - initFlow()', () => {
  it('initializes 5 critical flows with first question and clean state', () => {
    const criticalFlowIds = [
      'flow_acidente_escolar',
      'flow_convulsao',
      'flow_incendio',
      'flow_violencia_armada',
      'flow_porte_objeto',
    ];

    criticalFlowIds.forEach(flowId => {
      const flow = getFlow(flowId);
      const state = initFlow(flow);

      expect(state.flowId).toBe(flowId);
      expect(state.currentQuestionId).toBe(flow.triage.questions[0]?.id ?? null);
      expect(state.answers).toEqual({});
      expect(state.result).toBeNull();
      expect(state.isComplete).toBe(false);
    });
  });
});

describe('flowEngine - processAnswer()', () => {
  it('advances to next question for a valid non-terminal option', () => {
    const flow = getFlow('flow_acidente_escolar');
    const state = initFlow(flow);

    const nextState = processAnswer(flow, state, 'q1', 'Nao');

    expect(nextState.currentQuestionId).toBe('q2');
    expect(nextState.answers).toEqual({ q1: 'Nao' });
    expect(nextState.isComplete).toBe(false);
  });

  it('finalizes flow and stores result for terminal option', () => {
    const flow = getFlow('flow_convulsao');
    const state = initFlow(flow);

    const done = processAnswer(flow, state, 'q1', 'Sim');

    expect(done.isComplete).toBe(true);
    expect(done.currentQuestionId).toBeNull();
    expect(done.result?.severity).toBe('iminente');
    expect(done.answers).toEqual({ q1: 'Sim' });
  });

  it('returns original state when questionId is invalid', () => {
    const flow = getFlow('flow_convulsao');
    const state = initFlow(flow);

    const output = processAnswer(flow, state, 'q999', 'Sim');

    expect(output).toBe(state);
  });

  it('returns original state when option label is invalid', () => {
    const flow = getFlow('flow_convulsao');
    const state = initFlow(flow);

    const output = processAnswer(flow, state, 'q1', 'Talvez');

    expect(output).toBe(state);
  });

  it('does not mutate original state object (immutability)', () => {
    const flow = getFlow('flow_acidente_escolar');
    const state = initFlow(flow);

    const before = { ...state };
    processAnswer(flow, state, 'q1', 'Nao');

    expect(state).toEqual(before);
    expect(state.answers).toEqual({});
    expect(state.currentQuestionId).toBe('q1');
  });
});
