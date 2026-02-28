import fs from 'fs';
import path from 'path';
import categories from '../data/v2/categories.json';
import modelV2 from '../data/model.v2.json';
import spec from '../../docs/domain/flows-v2-spec.json';
import { flowRegistry } from '../registry/flowRegistry';

const OFFICIAL_CATEGORY_IDS = [
  'emergencias_seguranca',
  'saude_bem_estar',
  'saude_emocional',
  'convivencia_conflitos',
  'protecao_direitos',
  'apoio_social_familiar',
  'inclusao_acessibilidade',
] as const;

const PENDING_STATUSES = new Set(['TO_CREATE', 'PENDING', 'TODO', 'DRAFT']);
const STUB_STATUS = 'STUB_NOT_IMPLEMENTED';

type SpecFlow = {
  id: string;
  categoryId: string;
  subcategoryId: string;
  status?: string;
};

type ModelSubcategory = {
  categoryId: string;
  subcategoryId: string;
  flowId: string;
  status?: string;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function sorted(values: Iterable<string>): string[] {
  return Array.from(values).sort((a, b) => a.localeCompare(b));
}

function diff(expected: Set<string>, received: Set<string>): { missing: string[]; extra: string[] } {
  const missing = sorted(Array.from(expected).filter(value => !received.has(value)));
  const extra = sorted(Array.from(received).filter(value => !expected.has(value)));
  return { missing, extra };
}

function toSet(values: string[]): Set<string> {
  return new Set(values);
}

try {
  const categoryIds = categories.map(category => category.id);
  assert(categories.length === 7, `Esperado 7 categorias, recebido ${categories.length}.`);
  assert(
    JSON.stringify(categoryIds) === JSON.stringify(OFFICIAL_CATEGORY_IDS),
    `IDs de categoria divergentes: ${categoryIds.join(', ')}`
  );

  const categorySubcategories = categories.flatMap(category =>
    category.subcategories.map(subcategory => ({
      categoryId: category.id,
      subcategoryId: subcategory.id,
    }))
  );

  const modelSubcategories: ModelSubcategory[] = modelV2.categories.flatMap(category =>
    category.subcategories.map(subcategory => ({
      categoryId: category.id,
      subcategoryId: subcategory.id,
      flowId: subcategory.flowId,
      status: subcategory.status,
    }))
  );

  const specFlows = (spec.flows || []) as SpecFlow[];
  assert(specFlows.length > 0, 'Spec inválido: flows vazio.');

  const subcategoryKeySet = new Set(categorySubcategories.map(item => `${item.categoryId}:${item.subcategoryId}`));
  const orphanSubcategories = categorySubcategories.filter(item =>
    !specFlows.some(flow => flow.categoryId === item.categoryId && flow.subcategoryId === item.subcategoryId)
  );
  const orphanCategories = categoryIds.filter(categoryId =>
    !specFlows.some(flow => flow.categoryId === categoryId)
  );
  const unknownSpecRefs = specFlows.filter(
    flow => !subcategoryKeySet.has(`${flow.categoryId}:${flow.subcategoryId}`)
  );

  assert(orphanSubcategories.length === 0, `Subcategorias órfãs detectadas: ${JSON.stringify(orphanSubcategories)}.`);
  assert(orphanCategories.length === 0, `Categorias órfãs detectadas: ${orphanCategories.join(', ')}.`);
  assert(unknownSpecRefs.length === 0, `Spec com referências órfãs: ${JSON.stringify(unknownSpecRefs)}.`);

  const pendingSpecFlows = specFlows.filter(flow => PENDING_STATUSES.has((flow.status || '').toUpperCase()));
  const pendingModelSubcategories = modelSubcategories.filter(item =>
    PENDING_STATUSES.has((item.status || '').toUpperCase())
  );

  assert(
    pendingSpecFlows.length === 0,
    `Spec contém status pendente (${Array.from(PENDING_STATUSES).join(', ')}): ${pendingSpecFlows.map(item => item.id).join(', ')}`
  );
  assert(
    pendingModelSubcategories.length === 0,
    `model.v2 contém status pendente (${Array.from(PENDING_STATUSES).join(', ')}): ${pendingModelSubcategories.map(item => item.flowId).join(', ')}`
  );

  const stubsSpec = specFlows.filter(flow => (flow.status || '').toUpperCase() === STUB_STATUS);
  const stubsModel = modelSubcategories.filter(item => (item.status || '').toUpperCase() === STUB_STATUS);
  const stubIds = new Set<string>([
    ...stubsSpec.map(item => item.id),
    ...stubsModel.map(item => item.flowId),
  ]);

  const expectedImplementedBySpec = new Set(
    specFlows.filter(flow => !stubIds.has(flow.id)).map(flow => flow.id)
  );

  const registryIds = toSet(Object.keys(flowRegistry));
  const domainFlowIds = toSet(
    fs
      .readdirSync(path.resolve('src/domain/flows'))
      .filter(file => /^flow_.*\.ts$/.test(file))
      .map(file => file.replace(/\.ts$/, ''))
  );

  const specVsRegistry = diff(expectedImplementedBySpec, registryIds);
  const specVsDomain = diff(expectedImplementedBySpec, domainFlowIds);
  const registryVsDomain = diff(registryIds, domainFlowIds);

  assert(
    specVsRegistry.missing.length === 0 && specVsRegistry.extra.length === 0,
    `Divergência spec/registry: missing=${specVsRegistry.missing.join(', ') || 'none'} extra=${specVsRegistry.extra.join(', ') || 'none'}`
  );
  assert(
    specVsDomain.missing.length === 0 && specVsDomain.extra.length === 0,
    `Divergência spec/domain: missing=${specVsDomain.missing.join(', ') || 'none'} extra=${specVsDomain.extra.join(', ') || 'none'}`
  );
  assert(
    registryVsDomain.missing.length === 0 && registryVsDomain.extra.length === 0,
    `Divergência registry/domain: missing=${registryVsDomain.missing.join(', ') || 'none'} extra=${registryVsDomain.extra.join(', ') || 'none'}`
  );

  const specByCategorySub = new Map(specFlows.map(flow => [`${flow.categoryId}:${flow.subcategoryId}`, flow.id]));
  const modelFlowMismatches = modelSubcategories.filter(item => {
    const expectedFlowId = specByCategorySub.get(`${item.categoryId}:${item.subcategoryId}`);
    return expectedFlowId && expectedFlowId !== item.flowId;
  });

  assert(
    modelFlowMismatches.length === 0,
    `Divergência model.v2/spec em flowId por subcategoria: ${JSON.stringify(modelFlowMismatches)}`
  );

  const unresolvedStubs = sorted(stubIds).filter(flowId => !registryIds.has(flowId));
  if (unresolvedStubs.length > 0) {
    console.warn(`[model:check] STUB_NOT_IMPLEMENTED: ${unresolvedStubs.join(', ')}`);
  } else if (stubIds.size > 0) {
    console.warn('[model:check] STUB_NOT_IMPLEMENTED: nenhum stub pendente sem implementação.');
  }

  console.info('[model:check] OK', {
    categories: categories.length,
    subcategories: categorySubcategories.length,
    specFlows: specFlows.length,
    implementedExpected: expectedImplementedBySpec.size,
    registryFlows: registryIds.size,
    domainFlows: domainFlowIds.size,
    stubs: sorted(stubIds),
  });

  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : 'Falha na validação estrutural do modelo.';
  console.error(`model:check falhou: ${message}`);
  process.exit(1);
}
