import rawModel from '../data/model.v1.json';
import { normalizeModel, validateModel } from '../domain/model';
import { ProtocolModel } from '../domain/model/schema';

try {
  const normalized = normalizeModel(rawModel as unknown as ProtocolModel);
  validateModel(normalized);
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : 'Falha na validação do modelo.';
  console.error(`model:check falhou: ${message}`);
  process.exit(1);
}
