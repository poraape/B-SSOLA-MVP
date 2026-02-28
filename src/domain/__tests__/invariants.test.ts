import { describe, expect, it } from 'vitest';
import { checkInvariants } from '../risk/invariants';

describe('risk invariants', () => {
  const cases: Array<{
    name: string;
    result: any;
    expectedViolationCodes: string[];
  }> = [
    {
      name: 'a) emergency true + priority low => deve violar INV-001',
      result: { emergency: true, priority: 'low' },
      expectedViolationCodes: ['INV-001']
    },
    {
      name: 'b) emergency true + priority high => ok',
      result: { emergency: true, priority: 'high' },
      expectedViolationCodes: []
    },
    {
      name: 'c) priority ausente em emergência => violar INV-001',
      result: { emergency: true },
      expectedViolationCodes: ['INV-001']
    },
    {
      name: 'd) primary null => violar INV-002',
      result: { services: { primary: null } },
      expectedViolationCodes: ['INV-002']
    },
    {
      name: "e) justification '' => violar INV-003",
      result: { justification: '' },
      expectedViolationCodes: ['INV-003']
    },
    {
      name: "f) notifyManagement = 'yes' => violar INV-004",
      result: { notifyManagement: 'yes' },
      expectedViolationCodes: ['INV-004']
    }
  ];

  for (const testCase of cases) {
    it(testCase.name, () => {
      const violations = checkInvariants(testCase.result);
      expect(violations.map(v => v.code)).toEqual(testCase.expectedViolationCodes);
    });
  }
});
