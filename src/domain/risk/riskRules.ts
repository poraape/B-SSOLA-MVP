import { PremiumResult } from '../flows/premiumEngine';
import { Flow } from '../../types';

export interface RiskAdjustment {
  priority?: 'low' | 'moderate' | 'high' | 'critical';
  forceNotify?: boolean;
  additionalScript?: string[];
}

const PRIORITY_ORDER: Array<'low' | 'moderate' | 'high' | 'critical'> = ['low', 'moderate', 'high', 'critical'];

export function applyRiskHeuristics(
  result: PremiumResult,
  flow: Flow
): PremiumResult {
  if (!result.priority) {
    result.priority = 'low';
  }

  const adjusted: PremiumResult = {
    ...result,
    institutionalScript: [...(result.institutionalScript || [])]
  };
  const adjustments: RiskAdjustment = {};

  if (flow.meta.type === 'medical_emergency' || flow.meta.type === 'security_emergency') {
    if (adjusted.priority === 'low' || adjusted.priority === 'moderate') {
      adjustments.priority = 'high';
    }

    adjustments.forceNotify = true;
    adjustments.additionalScript = [
      'Acionar imediatamente protocolo de emergência e comunicação com a gestão.'
    ];
  }

  if (adjusted.priority === 'critical') {
    adjustments.forceNotify = true;
  }

  if (
    flow.meta.type === 'standard' &&
    adjusted.priority === 'low' &&
    flow.meta.categoryId.includes('emergencia')
  ) {
    adjustments.priority = 'moderate';
  }

  if (adjustments.priority) {
    const currentIndex = PRIORITY_ORDER.indexOf(adjusted.priority);
    const newIndex = PRIORITY_ORDER.indexOf(adjustments.priority);

    if (newIndex > currentIndex) {
      adjusted.priority = adjustments.priority;
    }
  }

  if (adjustments.forceNotify) {
    adjusted.notifyManagement = true;
  }

  if (adjustments.additionalScript?.length) {
    adjusted.institutionalScript = [
      ...(adjusted.institutionalScript || []),
      ...adjustments.additionalScript
    ];
  }

  return adjusted;
}
