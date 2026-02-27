export { normalizeModel } from './normalizeModel';
export { validateModel } from './validateModel';
export { loadModel, getValidatedModel, model as modelUI } from './loadModel';

import type { Category, Flow } from '../../types';
import { model as modelUI } from './loadModel';

export const getCategories = (): Category[] => modelUI.categories as Category[];
export const getFlows = (): Flow[] => modelUI.flows as Flow[];
