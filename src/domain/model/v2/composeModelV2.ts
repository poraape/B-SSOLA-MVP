import baseModelV1 from "../../../data/model.v1.json";
import categoriesData from "../../../data/v2/categories.json";
import emergencyData from "../../../data/v2/emergency.json";
import heuristicsData from "../../../data/v2/heuristics.json";
import servicesData from "../../../data/v2/services.json";
import flowSpecRegistry from "../../../../docs/domain/flows-v2-spec.json";
import type { FlowSpecV2 } from "../../flows/flowSpecV2";
import { buildRuntimeV2 } from "../../flows/runtimeV2";
import { toLegacyFlow } from "../../flows/toLegacyUI";
import type { AppModel, Category, Flow, RiskGroup, Service } from "../../../types";

const flowModules = import.meta.glob("../../flows/flow_*.ts", { eager: true });

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
  draftFlowSpecs?: FlowSpecV2[];
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

function validateFlowSpec(flow: FlowSpecV2, index: number): void {
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

    if (
      step.type !== "alert" &&
      step.type !== "question" &&
      step.type !== "action"
    ) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: step.type nao suportado.`);
    }

    if (!Array.isArray(step.riskSignals)) {
      throw new Error(`FlowSpec "${flow.meta.id}" invalido: step.riskSignals deve ser array.`);
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

function extractGeneratedSpecs(): FlowSpecV2[] {
  const specs: FlowSpecV2[] = [];

  for (const [path, mod] of Object.entries(flowModules)) {
    const moduleRecord = ensureRecord(mod, `Modulo invalido (${path}).`);

    let found: FlowSpecV2 | null = null;
    for (const value of Object.values(moduleRecord)) {
      if (
        isRecord(value) &&
        isRecord(value.meta) &&
        isRecord(value.risk) &&
        Array.isArray(value.steps) &&
        Array.isArray(value.outcomes)
      ) {
        found = value as FlowSpecV2;
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

function mergeAndValidateSpecs(): FlowSpecV2[] {
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

  const byId = new Map<string, FlowSpecV2>();
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

  return registry.flows.map(row => byId.get(row.id) as FlowSpecV2);
}

export function composeModelV2(): AppModel {
  validateExtensionsShape();

  const categories = parseCategories(categoriesData);
  const categorySubIndex = buildCategorySubIndex(categories);

  const specs = mergeAndValidateSpecs();
  const flows = specs.map(spec => {
    const runtimeV2 = buildRuntimeV2(spec);
    return toLegacyFlow(runtimeV2);
  });

  validateFlowRelations(flows, categorySubIndex);

  const base = baseModelV1 as AppModel;

  return {
    ...base,
    categories,
    services: servicesData as Service[],
    flows,
  };
}
