import { describe, it, expect } from 'vitest';
import { initFlow, processAnswer } from '../flowEngine';
import { loadModel } from '../../model/loadModel';

describe('flowEngine - initFlow()', () => {
  it('initializes 5 critical flows with first question and clean state', () => {
    const model = loadModel();
    const criticalFlows = model.flows.filter(f => 
      f.meta.severity === 'CRITICAL'
    ).slice(0, 5);

    expect(criticalFlows.length).toBeGreaterThanOrEqual(1);

    criticalFlows.forEach(flow => {
      const state = initFlow(flow);
      expect(state.flowId).toBe(flow.meta.id);
      expect(state.currentQuestionId).toBe(flow.triage.questions[0].id);
      expect(state.answers).toEqual({});
      expect(state.result).toBeNull();
      expect(state.isComplete).toBe(false);
    });
  });
});

describe('flowEngine - processAnswer()', () => {
  it('advances to next question for a valid non-terminal option', () => {
    const model = loadModel();
    const flow = model.flows.find(f => 
      f.triage.questions.some(q => 
        q.options.some(o => o.next && !o.level)
      )
    );

    if (!flow) {
      console.warn('No flow with non-terminal option found, skipping test');
      return;
    }

    const question = flow.triage.questions.find(q =>
      q.options.some(o => o.next && !o.level)
    )!;
    
    const option = question.options.find(o => o.next && !o.level)!;

    const state = initFlow(flow);
    const next = processAnswer(flow, state, question.id, option.label);

    expect(next.isComplete).toBe(false);
    expect(next.currentQuestionId).toBe(option.next);
    expect(next.answers[question.id]).toBe(option.label);
  });

  it('finalizes flow and stores result for terminal option', () => {
    const model = loadModel();
    
    // Buscar flow com opção terminal (tem level definido)
    const flow = model.flows.find(f =>
      f.triage.questions.some(q =>
        q.options.some(o => o.level)
      )
    );

    if (!flow) {
      throw new Error('No flow with terminal option found');
    }

    const question = flow.triage.questions.find(q =>
      q.options.some(o => o.level)
    )!;
    
    const terminalOption = question.options.find(o => o.level)!;

    const state = initFlow(flow);
    const done = processAnswer(flow, state, question.id, terminalOption.label);

    expect(done.isComplete).toBe(true);
    expect(done.currentQuestionId).toBeNull();
    expect(done.result).toBeDefined();
    expect(done.result?.severity).toBeDefined();
  });

  it('returns original state when questionId is invalid', () => {
    const model = loadModel();
    const flow = model.flows[0];
    const state = initFlow(flow);

    const unchanged = processAnswer(flow, state, 'invalid_id', 'Any');

    expect(unchanged).toBe(state);
  });

  it('returns original state when option label is invalid', () => {
    const model = loadModel();
    const flow = model.flows[0];
    const state = initFlow(flow);
    const questionId = flow.triage.questions[0].id;

    const unchanged = processAnswer(flow, state, questionId, 'InvalidOption');

    expect(unchanged).toBe(state);
  });

  it('does not mutate original state object (immutability)', () => {
    const model = loadModel();
    const flow = model.flows[0];
    const original = initFlow(flow);
    const question = flow.triage.questions[0];
    const option = question.options[0];

    processAnswer(flow, original, question.id, option.label);

    expect(original.answers).toEqual({});
    expect(original.isComplete).toBe(false);
  });
});
