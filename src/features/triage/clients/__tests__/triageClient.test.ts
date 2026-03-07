import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { FlowInput } from '../../../../application/decisionOrchestrator';
import type { FlowState } from '../../../../domain/flows/flowEngine';

const { mockRunDecision } = vi.hoisted(() => ({
  mockRunDecision: vi.fn(),
}));

vi.mock('../../../../application/decisionOrchestrator', () => ({
  runDecision: mockRunDecision,
}));

import { runTriageWithFacade } from '../triageClient';

const flowInput: Extract<FlowInput, { mode: 'flow' }> = {
  mode: 'flow',
  flow: {
    meta: {
      id: 'flow_febre',
      categoryId: 'saude_bem_estar',
      subcategory: 'Febre',
      type: 'standard',
      title: 'Fluxo Febre',
      keywords: [],
    },
    riskModel: {
      usedLevels: ['LOW'],
      defaultLevel: 'LOW',
    },
    triage: {
      maxQuestions: 1,
      questions: [
        {
          id: 'q1',
          text: 'Pergunta',
          options: [{ label: 'Sim', level: 'LOW' }],
        },
      ],
    },
    results: {
      LOW: {
        severity: 'baixo',
        primaryService: null,
        secondaryService: null,
        schoolActions: [],
      },
    },
  },
  state: {
    flowId: 'flow_febre',
    currentQuestionId: 'q1',
    answers: {},
    result: null,
    isComplete: false,
  },
  questionId: 'q1',
  optionLabel: 'Sim',
};

const localState: FlowState = {
  flowId: 'flow_febre',
  currentQuestionId: null,
  answers: { q1: 'Sim' },
  result: {
    severity: 'baixo',
    primaryService: null,
    secondaryService: null,
    schoolActions: [],
  },
  isComplete: true,
};

describe('runTriageWithFacade', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllEnvs();
  });

  it('uses local fallback when feature flag is disabled', async () => {
    vi.stubEnv('VITE_FEATURE_DECISION_API', 'false');
    mockRunDecision.mockReturnValue(localState);

    const result = await runTriageWithFacade(flowInput);

    expect(result).toEqual(localState);
    expect(mockRunDecision).toHaveBeenCalledTimes(1);
  });

  it('uses API result when feature flag is enabled and response is valid', async () => {
    vi.stubEnv('VITE_FEATURE_DECISION_API', 'true');
    mockRunDecision.mockReturnValue(localState);
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        traceId: 'trace_123',
        data: {
          ...localState,
          answers: { q1: 'Não' },
        },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await runTriageWithFacade(flowInput);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      ...localState,
      answers: { q1: 'Não' },
    });
    expect(mockRunDecision).not.toHaveBeenCalled();
  });

  it('falls back to local triage when API fails', async () => {
    vi.stubEnv('VITE_FEATURE_DECISION_API', 'true');
    mockRunDecision.mockReturnValue(localState);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({}),
      }),
    );

    const result = await runTriageWithFacade(flowInput);

    expect(result).toEqual(localState);
    expect(mockRunDecision).toHaveBeenCalledTimes(1);
  });
});
