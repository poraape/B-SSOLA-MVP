# Referral Matrix — Bloco 3 (SP 3.1B)

## Objetivo
Consolidar a matriz canônica aplicada no SP 3.1B para encaminhamento territorial no Bússola (Ermelino Matarazzo / Zona Leste), com foco em:
- reduzir over-referral e under-referral;
- evitar `type=externo` genérico em `high/critical`;
- explicitar progressão escolar/institucional;
- reforçar CT/CREAS/CRAS/CAPS/UBS/190/192/193 na ordem adequada.

## Regras canônicas implementadas
1. `190` prioritário apenas em ameaça ativa, arma, agressão em curso ou risco externo concreto.
2. `192` prioritário em urgência médica e risco vital.
3. `193` nominalmente explícito em incêndio, fumaça, risco estrutural e risco químico/ambiental.
4. Responsáveis são padrão, exceto quando o contato pode agravar risco ao estudante.
5. Conselho Tutelar é pivô de proteção infantojuvenil.
6. CREAS atua em violação grave/complexa/recorrente.
7. UBS/UPA são portas de saúde não crítica; CAPS/CAPS IJ/CAPS AD para cuidado especializado em sofrimento/uso de substâncias.
8. CRAS é porta principal da vulnerabilidade social sem violação grave imediata.

## Flows alterados no SP 3.1B

### Saúde mental / sofrimento emocional
- `flow_ansiedade` (`high`, `critical`)
- `flow_depressao` (`high`, `critical`)
- `flow_ideacao_suicida` (`high`, `critical`)
- `flow_autolesao` (`high`, `critical`)
- `flow_isolamento` (`high`, `critical`)
- `flow_uso_substancias` (`high`)
- `flow_plano_individual_acompanhamento` (`critical`)

### Proteção e violação de direitos
- `flow_violencia_domestica` (`critical`)
- `flow_abuso_sexual` (`high`, `critical`)
- `flow_negligencia` (`critical`)
- `flow_trabalho_infantil` (`high`, `critical`)
- `flow_abandono` (`moderate`, `critical`)
- `flow_violacao_direitos` (`high`)

### Convivência e conflitos
- `flow_bullying` (`high`)
- `flow_agressao_verbal` (`high`)
- `flow_discriminacao` (`high`, `critical`)
- `flow_lgbtfobia` (`high`, `critical`)
- `flow_mediacao_restaurativa` (`high`)

### Vulnerabilidade social e familiar
- `flow_evasao` (`high`, `critical`)
- `flow_inseguranca_alimentar` (`critical`)

### Urgência médica e segurança física
- `flow_incendio` (`low`, `moderate`, `high`, `critical`)
- `flow_risco_estrutural` (`moderate`, `high`, `critical`)

## Ordem de escalonamento operacional (padrão)
1. Ação escolar imediata de proteção e registro objetivo.
2. Acionamento de gestão escolar (coordenação/direção).
3. Contato com responsáveis (quando seguro).
4. Rede básica territorial (UBS/CRAS/CAPS conforme caso).
5. Rede de proteção (CT/CREAS) quando houver desproteção/violação.
6. Urgência (190/192/193) conforme gatilho concreto.

## Fonte de verdade
- Implementação de mensagens e serviços por nível: `src/data/v2/flowResultMessages.json`
- Consumo runtime: `model.flowResultMessagesByFlowIdAndLevel` via `getFlowResultMessage`
