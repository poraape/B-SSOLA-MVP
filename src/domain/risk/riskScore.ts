import { Flow, RiskGroup } from '../../types';
import { PremiumResult } from '../flows/premiumEngine';
import { model } from '../model/loadModel';

export interface RiskScoreBreakdown {
  total: number;
  factors: Array<{ code: string; points: number }>;
}

const GROUP_POINTS: Record<RiskGroup, number> = {
  emergency: 3,
  violence: 3,
  psychosocial: 2,
  medical: 2,
  rights: 2,
  structural: 1,
  social: 1
};

function addFactor(b: RiskScoreBreakdown, code: string, points: number) {
  if (points <= 0) return;
  b.total += points;
  b.factors.push({ code, points });
}

export function computeRiskScore(result: PremiumResult, flow: Flow): RiskScoreBreakdown {
  const breakdown: RiskScoreBreakdown = { total: 0, factors: [] };

  // 1) Severidade (valores reais do JSON do projeto)
  const sev = (result.severity || '').toLowerCase();
  const sevPoints: Record<string, number> = {
    baixo: 1,
    moderado: 2,
    alto: 3,
    critico: 4,
    iminente: 5
  };
  addFactor(breakdown, `SEVERITY_${sev || 'unknown'}`, sevPoints[sev] || 1);

  // 2) Tipo de fluxo (emergências ganham peso, mas sem "pular" para critical sozinho)
  if (flow.meta.type === 'medical_emergency') addFactor(breakdown, 'FLOW_MEDICAL_EMERGENCY', 2);
  if (flow.meta.type === 'security_emergency') addFactor(breakdown, 'FLOW_SECURITY_EMERGENCY', 2);

  // 3) Grupo de risco (desacoplado de categoryId)
  const category = model.categories.find(c => c.id === flow.meta.categoryId);
  const group = category?.riskGroup;

  if (!group) {
    console.warn('Category without riskGroup:', flow.meta.categoryId);
  }

  if (group && GROUP_POINTS[group]) {
    addFactor(breakdown, `RISK_GROUP_${group}`, GROUP_POINTS[group]);
  }

  // 4) UI flags (sinais de cuidado/risco institucional)
  const flags = result.uiFlags || {};
  if (flags.showGuardrail) addFactor(breakdown, 'FLAG_SHOW_GUARDRAIL', 2);
  if (flags.confidential) addFactor(breakdown, 'FLAG_CONFIDENTIAL', 1);
  if (flags.avoidRetraumatization) addFactor(breakdown, 'FLAG_AVOID_RETRAUMATIZATION', 1);

  return breakdown;
}

export function minPriorityForScore(score: number): 'low' | 'moderate' | 'high' | 'critical' {
  if (score >= 8) return 'critical';
  if (score >= 5) return 'high';
  if (score >= 3) return 'moderate';
  return 'low';
}
