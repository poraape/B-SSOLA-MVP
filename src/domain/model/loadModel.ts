import rawModel from '../../data/model.v1.json';
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

  const useModelV2 =
    ((import.meta as { env?: Record<string, string> }).env?.VITE_USE_MODEL_V2 === 'true') ||
    process.env.VITE_USE_MODEL_V2 === 'true';

  let sourceModel = rawModel as unknown as ProtocolModel;

  if (useModelV2) {
    try {
      sourceModel = composeModelV2() as unknown as ProtocolModel;
    } catch (e) {
      console.error('[Protocol Model] Falha ao compor MODEL V2. Fallback para V1.', e);
      sourceModel = rawModel as unknown as ProtocolModel;
    }
  }

  const normalized = normalizeModel(sourceModel);
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    validateModel(normalized);

    if (!isProduction) {
      console.info('[Protocol Model] Estrutura validada com sucesso.');
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
