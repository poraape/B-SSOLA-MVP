import { describe, expect, it } from 'vitest';
import { evaluateMacroRisk } from '../gatewayHeuristics';

describe('evaluateMacroRisk', () => {
  it('retorna score 2 e rota de emergência para resposta SIM', () => {
    const decision = evaluateMacroRisk('yes', []);

    expect(decision.score).toBe(2);
    expect(decision.route).toBe('emergency');
  });

  it('retorna score 0 e rota de categorias para resposta NÃO', () => {
    const decision = evaluateMacroRisk('no', []);

    expect(decision.score).toBe(0);
    expect(decision.route).toBe('categories');
  });

  it('soma pesos dos sinais e mantém regra de roteamento', () => {
    const decision = evaluateMacroRisk('unsure', ['imminent_integrity_risk', 'severe_bleeding']);

    expect(decision.score).toBe(3);
    expect(decision.route).toBe('emergency');
  });

  it('mantém categorias quando score é zero no NÃO SEI', () => {
    const decision = evaluateMacroRisk('unsure', []);

    expect(decision.score).toBe(0);
    expect(decision.route).toBe('categories');
  });
});
