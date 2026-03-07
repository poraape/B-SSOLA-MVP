# REFACTORING GUIDE — B-SSOLA MVP

## 1. 🔴 NUNCA FAÇA — arquivos e ações absolutamente proibidos sem aprovação humana explícita
- NUNCA altere `src/domain/risk/riskRules.ts` sem aprovação humana explícita.
- NUNCA altere `src/domain/risk/ruleset.ts` sem aprovação humana explícita.
- NUNCA altere `src/domain/risk/riskScore.ts` sem justificar impacto em CI-3 e sem aprovação humana explícita.
- NUNCA altere `src/domain/risk/invariants.ts` sem aprovação humana explícita.
- NUNCA altere o fluxo tripartite do gateway em `src/features/gateway/AtendimentoGatePage.tsx` (SIM/NÃO/NÃO SEI).
- NUNCA altere o comportamento de jornada principal definido por `src/app/router/routes.tsx` sem aprovação humana.
- NUNCA introduza novos dados de estudante (nome, CPF, turma, escola_id) em `src/types.ts`, `src/data/` ou qualquer `src/features/`.
- NUNCA introduza `fetch`/`axios` novos fora do padrão atual de telemetria em `src/application/telemetry/telemetryProviders.ts`.
- NUNCA adicione dependências pagas no `package.json`.
- NUNCA converta prioridade inválida para `low` silenciosamente; registre evento no logger/telemetria.
- NUNCA altere `src/data/v2/flows/*.json` sem validação de `npm run -s model:check`.
- NUNCA altere textos de UI sem consultar `docs/execution/ui-glossary.md`.
- NUNCA altere `docs/execution/contracts.md` de forma contraditória aos CI-1..CI-7.
- NUNCA remover `PRIORITY_LABELS` de `src/types.ts` enquanto a UI consumir labels PT-BR.
- NUNCA remover `toInstitutionalPriority` de `src/types.ts` sem migração explícita de consumidores.
- NUNCA remover `TelemetryService.isConsentGranted` em `src/application/telemetry/TelemetryService.ts`.
- NUNCA remover gate de consentimento em `src/application/telemetry/telemetryProviders.ts`.
- NUNCA apagar `src/components/PrivacyNotice.tsx` sem alternativa de consentimento equivalente.
- NUNCA remover `NetworkErrorBoundary` (`src/features/network/NetworkErrorBoundary.tsx`) sem fallback equivalente.
- NUNCA remover `FeatureErrorBoundary` (`src/features/shared/components/FeatureErrorBoundary.tsx`) sem fallback equivalente.
- NUNCA alterar o schema de `src/data/v2/categories.json` sem validar composição de modelo.
- NUNCA alterar o schema de `src/data/v2/services.json` sem validar `Service` em `src/types.ts`.
- NUNCA alterar o schema de `src/data/v2/flows/*.json` sem validar parse/composição em domínio.
- NUNCA alterar `src/domain/model/loadModel.ts` sem revalidar model-check.
- NUNCA alterar `src/domain/model/v2/composeModelV2.ts` sem revalidar model-check.
- NUNCA alterar `src/scripts/modelCheck.mjs` para mascarar inconsistências reais de dados.
- NUNCA mover arquivos críticos de `src/domain/risk/` para outro diretório sem aprovação.
- NUNCA remover fallback de rota de emergência em `src/domain/flows/selectors.ts` sem validação funcional.
- NUNCA trocar rótulo de CTA proibido/permitido sem checar a tabela em `docs/execution/ui-glossary.md`.
- NUNCA introduzir texto técnico em inglês visível para prioridade na UI (`low`, `moderate`, `high`, `critical`).
- NUNCA remover `session_start` condicionado ao consentimento em `src/app/App.tsx`.
- NUNCA remover chamada de `grantConsent` no aceite do `PrivacyNotice`.
- NUNCA remover captura local de telemetria enquanto envio HTTP estiver condicionado.
- NUNCA alterar `src/features/triage/ResultPage.tsx` para renderizar prioridade sem `PRIORITY_LABELS`.
- NUNCA alterar `src/features/network/components/NetworkMap.tsx` para assumir lat/lng não nulos sem filtro prévio.
- NUNCA substituir mensagens de erro/vazio fora do glossário oficial.
- NUNCA alterar `src/features/triage/FlowPage.tsx` removendo saídas de recuperação em estados de erro.
- NUNCA alterar comportamento de model-check para ignorar `stubs` sem aprovação.
- NUNCA commitar mudança sem rodar checklist mínimo da seção 4.
- NUNCA chamar `make_pr` sem commit.
- NUNCA deixar commit local sem chamar `make_pr`.
- NUNCA alterar arquivos fora do escopo explícito do prompt atual.
- NUNCA publicar PR com descrição dizendo que testes passaram sem executar os comandos.
- NUNCA deixar marcadores de pendência em documentação operacional final.
- NUNCA remover `AGENTS.md` da raiz.
- NUNCA remover `docs/execution/ui-glossary.md`.
- NUNCA remover `docs/execution/contracts.md`.
- NUNCA alterar `src/data/v2/map-tiles.json` sem testar fallback de mapa indisponível.
- NUNCA alterar `src/features/resources/data/faq.ts` sem preservar contrato da interface `FAQItem`.
- NUNCA alterar `src/features/resources/data/glossary.ts` sem preservar contrato de `GlossaryItem`.
- NUNCA alterar `src/application/decisionOrchestrator.ts` sem manter degrade seguro e invariants em dev/prod.
- NUNCA enfraquecer guardrails de privacidade no código de telemetria.
- NUNCA armazenar PII em `metadata` de telemetria.
- NUNCA remover sanitização de metadados no `TelemetryService`.
- NUNCA alterar semântica do `FlowPriority` legado sem plano de migração.
- NUNCA remover compatibilidade com `P0/P1/P2/P3` sem aprovação explícita.
- NUNCA alterar engine de triagem para depender de backend online.
- NUNCA alterar dados de rede para exigir geocodificação online em tempo de execução.
- NUNCA introduzir side effects silenciosos em componentes de resultado/rede.
- NUNCA apagar logs críticos de violação de invariante sem alternativa.
- NUNCA alterar o contrato `TelemetryEventName` ignorando eventos já emitidos.

## 2. 🟡 SEMPRE FAÇA — procedimentos obrigatórios antes/durante/após qualquer alteração
- SEMPRE leia `docs/execution/contracts.md` antes de tocar no código.
- SEMPRE leia `docs/execution/ui-glossary.md` antes de tocar em texto de UI.
- SEMPRE leia `AGENTS.md` da raiz antes de executar patch.
- SEMPRE confirme o escopo no prompt antes de editar arquivos.
- SEMPRE inspecione arquivos alvo com `nl -ba` antes de patch.
- SEMPRE execute busca com `rg -n` para mapear consumidores antes de alterar tipos.
- SEMPRE preserve comportamento existente quando o pedido for só texto/rótulo.
- SEMPRE mantenha fallback seguro quando houver risco de quebra em produção.
- SEMPRE validar compile check com `npx tsc --noEmit` após correções de tipos.
- SEMPRE validar build com `npm run build` antes de commit final.
- SEMPRE validar consistência de dados com `npm run -s model:check` quando tocar `src/data/` ou modelo.
- SEMPRE checar strings proibidas de UI com `rg` antes de finalizar.
- SEMPRE confirmar que `riskRules.ts` não foi tocado se o prompt não autorizou.
- SEMPRE confirmar que nenhum campo de aluno foi criado.
- SEMPRE manter `fetch` externo restrito ao que já existe no projeto.
- SEMPRE usar paths reais do repositório em documentação.
- SEMPRE usar linguagem PT-BR alinhada ao glossário para estados e CTAs.
- SEMPRE fazer diff mínimo: somente linhas necessárias.
- SEMPRE revisar `git diff -- <arquivos>` antes de commit.
- SEMPRE rodar `git status --short` antes e depois da alteração.
- SEMPRE escrever mensagem de commit objetiva e rastreável.
- SEMPRE criar PR via ferramenta após commit.
- SEMPRE citar resultados dos comandos realmente executados.
- SEMPRE usar fallback quando `localStorage` estiver indisponível em client code.
- SEMPRE preservar jornada Home→Gateway→Triage→Resultado→Rede.
- SEMPRE preservar comportamento do botão de emergência existente.
- SEMPRE preservar consentimento de telemetria antes de envio HTTP.
- SEMPRE preservar `session_start` condicionado ao consentimento.
- SEMPRE preservar boundaries de feature/network para evitar crash global.
- SEMPRE documentar impacto em CI-1..CI-7 na entrega final.
- SEMPRE incluir checklist de validação manual na resposta final.
- SEMPRE manter código de tipagem coerente com uso no JSX/Leaflet.
- SEMPRE filtrar/validar `lat/lng` antes de usar `Marker`.
- SEMPRE usar `PRIORITY_LABELS` para texto de risco no front.
- SEMPRE tratar `FlowPriority` com fallback seguro tipado.
- SEMPRE adicionar novos eventos de telemetria no `TelemetryEventName`.
- SEMPRE revisar `src/application/decisionOrchestrator.ts` com foco em resiliência.
- SEMPRE verificar que mensagens de erro têm saída/CTA quando aplicável.
- SEMPRE preservar comportamento de fallback de mapa para lista.
- SEMPRE manter dados de flows offline em `src/data/v2/flows/`.
- SEMPRE respeitar contrato dos scripts no `package.json`.
- SEMPRE usar comandos não destrutivos de diagnóstico primeiro.
- SEMPRE manter texto final sem placeholders.
- SEMPRE validar que paths citados existem.
- SEMPRE registrar explicitamente limitações de ambiente quando houver.
- SEMPRE evitar afirmar sucesso de teste que não foi executado.
- SEMPRE preferir mudança local em constante/tipo quando o texto for centralizado.
- SEMPRE confirmar que `Refazer triagem` substitui qualquer label proibido.
- SEMPRE confirmar saída vazia para grep de `Revisar respostas` em `src/`.
- SEMPRE alinhar mensagens de estado com `docs/execution/ui-glossary.md`.
- SEMPRE verificar que `npm run lint` (tsc) completa com sucesso antes de merge.
- SEMPRE revisar `src/types.ts` quando mudanças de schema afetarem interfaces.
- SEMPRE manter compatibilidade de dados legados quando exigido.

## 3. 🟢 PADRÕES DE EXPANSÃO — como adicionar: nova categoria, novo flow, entrada de glossário, entrada de FAQ, novo serviço na rede (com schema real de cada um)
### 3.1 Adicionar nova categoria (schema real)
- Arquivo principal: `src/data/v2/categories.json`.
- Cada categoria deve seguir este schema real:
```json
{
  "id": "string",
  "label": "string",
  "riskGroup": "emergency|violence|psychosocial|medical|rights|structural|social",
  "icon": "string",
  "color": "string",
  "isEmergencyCategory": true,
  "subcategories": [
    { "id": "string", "label": "string" }
  ]
}
```
- `id` deve ser único no array.
- `riskGroup` deve existir em `src/types.ts` (`RiskGroup`).
- `subcategories[].id` deve ter fluxo correspondente em `src/data/v2/flows/`.
- Se for categoria de emergência, use `isEmergencyCategory: true` quando aplicável.
- Após incluir categoria, valide composição/model-check.

### 3.2 Adicionar novo flow (schema real v2)
- Diretório: `src/data/v2/flows/`.
- Nome de arquivo: `<slug>.json` em snake_case.
- Schema real observado:
```json
{
  "meta": {
    "id": "flow_<slug>",
    "title": "string",
    "type": "standard|medical_emergency|security_emergency",
    "categoryId": "string",
    "subcategoryId": "string",
    "keywords": ["string"]
  },
  "questions": [
    {
      "id": "q1",
      "text": "string",
      "options": [
        { "label": "Sim", "level": "moderado|alto|critico|baixo" }
      ]
    }
  ],
  "results": {
    "moderado": {
      "severity": "moderado",
      "primaryService": { "id": "service-id", "name": "Service Name" },
      "secondaryService": null,
      "schoolActions": ["string"]
    }
  }
}
```
- `meta.categoryId` deve existir em `categories.json`.
- `meta.subcategoryId` deve existir em `categories[].subcategories[]`.
- `primaryService.id` e `secondaryService.id` devem existir em `src/data/v2/services.json`.
- `results` deve cobrir níveis usados no questionário.
- Não inserir campos de aluno em `schoolActions`.
- Não mudar o texto institucional existente sem aprovação.

### 3.3 Adicionar entrada de glossário (schema real)
- Arquivo: `src/features/resources/data/glossary.ts`.
- Interface real:
```ts
export interface GlossaryItem {
  term: string;
  definition: string;
  category: 'Protocolo' | 'Legal' | 'Rede de Proteção' | 'Gírias Estudantis' | 'Saúde';
  context?: string;
}
```
- Inserir item no array `glossaryData`.
- `category` deve ser uma das literais permitidas.
- Use PT-BR claro e direto.
- Evite termos que entrem em conflito com glossário de UI.

### 3.4 Adicionar entrada de FAQ (schema real)
- Arquivo: `src/features/resources/data/faq.ts`.
- Interface real:
```ts
export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}
```
- Inserir item no array `faqData`.
- `category` deve ser consistente com filtros já usados na página FAQ.
- Não incluir dados de aluno em `question`/`answer`.
- Mensagens devem ser institucionais e acionáveis.

### 3.5 Adicionar novo serviço na rede (schema real)
- Arquivo: `src/data/v2/services.json`.
- Schema real observado:
```json
{
  "id": "string",
  "name": "string",
  "category": "string",
  "type": "interno|externo",
  "contact": {
    "phone": "string",
    "alternatePhone": "string",
    "otherPhones": ["string"],
    "email": "string",
    "website": "string"
  },
  "location": {
    "address": "string",
    "lat": -23.50043,
    "lng": -46.4874
  },
  "needsGeoReview": false,
  "contactAvailability": {
    "hasPhone": true,
    "hasAlternate": false,
    "hasEmail": true,
    "hasWebsite": false,
    "completenessScore": 60
  }
}
```
- `id` deve ser único.
- `type` deve ser coerente com filtros de rede.
- `lat/lng` podem ser `null`, mas `NetworkMap` só renderiza `Marker` com coordenadas válidas.
- `contactAvailability` deve refletir o objeto `contact`.
- Se sem coordenadas, mantenha `needsGeoReview: true`.

### 3.6 Fluxo de expansão recomendado
- Passo 1: Atualize o arquivo de dados (`categories|flows|services|faq|glossary`).
- Passo 2: Verifique aderência ao `src/types.ts`.
- Passo 3: Rode `npm run -s model:check`.
- Passo 4: Rode `npx tsc --noEmit`.
- Passo 5: Rode `npm run build`.
- Passo 6: Faça busca por strings proibidas de UI.
- Passo 7: Faça commit mínimo com mensagem objetiva.

### 3.7 Regras de compatibilidade
- Preserve `FlowPriority` legado em `src/types.ts`.
- Preserve `InstitutionalPriority` e `PRIORITY_LABELS`.
- Preserve separação de consentimento/telemetria.
- Preserve fallback de rede e boundaries.
- Preserve modo offline com dados em `src/data/v2/`.

## 4. 🔵 CHECKLIST DE VALIDAÇÃO — comandos bash reais e funcionais para rodar antes de todo commit
> Todos os comandos abaixo foram executados com sucesso neste projeto.

```bash
cd /workspace/B-SSOLA-MVP
```

```bash
git status --short
```

```bash
npm run build
```

```bash
npx tsc --noEmit
```

```bash
npm run -s model:check
```

```bash
npm run lint
```

```bash
rg -n "Revisar respostas|revisar resposta" src/ || true
```

```bash
rg -n "Risco: (low|high|critical|moderate)" src/features/ || true
```

```bash
rg -n "PRIORITY_LABELS" src/features/triage src/types.ts
```

```bash
rg -n "invariant_violation" src/application src/domain
```

```bash
rg -n "bssola_privacy_consent|grantConsent|isConsentGranted" src/
```

```bash
find src/domain/risk -maxdepth 2 -print | sort
```

```bash
find src/application/telemetry -maxdepth 2 -print | sort
```

```bash
git diff -- src/features/triage/ResultPage.tsx src/features/network/components/NetworkMap.tsx src/application/telemetry/telemetry.types.ts
```

```bash
git log --oneline -n 5
```

## 5. 📍 MAPA DE RESPONSABILIDADES — tabela: tipo de mudança → arquivo a alterar → arquivo proibido tocar
| Tipo de mudança | Arquivo(s) a alterar | Arquivo(s) proibido(s) tocar sem aprovação |
|---|---|---|
| Ajuste de label/CTA de triagem | `src/features/triage/ResultPage.tsx`, `src/features/triage/components/ResultPanel.tsx` | `src/domain/risk/riskRules.ts` |
| Mensagens de erro/vazio de triagem | `src/features/triage/FlowPage.tsx`, `src/features/triage/CategoryPage.tsx` | `src/domain/risk/riskRules.ts` |
| Mensagens de rede/mapa | `src/features/network/NetworkPage.tsx`, `src/features/network/components/NetworkMap.tsx` | `src/domain/risk/riskRules.ts` |
| Tipagem de evento de telemetria | `src/application/telemetry/telemetry.types.ts` | `src/domain/risk/riskRules.ts` |
| Gate de consentimento | `src/application/telemetry/TelemetryService.ts`, `src/application/telemetry/telemetryProviders.ts`, `src/components/PrivacyNotice.tsx` | `src/domain/risk/riskRules.ts` |
| Orquestração de decisão e fallback | `src/application/decisionOrchestrator.ts` | `src/domain/risk/riskRules.ts`, `src/domain/risk/ruleset.ts` |
| Expansão de categoria | `src/data/v2/categories.json` | `src/domain/risk/riskRules.ts` |
| Expansão de flow | `src/data/v2/flows/*.json` | `src/domain/risk/riskRules.ts` |
| Expansão de serviços | `src/data/v2/services.json` | `src/domain/risk/riskRules.ts` |
| Configuração de botão emergência | `src/data/v2/emergency.json`, `src/domain/flows/selectors.ts` | `src/domain/risk/riskRules.ts` |
| FAQ | `src/features/resources/data/faq.ts` | `src/domain/risk/riskRules.ts` |
| Glossário técnico de recursos | `src/features/resources/data/glossary.ts` | `src/domain/risk/riskRules.ts` |
| Composição do modelo v2 | `src/domain/model/v2/composeModelV2.ts` | `src/domain/risk/riskRules.ts` |
| Checagens de modelo | `src/scripts/modelCheck.mjs` | `src/domain/risk/riskRules.ts` |
| Ajuste de rotas de navegação | `src/app/router/routes.tsx` | `src/domain/risk/riskRules.ts` |
| Ajuste de App bootstrap | `src/app/App.tsx` | `src/domain/risk/riskRules.ts` |
| Indicador de progresso de perguntas | `src/features/triage/FlowPage.tsx`, `src/features/triage/components/TriageQuestion.tsx` | `src/domain/risk/riskRules.ts` |
| Boundary de feature | `src/features/shared/components/FeatureErrorBoundary.tsx` | `src/domain/risk/riskRules.ts` |
| Boundary de mapa | `src/features/network/NetworkErrorBoundary.tsx` | `src/domain/risk/riskRules.ts` |
| Ajuste de tipos centrais | `src/types.ts` | `src/domain/risk/riskRules.ts` |
| Ajuste de utilitários de tipos | `src/utils/typeUtils.ts`, `src/utils/examples.ts` | `src/domain/risk/riskRules.ts` |
| Ajuste de score (somente com aprovação) | `src/domain/risk/riskScore.ts` | `src/domain/risk/riskRules.ts` |
| Ajuste de invariantes (somente com aprovação) | `src/domain/risk/invariants.ts` | `src/domain/risk/riskRules.ts` |

## 6. 📋 FORMATO DE ENTREGA OBRIGATÓRIO — template de output que todo Code Assistant deve seguir ao entregar alterações
Use SEMPRE este template de saída:

```md
1. Resumo: o que foi alterado e por quê
- Item 1
- Item 2

2. Arquivos modificados: lista com justificativa
- `arquivo-a`: motivo
- `arquivo-b`: motivo

3. Diff por arquivo (apenas as linhas alteradas)
```diff
# diff mínimo por arquivo
```

4. Confirmação de CI-1 a CI-7 preservados (checklist)
- [x] CI-1
- [x] CI-2
- [x] CI-3
- [x] CI-4
- [x] CI-5
- [x] CI-6
- [x] CI-7

5. Como validar manualmente (passos simples)
1) Passo 1
2) Passo 2
3) Passo 3

**Testing**
- ✅ `comando 1`
- ✅ `comando 2`
- ⚠️ `comando 3` (limitação de ambiente)
```

Regras obrigatórias para preenchimento do template:
- Sempre incluir comandos realmente executados.
- Sempre indicar sucesso/falha/limitação com emoji no bloco Testing.
- Sempre incluir diffs mínimos.
- Sempre explicar por que cada arquivo foi modificado.
- Sempre listar CI-1..CI-7 explicitamente.
- Sempre evitar texto genérico sem evidência.
- Sempre usar caminhos reais e existentes.
- Sempre manter o foco do prompt.
- Sempre reportar limitações de ambiente com transparência.
- Sempre evitar prometer testes não executados.

## 7. 🛠️ COMANDOS DE DIAGNÓSTICO — comandos úteis para inspecionar estado do projeto em nova sessão
```bash
cd /workspace/B-SSOLA-MVP
```

```bash
git status --short
```

```bash
git log --oneline -n 15
```

```bash
node -e "const p=require('./package.json'); console.log(p.scripts)"
```

```bash
find src/data -maxdepth 4 -print | sort
```

```bash
find src/features -maxdepth 3 -type d -print | sort
```

```bash
find src/domain/risk -maxdepth 2 -print | sort
```

```bash
find src/application/telemetry -maxdepth 2 -print | sort
```

```bash
rg -n "FlowPriority|InstitutionalPriority|PRIORITY_LABELS|toInstitutionalPriority" src/types.ts src/features
```

```bash
rg -n "isConsentGranted|grantConsent|bssola_privacy_consent" src/application src/components src/app
```

```bash
rg -n "invariant_violation|assertInvariants|safeResult" src/application src/domain
```

```bash
rg -n "NetworkErrorBoundary|FeatureErrorBoundary" src/features
```

```bash
rg -n "Refazer triagem|Revisar respostas" src/features docs
```

```bash
rg -n "Aguarde um momento|Mapa temporariamente indisponível|Categoria não localizada" src/features
```

```bash
nl -ba src/features/triage/ResultPage.tsx | sed -n '60,110p'
```

```bash
nl -ba src/application/telemetry/telemetry.types.ts | sed -n '1,40p'
```

```bash
nl -ba src/features/network/components/NetworkMap.tsx | sed -n '70,120p'
```

```bash
npm run -s model:check
```

```bash
npm run build
```

```bash
npx tsc --noEmit
```

## 8. 📖 GLOSSÁRIO TÉCNICO — termos do projeto com definição precisa e localização no código
- **AppModel**: contrato raiz de dados do app; localização em `src/types.ts`.
- **RiskGroup**: enum textual de grupos de risco (`emergency`, `violence`, etc.); `src/types.ts`.
- **Flow**: contrato de fluxo com `meta`, `riskModel`, `triage`, `results`; `src/types.ts`.
- **FlowPriority**: tipo legado com códigos institucionais e P0..P3; `src/types.ts`.
- **InstitutionalPriority**: prioridade institucional em inglês técnico (`low/moderate/high/critical`) para motor/UI interna; `src/types.ts`.
- **LegacyPriorityCode**: códigos legados `P0..P3`; `src/types.ts`.
- **toInstitutionalPriority**: mapper de código legado para prioridade institucional; `src/types.ts`.
- **PRIORITY_LABELS**: mapa de exibição PT-BR de prioridade; `src/types.ts`.
- **TriageResult**: resultado da triagem com serviços/ações/flags; `src/types.ts`.
- **Service**: contrato de serviço da rede com contato/localização; `src/types.ts`.
- **TelemetryEventName**: união de nomes de eventos aceitos; `src/application/telemetry/telemetry.types.ts`.
- **TelemetryEvent**: payload padronizado de evento de telemetria; `src/application/telemetry/telemetry.types.ts`.
- **TelemetryService**: serviço de telemetria com sanitização e fanout local + HTTP; `src/application/telemetry/TelemetryService.ts`.
- **isConsentGranted**: gate de consentimento para envio HTTP; `src/application/telemetry/TelemetryService.ts`.
- **grantConsent**: grava consentimento de privacidade para telemetria; `src/application/telemetry/TelemetryService.ts`.
- **HttpProvider**: provider de envio externo de telemetria; `src/application/telemetry/telemetryProviders.ts`.
- **LocalStorageProvider**: provider de persistência local de eventos; `src/application/telemetry/telemetryProviders.ts`.
- **assertInvariants**: valida invariantes de decisão e lança erro quando violado; `src/domain/risk/invariants.ts`.
- **checkInvariants**: retorna lista de violações de invariante; `src/domain/risk/invariants.ts`.
- **computeRiskScore**: calcula score numérico e fatores; `src/domain/risk/riskScore.ts`.
- **minPriorityForScore**: converte score em prioridade mínima requerida; `src/domain/risk/riskScore.ts`.
- **applyRiskHeuristics**: aplica score, regras e elevação de prioridade sem downgrade; `src/domain/risk/riskRules.ts`.
- **riskRules**: conjunto de regras heurísticas declarativas; `src/domain/risk/ruleset.ts`.
- **runDecision**: orquestrador de decisão para fluxo/premium; `src/application/decisionOrchestrator.ts`.
- **safeResult**: fallback seguro de resultado quando invariantes falham em produção; `src/application/decisionOrchestrator.ts`.
- **TriageRecommendationContext**: contexto para highlight/query da última triagem; `src/app/context/TriageRecommendationContext.tsx`.
- **useTriageRecommendation**: hook consumidor do contexto de recomendação; `src/app/context/TriageRecommendationContext.tsx`.
- **NetworkErrorBoundary**: boundary local para falhas do mapa; `src/features/network/NetworkErrorBoundary.tsx`.
- **FeatureErrorBoundary**: boundary reutilizável por feature; `src/features/shared/components/FeatureErrorBoundary.tsx`.
- **NetworkMap**: componente Leaflet de mapa de serviços; `src/features/network/components/NetworkMap.tsx`.
- **ServiceList**: lista de serviços da rede com destaque por `highlightId`; `src/features/network/components/ServiceList.tsx`.
- **ResultPage**: tela de resultado com badge de prioridade e CTAs; `src/features/triage/ResultPage.tsx`.
- **ResultPanel**: bloco principal do resultado com justificativas/serviços; `src/features/triage/components/ResultPanel.tsx`.
- **FlowPage**: página de perguntas da triagem; `src/features/triage/FlowPage.tsx`.
- **TriageQuestion**: componente de pergunta/opções da triagem; `src/features/triage/components/TriageQuestion.tsx`.
- **CategoryPage**: lista de subcategorias por categoria; `src/features/triage/CategoryPage.tsx`.
- **AtendimentoGatePage**: gateway inicial de risco imediato; `src/features/gateway/AtendimentoGatePage.tsx`.
- **HomePage**: página inicial com entrada principal e atalhos; `src/features/home/HomePage.tsx`.
- **FAQPage**: aba de perguntas frequentes; `src/features/resources/FAQPage.tsx`.
- **faqData**: base local de FAQ; `src/features/resources/data/faq.ts`.
- **glossaryData**: base local do glossário de recursos; `src/features/resources/data/glossary.ts`.
- **composeModelV2**: montagem do modelo consolidado v2; `src/domain/model/v2/composeModelV2.ts`.
- **model:check**: script de validação de consistência do modelo; `src/scripts/modelCheck.mjs`.
- **flows.v2.json**: artefato de fluxo agregado; `src/data/flows.v2.json`.
- **model.v2.json**: artefato consolidado principal; `src/data/model.v2.json`.
- **categories.json**: fonte de categorias/subcategorias; `src/data/v2/categories.json`.
- **services.json**: fonte de serviços e contatos; `src/data/v2/services.json`.
- **emergency.json**: configuração de botão/rotas de emergência; `src/data/v2/emergency.json`.
- **network-config.json**: configurações da feature de rede; `src/data/v2/network-config.json`.
- **map-tiles.json**: configuração de tiles de mapa; `src/data/v2/map-tiles.json`.

## 9. 🚨 SINAIS DE ALERTA — lista de situações onde o Code Assistant deve PARAR e aguardar aprovação humana
- Pare se a mudança exigir tocar `src/domain/risk/riskRules.ts`.
- Pare se a mudança exigir tocar `src/domain/risk/ruleset.ts` sem solicitação explícita.
- Pare se a mudança exigir alterar thresholds centrais de prioridade.
- Pare se a mudança exigir alterar lógica do gateway tripartite.
- Pare se a mudança pedir novos campos de aluno (nome/CPF/turma/escola_id).
- Pare se a mudança pedir envio de dados sensíveis por telemetria.
- Pare se a mudança exigir novo endpoint HTTP não existente.
- Pare se a mudança sugerir remover consent gate da telemetria.
- Pare se a mudança exigir remover `PrivacyNotice` sem substituição equivalente.
- Pare se a mudança quebrar jornada Home→Gateway→Triage→Resultado→Rede.
- Pare se a mudança exigir editar muitos arquivos fora do escopo definido.
- Pare se houver conflito entre prompt e `docs/execution/contracts.md`.
- Pare se houver conflito entre texto solicitado e `docs/execution/ui-glossary.md`.
- Pare se o prompt exigir comportamento incompatível com CI-1..CI-7.
- Pare se `npm run -s model:check` falhar após alteração de dados.
- Pare se `npx tsc --noEmit` falhar com erro novo causado pelo patch.
- Pare se `npm run build` falhar após patch em código.
- Pare se houver risco de downgrade de prioridade em cenário de emergência.
- Pare se precisar modificar dados reais institucionais sem validação de stakeholder.
- Pare se o patch exigir renomear grande volume de arquivos sem motivo funcional.
- Pare se o patch introduzir dependência externa de custo.
- Pare se o patch adicionar `axios`/`fetch` fora da área de telemetria existente.
- Pare se o patch requerer migração de schema sem plano de rollback.
- Pare se o patch alterar contrato público de `src/types.ts` sem mapear consumidores.
- Pare se o patch remover fallback de mapa/lista sem alternativa.
- Pare se o patch remover `FeatureErrorBoundary` da triagem.
- Pare se houver discrepância entre dados v2 e regras do `model:check` não resolvida.
- Pare se o patch alterar scripts de build/test sem justificativa técnica clara.
- Pare se o patch depender de ferramenta indisponível no ambiente atual.
- Pare se não for possível reproduzir localmente um erro crítico reportado.

## 10. 📚 REFERÊNCIAS CRUZADAS — links para docs/ relevantes
- `docs/execution/contracts.md` — contratos invioláveis CI-1..CI-7 e regras de escopo.
- `docs/execution/ui-glossary.md` — glossário obrigatório de UI (prioridades, CTAs e mensagens).
- `AGENTS.md` — regras permanentes de sessão e formato de entrega.
- `package.json` (scripts) — comandos oficiais de build/lint/typecheck/test/model-check.
- `src/scripts/modelCheck.mjs` — validação estrutural do modelo.
- `src/domain/model/v2/composeModelV2.ts` — composição do modelo consolidado.
- `src/types.ts` — contratos centrais de dados e tipagem.
- `src/application/telemetry/TelemetryService.ts` — serviço de telemetria com consentimento.
- `src/application/telemetry/telemetry.types.ts` — tipos de evento de telemetria.
- `src/application/telemetry/telemetryProviders.ts` — providers local e HTTP.
- `src/application/decisionOrchestrator.ts` — orquestração de decisão e fallback seguro.
- `src/domain/risk/riskScore.ts` — score de risco e cap defensivo.
- `src/domain/risk/invariants.ts` — invariantes de decisão.
- `src/domain/risk/ruleset.ts` — catálogo de regras heurísticas.
- `src/domain/risk/riskRules.ts` — aplicação das heurísticas (protegido por CI-1).
- `src/features/triage/ResultPage.tsx` — exibição da prioridade e CTA de retorno.
- `src/features/triage/components/ResultPanel.tsx` — bloco de orientação e ações.
- `src/features/triage/FlowPage.tsx` — fluxo de perguntas e resiliência.
- `src/features/triage/CategoryPage.tsx` — seleção de fluxo por categoria.
- `src/features/network/NetworkPage.tsx` — tela de rede e destaque recomendado.
- `src/features/network/components/NetworkMap.tsx` — mapa de serviços com fallback.
- `src/features/network/components/ServiceList.tsx` — lista de serviços sempre disponível.
- `src/features/network/NetworkErrorBoundary.tsx` — boundary de mapa.
- `src/features/shared/components/FeatureErrorBoundary.tsx` — boundary reutilizável.
- `src/features/home/HomePage.tsx` — home e atalhos de emergência.
- `src/features/gateway/AtendimentoGatePage.tsx` — gateway de risco imediato.
- `src/components/PrivacyNotice.tsx` — aceite de privacidade.
- `src/data/v2/categories.json` — catálogo de categorias e subcategorias.
- `src/data/v2/flows/` — fluxos de triagem em JSON.
- `src/data/v2/services.json` — catálogo de serviços da rede.
- `src/data/v2/emergency.json` — configuração de emergência.
- `src/data/v2/map-tiles.json` — configuração de tiles do mapa.
- `src/data/v2/network-config.json` — configuração da feature de rede.
- `src/features/resources/data/faq.ts` — FAQ local.
- `src/features/resources/data/glossary.ts` — glossário de recursos.
