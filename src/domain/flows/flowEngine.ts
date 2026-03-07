import { Flow, TriageResult } from '../../types';

export interface FlowState {
  flowId?: string | null;
  currentQuestionId: string | null;
  answers: Record<string, string>;
  result: TriageResult | null;
  isComplete: boolean;
  redirectToCategories?: boolean;
}

/**
 * Inicializa o estado de execução de um fluxo de triagem.
 * @param {Flow} flow - Fluxo que será iniciado.
 * @returns {FlowState} Estado inicial do fluxo.
 */
export const initFlow = (flow: Flow): FlowState => {
  return {
    flowId: flow.meta.id,
    currentQuestionId: flow.triage.questions[0]?.id || null,
    answers: {},
    result: null,
    isComplete: false
  };
};

/**
 * Processa a resposta de uma pergunta e calcula o próximo estado do fluxo.
 * @param {Flow} flow - Fluxo atual com perguntas e resultados.
 * @param {FlowState} state - Estado corrente da sessão de triagem.
 * @param {string} questionId - Identificador da pergunta respondida.
 * @param {string} optionLabel - Rótulo da opção selecionada pelo usuário.
 * @returns {FlowState} Novo estado após aplicar a resposta.
 */
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
      category: flow.meta.categoryId,
      priority: flow.meta.severity || 'A1',
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
    category: flow.meta.categoryId,
    priority: flow.meta.severity || 'A1',
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
