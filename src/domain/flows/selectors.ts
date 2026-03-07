import { Category, Flow, Service, OrientationBlock } from '../../types';
import { model } from '../model/loadModel';

/**
 * Retorna todas as categorias disponíveis no modelo carregado.
 * @returns Lista de categorias para navegação inicial.
 */
export const getCategories = (): Category[] => model.categories;

/**
 * Busca uma categoria pelo identificador.
 * @param id - Identificador único da categoria.
 * @returns Categoria correspondente ou `undefined` quando inexistente.
 */
export const getCategoryById = (id: string): Category | undefined =>
  model.categories.find(c => c.id === id);

/**
 * Retorna todos os fluxos de triagem carregados.
 * @returns Lista completa de fluxos.
 */
export const getFlows = (): Flow[] => model.flows;

/**
 * Busca um fluxo pelo identificador.
 * @param id - Identificador técnico do fluxo.
 * @returns Fluxo correspondente ou `undefined`.
 */
export const getFlowById = (id: string): Flow | undefined =>
  model.flows.find(f => f.meta.id === id);

/**
 * Lista fluxos de uma categoria específica.
 * @param categoryId - Identificador da categoria.
 * @returns Fluxos associados à categoria informada.
 */
export const getFlowsByCategory = (categoryId: string): Flow[] =>
  model.flows.filter(f => f.meta.categoryId === categoryId);

/**
 * Retorna todos os serviços disponíveis na rede.
 * @returns Lista completa de serviços.
 */
export const getServices = (): Service[] => model.services;

/**
 * Busca serviço por identificador.
 * @param id - Identificador do serviço.
 * @returns Serviço correspondente ou `undefined`.
 */
export const getServiceById = (id: string): Service | undefined =>
  model.services.find(s => s.id === id);

/**
 * Busca bloco de orientação por identificador.
 * @param id - Identificador do bloco.
 * @returns Bloco de orientação correspondente ou `undefined`.
 */
export const getOrientationBlockById = (id: string): OrientationBlock | undefined =>
  model.orientationBlocks.find(o => o.id === id);

/**
 * Retorna fluxos configurados para rota de emergência.
 * @returns Subconjunto de fluxos acessíveis pelo botão de emergência.
 */
export const getEmergencyFlows = (): Flow[] => {
  const emergencyIds = model.meta.emergencyButton?.priorityRouteIds || [];
  return model.flows.filter(f => emergencyIds.includes(f.meta.id));
};

/**
 * Resolve rota inicial de emergência com fallback seguro.
 * @returns Path de navegação para a rota emergencial.
 */
export const getEmergencyRoute = (): string => {
  const emergencyIds = model.meta.emergencyButton?.priorityRouteIds || [];
  const firstAvailableEmergencyId = emergencyIds.find(id =>
    model.flows.some(flow => flow.meta.id === id),
  );

  return `/fluxo/${firstAvailableEmergencyId || 'flow_emergencia_medica'}`;
};
