# RESULTPAGE_TO_NETWORK_STRESS_TEST_REPORT

## 1. Resumo executivo

Avaliação geral da integração **Resultado → Rede**: funcional, porém com inconsistências arquiteturais importantes entre **quem constrói a URL** e **quem interpreta a URL**.

Respostas objetivas aos critérios de sucesso:

1. **Existe apenas um builder de navegação para `/rede`?**
- **Não.** Existem dois builders centrais (`buildNetworkNavigationTarget`, `buildNetworkServiceLink`) e um builder local adicional (`buildTargetFromService` no `ResultPanel`).

2. **ResultPanel e NetworkPage interpretam parâmetros da mesma forma?**
- **Não.** `ResultPanel`/builders produzem `source`, `slot`, `queryType`, `type`, `highlight`; `NetworkPage` usa apenas `highlight` e `type`.

3. **Highlight funciona em todos os cenários?**
- **Não completamente.** Funciona no cenário nominal, mas sem auto-scroll/foco e com perda de contexto em cenários de query inválida/limpeza de URL.

4. **Existem dependências ocultas entre páginas?**
- **Sim.** Dependência implícita de `TriageRecommendationContext` (sessionStorage), apesar de o fluxo atual de ResultPage não popular esse contexto.

5. **Há risco de comportamento não determinístico?**
- **Sim.** Principalmente por dupla origem de dados (local/fachada) e por parâmetros produzidos mas não consumidos (`slot`, `source`, `queryType`).

Conclusão curta:
- A navegação nominal funciona, mas **não está totalmente determinística nem semanticamente consistente**.
- Há **risco real de regressão** em refactors sem centralização do contrato de URL.

## 2. Mapa da arquitetura atual

Fluxo observado:

`FlowPage` (`navigate('/resultado/:flowId', { state: { result } })`)  
→ `ResultPage` calcula `displayedResult` (local + possível retorno fachada)  
→ `ResultPage` resolve `flowResultMessage` por `flowId + priority`  
→ `ResultPanel` monta targets de rede (`priorityTarget`, `complementaryTarget`)  
→ clique usa `goToRoute()` (`navigate` + fallback `window.location.assign`)  
→ rota `/rede` ou `/rede/servico/:serviceId`  
→ `NetworkPage` lê URL (`highlight`, `type`) + contexto (`TriageRecommendationContext`)  
→ `safeQuery` determina filtro/ordenação/highlight  
→ `ServiceList` aplica destaque visual por `highlightId`.

Arquivos principais no caminho:
- `src/features/triage/ResultPage.tsx`
- `src/features/triage/components/ResultPanel.tsx`
- `src/domain/flows/flowResultSelectors.ts`
- `src/features/network/NetworkPage.tsx`
- `src/features/network/components/ServiceList.tsx`
- `src/app/context/TriageRecommendationContext.tsx`

## 3. Mapa de builders de navegação

### Builder A — `buildNetworkNavigationTarget`
- Local: `src/domain/flows/flowResultSelectors.ts:35`
- Gera: `/rede/servico/:id?highlight=:id&type=:type&source=result&slot=:slot`
- Uso:
  - `ResultPanel` (alvos priority/complementary e fallbacks)

### Builder B — `buildNetworkServiceLink`
- Local: `src/domain/flows/flowResultSelectors.ts:55`
- Entrada: `queryType` livre (`highlight=...`, `type=...` ou outro)
- Gera:
  - `highlight=...` → delega para Builder A
  - `type=...` → `/rede?queryType=type=...&type=...&source=result&slot=...`
  - outros → `/rede?queryType=...` (+ tentativa de manter valor bruto)

### Builder C (local/ad-hoc) — `buildTargetFromService`
- Local: `src/features/triage/components/ResultPanel.tsx:53`
- Estratégia:
  - prioriza `service.id` vindo de `result.primaryService/secondaryService`
  - fallback para parser local de `queryType` (`highlight=` / `type=`)
  - chama Builder A ou B

### Navegação direta sem builder (mesmo domínio)
- `ResultPanel`: fallback hardcoded `'/rede'` quando não há dados (`ResultPanel.tsx:88`, `:103`, `:246`)
- `NetworkPage`: `navigate('/rede/servico/:id')` e `navigate('/rede')` removendo query (`NetworkPage.tsx:128, 182, 234, 250, 302`)

## 4. Parâmetros de URL utilizados

Parâmetros produzidos no fluxo Resultado → Rede:
- `highlight`
- `type`
- `source`
- `slot`
- `queryType` (em alguns ramos do Builder B)

Parâmetros efetivamente consumidos na NetworkPage:
- Consumidos: `highlight`, `type` (`NetworkPage.tsx:22-23`)
- Ignorados: `source`, `slot`, `queryType` (não há leitura)

Inconsistências identificadas:
- **Inconsistência 1:** contrato esperado inclui `slot/source`; consumidor ignora.
- **Inconsistência 2:** `queryType` é produzido por builder, mas não é interpretado na página.
- **Inconsistência 3:** URL nominal desejada no prompt (`/rede?...`) diverge da implementação principal atual (`/rede/servico/:id?...`).

## 5. Resultados dos testes comportamentais

## Dimensão 1 — Construção de URL
- Esperado:
  - `/rede?source=result&slot=priority|complementary&highlight=<service>&type=<queryType>`
- Observado:
  - padrão predominante: `/rede/servico/:id?highlight=:id&type=:type&source=result&slot=:slot`
  - múltiplos padrões de builder (`A`, `B`, `C`) + links hardcoded `'/rede'`
- Problemas:
  - múltiplos padrões de geração
  - consumidor sem paridade com todos os parâmetros emitidos

## Dimensão 2 — Interpretação na NetworkPage
- Esperado:
  - leitura consistente de highlight/type/slot/source/queryType
- Observado:
  - leitura apenas de `highlight` e `type`
  - `slot`, `source`, `queryType` sem efeito
- Problemas:
  - perda de contexto de caso (slot/origem)
  - builder e consumidor não compartilham contrato único

## Dimensão 3 — Consistência de highlight
- Esperado:
  - serviço correto destacado, com scroll/foco robusto
- Observado:
  - highlight visual por classe no `ServiceList` (`ServiceList.tsx:33-36`)
  - sem auto-scroll e sem gestão explícita de foco
  - com `serviceId`, há seleção (drawer) + possível highlight simultâneo
- Problemas:
  - ausência de auto-scroll/foco
  - potencial confusão visual (selecionado + highlighted no mesmo item)
  - em caso de highlight inválido, contexto cai para lista genérica

## Dimensão 4 — Fallbacks
- Esperado:
  - abrir Rede sem crash/loop quando dados faltam
- Observado:
  - `flowResultMessage` ausente: fallback de UI com link para `/rede` funciona (`ResultPanel.tsx:243-248`)
  - `priorityService`/`complementaryService` ausentes no JSON ativo: não ocorre em runtime nominal (modelo valida e falha no bootstrap se inválido)
  - `serviceId` inválido na rota: sem crash, drawer não abre, página permanece utilizável (`NetworkPage.tsx:116-123`)
  - `queryType` inválido na URL: fallback para sem filtro via `safeQuery=null`
- Problemas:
  - fallback para `/rede` pode reativar contexto antigo via sessionStorage (`TriageRecommendationContext`)
  - se `highlight` inválido e `type` válido coexistirem, `type` não é aproveitado (cai tudo para `null`)

## Dimensão 5 — Navegação repetida
- Esperado:
  - Resultado → Rede → voltar → Resultado → Rede com comportamento estável
- Observado:
  - cenário nominal estável
  - existe dependência temporal: `ResultPage` pode trocar `displayedResult` após retorno de fachada (`ResultPage.tsx:120-153`)
  - `goToRoute` tem fallback por timeout com `window.location.assign` (`ResultPanel.tsx:105-114`)
- Problemas:
  - risco de não determinismo temporal (local vs fachada)
  - fallback por timeout adiciona variação de comportamento entre SPA e full-load

## Dimensão 6 — Acessibilidade de navegação
- Esperado:
  - Tab/Enter/Space consistentes, foco correto, sem anti-patterns
- Observado:
  - cartões usam `article role="button" tabIndex={0}` + `onKeyDown` para Enter/Space
  - há `Link` interativo dentro de elemento também interativo
- Problemas:
  - padrão de elementos interativos aninhados (risco de acessibilidade e comportamento inconsistente entre leitores de tela/teclado)
  - Tab funciona, Enter funciona; Space depende do foco no wrapper (não no link)

## Dimensão 7 — Duplicidade de serviços
- Esperado:
  - fonte única para decisão de links e sem duplicidade lógica
- Observado:
  - decisões de target divididas entre `result.*Service` e `flowResultMessage.*.queryType`
  - no runtime atual V2, `result.primaryService/secondaryService` tendem a `null` (via `toLegacyUI`), deixando parte da lógica “viva porém não usada”
- Problemas:
  - duplicidade de caminhos de decisão
  - risco futuro de divergência entre label exibida e serviço realmente aberto se ambos coexistirem

## Dimensão 8 — Dependências ocultas
- Esperado:
  - acoplamento explícito e previsível entre páginas
- Observado:
  - `NetworkPage` depende de `TriageRecommendationContext` (sessionStorage), mas fluxo Resultado atual não escreve esse contexto
  - `slot/source` são emitidos, porém sem consumidor
- Problemas:
  - estado compartilhado implícito e parcialmente órfão
  - acoplamento por comportamento legado dificulta previsibilidade

## 6. Problemas encontrados

| Problema | Arquivo | Impacto | Severidade |
|---|---|---|---|
| `slot` e `source` gerados mas ignorados na Rede | `src/domain/flows/flowResultSelectors.ts`, `src/features/network/NetworkPage.tsx` | Contexto institucional do encaminhamento não é interpretado | ALTO |
| `queryType` produzido por builder, mas não consumido | `src/domain/flows/flowResultSelectors.ts`, `src/features/network/NetworkPage.tsx` | Contrato de URL inconsistente e suscetível a regressão | ALTO |
| Contrato de rota divergente (`/rede/servico/:id` vs `/rede?...`) | `src/domain/flows/flowResultSelectors.ts`, `src/app/router/routes.tsx` | Múltiplos padrões de integração e maior custo de manutenção | ALTO |
| `safeQuery` não tenta fallback para `type` quando `highlight` é inválido | `src/features/network/NetworkPage.tsx:57-68` | Perda total de contexto de filtro em cenários degradados | MÉDIO |
| Navegação em `ResultPanel` com fallback temporal (`navigate` + `window.location.assign`) | `src/features/triage/components/ResultPanel.tsx:105-114` | Variação de comportamento (SPA/full-load), risco de não determinismo | MÉDIO |
| Dependência implícita de `RecommendationContext` persistido em sessão | `src/app/context/TriageRecommendationContext.tsx`, `src/features/network/NetworkPage.tsx` | Pode reativar contexto antigo ao abrir `/rede` sem query explícita | MÉDIO |
| Ausência de auto-scroll/foco no item destacado | `src/features/network/NetworkPage.tsx`, `src/features/network/components/ServiceList.tsx` | Highlight existe, mas descoberta do item pode falhar em listas longas | MÉDIO |
| Elementos interativos aninhados (`role=button` + `Link` interno) | `src/features/triage/components/ResultPanel.tsx` | Risco de inconsistência para teclado/leitor de tela | MÉDIO |
| Caminhos de decisão de target duplicados (service vs queryType) | `src/features/triage/components/ResultPanel.tsx` | Dificulta manutenção e favorece divergências futuras | BAIXO |
| Estilo duplo em item selecionado e highlighted | `src/features/network/components/ServiceList.tsx` | Ruído visual pontual | BAIXO |

## 7. Risco arquitetural

Status geral por categoria solicitada:

- Builders duplicados: **SIM**
- Acoplamento oculto: **SIM** (`RecommendationContext` + sessionStorage)
- Comportamento não determinístico: **SIM** (janela temporal local/fachada + fallback de navegação)
- Parâmetros inconsistentes: **SIM** (`queryType`, `slot`, `source` emitidos sem consumo equivalente)

Nível de risco consolidado: **ALTO (manutenibilidade e regressão comportamental)**.

## 8. Recomendações para refactor (cirúrgico)

1. Definir **contrato único de navegação Resultado → Rede** (tipo central com parser/serializer único).
2. Centralizar geração de URL em **um único builder** e remover builder ad-hoc local.
3. Decidir e padronizar rota alvo:
- opção A: sempre `/rede?...`
- opção B: sempre `/rede/servico/:id?...`
- documentar decisão e remover padrões paralelos.
4. Em `NetworkPage`, consumir explicitamente `slot` e `source` (ao menos para banner/contexto/telemetria).
5. Eliminar ambiguidade `type` vs `queryType`:
- manter um campo canônico
- aceitar legado apenas via parser de compatibilidade.
6. Ajustar `safeQuery` para fallback progressivo:
- se `highlight` inválido e `type` válido, aplicar `type`.
7. Revisar estratégia de `goToRoute`:
- remover timeout-based `window.location.assign` ou substituir por fallback determinístico controlado.
8. Revisar acessibilidade dos cartões de encaminhamento:
- usar elemento interativo nativo único por cartão (sem nested interactive).
9. Decidir destino de `TriageRecommendationContext`:
- ou reintegrar de forma explícita no fluxo Resultado
- ou remover dependência para evitar estado órfão persistido.

## 9. Checklist de integridade

Confirmações desta auditoria:

- [x] Heurística de risco não foi alterada
- [x] Motor de decisão não foi alterado
- [x] Taxonomia de flows não foi alterada
- [x] `src/data/v2/flowResultMessages.json` não foi alterado
- [x] Matriz de encaminhamento do Bloco 3 não foi alterada
- [x] UX decisional da ResultPage foi preservada (sem patch funcional)
- [x] Dois links de rede (Serviço Prioritário e Apoio Complementar) mantidos no diagnóstico

Escopo de alteração nesta etapa:
- **Somente criação de relatório técnico. Nenhum refactor aplicado.**
