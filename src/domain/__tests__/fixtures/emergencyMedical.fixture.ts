import { PremiumResult } from '../../flows/premiumEngine';
import { Flow } from '../../../types';

export const emergencyFlow: Flow = {
  meta: {
    id: 'flow_emergency_test',
    categoryId: 'emergencia_medica',
    subcategory: 'teste',
    type: 'medical_emergency',
    title: 'Teste Emergência',
    keywords: []
  },
  riskModel: { usedLevels: ['low', 'moderate', 'high', 'critical'], defaultLevel: 'low' },
  triage: { maxQuestions: 1, questions: [] },
  results: {}
};

export const emergencyResult: PremiumResult = {
  severity: 'baixo',
  priority: 'low',
  primaryService: null,
  secondaryService: null,
  schoolActions: [],
  notifyManagement: false,
  institutionalScript: []
};
