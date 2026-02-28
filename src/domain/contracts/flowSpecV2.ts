export type RiskLevelV2 = "MODERATE" | "HIGH" | "CRITICAL";

export interface FlowSpecMetaV2 {
  id: string;
  categoryId: string;
  subcategoryId: string;
  title: string;
  description: string;
  severity: RiskLevelV2;
  keywords: string[];
  status: string;
}

export interface RiskSignalV2 {
  id: string;
  label: string;
  examples?: string[];
  weight: 1 | 2 | 3;
}

export interface EscalationRuleV2 {
  id: string;
  ifAll?: string[];
  ifAny?: string[];
  then: {
    riskLevel: RiskLevelV2;
    outcome?: string;
    flags?: string[];
  };
  rationale: string;
}

export interface FlowRiskModelV2 {
  modelVersion: "risk-heuristic-v1" | "2.0";
  baselineSeverity: RiskLevelV2;
  escalationRules: EscalationRuleV2[];
  protectiveFactors: string[];
  riskSignals: RiskSignalV2[];
  recommendedActionsByRisk: {
    MODERATE: string[];
    HIGH: string[];
    CRITICAL: string[];
  };
  recommendedServiceTagsByRisk: {
    MODERATE: string[];
    HIGH: string[];
    CRITICAL: string[];
  };
}

export interface StepActionV2 {
  label: string;
  next: string;
}

export interface StepV2 {
  id: string;
  type: "alert" | "question" | "action";
  content?: string;
  action?: string;
  question?: string;
  actions?: StepActionV2[];
  riskSignals: string[];
}

export interface OutcomeV2 {
  id: string;
  label: string;
  description: string;
  actions: string[];
  timeline: "Imediato" | "Horas" | "Dias" | "Continuo" | string;
  riskLevel: RiskLevelV2;
  serviceTags?: string[];
  flags: string[];
}

export interface FlowSpecV2 {
  meta: FlowSpecMetaV2;
  risk: FlowRiskModelV2;
  steps: StepV2[];
  outcomes: OutcomeV2[];
  network?: unknown;
}
