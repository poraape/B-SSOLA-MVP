import { TriageResult, Flow, Category, Service } from '../../types';
import { getServiceById } from './selectors';
import { applyRiskHeuristics } from '../risk/riskRules';

export interface PremiumResult extends TriageResult {
  priority?: 'low' | 'moderate' | 'high' | 'critical';
  explanationPoints?: string[];
  institutionalScript?: string[];
  internalServicesRelevant?: Service[];
  externalServicesRelevant?: Service[];
  appliedRules?: string[];
}

function calculatePriority(params: {
  result: TriageResult;
  flow: Flow;
  category?: Category;
  guardrailTriggered?: boolean;
}): PremiumResult['priority'] {
  const { result, flow, category, guardrailTriggered } = params;

  const levelMap: Record<string, number> = { LOW: 1, MODERATE: 2, HIGH: 3, CRITICAL: 4 };
  let score = levelMap[result.level || 'LOW'] || 1;

  if (flow.meta.type === 'medical_emergency') score += 2;
  if (flow.meta.type === 'security_emergency') score += 2;

  if (category?.isEmergencyCategory) score += 1;
  if (guardrailTriggered) score += 2;

  if (score >= 6) return 'critical';
  if (score >= 4) return 'high';
  if (score >= 2) return 'moderate';
  return 'low';
}

function buildExplanationPoints(result: TriageResult, flow: Flow): string[] {
  const pts: string[] = [];

  // Minimalista e confiável (sem inventar dado)
  if (result.level) pts.push(`Nível de orientação do fluxo: ${result.level}`);
  if (flow.meta.type === 'medical_emergency') pts.push('Fluxo classificado como emergência médica');
  if (flow.meta.type === 'security_emergency') pts.push('Fluxo classificado como emergência de segurança');

  // Transparência parcial: até 3 pontos
  return pts.slice(0, 3);
}

function resolveRelevantServices(result: TriageResult): { internal: Service[]; external: Service[] } {
  const ids = [result.primaryService?.id, result.secondaryService?.id].filter(Boolean) as string[];
  const services = ids.map(getServiceById).filter(Boolean) as Service[];

  const internal = services.filter(s => s.type === 'interno' || s.category === 'institucional');
  const external = services.filter(s => !(s.type === 'interno' || s.category === 'institucional'));

  return { internal, external };
}

export function enrichPremium(
  result: TriageResult | null,
  flow: Flow,
  category?: Category,
  guardrailTriggered?: boolean
): PremiumResult | null {
  if (!result) return null;

  const priority = calculatePriority({ result, flow, category, guardrailTriggered });
  const explanationPoints = buildExplanationPoints(result, flow);

  const { internal, external } = resolveRelevantServices(result);

  // Roteiro institucional: reaproveita schoolActions como “etapas”
  const script = (result.schoolActions || []).map((s, i) => `${i + 1}. ${s}`);

  const enriched = {
    ...result,
    priority,
    explanationPoints,
    institutionalScript: script,
    internalServicesRelevant: internal,
    externalServicesRelevant: external
  };

  return applyRiskHeuristics(enriched, flow);
}
