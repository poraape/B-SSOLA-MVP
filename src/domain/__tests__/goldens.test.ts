import { describe, it, expect } from 'vitest';
import { applyRiskHeuristics } from '../risk/riskRules';
import { emergencyFlow, emergencyResult } from './fixtures/emergencyMedical.fixture';
import { baselineFlow, baselineResult } from './fixtures/baseline.fixture';
import fs from 'fs';
import path from 'path';

function loadGolden(name: string) {
  const filePath = path.join(
    __dirname,
    'goldens',
    name
  );
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('Golden Institutional Baseline Tests', () => {

  it('Emergency medical baseline must match golden', () => {
    const result = applyRiskHeuristics(
      { ...emergencyResult },
      emergencyFlow
    );

    const golden = loadGolden('emergency_medical.json');

    expect({
      priority: result.priority,
      notifyManagement: result.notifyManagement
    }).toEqual(golden);
  });

  it('Standard baseline must match golden', () => {
    const result = applyRiskHeuristics(
      { ...baselineResult },
      baselineFlow
    );

    const golden = loadGolden('baseline_standard.json');

    expect({
      priority: result.priority,
      notifyManagement: result.notifyManagement
    }).toEqual(golden);
  });

  it('Critical baseline must match golden', () => {
    const result = applyRiskHeuristics(
      { ...emergencyResult, priority: 'critical' },
      emergencyFlow
    );

    const golden = loadGolden('critical_case.json');

    expect({
      priority: result.priority,
      notifyManagement: result.notifyManagement
    }).toEqual(golden);
  });

});
