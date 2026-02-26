import { describe, it, expect } from 'vitest';
import { processAnswer } from '../flows/flowEngine';

describe('Flow Engine', () => {
  it('deve finalizar fluxo quando option.level estiver presente', () => {
    const state: any = {
      flowId: 'flow_test',
      currentQuestionId: 'q1',
      answers: {},
      result: null,
      isComplete: false,
    };

    const flow: any = {
      triage: {
        questions: [
          {
            id: 'q1',
            options: [
              {
                label: 'Sim',
                level: 'HIGH',
              },
            ],
          },
        ],
      },
      results: {
        HIGH: {
          severity: 'alta',
          schoolActions: [],
          primaryService: null,
          secondaryService: null,
        },
      },
    };

    const newState = processAnswer(flow, state, 'q1', 'Sim');

    expect(newState.isComplete).toBe(true);
    expect(newState.result.level).toBe('HIGH');
  });
});
