# Governança Editorial — Bloco 2

## 1. Finalidade
Consolidar a referência canônica de linguagem e decisão editorial do Bloco 2 para orientar patches, revisão humana e auditorias sem reabrir o bloco inteiro.

## 2. Escopo do Bloco 2
- Cobertura: perguntas, bifurcações, outcomes e alinhamento da ResultPage.
- Objetivo: garantir triagem institucional com linguagem observável, acionável e orientada à proteção.
- Limite: não alterar motor heurístico, regras de risco ou contratos de execução fora de escopo editorial.

## 3. Ganhos consolidados
- Linguagem menos clínica e mais institucional.
- Perguntas orientadas por sinais observáveis da rotina escolar.
- Bifurcações focadas em mudança real de conduta.
- Outcomes com foco em ação imediata da escola.
- Proteção consolidada como meta-eixo transversal.
- ResultPage alinhada à fonte canônica ativa de mensagens finais.

## 4. Regras editoriais obrigatórias
- Priorizar estrutura: situação observada -> ação imediata -> acionamento institucional/rede.
- Preferir formulações como “A escola observou...” e descritores verificáveis em contexto escolar.
- Evitar linguagem diagnóstica, pericial, investigativa ou moralizante.
- Não usar termos clínicos como eixo de entrada ou decisão pedagógica.
- Tratar vulnerabilidade social por pistas escolares observáveis; evitar categorias fechadas e rotulagem.
- Reforçar proteção, acolhimento e limites da atuação escolar em todos os eixos.

## 5. Regras para perguntas e bifurcações
- Pergunta boa: é observável, clara, sem julgamento e útil para definir próxima ação institucional.
- Pergunta ruim: exige inferência clínica, investiga veracidade/autoria ou não altera conduta.
- Bifurcação só é válida quando muda ação, prioridade ou encaminhamento.
- Bifurcação sem efeito operacional deve ser removida ou fundida.
- Mediação restaurativa só quando houver elegibilidade segura e sem risco iminente.

## 6. Regras para outcomes e ResultPage
- Outcome deve responder “o que a escola faz agora”.
- Outcome deve indicar proteção imediata, acionamento interno e critério de acionamento de rede.
- Evitar outcome genérico, abstrato ou centrado em rótulo clínico.
- ResultPage deve manter tom institucional, objetivo e não diagnóstica.
- Mensagem final deve ser coerente com prioridade institucional e limites de atuação escolar.

## 7. Fonte canônica de mensagens finais
- Fonte ativa: `src/data/v2/flowResultMessages.json`.
- Consumo runtime: `model.flowResultMessagesByFlowIdAndLevel`.
- Acesso na ResultPage: selector `getFlowResultMessage`.
- Revisar `flowResultMessages` quando houver:
  - mudança editorial de outcome/pergunta que altere conduta final;
  - desvio de tom institucional ou linguagem não observável;
  - desalinhamento entre fluxo e mensagem final percebido em auditoria.
- Prevenção de desalinhamento: toda mudança em fluxo com impacto de conduta deve ter checagem explícita da mensagem final por nível (`low/moderate/high/critical`).

## 8. Critérios para futuros patches do Bloco 2
- Preservar decisões já consolidadas; não reabrir sem evidência operacional concreta.
- Aceitar patch em pergunta apenas se aumentar observabilidade e decisão acionável.
- Aceitar patch em outcome apenas se aumentar clareza de ação imediata e proteção.
- Abrir microciclo corretivo quando houver:
  - regressão de linguagem (clínica/moralizante/pericial);
  - bifurcação sem efeito de conduta;
  - divergência entre outcome e mensagem final na ResultPage;
  - ambiguidade recorrente identificada em revisão humana.

## 9. Backlog residual
- Lapidação editorial fina futura de `flowResultMessages`.
- Revisão futura de coerência entre `baselineSeverity`, `riskLevel` e UX textual.
- Saneamento técnico de `archive/legacy`.
- Refinamentos futuros de fluxos-curinga, sem impacto regressivo no núcleo consolidado.

## 10. Status atual do Bloco 2
- Bloco 2 consolidado para operação editorial canônica.
- Regras de linguagem e semântica estabilizadas para manutenção incremental.
- Pendências remanescentes são não bloqueantes e tratáveis por microciclos dedicados.
