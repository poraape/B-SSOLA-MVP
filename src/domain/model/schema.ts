export type FlowType = 'standard' | 'medical_emergency' | 'security_emergency';

export type RiskGroup =
  | 'violence'
  | 'psychosocial'
  | 'medical'
  | 'social'
  | 'rights'
  | 'structural'
  | 'emergency';

export interface ModelService {
  id: string;
  name: string;
  type?: string;
  category?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
}

export interface ModelCategory {
  id: string;
  label: string; // Adjusted from 'name' to match JSON
  riskGroup: RiskGroup;
  isEmergencyCategory?: boolean;
}

export interface ModelResult {
  severity: string;
  primaryService?: string | { id: string; name: string };
  secondaryService?: string | { id: string; name: string };
  schoolActions?: string[];
}

export interface ModelFlow {
  meta: {
    id: string; // Adjusted: id is inside meta in JSON
    title: string;
    type: FlowType;
    categoryId: string;
  };
  questions: any[];
  results: Record<string, ModelResult>;
}

export interface ProtocolModel {
  version: string;
  meta: {
    appName: string;
  };
  categories: ModelCategory[];
  services: ModelService[];
  flows: ModelFlow[];
}
