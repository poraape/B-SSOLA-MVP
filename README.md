# Bússola

## 1. Visão geral
Bússola é um webapp institucional de navegação cognitiva para apoiar decisão, acolhimento inicial, triagem e encaminhamento em contexto escolar.

No estado atual do repositório, o produto está em fase de MVP operacional para piloto real, com arquitetura local-first preservada e migração incremental para backend leve via endpoints same-origin em `/api/*`.

Usuário primário atual:
- professores
- equipe multiprofissional / equipe de apoio
- gestão escolar

Contexto institucional atual no dataset e na configuração:
- modelo e rede de serviços estão ancorados em cenário escolar real (referências a E.E. Ermelino Matarazzo e território de Ermelino Matarazzo/SP)
- O Bússola não é prontuário, não substitui avaliação clínica ou especializada e não opera, neste estágio, como sistema completo de gestão de casos.

## 2. Problema que o Bússola resolve
O Bússola reduz ambiguidade operacional em situações sensíveis que exigem resposta rápida e coerente entre profissionais.

Problemas atacados hoje:
- incerteza na decisão inicial de risco imediato
- dificuldade de padronizar acolhimento inicial
- variação de encaminhamento entre turnos/equipes
- fricção para encontrar serviços de rede adequados ao nível de risco

## 3. O que o sistema faz hoje
Escopo implementado e ativo:
- jornada completa Home -> Gateway -> Triagem -> Resultado -> Rede
- gateway tripartite (SIM / NÃO / NÃO SEI) com desvio para emergência ou categorias
- 7 categorias oficiais, 39 subcategorias e 39 fluxos de triagem (validados por `model:check`)
- resultado com priorização institucional, ações escolares e encaminhamentos
- rede de apoio com lista + mapa (com fallback visual quando mapa não está disponível)
- módulo de recursos com glossário, FAQ e simulador
- busca unificada (fluxos, FAQ e glossário)

## 4. Jornada principal do usuário
### Home
- entrada institucional com acesso rápido para atendimento guiado, rede e recursos

### Gateway
- pergunta inicial de risco imediato
- decisões possíveis:
  - `SIM` -> rota emergencial
  - `NÃO` -> categorias
  - `NÃO SEI` -> sinais críticos + recomendação inicial

### Triage / Fluxos
- seleção de categoria/subcategoria
- execução sequencial das perguntas do fluxo
- suporte a redirecionamento entre fluxos e retorno ao início quando aplicável

### Resultado
- consolidação da decisão
- exibição de risco com taxonomia institucional PT-BR (`Atenção`, `Atenção Elevada`, `Alto Risco`, `Crítico — Ação Imediata`)
- ações institucionais e serviços recomendados

### Rede
- exibição de serviços com filtros e busca
- mapa Leaflet com tratamento de erro de tile e fallback para experiência em lista

### Recursos complementares
- glossário (com busca e navegação por termos)
- FAQ
- simulador de cenários

## 5. Arquitetura atual
### 5.1 Frontend
Stack principal:
- React 19 + TypeScript
- Vite 6
- React Router 7
- Tailwind CSS 4
- Vitest + Playwright
- Leaflet / React-Leaflet

Frontend responsável por:
- roteamento e shell da aplicação (`src/app/*`)
- features de jornada (`src/features/*`)
- execução local do motor de decisão e busca
- fallback obrigatório quando fachada `/api` está indisponível

### 5.2 Backend leve
Backend leve atual está em `api/*` (funções serverless same-origin):
- `POST /api/triage/resolve`
- `POST /api/search`
- `POST /api/network/services`
- `POST /api/content/bootstrap`

Responsabilidades:
- expor fachada opcional do motor local
- validar payload com contratos tipados em `src/server/contracts/*`
- delegar execução para serviços locais em `src/server/services/*`

### 5.3 Domínio e motor de decisão
Camada de domínio principal:
- `src/domain/model/*`: composição, normalização e validação do modelo
- `src/domain/flows/*`: execução de fluxo
- `src/domain/risk/*`: heurística de risco e invariantes
- `src/application/decisionOrchestrator.ts`: orquestração da decisão (fonte única usada por frontend e backend leve)

### 5.4 Busca e conhecimento
- engine unificada em `src/application/search/unifiedSearchEngine.ts`
- fontes atuais: fluxos, FAQ e glossário
- fachada opcional por `POST /api/search`, com fallback local obrigatório

### 5.5 Rede de serviços
- dados em `src/data/v2/services.json` (30 serviços)
- consulta local por seletores de domínio
- fachada opcional por `POST /api/network/services`, com fallback local obrigatório
- mapa com filtro de coordenadas válidas e proteção por error boundary

### 5.6 Fallback local / local-first
Padrão implementado nos clients de fachada (`triageClient`, `searchClient`, `networkClient`, `contentBootstrapClient`):
- usa local quando flag está desligada
- usa local quando `fetch` não existe
- usa local em timeout (~3s)
- usa local em HTTP não-2xx
- usa local em payload/resposta inválida
- usa local em exceções de rede/execução

Conclusão arquitetural atual: o backend leve atua como fachada opcional e incremental. O modo local-first permanece como garantia estrutural do sistema.

## 6. Backend leve incremental
Por que existe:
- viabilizar evolução operacional, padronização de contratos e observabilidade mínima, sem romper o modelo local-first
- manter mesma UI e mesma jornada independentemente da origem da decisão

O que foi migrado para fachada opcional:
- resolução de triagem (`/api/triage/resolve`)
- busca (`/api/search`)
- carregamento de serviços de rede (`/api/network/services`)
- bootstrap de conteúdo (`/api/content/bootstrap`)

Endpoints disponíveis hoje:
- todos aceitam apenas `POST`
- respostas seguem envelope `{ ok, traceId, data | error }`
- `GET` retorna `405`
- payload inválido retorna `400`

Limites atuais do backend leve:
- não existe persistência de casos
- não existe autenticação/autorização de usuários
- não substitui o motor local nem a execução offline
- não deve receber dados de estudante (nome, CPF, turma, escola_id)

## 7. Feature flags
Flags reais de `.env.example`:

| Variável | Padrão | Efeito |
|---|---|---|
| `VITE_FEATURE_DECISION_API` | `false` | Habilita fachada da triagem em `/api/triage/resolve`. |
| `VITE_FEATURE_TRIAGE_API` | `false` | Alias para o mesmo comportamento da triagem. |
| `VITE_FEATURE_SEARCH_API` | `false` | Habilita fachada de busca em `/api/search`. |
| `VITE_FEATURE_NETWORK_API` | `false` | Habilita fachada da rede em `/api/network/services`. |
| `VITE_FEATURE_CONTENT_BOOTSTRAP_API` | `false` | Habilita fachada de bootstrap em `/api/content/bootstrap`. |
| `VITE_TELEMETRY_ENDPOINT` | `""` | Endpoint opcional de envio HTTP de telemetria (com consentimento). |
| `GEMINI_API_KEY` | comentada | Reservada; não usada no runtime atual do MVP. |

Comportamento esperado para todas as flags `VITE_FEATURE_*_API`:
- desligada -> execução local
- ligada + sucesso HTTP válido -> usa resposta da fachada
- ligada + qualquer falha -> fallback local automático

## 8. Estrutura do repositório
Principais diretórios:
- `api/`: funções serverless same-origin (`/api/*`) usadas como fachada opcional.
- `src/app/`: bootstrap, providers globais, layout e rotas.
- `src/application/`: orquestração e serviços de aplicação (decisão, busca, telemetria, logs).
- `src/domain/`: modelo, fluxos, risco, busca de domínio e validações.
- `src/server/`: contratos, serviços e utilitários HTTP do backend leve.
- `src/features/`: implementação das telas e módulos funcionais.
- `src/data/v2/`: dados institucionais versionados (categorias, serviços, configurações de rede etc.).
- `src/registry/`: registry de flows gerado (`flowRegistry.ts`).
- `docs/`: contratos de execução, deploy e documentação complementar.
- `src/test/e2e/`: cenários Playwright da jornada crítica.

## 9. Como rodar localmente
Pré-requisitos:
- Node.js >= 22
- npm >= 10

Instalação:
```bash
npm install
```

Ambiente:
```bash
cp .env.example .env
```

Execução principal:
```bash
npm run dev
```

Build e preview:
```bash
npm run build
npm run preview
```

## 10. Como validar a aplicação
Comandos de validação recomendados:

```bash
npm run -s model:check
npm run typecheck
npm run build
npm run test:run
npm run test:e2e
```

Status técnico executado nesta sessão (2026-03-07):
- `model:check`: OK (7 categorias, 39 subcategorias, 39 flows)
- `typecheck`: OK
- `build`: OK
- `test:run`: OK (43 arquivos, 157 testes)
- `test:e2e`: OK (3 cenários)

## 11. Deploy
### Vercel
O repositório já está estruturado para deploy com frontend + funções em `api/*`.

Pontos práticos:
- framework: Vite
- build command: `npm ci && npm run build`
- output: `dist/`
- runtime de funções: `api/*` (same-origin)
- na Vercel, o frontend e as funções em `api/*` são publicados no mesmo projeto; a ativação das fachadas deve ser feita por feature flags, preferencialmente de forma progressiva

### Preview
- cada preview pode testar combinação de flags `VITE_FEATURE_*_API`
- para validar local-first, manter flags desligadas em uma preview de controle

### Pontos de atenção
- sem rotas `/api/*` ativas no ambiente, o app continua funcional pelo fallback local
- `VITE_TELEMETRY_ENDPOINT` é opcional; sem endpoint, telemetria fica apenas local
- preservar comportamento SPA (rewrite para `index.html`) quando fora da Vercel

## 12. Contratos e princípios invioláveis
Síntese operacional de `AGENTS.md`, `REFACTORING.md` e `docs/execution/contracts.md`:
- não alterar motor heurístico crítico sem aprovação explícita (`riskRules`, `ruleset`, `riskScore`, `invariants`)
- não quebrar gateway tripartite (SIM/NÃO/NÃO SEI)
- não quebrar jornada principal Home -> Gateway -> Triage -> Resultado -> Rede
- não introduzir armazenamento de dados de estudante (nome, CPF, turma, escola_id)
- triagem não pode depender de internet
- fachada `/api/*` é opcional e deve ter fallback local obrigatório
- não introduzir serviços/dependências pagas para viabilizar operação
- manter taxonomia de prioridade e labels institucionais em PT-BR
- manter consentimento de telemetria antes de envio HTTP

## 13. Estado atual do projeto
O que está sólido:
- jornada principal implementada e coberta por testes unitários e E2E
- modelo com validação estrutural automatizada (`model:check`)
- contratos tipados para endpoints de fachada
- fallback local-first implementado e testado nos clients de triagem, busca, rede e bootstrap

O que está incremental:
- backend leve (`/api/*`) ainda é fachada opcional, não camada obrigatória
- observabilidade remota depende de configuração institucional de endpoint

Pronto para piloto MVP:
- fluxo operacional de apoio à decisão institucional em ambiente escolar
- navegação, triagem, resultado e encaminhamento para rede

## 14. Limitações atuais
Limitações reais no estado atual:
- sem autenticação e controle de perfil por usuário
- sem persistência de caso/atendimento no backend
- sem workflow formal de gestão de casos entre múltiplos atores
- rede de serviços depende do dataset embarcado no repositório
- telemetria HTTP é opcional e depende de endpoint institucional externo configurado
- o sistema depende de revisão institucional contínua para manter aderência entre protocolo escrito, fluxos implementados e prática escolar real

## 15. Próximos passos plausíveis
Eixos coerentes com o estado atual:
1. ampliar backend leve de forma incremental, mantendo contrato local-first
2. fortalecer observabilidade institucional (sem PII e com consentimento explícito)
3. saneamento conservador do repositório (redução de duplicidade e alinhamento entre fontes de modelo)
4. maturação do piloto com feedback de coordenação/gestão para ajustes de conteúdo e operação
5. consolidação do piloto técnico controlado com coleta estruturada de feedback da gestão e dos profissionais da escola

## 16. Licença / governança / observações finais
Licença:
- não há arquivo de licença aberto no repositório; manter entendimento operacional de código fechado (todos os direitos reservados) até definição formal.

Governança mínima:
- este projeto é ferramenta de apoio institucional à decisão, não substitui julgamento profissional, protocolo legal local ou atendimento especializado.
- alterações devem respeitar os contratos invioláveis documentados em `AGENTS.md`, `REFACTORING.md` e `docs/execution/contracts.md`.
