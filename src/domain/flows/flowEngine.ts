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

  if (option.redirectToCategories) {
    return {
      ...state,
      flowId: null,
      redirectToCategories: true
    };
  }

  const newAnswers = { ...state.answers, [questionId]: optionLabel };

  if (option.level) {
    const baseResult = flow.results[option.level] || null;

    return {
      ...state,
      answers: newAnswers,
      result: baseResult
        ? { ...baseResult, level: option.level }
        : null,
      isComplete: true,
      currentQuestionId: null
    };
  }

  if (option.next) {
    return {
      ...state,
      answers: newAnswers,
      currentQuestionId: option.next
    };
  }

  return state;
};
