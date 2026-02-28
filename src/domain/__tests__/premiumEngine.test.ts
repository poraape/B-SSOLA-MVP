import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Category, Flow, Service, TriageResult } from '../../types';

const {
  mockGetServiceById,
  mockApplyRiskHeuristics,
} = vi.hoisted(() => ({
  mockGetServiceById: vi.fn(),
  mockApplyRiskHeuristics: vi.fn((result: unknown) => result),
}));

vi.mock('../flows/selectors', () => ({
  getServiceById: mockGetServiceById,
}));

vi.mock('../risk/riskRules', () => ({
  applyRiskHeuristics: mockApplyRiskHeuristics,
}));

import { enrichPremium } from '../flows/premiumEngine';

function createFlow(type: Flow['meta']['type'] = 'standard'): Flow {
  return {
    meta: {
      id: 'flow_test',
      categoryId: 'categoria_teste',
      subcategory: 'Sub',
      type,
      title: 'Flow',
      keywords: [],
    },
    riskModel: { usedLevels: ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'], defaultLevel: 'LOW' },
    triage: { maxQuestions: 0, questions: [] },
    results: {},
  };
}

function createResult(level: string = 'LOW'): TriageResult {
  return {
    level,
    severity: 'moderado',
    schoolActions: ['Ação 1', 'Ação 2'],
    primaryService: { id: 'srv-internal', name: 'Interno' },
    secondaryService: { id: 'srv-external', name: 'Externo' },
  };
}

describe('Premium Engine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when result is null', () => {
    const out = enrichPremium(null, createFlow());
    expect(out).toBeNull();
  });

  it('calculates low/moderate/high/critical priorities using score rules', () => {
    const category: Category = {
      id: 'categoria_teste',
      label: 'Categoria',
      riskGroup: 'medical',
      icon: 'i',
      subcategories: [],
      isEmergencyCategory: true,
    };

    mockGetServiceById.mockImplementation(() => undefined);

    const low = enrichPremium(createResult('LOW'), createFlow('standard'));
    const moderate = enrichPremium(createResult('MODERATE'), createFlow('standard'));
    const high = enrichPremium(createResult('CRITICAL'), createFlow('standard'));
    const critical = enrichPremium(createResult('HIGH'), createFlow('medical_emergency'), category, true);

    expect(low?.priority).toBe('low');
    expect(moderate?.priority).toBe('moderate');
    expect(high?.priority).toBe('high');
    expect(critical?.priority).toBe('critical');
  });

  it('builds explanation points and splits internal/external services', () => {
    const internalService: Service = {
      id: 'srv-internal',
      name: 'Serviço Interno',
      category: 'institucional',
      type: 'interno',
      contact: { phone: '1' },
      location: { address: 'Rua A', lat: null, lng: null },
    };
    const externalService: Service = {
      id: 'srv-external',
      name: 'Serviço Externo',
      category: 'saude',
      type: 'externo',
      contact: { phone: '2' },
      location: { address: 'Rua B', lat: null, lng: null },
    };

    mockGetServiceById.mockImplementation((id: string) =>
      id === 'srv-internal' ? internalService : externalService
    );

    const out = enrichPremium(createResult('HIGH'), createFlow('security_emergency'));

    expect(out?.explanationPoints).toEqual([
      'Nível de orientação do fluxo: HIGH',
      'Fluxo classificado como emergência de segurança',
    ]);
    expect(out?.institutionalScript).toEqual(['1. Ação 1', '2. Ação 2']);
    expect(out?.internalServicesRelevant).toEqual([internalService]);
    expect(out?.externalServicesRelevant).toEqual([externalService]);
  });

  it('delegates final result to risk heuristics', () => {
    mockGetServiceById.mockImplementation(() => undefined);
    const flow = createFlow();
    const result = createResult('HIGH');

    enrichPremium(result, flow);

    expect(mockApplyRiskHeuristics).toHaveBeenCalledTimes(1);
    expect(mockApplyRiskHeuristics.mock.calls[0]?.[1]).toEqual(flow);
  });
});
