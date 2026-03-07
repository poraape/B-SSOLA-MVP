import { describe, expect, it } from 'vitest';

import { runDecision } from '../../../application/decisionOrchestrator';
import { FlowState, initFlow } from '../../flows/flowEngine';
import { PremiumResult } from '../../flows/premiumEngine';
import { evaluateMacroRisk } from '../../gateway/gatewayHeuristics';
import { loadModel } from '../../model/loadModel';

describe('Critical Path Integration', () => {
  it('processa fluxo de abuso sexual até resultado de alta urgência', () => {
    const model = loadModel();
    const flow = model.flows.find(candidate => candidate.meta.id === 'flow_abuso_sexual');
    const category = model.categories.find(candidate => candidate.id === 'protecao_direitos');

    expect(flow).toBeDefined();
    expect(category).toBeDefined();

    const gatewayDecision = evaluateMacroRisk('no', []);
    expect(gatewayDecision.route).toBe('categories');

    let state = initFlow(flow!);
    const firstQuestion = flow!.triage.questions[0];
    const continueOption = firstQuestion.options.find(option => option.next && !option.level);
    expect(continueOption).toBeDefined();

    state = runDecision({
      mode: 'flow',
      flow: flow!,
      state,
      questionId: firstQuestion.id,
      optionLabel: continueOption!.label,
    }) as FlowState;
    expect(state.currentQuestionId).toBe(continueOption!.next);
    expect(state.isComplete).toBe(false);

    const secondQuestion = flow!.triage.questions.find(question => question.id === continueOption!.next);
    const terminalOption = secondQuestion?.options.find(option => option.label.toLowerCase() === 'sim');
    expect(secondQuestion).toBeDefined();
    expect(terminalOption).toBeDefined();

    state = runDecision({
      mode: 'flow',
      flow: flow!,
      state,
      questionId: secondQuestion!.id,
      optionLabel: terminalOption!.label,
    }) as FlowState;
    expect(state.isComplete).toBe(true);
    expect(state.result).toBeTruthy();

    const decision = runDecision({
      mode: 'result',
      result: state.result,
      flow: flow!,
      category: category!,
    }) as PremiumResult | null;

    expect(decision).toBeTruthy();
    expect(decision?.priority).toBe('high');
    expect(decision?.notifyManagement).toBe(true);
  });

  it('mantém rota de categorias quando gateway recebe NÃO SEI sem sinais', () => {
    const model = loadModel();
    const flow = model.flows.find(candidate => candidate.meta.id === 'flow_abuso_sexual');

    expect(flow).toBeDefined();

    const gatewayDecision = evaluateMacroRisk('unsure', []);
    expect(gatewayDecision.route).toBe('categories');
    expect(gatewayDecision.score).toBe(0);

    const state = initFlow(flow!);
    const firstQuestion = flow!.triage.questions[0];
    const continueOption = firstQuestion.options.find(option => option.next && !option.level);
    expect(continueOption).toBeDefined();

    const nextState = runDecision({
      mode: 'flow',
      flow: flow!,
      state,
      questionId: firstQuestion.id,
      optionLabel: continueOption!.label,
    }) as FlowState;

    expect(nextState.currentQuestionId).toBe(continueOption!.next);
    expect(nextState.isComplete).toBe(false);
  });
});
