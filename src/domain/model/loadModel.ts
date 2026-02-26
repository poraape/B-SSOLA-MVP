import rawModel from '../../data/model.v1.json';
import { validateModel } from './validateModel';
import { normalizeModel } from './normalizeModel';
import { ProtocolModel } from './schema';

let cachedModel: ProtocolModel | null = null;

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

  cachedModel = normalized;
  return cachedModel;
}

export const model = getValidatedModel() as any;
