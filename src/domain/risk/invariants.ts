export interface DecisionLike {
  emergency?: boolean;
  priority?: string;
  notifyManagement?: boolean;
  services?: { primary?: any; secondary?: any } | any;
  justification?: string;
}

export type InvariantViolation = { code: string; message: string };

export function checkInvariants(result: DecisionLike): InvariantViolation[] {
  const violations: InvariantViolation[] = [];

  // INV-001: emergência não pode ter prioridade abaixo de HIGH
  if (result.emergency === true) {
    if (!result.priority) {
      violations.push({
        code: 'INV-001',
        message: 'Emergency decisions must include priority at least high.'
      });
    } else {
      const normalizedPriority = result.priority.toLowerCase();
      if (normalizedPriority === 'low' || normalizedPriority === 'medium' || normalizedPriority === 'moderate') {
        violations.push({
          code: 'INV-001',
          message: 'Emergency decisions cannot have low/medium priority.'
        });
      }
    }
  }

  // INV-002: se há primary service, ele deve existir (não null/undefined)
  if (result.services && typeof result.services === 'object' && 'primary' in result.services) {
    if (result.services.primary == null) {
      violations.push({
        code: 'INV-002',
        message: 'Primary service cannot be null or undefined when provided.'
      });
    }
  }

  // INV-003: justification (quando presente) não pode ser string vazia
  if (typeof result.justification === 'string' && result.justification.trim() === '') {
    violations.push({
      code: 'INV-003',
      message: 'Justification cannot be an empty string when provided.'
    });
  }

  // INV-004: notifyManagement deve ser boolean quando presente
  if (
    Object.prototype.hasOwnProperty.call(result, 'notifyManagement') &&
    typeof result.notifyManagement !== 'boolean'
  ) {
    violations.push({
      code: 'INV-004',
      message: 'notifyManagement must be a boolean when provided.'
    });
  }

  return violations;
}

export function assertInvariants(result: DecisionLike): void {
  const v = checkInvariants(result);
  if (v.length) {
    const msg = v.map(x => `${x.code}: ${x.message}`).join(' | ');
    throw new Error(`Invariant violated: ${msg}`);
  }
}
