# Contratos de Execução — B-SSOLA MVP

## CONTRATOS INVIOLÁVEIS (CI)
CI-1: NUNCA alterar lógica em src/domain/risk/riskRules.ts
CI-2: NUNCA alterar comportamento do gateway tripartite (SIM/NÃO/NÃO SEI)
CI-3: NUNCA alterar motor heurístico (riskScore, ruleset, riskRules)
- riskScore.ts: 2026-03-01 — cap de 100 mantido porque os thresholds de prioridade operam em faixa muito inferior (minPriorityForScore: 3/5/8) e o teto não altera comportamento atual; se houver thresholds > 100 no futuro, revisar o cap.
CI-4: NUNCA quebrar jornada Home→Gateway→Triage→Resultado→Rede
CI-5: NUNCA criar campos que armazenem dados do estudante (nome, CPF, turma)
CI-6: NUNCA tornar triagem dependente de conexão à internet
CI-7: NUNCA introduzir dependências pagas ou serviços externos com custo

## ADENDO A CI-6 E CI-7 — BACKEND LEVE CONTROLADO (FACHADA OPCIONAL)
- A aplicação pode usar endpoints same-origin em `/api/*` como fachada opcional, sem substituir o motor local-first.
- CI-6 permanece inviolável: a triagem NUNCA pode depender de internet; em qualquer indisponibilidade remota, a execução local é obrigatória.
- CI-7 permanece inviolável: a fachada `/api/*` não pode exigir serviços externos pagos nem aumentar custo obrigatório de operação.
- Toda rota `/api/*` deve ter contrato tipado em `src/server/contracts/*` e validação de payload/resposta.
- A UI e a jornada Home→Gateway→Triage→Resultado→Rede devem permanecer idênticas independentemente da origem (local ou `/api`).
- É vedado transmitir dados de estudante (nome, CPF, turma, escola_id) pela fachada `/api/*`.

## REGRAS DE ESCOPO PARA TODO PROMPT FUTURO
- Alterar APENAS arquivos explicitamente listados no prompt
- Não refatorar código correto adjacente
- Não renomear variáveis sem necessidade do patch
- Todo texto visível ao usuário: consultar docs/execution/ui-glossary.md
- Qualquer normalização de prioridade: registrar evento, não converter silenciosamente

## CAMINHOS REAIS DO PROJETO (preenchidos pelo Prompt 0)
- Arquivo de tipos: src/types.ts
- TelemetryService: src/application/telemetry/TelemetryService.ts
- PrivacyNotice: src/components/PrivacyNotice.tsx
- ResultPage/ResultPanel: src/features/triage/ResultPage.tsx e src/features/triage/components/ResultPanel.tsx
- NetworkPage: src/features/network/NetworkPage.tsx
- NetworkMap: src/features/network/components/NetworkMap.tsx
- FlowPage/TriageQuestion: src/features/triage/FlowPage.tsx e src/features/triage/components/TriageQuestion.tsx
- GatewayPage: src/features/gateway/AtendimentoGatePage.tsx
- App.tsx: src/app/App.tsx
- Diretório de flows JSON: src/data/v2/flows/
