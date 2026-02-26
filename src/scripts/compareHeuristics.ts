import { loadModel } from '../domain/model/loadModel';
import { applyRiskHeuristics } from '../domain/risk/riskRules';
import { enrichPremium } from '../domain/flows/premiumEngine';

type Diff = {
  flowId: string;
  before: any;
  after: any;
};

function simulateLegacyCategoryPoints(categoryId: string): number {
  const legacyMap: Record<string, number> = {
    emergencia: 3,
    violencia_conflitos: 3,
    saude_mental: 2,
    saude_fisica: 2,
    direitos_protecao: 2,
    vulnerabilidades_sociais: 1,
    seguranca_institucional: 1,
    seguranca_estrutural: 3,
    inclusao_acessibilidade: 1
  };

  return legacyMap[categoryId] ?? 0;
}

function simulateLegacyScore(flow: any): number {
  let score = 0;
  score += simulateLegacyCategoryPoints(flow.meta.categoryId);
  return score;
}

function getBaseResult(flow: any): any | null {
  const levels = Object.keys(flow.results || {});
  if (levels.length === 0) return null;

  const level = levels[0];
  const result = flow.results[level];
  if (!result) return null;

  return {
    ...result,
    level,
    primaryService: result.primaryService || result.primary || null,
    secondaryService: result.secondaryService || result.secondary || null,
    schoolActions: result.schoolActions || []
  };
}

function run() {
  const model = loadModel();
  const diffs: Diff[] = [];

  for (const flow of model.flows) {
    const baseResult = getBaseResult(flow);
    if (!baseResult) continue;

    const enriched = enrichPremium(baseResult, flow) || baseResult;
    const newResult = applyRiskHeuristics(enriched, flow);

    const legacyScore = simulateLegacyScore(flow);
    const legacyNotify = legacyScore >= 5;
    const newNotify = Boolean(newResult.notifyManagement);

    if (legacyNotify !== newNotify) {
      diffs.push({
        flowId: flow.meta.id,
        before: { notifyManagement: legacyNotify },
        after: { notifyManagement: newNotify }
      });
    }
  }

  if (diffs.length === 0) {
    console.log('✅ No heuristic drift detected.');
  } else {
    console.error('❌ Heuristic differences detected:');
    console.error(JSON.stringify(diffs, null, 2));
    process.exit(1);
  }
}

run();
