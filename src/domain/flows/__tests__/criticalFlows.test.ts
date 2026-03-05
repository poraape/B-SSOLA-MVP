import { describe, expect, it } from 'vitest';
import type { Flow } from '../../../types';
import { loadModel } from '../../model/loadModel';
import { initFlow, processAnswer } from '../flowEngine';

function getFlow(flowId: string): Flow {
  const flow = loadModel().flows.find(candidate => candidate.meta.id === flowId);
  if (!flow) throw new Error(`Flow not found in model: ${flowId}`);
  return flow;
}

function runFirstPath(flow: Flow) {
  let state = initFlow(flow);
  const maxSteps = flow.triage.maxQuestions + 2;

  for (let i = 0; i < maxSteps && !state.isComplete && state.currentQuestionId; i += 1) {
    const question = flow.triage.questions.find(q => q.id === state.currentQuestionId);
    if (!question || question.options.length === 0) break;

    const pickedOption = question.options[0]?.label;
    if (!pickedOption) break;

    state = processAnswer(flow, state, question.id, pickedOption);
  }

  return state;
}

describe('critical flows (A1/A2 and B family mapped to current registry)', () => {
  const criticalFlowIds = [
    'flow_acidente_escolar',
    'flow_convulsao',
    'flow_violencia_armada',
    'flow_incendio',
    'flow_porte_objeto',
    'flow_autolesao',
    'flow_abuso_sexual',
  ];

  it.each(criticalFlowIds)('completes %s using first-path scenario and returns result', flowId => {
    const flow = getFlow(flowId);
    const finalState = runFirstPath(flow);

    expect(finalState.isComplete).toBe(true);
    expect(finalState.result).not.toBeNull();
    expect(finalState.result?.severity).toMatch(/^(moderado|alto|iminente)$/);
  });

  it('classifies convulsao first-path as iminente', () => {
    const flow = getFlow('flow_convulsao');
    const finalState = runFirstPath(flow);

    expect(finalState.result?.severity).toBe('iminente');
  });

  it('classifies incendio first-path as iminente', () => {
    const flow = getFlow('flow_incendio');
    const finalState = runFirstPath(flow);

    expect(finalState.result?.severity).toBe('iminente');
  });
});
