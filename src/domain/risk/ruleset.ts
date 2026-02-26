import { PremiumResult } from '../flows/premiumEngine';
import { Flow } from '../../types';

export interface RiskRule {
  code: string;
  condition: (result: PremiumResult, flow: Flow) => boolean;
  apply: (result: PremiumResult) => void;
}

export const riskRules: RiskRule[] = [
  {
    code: 'EMERGENCY_FORCE_HIGH',
    condition: (result, flow) =>
      (flow.meta.type === 'medical_emergency' ||
       flow.meta.type === 'security_emergency') &&
      (result.priority === 'low' || result.priority === 'moderate'),
    apply: result => {
      result.priority = 'high';
      result.notifyManagement = true;
    }
  },
  {
    code: 'CRITICAL_FORCE_NOTIFY',
    condition: result =>
      result.priority === 'critical',
    apply: result => {
      result.notifyManagement = true;
    }
  },
  {
    code: 'CATEGORY_EMERGENCY_BUMP',
    condition: (result, flow) =>
      flow.meta.type === 'standard' &&
      result.priority === 'low' &&
      flow.meta.categoryId.includes('emergencia'),
    apply: result => {
      result.priority = 'moderate';
    }
  }
];
