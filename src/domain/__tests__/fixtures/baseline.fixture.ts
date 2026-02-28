import { PremiumResult } from '../../flows/premiumEngine';
import { Flow } from '../../../types';

export const baselineFlow: Flow = {
  meta: {
    id: 'flow_standard_test',
    categoryId: 'convivencia',
    subcategory: 'teste',
    type: 'standard',
    title: 'Teste Padrão',
    keywords: []
  },
  riskModel: { usedLevels: ['low', 'moderate', 'high', 'critical'], defaultLevel: 'low' },
  triage: { maxQuestions: 1, questions: [] },
  results: {}
};

export const baselineResult: PremiumResult = {
  severity: 'baixo',
  priority: 'low',
  primaryService: null,
  secondaryService: null,
  schoolActions: [],
  notifyManagement: false,
  institutionalScript: []
};
