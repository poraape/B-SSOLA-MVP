# Source of Truth Map — Bússola

## Mapa domínio -> fonte canônica

- Flows (especificação): `docs/domain/flows-v2-spec.json`
- Flows (implementação runtime): `src/domain/flows/flow_*.ts`
- Registry gerado de flows: `src/registry/flowRegistry.ts`
- Gerador do registry: `src/scripts/buildRegistry.ts`

- Regras de risco (heurística):
  - `src/domain/risk/riskRules.ts`
  - `src/domain/risk/ruleset.ts`
  - `src/domain/risk/riskScore.ts`
  - `src/domain/risk/invariants.ts`

- Contracts do server (fachada `/api/*`):
  - `src/server/contracts/triage.ts`
  - `src/server/contracts/search.ts`
  - `src/server/contracts/network.ts`
  - `src/server/contracts/contentBootstrap.ts`

- Dados v2 (institucionais):
  - `src/data/v2/categories.json`
  - `src/data/v2/services.json`
  - `src/data/v2/heuristics.json`
  - `src/data/v2/emergency.json`
  - `src/data/v2/network-config.json`
  - `src/data/v2/map-tiles.json`
  - `src/data/v2/flowResultMessages.json`

- Modelo runtime:
  - composição: `src/domain/model/v2/composeModelV2.ts`
  - carga/normalização/validação: `src/domain/model/loadModel.ts`, `src/domain/model/normalizeModel.ts`, `src/domain/validation/validateModel.ts`

- Scripts de validação ativos:
  - `src/scripts/modelCheck.mjs`
  - `src/scripts/validateModelData.ts`
  - `src/scripts/validateServices.ts`

- Glossário de UI (linguagem): `docs/execution/ui-glossary.md`
- Contratos de execução (CI): `docs/execution/contracts.md`

## Pontos ainda não resolvidos (explícitos)

1. Dupla fonte de mensagens de resultado:
- `src/data/flowResultMessage.json` vs `src/data/v2/flowResultMessages.json`

2. Duplicidade de validação de modelo:
- `src/domain/model/validateModel.ts` vs `src/domain/validation/validateModel.ts`

3. Scripts duplicados de validação (agora isolados por quarentena):
- ativo: `src/scripts/validateServices.ts`
- legado quarentenado: `archive/legacy-scripts/validate-services.ts`

4. Pilhas paralelas de glossário:
- runtime ativo: `src/features/resources/*` e `src/features/resources/glossaryGraph/*`
- legado quarentenado: `archive/legacy-ui/glossary/*` e duplicatas antigas de `src/components`/`src/hooks`

## Nota operacional
Este mapa descreve fonte canônica atual e não implica refatoração automática. Convergências devem ser tratadas em etapas dedicadas e validadas por humano.
