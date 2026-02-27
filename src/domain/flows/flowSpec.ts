export interface FlowSpecMeta {
  id: string;
  categoryId: string;
  subcategoryId: string;
  title: string;
  description: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE";
  keywords: string[];
  status: string;
}

export interface RiskSignal {
  id: string;
  label: string;
  examples?: string[];
  weight: 1 | 2 | 3;
}

export interface EscalationRule {
  id: string;
  ifAll?: string[];
  ifAny?: string[];
  then: {
    riskLevel: "MODERATE" | "HIGH" | "CRITICAL";
    outcome?: string;
    flags?: string[];
  };
  rationale: string;
}

export interface FlowRiskModel {
  modelVersion: "risk-heuristic-v1";
  baselineSeverity: "MODERATE" | "HIGH" | "CRITICAL";
  escalationRules: EscalationRule[];
  protectiveFactors: string[];
  riskSignals: RiskSignal[];
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

export interface FlowSpecStepAction {
  label: string;
  next: string;
}

export interface FlowSpecStep {
  id: string;
  type: "alert" | "question" | "action";
  content?: string;
  action?: string;
  question?: string;
  actions?: FlowSpecStepAction[];
  riskSignals?: string[];
}

export interface FlowSpecOutcome {
  id: string;
  label: string;
  description: string;
  actions: string[];
  timeline: "Imediato" | "Horas" | "Dias" | "Continuo" | string;
  riskLevel: "MODERATE" | "HIGH" | "CRITICAL";
  serviceTags?: string[];
  flags?: string[];
}

export interface FlowSpec {
  meta: FlowSpecMeta;
  risk?: FlowRiskModel;
  steps: FlowSpecStep[];
  outcomes: FlowSpecOutcome[];
}
