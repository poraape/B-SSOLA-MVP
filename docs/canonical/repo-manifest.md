# Repo Manifest — Bússola

## Visão geral
Manifesto estrutural do repositório após quarentena controlada (P01), com classificação operacional por área.

## Pastas principais
- `api/`: funções same-origin `/api/*` (fachada opcional).
- `src/app/`: bootstrap, shell, contexto e rotas.
- `src/application/`: orquestração de decisão, busca e telemetria.
- `src/domain/`: motor de fluxo, risco, modelo e validação.
- `src/server/`: contratos e serviços do backend leve.
- `src/features/`: módulos de UI da jornada.
- `src/data/v2/`: dados institucionais canônicos do MVP.
- `src/registry/`: registry gerado de flows.
- `src/scripts/`: scripts ativos de validação/geração.
- `docs/`: contratos, domínio, deploy e governança.
- `archive/`: material quarentenado (legado/derivado/ruído).

## Classificação resumida por área

### CANONICO
- `docs/execution/contracts.md`
- `docs/execution/ui-glossary.md`
- `docs/domain/flows-v2-spec.json`
- `src/domain/risk/*`
- `src/domain/model/v2/*`
- `src/server/contracts/*`
- `src/data/v2/*`
- `README.md`, `AGENTS.md`, `REFACTORING.md`

### ATIVO_RUNTIME
- `src/app/*`
- `src/features/*` (exceto conteúdo movido para `archive/legacy-ui`)
- `src/domain/*`
- `src/server/services/*`
- `api/*`

### ATIVO_DEV
- `docs/content/*`, `docs/architecture/*`, `docs/migrations/*`
- `src/scripts/*`

### ATIVO_BUILD_CI
- `package.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`
- `.github/workflows/ci.yml`

### DERIVADO_GERADO
- `src/registry/flowRegistry.ts` (gerado por `src/scripts/buildRegistry.ts`)
- artefatos locais de execução/build/test (não canônicos)

### TRANSITORIO_MIGRACAO
- `src/data/model.v1.json`
- `src/data/flows.v2.json`
- `src/data/flowResultMessage.json` (convive com fonte v2)
- `src/domain/model/validateModel.ts` (convive com validador em `src/domain/validation`)

### LEGADO_CONSULTIVO
- documentos históricos movidos para `archive/legacy-docs/`
- scripts legados movidos para `archive/legacy-scripts/`

### QUARENTENA
- `archive/root-reports/*`
- `archive/generated-reports/*`
- `archive/legacy-scripts/*`
- `archive/legacy-ui/*`
- `archive/legacy-docs/*`

### INDETERMINADO
- `metadata.json`
- `src/components/PrivacyNotice.tsx`
- `src/data/model.v2.extensions.json`
- `src/domain/model/loadPremiumExtensions.ts`

## Observações objetivas
- A quarentena reduziu ruído sem alterar motor de risco, contratos, rotas ou dados v2.
- Permanecem pendências estruturais deliberadamente não resolvidas neste passo (fontes duplicadas e trilhas de migração).
