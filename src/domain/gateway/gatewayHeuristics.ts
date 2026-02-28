export type GatewayAnswer = 'yes' | 'no' | 'unsure';

export type GatewaySignal =
  | 'loss_of_consciousness'
  | 'immediate_physical_threat'
  | 'severe_bleeding'
  | 'imminent_integrity_risk';

export type GatewayRoute = 'emergency' | 'categories';

export interface GatewayDecision {
  route: GatewayRoute;
  explanation: string;
  score: number;
}

export const SIGNAL_WEIGHTS: Record<GatewaySignal, number> = {
  loss_of_consciousness: 2,
  immediate_physical_threat: 2,
  severe_bleeding: 2,
  imminent_integrity_risk: 1,
};

export const evaluateMacroRisk = (answer: GatewayAnswer, selectedSignals: GatewaySignal[]): GatewayDecision => {
  if (answer === 'yes') {
    return {
      route: 'emergency',
      explanation: 'Usuário identificou risco imediato.',
      score: 2,
    };
  }

  if (answer === 'no') {
    return {
      route: 'categories',
      explanation: 'Usuário não identificou risco imediato.',
      score: 0,
    };
  }

  const score = selectedSignals.reduce((total, signal) => total + SIGNAL_WEIGHTS[signal], 0);

  if (score >= 1) {
    return {
      route: 'emergency',
      explanation: 'Sinal crítico identificado.',
      score,
    };
  }

  return {
    route: 'categories',
    explanation: 'Nenhum sinal crítico detectado.',
    score,
  };
};
