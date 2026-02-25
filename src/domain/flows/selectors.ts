import { model } from '../model/loadModel';
import { Category, Flow, Service, OrientationBlock } from '../../types';

export const getCategories = (): Category[] => model.categories;

export const getCategoryById = (id: string): Category | undefined => 
  model.categories.find(c => c.id === id);

export const getFlows = (): Flow[] => model.flows;

export const getFlowById = (id: string): Flow | undefined => 
  model.flows.find(f => f.meta.id === id);

export const getFlowsByCategory = (categoryId: string): Flow[] => 
  model.flows.filter(f => f.meta.categoryId === categoryId);

export const getServices = (): Service[] => model.services;

export const getServiceById = (id: string): Service | undefined => 
  model.services.find(s => s.id === id);

export const getOrientationBlockById = (id: string): OrientationBlock | undefined => 
  model.orientationBlocks.find(o => o.id === id);

export const getEmergencyFlows = (): Flow[] => {
  const emergencyIds = model.meta.emergencyButton?.priorityRouteIds || [];
  return model.flows.filter(f => emergencyIds.includes(f.meta.id));
};
