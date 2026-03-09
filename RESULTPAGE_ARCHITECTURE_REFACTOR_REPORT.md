# RESULTPAGE_ARCHITECTURE_REFACTOR_REPORT

## 1. Resumo Executivo
- Foi auditada a arquitetura de `ResultPage` e `ResultPanel`, com leitura de `triageClient`, `flowResultSelectors`, `NetworkPage` e `TriageRecommendationContext`.
- Foi aplicada refatoração mínima para estabilizar o fluxo local-first + fachada remota, reduzir re-render desnecessário e simplificar responsabilidades entre orquestração e apresentação.
- Foram preservados: heurística de risco, conteúdo editorial, jornada principal, origem canônica de mensagens e vínculos prioritário/complementar com a rede.

## 2. Problemas Encontrados

### Render instável (alto)
- `ResultPage` mantinha estado derivado (`premiumResult`) com duas fontes sucessivas (local e remota), atualizando sempre que a resposta remota chegava, mesmo quando equivalente ao resultado local.
- Efeito prático: re-render extra e risco de flicker na transição local -> remoto.

### Responsabilidade misturada / redundância de estado (médio)
- A página mantinha o resultado local dentro do estado mutável, embora fosse dado derivável de `runDecision`.
- Isso dificultava previsibilidade e aumentava caminho de atualização.

### Duplicidade de lógica de navegação (médio)
- `ResultPanel` tinha dois blocos quase idênticos para calcular target de navegação (prioritário/complementar), aumentando risco de divergência futura.

### Props redundantes (médio)
- `flow` era recebido por `ResultPanel` mas não usado materialmente.

### Acoplamento com contexto (baixo, sem patch)
- A navegação Resultado -> Rede já está orientada por parâmetros de URL (`highlight`, `type`, `source`, `slot`) e o contexto entra apenas como fallback na própria Rede.
- Não foi necessária alteração no contexto para manter baixo risco.

## 3. Patches Aplicados

### `src/features/triage/ResultPage.tsx`
- Introduzida comparação material (`arePremiumResultsEquivalent`) para só aplicar enriquecimento remoto quando houver diferença relevante.
- Reestruturado estado para:
  - `localPremiumResult` derivado por `useMemo` (imutável do ciclo),
  - `remotePremiumResult` opcional (apenas quando remoto diverge materialmente do local).
- Removido caminho redundante de sincronização local por `setState`.
- Mantida estratégia local-first: render imediato com local; remoto só substitui quando agrega diferença real.
- Mantida telemetria com um único disparo por fluxo renderizado (`hasLoggedRef`).

### `src/features/triage/components/ResultPanel.tsx`
- Removida prop redundante `flow`.
- Centralizado cálculo de targets de rede em helper único (`buildTargetFromService`) para slots `priority` e `complementary`.
- Preservado uso canônico de builders (`buildNetworkNavigationTarget` / `buildNetworkServiceLink`) e fallback para `/rede`.

## 4. Risco Residual
- Não foi alterada a arquitetura da `NetworkPage` nem o `TriageRecommendationContext` por prudência; o acoplamento atual permanece sob controle por URL explícita.
- Não foram alterados contratos de backend leve (`/api/triage/resolve`), apenas o consumo no lado da ResultPage.
- Sem execução de build/test automatizado neste ambiente por ausência de `node`.

## 5. Checklist de Preservação
- [x] Heurística preservada (`runDecision`, `riskRules`, classificação e thresholds não alterados)
- [x] Jornada preservada (`Home -> Gateway -> Triage -> Resultado -> Rede`)
- [x] JSON canônico preservado (`flowResultMessages.json` não alterado nesta refatoração)
- [x] Serviços preservados (prioritário e complementar mantidos)
- [x] UX decisional preservada (ordem e conteúdo institucional mantidos)
- [x] Navegação Resultado -> Rede preservada (builders canônicos mantidos e unificados no painel)

## 6. Como Validar Manualmente
1. Abrir um fluxo e concluir triagem até a ResultPage.
2. Confirmar que a página renderiza imediatamente (resultado local) sem troca visual perceptível quando o remoto retorna equivalente.
3. Validar ordem do painel: Situação -> Ação imediata -> Orientações práticas -> Limites -> Rede.
4. Clicar em `Serviço Prioritário` e `Apoio Complementar` (mouse e teclado com Enter/Espaço) e confirmar navegação correta.
5. Verificar URL de destino contendo parâmetros coerentes (`source=result`, `slot=priority|complementary`, `highlight/type` quando aplicável).
6. Repetir em fluxo sem `flowResultMessage` para validar fallback de serviços e navegação para `/rede`.
