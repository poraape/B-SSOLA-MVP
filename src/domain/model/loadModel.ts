import modelData from '../../data/model.v1.json';
import { AppModel } from '../../types';

export const loadModel = (): AppModel => {
  return modelData as unknown as AppModel;
};

export const model = loadModel();
