import fs from 'fs';
import path from 'path';
import categories from '../data/v2/categories.json';
import registry from '../../docs/domain/flows-v2-spec.json';

const OFFICIAL_CATEGORY_IDS = [
  'emergencias_seguranca',
  'saude_bem_estar',
  'saude_emocional',
  'convivencia_conflitos',
  'protecao_direitos',
  'apoio_social_familiar',
  'inclusao_acessibilidade',
] as const;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

try {
  const categoryIds = categories.map(category => category.id);
  assert(categories.length === 7, `Esperado 7 categorias, recebido ${categories.length}.`);
  assert(
    JSON.stringify(categoryIds) === JSON.stringify(OFFICIAL_CATEGORY_IDS),
    `IDs de categoria divergentes: ${categoryIds.join(', ')}`
  );

  const subcategories = categories.flatMap(category =>
    category.subcategories.map(subcategory => ({
      categoryId: category.id,
      subcategoryId: subcategory.id,
    }))
  );

  assert(subcategories.length === 39, `Esperado 39 subcategorias, recebido ${subcategories.length}.`);
  assert(new Set(subcategories.map(item => `${item.categoryId}:${item.subcategoryId}`)).size === 39, 'Subcategorias duplicadas detectadas.');

  assert(Array.isArray(registry.flows), 'Registry inválido: flows deve ser array.');
  assert(registry.flows.length === 39, `Esperado 39 flows no registry, recebido ${registry.flows.length}.`);
  assert(new Set(registry.flows.map(flow => flow.id)).size === 39, 'Flow IDs duplicados no registry.');

  const flowFiles = fs
    .readdirSync(path.resolve('src/domain/flows'))
    .filter(file => /^flow_.*\.ts$/.test(file));
  assert(flowFiles.length === 39, `Esperado 39 arquivos de flow, recebido ${flowFiles.length}.`);

  const subcategoryKeySet = new Set(subcategories.map(item => `${item.categoryId}:${item.subcategoryId}`));
  const orphanSubcategories = subcategories.filter(item =>
    !registry.flows.some(flow => flow.categoryId === item.categoryId && flow.subcategoryId === item.subcategoryId)
  );
  const orphanCategories = categoryIds.filter(categoryId =>
    !registry.flows.some(flow => flow.categoryId === categoryId)
  );
  const unknownRegistryRefs = registry.flows.filter(
    flow => !subcategoryKeySet.has(`${flow.categoryId}:${flow.subcategoryId}`)
  );

  assert(orphanSubcategories.length === 0, `Subcategorias órfãs detectadas: ${JSON.stringify(orphanSubcategories)}.`);
  assert(orphanCategories.length === 0, `Categorias órfãs detectadas: ${orphanCategories.join(', ')}.`);
  assert(unknownRegistryRefs.length === 0, `Registry com referências órfãs: ${JSON.stringify(unknownRegistryRefs)}.`);

  console.info('[model:check] OK', {
    categories: categories.length,
    subcategories: subcategories.length,
    flowsRegistry: registry.flows.length,
    flowFiles: flowFiles.length,
    orphanSubcategories: orphanSubcategories.length,
    orphanCategories: orphanCategories.length,
    unknownRegistryRefs: unknownRegistryRefs.length,
  });

  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : 'Falha na validação estrutural do modelo.';
  console.error(`model:check falhou: ${message}`);
  process.exit(1);
}
