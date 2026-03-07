import { PremiumResult } from '../flows/premiumEngine';
import { Flow } from '../../types';
import { riskRules } from './ruleset';
import { computeRiskScore, minPriorityForScore } from './riskScore';

const PRIORITY_ORDER: Array<'low' | 'moderate' | 'high' | 'critical'> = ['low', 'moderate', 'high', 'critical'];
type RiskDiagnostics = {
  riskScore?: number;
  riskScoreFactors?: string[];
};

export function applyRiskHeuristics(
  result: PremiumResult,
  flow: Flow
): PremiumResult {
  if (!result.priority) {
    result.priority = 'low';
  }

  const adjusted: PremiumResult & RiskDiagnostics = {
    ...result,
    institutionalScript: [...(result.institutionalScript || [])]
  };
  const appliedRules: string[] = [];

  const score = computeRiskScore(adjusted, flow);
  const minPriority = minPriorityForScore(score.total);

  if (minPriority) {
    const currentIndex = PRIORITY_ORDER.indexOf(adjusted.priority || 'low');
    const minIndex = PRIORITY_ORDER.indexOf(minPriority);
    if (minIndex > currentIndex) {
      adjusted.priority = minPriority;
      adjusted.institutionalScript = [
        ...(adjusted.institutionalScript || []),
        'Atenção: sinais combinados elevam o nível de prioridade desta orientação.'
      ];
    }
  }

  if (score.total >= 5) {
    adjusted.notifyManagement = true;
  }

  for (const rule of riskRules) {
    if (rule.condition(adjusted, flow)) {
      const beforePriority = adjusted.priority;

      rule.apply(adjusted);

      if (beforePriority && adjusted.priority) {
        const beforeIndex = PRIORITY_ORDER.indexOf(beforePriority);
        const afterIndex = PRIORITY_ORDER.indexOf(adjusted.priority);

        if (afterIndex < beforeIndex) {
          adjusted.priority = beforePriority;
        }
      }

      appliedRules.push(rule.code);
    }
  }

  if (flow.meta.type === 'medical_emergency' || flow.meta.type === 'security_emergency') {
    adjusted.notifyManagement = true;
    adjusted.institutionalScript = [
      ...(adjusted.institutionalScript || []),
      'Acionar imediatamente protocolo de emergência e comunicação com a gestão.'
    ];
  }

  adjusted.appliedRules = [
    ...(adjusted.appliedRules || []),
    ...appliedRules
  ];

  adjusted.riskScore = score.total;
  adjusted.riskScoreFactors = score.factors.map(f => f.code);

  return adjusted as PremiumResult;
}
