import { composeModelV2 } from './v2/composeModelV2';
import { validateModel } from './validateModel';
import { normalizeModel } from './normalizeModel';
import { ProtocolModel } from './schema';
import { systemLogger } from '../metrics/systemLogger';

let cachedModel: ProtocolModel | null = null;

function deepFreeze<T>(obj: T): Readonly<T> {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj as object).forEach(prop => {
    const record = obj as Record<string, unknown>;
    const value = record[prop];
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function') &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  });

  return obj as Readonly<T>;
}

export function getValidatedModel(): ProtocolModel {
  if (cachedModel) return cachedModel;

  const sourceModel = composeModelV2();
  const normalized = normalizeModel(sourceModel);
  const isProduction = process.env.NODE_ENV === 'production';

  try {
    validateModel(normalized);

    if (!isProduction) {
      systemLogger.info('Protocol model validated (V2)', { version: normalized.version });
    }
  } catch (e) {
    if (!isProduction) {
      const message = e instanceof Error ? e.message : String(e);
      systemLogger.error('Protocol model validation failed', { error: message });
    }

    throw e;
  }

  const frozen = deepFreeze(normalized);
  cachedModel = frozen;
  return cachedModel;
}

export const model: ProtocolModel = getValidatedModel();

export function loadModel(): ProtocolModel {
  return getValidatedModel();
}
