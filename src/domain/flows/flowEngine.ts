import { Flow, TriageResult } from '../../types';

export interface FlowState {
  flowId?: string | null;
  currentQuestionId: string | null;
  answers: Record<string, string>;
  result: TriageResult | null;
  isComplete: boolean;
  redirectToCategories?: boolean;
}

export const initFlow = (flow: Flow): FlowState => {
  return {
    flowId: flow.meta.id,
    currentQuestionId: flow.triage.questions[0]?.id || null,
    answers: {},
    result: null,
    isComplete: false
  };
};

export const processAnswer = (
  flow: Flow, 
  state: FlowState, 
  questionId: string, 
  optionLabel: string
): FlowState => {
  const question = flow.triage.questions.find(q => q.id === questionId);
  if (!question) return state;

  const option = question.options.find(o => o.label === optionLabel);
  if (!option) return state;

  // 1. Redirect to another flow
  if (option.nextFlow) {
    return {
      ...state,
      flowId: option.nextFlow,
      currentQuestionId: null,
      answers: {},
      result: null,
      isComplete: false
    };
  }

  // 2. Redirect to categories
  if (option.redirectToCategories) {
    return {
      ...state,
      flowId: null,
      redirectToCategories: true
    };
  }

  const newAnswers = { ...state.answers, [questionId]: optionLabel };

  // 3. Terminal option with explicit level
  if (option.level) {
    const baseResult = flow.results[option.level];

    // FIX: Garantir resultado válido mesmo se undefined no flow.results
    const finalResult: TriageResult = baseResult || {
      severity: option.level,
      message: `Resultado para nível: ${option.level}`,
      category: flow.meta.category,
      priority: flow.meta.priority || 'A1',
      protocol: [],
      requiredActions: []
    };

    return {
      ...state,
      answers: newAnswers,
      result: finalResult,
      isComplete: true,
      currentQuestionId: null
    };
  }

  // 4. Advance to next question
  if (option.next) {
    return {
      ...state,
      answers: newAnswers,
      currentQuestionId: option.next
    };
  }

  // 5. Terminal option implícito (sem level, next ou nextFlow)
  const fallbackLevel = flow.riskModel.defaultLevel;
  const fallbackResult = flow.results[fallbackLevel] ?? Object.values(flow.results)[0] ?? {
    severity: fallbackLevel || 'iminente',
    message: 'Fluxo concluído.',
    category: flow.meta.category,
    priority: flow.meta.priority || 'A1',
    protocol: [],
    requiredActions: []
  };

  return {
    ...state,
    answers: newAnswers,
    result: fallbackResult,
    isComplete: true,
    currentQuestionId: null
  };
};
