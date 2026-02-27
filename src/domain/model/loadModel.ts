import { composeModelV2 } from './v2/composeModelV2';
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

  const sourceModel = composeModelV2() as unknown as ProtocolModel;
  const normalized = normalizeModel(sourceModel);
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    validateModel(normalized);

    if (!isProduction) {
      console.info('[Protocol Model] Estrutura validada com sucesso (V2).');
    }
  } catch (e) {
    if (!isProduction) {
      console.error('[Protocol Model] Erro de validação:', e);
    }

    throw e;
  }

  const frozen = deepFreeze(normalized);
  cachedModel = frozen;
  return cachedModel;
}

export const model = getValidatedModel() as any;

export function loadModel(): ProtocolModel {
  return getValidatedModel();
}
