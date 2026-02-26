import semver from 'semver';
import { SUPPORTED_MODEL_RANGE } from './supportedRange';
import { ProtocolModel, FlowType, ModelResult, RiskGroup } from './schema';

const ALLOWED_FLOW_TYPES = new Set<FlowType>([
  'standard',
  'medical_emergency',
  'security_emergency'
]);

const ALLOWED_RISK_GROUPS = new Set<RiskGroup>([
  'violence',
  'psychosocial',
  'medical',
  'social',
  'rights',
  'structural',
  'emergency'
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function extractServiceId(serviceRef: unknown): string | undefined {
  if (typeof serviceRef === 'string') {
    return serviceRef;
  }

  if (serviceRef && typeof serviceRef === 'object' && 'id' in serviceRef) {
    const id = (serviceRef as { id?: unknown }).id;
    return typeof id === 'string' ? id : undefined;
  }

  return undefined;
}

function assertSemver1(version: string): void {
  const semverPattern = /^1\.\d+\.\d+(?:-[0-9A-Za-z-.]+)?(?:\+[0-9A-Za-z-.]+)?$/;
  if (!semverPattern.test(version)) {
    throw new Error('Model inválido: version não suportada (esperado 1.x).');
  }
}

export function validateModel(model: ProtocolModel): void {
  if (!isNonEmptyString(model.version)) {
    throw new Error('Model inválido: version ausente.');
  }

  if (!semver.satisfies(model.version, SUPPORTED_MODEL_RANGE)) {
    throw new Error(
      `Modelo versão ${model.version} incompatível com app (suporta ${SUPPORTED_MODEL_RANGE})`
    );
  }

  assertSemver1(model.version);

  if (!Array.isArray(model.categories)) {
    throw new Error('Model inválido: categories deve ser array.');
  }

  if (!Array.isArray(model.services)) {
    throw new Error('Model inválido: services deve ser array.');
  }

  if (!Array.isArray(model.flows)) {
    throw new Error('Model inválido: flows deve ser array.');
  }

  const categoryIds = new Set<string>();
  model.categories.forEach((category, index) => {
    if (!isNonEmptyString(category.id)) {
      throw new Error(`Model inválido: category[${index}] com id ausente.`);
    }

    if (!isNonEmptyString(category.label)) {
      throw new Error(`Model inválido: category ${category.id} com label ausente.`);
    }

    if (!isNonEmptyString(category.riskGroup) || !ALLOWED_RISK_GROUPS.has(category.riskGroup as RiskGroup)) {
      throw new Error(`Model inválido: category ${category.id} com riskGroup inválido.`);
    }

    if (categoryIds.has(category.id)) {
      throw new Error(`Model inválido: category id duplicado: ${category.id}`);
    }

    categoryIds.add(category.id);
  });

  const serviceIds = new Set<string>();
  model.services.forEach((service, index) => {
    if (!isNonEmptyString(service.id)) {
      throw new Error(`Model inválido: service[${index}] com id ausente.`);
    }

    if (!isNonEmptyString(service.name)) {
      throw new Error(`Model inválido: service ${service.id} com name ausente.`);
    }

    if (serviceIds.has(service.id)) {
      throw new Error(`Model inválido: service id duplicado: ${service.id}`);
    }

    serviceIds.add(service.id);
  });

  const flowIds = new Set<string>();

  model.flows.forEach((flow, flowIndex) => {
    if (!flow.meta || typeof flow.meta !== 'object') {
      throw new Error(`Model inválido: flow[${flowIndex}] sem meta.`);
    }

    if (!isNonEmptyString(flow.meta.id)) {
      throw new Error(`Model inválido: flow[${flowIndex}] com meta.id ausente.`);
    }

    if (!isNonEmptyString(flow.meta.title)) {
      throw new Error(`Model inválido: flow ${flow.meta.id} com meta.title ausente.`);
    }

    if (!isNonEmptyString(flow.meta.type) || !ALLOWED_FLOW_TYPES.has(flow.meta.type as FlowType)) {
      throw new Error(`Model inválido: flow ${flow.meta.id} com meta.type inválido.`);
    }

    if (!isNonEmptyString(flow.meta.categoryId)) {
      throw new Error(`Model inválido: flow ${flow.meta.id} com meta.categoryId ausente.`);
    }

    if (flowIds.has(flow.meta.id)) {
      throw new Error(`Flow duplicado detectado: ${flow.meta.id}`);
    }
    flowIds.add(flow.meta.id);

    if (!categoryIds.has(flow.meta.categoryId)) {
      throw new Error(
        `Flow ${flow.meta.id} referencia categoryId inexistente: ${flow.meta.categoryId}`
      );
    }

    if (!Array.isArray(flow.questions)) {
      throw new Error(`Model inválido: flow ${flow.meta.id} com questions ausente.`);
    }

    if (!flow.results || typeof flow.results !== 'object') {
      throw new Error(`Model inválido: flow ${flow.meta.id} com results ausente.`);
    }

    Object.entries(flow.results).forEach(([level, result]) => {
      const typedResult = result as ModelResult & { primary?: unknown; secondary?: unknown };

      if (!isNonEmptyString(typedResult.severity)) {
        throw new Error(`Flow ${flow.meta.id} nível ${level} com severity inválido.`);
      }

      if (!Array.isArray(typedResult.schoolActions)) {
        throw new Error(
          `Flow ${flow.meta.id} nível ${level} possui schoolActions inválido.`
        );
      }

      typedResult.schoolActions.forEach((action, actionIndex) => {
        if (!isNonEmptyString(action)) {
          throw new Error(
            `Flow ${flow.meta.id} nível ${level} possui schoolActions[${actionIndex}] inválido.`
          );
        }
      });

      const primaryId = extractServiceId(typedResult.primary ?? typedResult.primaryService);
      const secondaryId = extractServiceId(typedResult.secondary ?? typedResult.secondaryService);

      if (primaryId && !serviceIds.has(primaryId)) {
        throw new Error(
          `Flow ${flow.meta.id} nível ${level} referencia primaryService inexistente: ${primaryId}`
        );
      }

      if (secondaryId && !serviceIds.has(secondaryId)) {
        throw new Error(
          `Flow ${flow.meta.id} nível ${level} referencia secondaryService inexistente: ${secondaryId}`
        );
      }
    });
  });
}
