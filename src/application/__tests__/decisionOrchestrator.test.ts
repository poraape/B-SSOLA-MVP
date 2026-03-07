import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Category, Flow, TriageResult } from '../../types';
import type { FlowState } from '../../domain/flows/flowEngine';
import type { PremiumResult } from '../../domain/flows/premiumEngine';

const {
  mockGetValidatedModel,
  mockProcessAnswer,
  mockEnrichPremium,
} = vi.hoisted(() => ({
  mockGetValidatedModel: vi.fn(() => ({ version: '1.0.0' })),
  mockProcessAnswer: vi.fn(),
  mockEnrichPremium: vi.fn(),
}));

vi.mock('../../domain/model/loadModel', () => ({
  getValidatedModel: mockGetValidatedModel,
}));

vi.mock('../../domain/flows/flowEngine', () => ({
  processAnswer: mockProcessAnswer,
}));

vi.mock('../../domain/flows/premiumEngine', () => ({
  enrichPremium: mockEnrichPremium,
}));

import { runDecision } from '../decisionOrchestrator';

function createFlow(): Flow {
  return {
    meta: {
      id: 'flow_febre',
      categoryId: 'saude_bem_estar',
      subcategory: 'Febre',
      type: 'standard',
      title: 'Fluxo Febre',
      keywords: [],
    },
    riskModel: {
      usedLevels: ['LOW', 'MODERATE', 'HIGH'],
      defaultLevel: 'LOW',
    },
    triage: {
      maxQuestions: 1,
      questions: [
        {
          id: 'q1',
          text: 'Pergunta',
          options: [{ label: 'Sim', level: 'HIGH' }],
        },
      ],
    },
    results: {
      HIGH: {
        severity: 'alto',
        primaryService: null,
        secondaryService: null,
        schoolActions: [],
      },
    },
  };
}

describe('runDecision', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('routes flow mode to processAnswer after model validation', () => {
    const flow = createFlow();
    const state: FlowState = {
      flowId: flow.meta.id,
      currentQuestionId: 'q1',
      answers: {},
      result: null,
      isComplete: false,
    };

    const nextState: FlowState = {
      ...state,
      currentQuestionId: null,
      isComplete: true,
      result: {
        severity: 'alto',
        level: 'HIGH',
        primaryService: null,
        secondaryService: null,
        schoolActions: [],
      },
    };
    mockProcessAnswer.mockReturnValue(nextState);

    const output = runDecision({
      mode: 'flow',
      flow,
      state,
      questionId: 'q1',
      optionLabel: 'Sim',
    });

    expect(mockGetValidatedModel).toHaveBeenCalledTimes(1);
    expect(mockProcessAnswer).toHaveBeenCalledWith(flow, state, 'q1', 'Sim');
    expect(output).toEqual(nextState);
  });

  it('routes result mode to enrichPremium and returns enriched result', () => {
    const flow = createFlow();
    const result: TriageResult = {
      severity: 'moderado',
      primaryService: null,
      secondaryService: null,
      schoolActions: ['Ação 1'],
    };
    const category: Category = {
      id: 'saude_bem_estar',
      label: 'Saúde e Bem-Estar',
      riskGroup: 'medical',
      icon: 'heart',
      subcategories: [],
    };
    const enriched: PremiumResult = {
      ...result,
      priority: 'high',
      institutionalScript: ['1. Ação 1'],
    };
    mockEnrichPremium.mockReturnValue(enriched);

    const output = runDecision({
      mode: 'result',
      result,
      flow,
      category,
      guardrailTriggered: true,
    });

    expect(mockGetValidatedModel).toHaveBeenCalledTimes(1);
    expect(mockEnrichPremium).toHaveBeenCalledWith(result, flow, category, true);
    expect(output).toEqual(enriched);
  });

  it('returns null when enrichPremium returns null', () => {
    const flow = createFlow();
    mockEnrichPremium.mockReturnValue(null);

    const output = runDecision({
      mode: 'result',
      result: null,
      flow,
    });

    expect(mockGetValidatedModel).toHaveBeenCalledTimes(1);
    expect(mockEnrichPremium).toHaveBeenCalledWith(null, flow, undefined, undefined);
    expect(output).toBeNull();
  });
});
