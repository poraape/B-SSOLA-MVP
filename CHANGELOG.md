# Changelog

## 0.1.0-rc.1 - 2026-02-28

### Correcoes criticas

- Bootstrap do modelo movido para carregamento lazy/runtime dentro do React, com tratamento explicito de erro.
- Introduzido `ModelErrorBoundary` para capturar falhas de inicializacao e permitir retry.
- Ajustes de pipeline CI para Node 22 e instalacao deterministica com `npm ci`.
- Fortalecimento de tipagem em fluxo critico de triagem, reduzindo uso de `any`.

### Melhorias implementadas

- Camada de telemetria centralizada com providers `localStorage` e HTTP opcional.
- Inclusao de testes E2E com Playwright para jornada critica e acessibilidade.
- Quality gates no CI: `model:check`, `typecheck`, `build`, cobertura e E2E.
- Thresholds explicitos de cobertura no Vitest.
- Scaffolding de governanca LGPD:
  - politica tecnica de dados (`docs/PRIVACY_POLICY.md`)
  - aviso de privacidade na interface
  - orientacoes de conformidade no README

### Pendencias conhecidas

- Integracao LLM permanece desabilitada (apenas placeholder de configuracao).
- Observabilidade institucional depende de configuracao do endpoint de telemetria e operacao da instituicao.
