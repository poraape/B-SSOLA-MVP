import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateFlowFile } from '../domain/contracts/flowSchema.zod';
import { loadModel } from '../domain/model/loadModel';
import { validateProtocolModelSchema } from '../domain/contracts/modelSchema.zod';

const flowsDir = resolve(process.cwd(), 'src/data/v2/flows');

try {
  const flowFiles = readdirSync(flowsDir).filter(file => file.endsWith('.json')).sort();

  for (const fileName of flowFiles) {
    const filePath = resolve(flowsDir, fileName);
    const parsed = JSON.parse(readFileSync(filePath, 'utf-8'));
    validateFlowFile(parsed, fileName);
  }

  const model = loadModel();
  validateProtocolModelSchema(model);

  console.log(`✅ Flow files valid: ${flowFiles.length}`);
  console.log(`✅ Protocol model valid: ${model.flows.length} flows, ${model.categories.length} categories`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('❌ Data validation failed');
  console.error(message);
  process.exit(1);
}
