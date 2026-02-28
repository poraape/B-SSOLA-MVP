import { describe, it, expect } from 'vitest';
import { processAnswer, FlowState } from '../flows/flowEngine';
import { Flow } from '../../types';

function createBaseFlow(): Flow {
  return {
    meta: {
      id: 'flow_test',
      categoryId: 'convivencia_conflitos',
      subcategory: 'teste',
      type: 'standard',
      title: 'Fluxo Teste',
      keywords: [],
    },
    riskModel: {
      usedLevels: ['LOW', 'MODERATE', 'HIGH'],
      defaultLevel: 'LOW',
    },
    triage: {
      maxQuestions: 2,
      questions: [
        {
          id: 'q1',
          text: 'Pergunta 1',
          options: [
            { label: 'Sim', level: 'HIGH' },
            { label: 'Próxima', next: 'q2' },
            { label: 'Outro fluxo', nextFlow: 'flow_other' },
            { label: 'Categorias', redirectToCategories: true },
          ],
        },
        {
          id: 'q2',
          text: 'Pergunta 2',
          options: [{ label: 'Finalizar', level: 'MODERATE' }],
        },
      ],
    },
    results: {
      HIGH: {
        level: 'HIGH',
        severity: 'alta',
        schoolActions: [],
        primaryService: null,
        secondaryService: null,
      },
      MODERATE: {
        level: 'MODERATE',
        severity: 'moderada',
        schoolActions: [],
        primaryService: null,
        secondaryService: null,
      },
    },
  };
}

function createBaseState(): FlowState {
  return {
    flowId: 'flow_test',
    currentQuestionId: 'q1',
    answers: {},
    result: null,
    isComplete: false,
  };
}

describe('Flow Engine', () => {
  it('deve finalizar fluxo quando option.level estiver presente', () => {
    const newState = processAnswer(createBaseFlow(), createBaseState(), 'q1', 'Sim');

    expect(newState.isComplete).toBe(true);
    expect(newState.result?.level).toBe('HIGH');
  });

  it('retorna estado original quando pergunta não existe', () => {
    const state = createBaseState();
    const output = processAnswer(createBaseFlow(), state, 'q999', 'Sim');
    expect(output).toBe(state);
  });

  it('retorna estado original quando opção não existe', () => {
    const state = createBaseState();
    const output = processAnswer(createBaseFlow(), state, 'q1', 'Inexistente');
    expect(output).toBe(state);
  });

  it('navega para próxima pergunta com option.next', () => {
    const output = processAnswer(createBaseFlow(), createBaseState(), 'q1', 'Próxima');
    expect(output.currentQuestionId).toBe('q2');
    expect(output.answers).toEqual({ q1: 'Próxima' });
    expect(output.isComplete).toBe(false);
  });

  it('redireciona para outro fluxo com option.nextFlow', () => {
    const output = processAnswer(createBaseFlow(), createBaseState(), 'q1', 'Outro fluxo');
    expect(output.flowId).toBe('flow_other');
    expect(output.currentQuestionId).toBeNull();
    expect(output.answers).toEqual({});
  });

  it('marca redirectToCategories quando option.redirectToCategories', () => {
    const output = processAnswer(createBaseFlow(), createBaseState(), 'q1', 'Categorias');
    expect(output.redirectToCategories).toBe(true);
    expect(output.flowId).toBeNull();
  });

  it('completa com result null quando level não existe em flow.results', () => {
    const flow = createBaseFlow();
    flow.triage.questions[0]!.options = [{ label: 'Sem resultado', level: 'LOW' }];

    const output = processAnswer(flow, createBaseState(), 'q1', 'Sem resultado');
    expect(output.isComplete).toBe(true);
    expect(output.result).toBeNull();
    expect(output.currentQuestionId).toBeNull();
  });
});
