import baseModelV1 from "../../../data/model.v1.json";
import categoriesData from "../../../data/v2/categories.json";
import emergencyData from "../../../data/v2/emergency.json";
import heuristicsData from "../../../data/v2/heuristics.json";
import servicesData from "../../../data/v2/services.json";
import flowSpecRegistry from "../../../../docs/domain/flows-v2-spec.json";
import type { FlowSpec } from "../../flows/flowSpec";
import type { AppModel, Category, Flow, RiskGroup, Service } from "../../../types";

const flowModules = import.meta.glob("../../flows/flow_*.ts", { eager: true });

type FlowType = "standard" | "medical_emergency" | "security_emergency";

interface RawCategory {
  id?: unknown;
  label?: unknown;
  riskGroup?: unknown;
  icon?: unknown;
  color?: unknown;
  description?: unknown;
  isEmergencyCategory?: unknown;
  subcategories?: unknown;
}

interface SpecRegistryFlow {
  id: string;
  categoryId: string;
  subcategoryId: string;
  status: string;
  severity: "CRITICAL" | "HIGH" | "MODERATE";
}

interface SpecRegistry {
  flows: SpecRegistryFlow[];
  draftFlowSpecs?: FlowSpec[];
}

const ALLOWED_RISK_GROUPS = new Set<RiskGroup>([
  "violence",
  "psychosocial",
  "medical",
  "social",
  "rights",
  "structural",
  "emergency",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function ensureRecord(value: unknown, message: string): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new Error(message);
  }
  return value;
}

function ensureString(value: unknown, message: string): string {
  if (!isString(value)) {
    throw new Error(message);
  }
  return value.trim();
}

function parseCategories(raw: unknown): Category[] {
  if (!Array.isArray(raw)) {
    throw new Error("src/data/v2/categories.json invalido: esperado array de categorias.");
  }

  return raw.map((item, index) => {
    const cat = item as RawCategory;

    const id = ensureString(cat.id, `Categoria[${index}] invalida: "id" obrigatorio.`);
    const label = ensureString(cat.label, `Categoria "${id}" invalida: "label" obrigatorio.`);
    const icon = ensureString(cat.icon, `Categoria "${id}" invalida: "icon" obrigatorio.`);
    const riskGroup = ensureString(
      cat.riskGroup,
      `Categoria "${id}" invalida: "riskGroup" obrigatorio.`
    ) as RiskGroup;

    if (!ALLOWED_RISK_GROUPS.has(riskGroup)) {
      throw new Error(`Categoria "${id}" invalida: riskGroup "${riskGroup}" nao suportado.`);
    }

    if (!Array.isArray(cat.subcategories)) {
      throw new Error(`Categoria "${id}" invalida: "subcategories" deve ser array.`);
    }

    const subcategories = cat.subcategories.map((sub, subIndex) => {
      const subRecord = ensureRecord(
        sub,
        `Categoria "${id}" invalida: subcategory[${subIndex}] deve ser objeto.`
      );

      return {
        id: ensureString(
          subRecord.id,
          `Categoria "${id}" invalida: subcategory[${subIndex}].id obrigatorio.`
        ),
        label: ensureString(
          subRecord.label,
          `Categoria "${id}" invalida: subcategory[${subIndex}].label obrigatorio.`
        ),
      };
    });

    return {
      id,
      label,
      icon,
      riskGroup,
      color: isString(cat.color) ? cat.color : undefined,
      description: isString(cat.description) ? cat.description : undefined,
      isEmergencyCategory: Boolean(cat.isEmergencyCategory),
      subcategories,
    };
  });
}

function buildCategorySubIndex(categories: Category[]): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>();

  for (const category of categories) {
    if (index.has(category.id)) {
      throw new Error(`Categorias invalidas: categoryId duplicado "${category.id}".`);
    }

    const subIds = new Set<string>();
    for (const sub of category.subcategories) {
      if (subIds.has(sub.id)) {
        throw new Error(
          `Categorias invalidas: subcategoryId duplicado "${sub.id}" em "${category.id}".`
        );
      }
      subIds.add(sub.id);
    }

    index.set(category.id, subIds);
  }

  return index;
}

function validateFlowSpec(flow: FlowSpec, index: number): void {
  if (!isRecord(flow.meta)) {
    throw new Error(`FlowSpec[${index}] invalido: meta ausente.`);
  }

  ensureString(flow.meta.id, `FlowSpec[${index}] invalido: meta.id obrigatorio.`);
  ensureString(flow.meta.categoryId, `FlowSpec[${index}] invalido: meta.categoryId obrigatorio.`);
  ensureString(
    flow.meta.subcategoryId,
    `FlowSpec[${index}] invalido: meta.subcategoryId obrigatorio.`
  );
  ensureString(flow.meta.title, `FlowSpec[${index}] invalido: meta.title obrigatorio.`);
  ensureString(flow.meta.description, `FlowSpec[${index}] invalido: meta.description obrigatorio.`);

  if (!Array.isArray(flow.meta.keywords)) {
    throw new Error(`FlowSpec "${flow.meta.id}" invalido: meta.keywords deve ser array.`);
  }

  if (!Array.isArray(flow.steps)) {
    throw new Error(`FlowSpec "${flow.meta.id}" invalido: steps deve ser array.`);
  }

  if (!Array.isArray(flow.outcomes)) {
    throw new Error(`FlowSpec "${flow.meta.id}" invalido: outcomes deve ser array.`);
  }

  for (const step of flow.steps) {
    if (!step || !isString(step.id)) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: step.id obrigatorio.`);
    }

    if (step.type !== "alert" && step.type !== "question" && step.type !== "action") {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: step.type nao suportado.`);
    }

    if (step.type === "question") {
      if (!isString(step.question)) {
        throw new Error(`FlowSpec "${flow.meta.id}" invalido: question obrigatoria.`);
      }
      if (!Array.isArray(step.actions) || step.actions.length === 0) {
        throw new Error(`FlowSpec "${flow.meta.id}" invalido: question.actions obrigatorias.`);
      }
      for (const action of step.actions) {
        if (!isString(action.label) || !isString(action.next)) {
          throw new Error(
            `FlowSpec "${flow.meta.id}" invalido: actions exigem label e next.`
          );
        }
      }
    }
  }

  for (const outcome of flow.outcomes) {
    if (!outcome || !isString(outcome.id)) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: outcome.id obrigatorio.`);
    }
    if (!isString(outcome.label) || !isString(outcome.description)) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: outcome label/description obrigatorios.`);
    }
    if (!Array.isArray(outcome.actions)) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: outcome.actions deve ser array.`);
    }
    if (!isString(outcome.timeline)) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: outcome.timeline obrigatorio.`);
    }
  }
}

function extractGeneratedSpecs(): FlowSpec[] {
  const specs: FlowSpec[] = [];

  for (const [path, mod] of Object.entries(flowModules)) {
    const moduleRecord = ensureRecord(mod, `Modulo invalido (${path}).`);

    let found: FlowSpec | null = null;
    for (const value of Object.values(moduleRecord)) {
      if (
        isRecord(value) &&
        isRecord(value.meta) &&
        Array.isArray(value.steps) &&
        Array.isArray(value.outcomes)
      ) {
        found = value as unknown as FlowSpec;
        break;
      }
    }

    if (!found) {
      throw new Error(`FlowSpec nao encontrado em ${path}.`);
    }

    specs.push(found);
  }

  return specs;
}

function typeFromSpec(flow: FlowSpec): FlowType {
  if (flow.meta.categoryId === "emergencias_seguranca") {
    if (
      flow.meta.subcategoryId === "emergencia_medica" ||
      flow.meta.subcategoryId === "convulsao_perda_consciencia"
    ) {
      return "medical_emergency";
    }
    return "security_emergency";
  }

  if (flow.meta.severity === "CRITICAL" && flow.meta.categoryId === "saude_bem_estar") {
    return "medical_emergency";
  }

  return "standard";
}

function defaultLevelBySeverity(severity: string): string {
  if (severity === "CRITICAL") return "iminente";
  if (severity === "HIGH") return "alto";
  return "moderado";
}

function levelPoolBySeverity(severity: string): string[] {
  if (severity === "CRITICAL") return ["alto", "iminente", "critico"];
  if (severity === "HIGH") return ["moderado", "alto", "alto_2"];
  return ["baixo", "moderado", "alto"];
}

function normalizeToFlow(flow: FlowSpec): Flow {
  const outcomeLevelMap = new Map<string, string>();
  const levels = levelPoolBySeverity(flow.meta.severity);

  flow.outcomes.forEach((outcome, index) => {
    outcomeLevelMap.set(outcome.id, levels[index] || `nivel_${index + 1}`);
  });

  const questionSteps = flow.steps.filter(step => step.type === "question");
  const triageQuestions = questionSteps.map(step => ({
    id: step.id,
    text: step.question || "",
    options: (step.actions || []).map(action => {
      const next = action.next;
      const targetLevel = outcomeLevelMap.get(next);

      if (targetLevel) {
        return {
          label: action.label,
          level: targetLevel,
        };
      }

      if (next.startsWith("flow_")) {
        return {
          label: action.label,
          nextFlow: next,
        };
      }

      return {
        label: action.label,
        next,
      };
    }),
  }));

  const results: Flow["results"] = {};
  flow.outcomes.forEach(outcome => {
    const key = outcomeLevelMap.get(outcome.id) || `nivel_${Object.keys(results).length + 1}`;
    results[key] = {
      severity: key,
      primaryService: null,
      secondaryService: null,
      schoolActions: outcome.actions,
      summaryTag: outcome.label,
    };
  });

  const usedLevels = Object.keys(results);

  return {
    meta: {
      id: flow.meta.id,
      categoryId: flow.meta.categoryId,
      subcategory: flow.meta.subcategoryId,
      type: typeFromSpec(flow),
      title: flow.meta.title,
      keywords: flow.meta.keywords,
    },
    riskModel: {
      usedLevels,
      defaultLevel: usedLevels[0] || defaultLevelBySeverity(flow.meta.severity),
    },
    triage: {
      maxQuestions: triageQuestions.length,
      questions: triageQuestions,
    },
    results,
  };
}

function validateFlowRelations(flows: Flow[], categorySubIndex: Map<string, Set<string>>): void {
  const seenFlowIds = new Set<string>();

  for (const flow of flows) {
    const flowId = flow.meta.id;

    if (seenFlowIds.has(flowId)) {
      throw new Error(`Flows invalidos: flowId duplicado "${flowId}".`);
    }
    seenFlowIds.add(flowId);

    const subIds = categorySubIndex.get(flow.meta.categoryId);
    if (!subIds) {
      throw new Error(
        `Flow "${flowId}" invalido: categoryId "${flow.meta.categoryId}" nao existe em categories.json.`
      );
    }

    if (!subIds.has(flow.meta.subcategory)) {
      throw new Error(
        `Flow "${flowId}" invalido: subcategoryId "${flow.meta.subcategory}" nao existe na categoria "${flow.meta.categoryId}".`
      );
    }
  }
}

function validateExtensionsShape(): void {
  if (!isRecord(emergencyData)) {
    throw new Error("src/data/v2/emergency.json invalido: esperado objeto.");
  }

  if (!isRecord(heuristicsData)) {
    throw new Error("src/data/v2/heuristics.json invalido: esperado objeto.");
  }

  if (!Array.isArray(servicesData)) {
    throw new Error("src/data/v2/services.json invalido: esperado array.");
  }
}

function mergeAndValidateSpecs(): FlowSpec[] {
  const registry = flowSpecRegistry as SpecRegistry;
  if (!Array.isArray(registry.flows)) {
    throw new Error("docs/domain/flows-v2-spec.json invalido: flows deve ser array.");
  }

  const generated = extractGeneratedSpecs();
  const drafts = Array.isArray(registry.draftFlowSpecs) ? registry.draftFlowSpecs : [];
  const merged = [...generated, ...drafts];

  if (merged.length !== 39) {
    throw new Error(
      `Quantidade invalida de specs: esperado 39, recebido ${merged.length}.`
    );
  }

  const byId = new Map<string, FlowSpec>();
  merged.forEach((spec, index) => {
    validateFlowSpec(spec, index);

    if (byId.has(spec.meta.id)) {
      throw new Error(`FlowSpec duplicado: "${spec.meta.id}".`);
    }
    byId.set(spec.meta.id, spec);
  });

  for (const row of registry.flows) {
    const spec = byId.get(row.id);
    if (!spec) {
      throw new Error(`Flow sem spec detalhada: "${row.id}".`);
    }

    if (spec.meta.categoryId !== row.categoryId) {
      throw new Error(`Flow "${row.id}" com categoryId divergente do registry.`);
    }

    if (spec.meta.subcategoryId !== row.subcategoryId) {
      throw new Error(`Flow "${row.id}" com subcategoryId divergente do registry.`);
    }

    if (spec.meta.status !== row.status) {
      throw new Error(`Flow "${row.id}" com status divergente do registry.`);
    }

    if (spec.meta.severity !== row.severity) {
      throw new Error(`Flow "${row.id}" com severity divergente do registry.`);
    }
  }

  return registry.flows.map(row => byId.get(row.id) as FlowSpec);
}

export function composeModelV2(): AppModel {
  validateExtensionsShape();

  const categories = parseCategories(categoriesData);
  const categorySubIndex = buildCategorySubIndex(categories);

  const specs = mergeAndValidateSpecs();
  const flows = specs.map(normalizeToFlow);

  validateFlowRelations(flows, categorySubIndex);

  const base = baseModelV1 as AppModel;

  return {
    ...base,
    categories,
    services: servicesData as Service[],
    flows,
  };
}
