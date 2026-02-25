import { Flow, TriageResult } from '../../types';

export interface FlowState {
  currentQuestionId: string | null;
  answers: Record<string, string>;
  result: TriageResult | null;
  isComplete: boolean;
}

export const initFlow = (flow: Flow): FlowState => {
  return {
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

  const newAnswers = { ...state.answers, [questionId]: optionLabel };

  if (option.level) {
    return {
      ...state,
      answers: newAnswers,
      result: flow.results[option.level] || null,
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
