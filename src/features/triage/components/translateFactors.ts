// Tradução de códigos técnicos do motor para linguagem institucional PT-BR
const FACTOR_MAP: Record<string, string> = {
  SEVERITY_HIGH: 'gravidade alta identificada',
  SEVERITY_CRITICAL: 'gravidade crítica identificada',
  SEVERITY_LOW: 'gravidade baixa identificada',
  SEVERITY_MODERATE: 'gravidade moderada identificada',
  FLOW_EMERGENCY: 'situação de emergência detectada',
  RISK_GROUP_VIOLENCE: 'indicadores de violência presentes',
  RISK_GROUP_PSYCHOSOCIAL: 'fatores psicossociais identificados',
  RISK_GROUP_MEDICAL: 'questão de saúde identificada',
  RISK_GROUP_SOCIAL: 'vulnerabilidade social detectada',
  FLAG_IMMEDIATE: 'requer ação imediata',
  FLAG_MANAGEMENT: 'notificar gestão recomendado',
};

export function translateFactor(code: string): string {
  const key = Object.keys(FACTOR_MAP).find(k => code.includes(k));
  return key ? FACTOR_MAP[key] : code.toLowerCase().replace(/_/g, ' ');
}

export function getTopFactors(appliedRules: string[], max = 3): string[] {
  return appliedRules.slice(0, max).map(translateFactor);
}
