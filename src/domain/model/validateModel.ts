import { ProtocolModel } from './schema';

export function validateModel(model: ProtocolModel): void {
  if (!model.version) {
    throw new Error('Model inválido: version ausente.');
  }

  if (!Array.isArray(model.categories)) {
    throw new Error('Model inválido: categories deve ser array.');
  }

  if (!Array.isArray(model.services)) {
    throw new Error('Model inválido: services deve ser array.');
  }

  if (!Array.isArray(model.flows)) {
    throw new Error('Model inválido: flows deve ser array.');
  }

  const serviceIds = new Set(model.services.map(s => s.id));
  const categoryIds = new Set(model.categories.map(c => c.id));
  const flowIds = new Set<string>();

  model.flows.forEach(flow => {
    if (flowIds.has(flow.meta.id)) {
      throw new Error(`Flow duplicado detectado: ${flow.meta.id}`);
    }
    flowIds.add(flow.meta.id);

    if (!categoryIds.has(flow.meta.categoryId)) {
      throw new Error(
        `Flow ${flow.meta.id} referencia categoryId inexistente: ${flow.meta.categoryId}`
      );
    }

    Object.entries(flow.results).forEach(([level, result]) => {
      const primaryId = typeof result.primaryService === 'object' ? result.primaryService?.id : result.primaryService;
      const secondaryId = typeof result.secondaryService === 'object' ? result.secondaryService?.id : result.secondaryService;

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

      if (!Array.isArray(result.schoolActions)) {
        throw new Error(
          `Flow ${flow.meta.id} nível ${level} possui schoolActions inválido.`
        );
      }
    });
  });
}
