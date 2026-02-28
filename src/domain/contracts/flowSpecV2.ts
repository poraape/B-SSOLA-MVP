export type RiskLevelV2 = "MODERATE" | "HIGH" | "CRITICAL";

export interface FlowSpecMetaV2 {
  readonly id: string;
  readonly categoryId: string;
  readonly subcategoryId: string;
  readonly title: string;
  readonly description: string;
  readonly severity: RiskLevelV2;
  readonly keywords: readonly string[];
  readonly status: string;
}

export interface RiskSignalV2 {
  readonly id: string;
  readonly label: string;
  readonly examples?: readonly string[];
  readonly weight: 1 | 2 | 3;
}

export interface EscalationRuleV2 {
  readonly id: string;
  readonly ifAll?: readonly string[];
  readonly ifAny?: readonly string[];
  readonly then: {
    readonly riskLevel: RiskLevelV2;
    readonly outcome?: string;
    readonly flags?: readonly string[];
  };
  readonly rationale: string;
}

export interface FlowRiskModelV2 {
  readonly modelVersion: "risk-heuristic-v1" | "2.0";
  readonly baselineSeverity: RiskLevelV2;
  readonly escalationRules: readonly EscalationRuleV2[];
  readonly protectiveFactors: readonly string[];
  readonly riskSignals: readonly RiskSignalV2[];
  readonly recommendedActionsByRisk: {
    readonly MODERATE: readonly string[];
    readonly HIGH: readonly string[];
    readonly CRITICAL: readonly string[];
  };
  readonly recommendedServiceTagsByRisk: {
    readonly MODERATE: readonly string[];
    readonly HIGH: readonly string[];
    readonly CRITICAL: readonly string[];
  };
}

export interface StepActionV2 {
  readonly label: string;
  readonly next: string;
}

export interface StepV2 {
  readonly id: string;
  readonly type: "alert" | "question" | "action";
  readonly content?: string;
  readonly action?: string;
  readonly question?: string;
  readonly actions?: readonly StepActionV2[];
  readonly riskSignals: readonly string[];
}

export interface OutcomeV2 {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly actions: readonly string[];
  readonly timeline: "Imediato" | "Horas" | "Dias" | "Continuo" | string;
  readonly riskLevel: RiskLevelV2;
  readonly serviceTags?: readonly string[];
  readonly flags: readonly string[];
}

export interface FlowSpecV2 {
  readonly meta: FlowSpecMetaV2;
  readonly risk: FlowRiskModelV2;
  readonly steps: readonly StepV2[];
  readonly outcomes: readonly OutcomeV2[];
  readonly network?: unknown;
}
