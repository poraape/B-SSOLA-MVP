# Politica de Uso de Dados - Bussola MVP

## Dados coletados

Esta aplicacao nao coleta dados pessoais identificaveis por padrao. Os dados armazenados localmente sao:

- `bussola_metrics_v1` (`localStorage`): lista de eventos de telemetria com schema `TelemetryEvent`:
  - `sessionId` (UUID de sessao)
  - `timestamp` (ISO 8601)
  - `event` (`session_start`, `step_advance`, `flow_selected`, `result_reached`, `session_abandoned`, `referral_copied`)
  - `step` (opcional)
  - `flowId` (opcional)
  - `priority` (opcional)
  - `metadata` (opcional, sanitizado para evitar PII)
- `bussola_session_id` (`sessionStorage`): identificador tecnico da sessao atual.
- `bussola_privacy_v1` (`localStorage`): registro de dispensa do aviso de privacidade na interface.
- `theme` (`localStorage`): preferencia visual (`light` ou `dark`).
- `accessibility-settings` (`localStorage`): preferencias de acessibilidade da interface.
- `bussola_app_mode` (`localStorage`): modo de uso da aplicacao (`operacional` ou `formacao`).

Quando `VITE_TELEMETRY_ENDPOINT` esta configurado, eventos de telemetria tambem podem ser enviados por HTTP POST para endpoint definido pela instituicao operadora.

## Base legal

Legitimo interesse institucional / Execucao de politica publica.  
Placeholder para customizacao por instituicao parceira.

## Retencao

Dados de sessao: 90 dias no localStorage do dispositivo.  
Eventos de telemetria (quando endpoint configurado): retencao definida pela instituicao operadora.

## Acesso

Dados nao sao transmitidos a terceiros. Operador da instancia e responsavel.

## Incidentes

Procedimento simplificado para relato de incidente:

1. Registrar data/hora, contexto e impacto observado.
2. Notificar imediatamente o responsavel institucional (gestao de TI/compliance).
3. Acionar avaliacao tecnica e plano de mitigacao com rastreabilidade da ocorrencia.

## Contato DPO

`[DPO_EMAIL]` (preenchimento obrigatorio pela instituicao operadora antes de uso institucional).
