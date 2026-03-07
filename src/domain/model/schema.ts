import type { AppModel, Category, Flow, RiskGroup, Service } from "../../types";

export type FlowType = "standard" | "medical_emergency" | "security_emergency";

export type { RiskGroup };

export type ModelService = Service;
export type ModelCategory = Category;

export interface ModelResult {
  severity: string;
  primaryService?: string | { id: string; name: string } | null;
  secondaryService?: string | { id: string; name: string } | null;
  schoolActions?: string[];
}

type LegacyFlowCompat = {
  questions?: unknown[];
};

export type ModelFlow = Flow & LegacyFlowCompat;

export type ProtocolModel = AppModel;

