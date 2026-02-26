import rawModel from '../../data/model.v1.json';
import { validateModel } from './validateModel';
import { normalizeModel } from './normalizeModel';
import { ProtocolModel } from './schema';

let cachedModel: ProtocolModel | null = null;

function deepFreeze(obj: any) {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
}


export function getValidatedModel(): ProtocolModel {
  if (cachedModel) return cachedModel;

  const normalized = normalizeModel(rawModel as unknown as ProtocolModel);

  if (process.env.NODE_ENV !== 'production') {
    try {
      validateModel(normalized);
      console.info('[Protocol Model] Estrutura validada com sucesso.');
    } catch (e) {
      console.error('[Protocol Model] Erro de validação:', e);
      throw e;
    }
  }

  const frozen = deepFreeze(normalized);
  cachedModel = frozen;
  return cachedModel;
}

export const model = getValidatedModel() as any;
