import { loadModel } from './src/domain/model/loadModel';
import { initFlow, processAnswer } from './src/domain/flows/flowEngine';

const model = loadModel();
const flow = model.flows.find(f => f.meta.id === 'flow_convulsao');

if (!flow) {
  console.error('❌ Flow not found');
  process.exit(1);
}

console.log('═══════════════════════════════════════');
console.log('DEBUG: flow_convulsao processAnswer');
console.log('═══════════════════════════════════════\n');

const q1 = flow.triage.questions.find(q => q.id === 'q1');
const simOption = q1!.options.find(o => o.label === 'Sim');

console.log('[DADOS DO FLOW]');
console.log('Option "Sim".level:', simOption!.level);
console.log('Option "Sim".next:', simOption!.next || 'undefined');
console.log('Results disponíveis:', Object.keys(flow.results));
console.log('flow.results["iminente"] existe:', !!flow.results['iminente']);
console.log('');

console.log('[EXECUTANDO processAnswer]');
const state = initFlow(flow);
const result = processAnswer(flow, state, 'q1', 'Sim');

console.log('');
console.log('Resultado:');
console.log('  isComplete:', result.isComplete);
console.log('  currentQuestionId:', result.currentQuestionId);
console.log('  result?.severity:', result.result?.severity || 'undefined');
console.log('');

console.log('═══════════════════════════════════════');
if (result.isComplete === true && result.result?.severity === 'iminente') {
  console.log('✅ PASSOU! flowEngine está correto');
} else {
  console.log('❌ FALHOU!');
  console.log('');
  console.log('ESPERADO: { isComplete: true, severity: "iminente" }');
  console.log('OBTIDO:   { isComplete:', result.isComplete + ', severity:', result.result?.severity || 'undefined', '}');
}
console.log('═══════════════════════════════════════');
