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
}

export const evaluateMacroRisk = (answer: GatewayAnswer, selectedSignals: GatewaySignal[]): GatewayDecision => {
  if (answer === 'yes') {
    return {
      route: 'emergency',
      explanation: 'Usuário identificou risco imediato.',
    };
  }

  if (answer === 'no') {
    return {
      route: 'categories',
      explanation: 'Usuário não identificou risco imediato.',
    };
  }

  const hasCriticalSignal = selectedSignals.length > 0;

  if (hasCriticalSignal) {
    return {
      route: 'emergency',
      explanation: 'Sinal crítico identificado.',
    };
  }

  return {
    route: 'categories',
    explanation: 'Nenhum sinal crítico detectado.',
  };
};
