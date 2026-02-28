# Bússola: Protocolo de Ação

_Plataforma de apoio à decisão para equipes escolares que precisam agir rápido em situações sensíveis, com fluxo guiado, linguagem prática e consistência institucional._

O Bússola organiza decisões críticas em protocolos navegáveis para reduzir incerteza operacional no ambiente escolar. O projeto nasce para apoiar coordenação, gestão e atendimento direto a estudantes em cenários de saúde, segurança, convivência, proteção de direitos e inclusão.  
Em vez de depender de memória individual ou interpretação ad hoc, a equipe segue trilhas estruturadas com orientações acionáveis e rastreáveis.

## Sumário

- [Visão geral](#visão-geral)
- [Arquitetura e conceitos-chave](#arquitetura-e-conceitos-chave)
- [Funcionalidades principais](#funcionalidades-principais)
- [Getting started](#getting-started)
- [Exemplos de uso](#exemplos-de-uso)
- [Configuração e ambiente](#configuração-e-ambiente)
- [Qualidade, testes e observabilidade](#qualidade-testes-e-observabilidade)
- [Roadmap e estado de maturidade](#roadmap-e-estado-de-maturidade)
- [Limitações e riscos conhecidos](#limitações-e-riscos-conhecidos)
- [Licença e créditos](#licença-e-créditos)

## Visão geral

### O que é
Aplicação web front-end (React + TypeScript) para triagem e encaminhamento em contextos escolares.

### Problema que resolve
- Reduz ambiguidades na tomada de decisão em casos complexos.
- Padroniza encaminhamentos e linguagem entre diferentes profissionais.
- Diminui tempo de resposta para situações de maior criticidade.

### Para quem é
- Coordenação pedagógica
- Gestão escolar
- Equipes de apoio e atendimento
- Profissionais de referência em contexto escolar

### Relevância estratégica
O Bússola funciona como camada operacional entre política institucional e ação cotidiana. Ele ajuda a transformar diretrizes em decisões reproduzíveis, com menor variação entre turnos, equipes e unidades.

## Arquitetura e conceitos-chave

### Stack principal
- React 19 + TypeScript
- Vite 6
- React Router 7
- Tailwind CSS 4
- Vitest + Testing Library
- Leaflet (módulo de rede de apoio geográfica)

### Visão de arquitetura
- `src/app`: composição da aplicação, roteamento, layout e providers.
- `src/domain/model`: montagem, normalização e validação do `Model.v2`.
- `src/domain/flows`: motor de fluxo (`flowEngine`) e protocolos por arquivo (`flow_*.ts`).
- `src/domain/risk` e `src/domain/gateway`: heurísticas de risco e gateway inicial de urgência.
- `src/data/v2`: dados declarativos de categorias, serviços, heurísticas e emergência.

### Conceitos-chave
- **Model.v2 declarativo**: dados e regras separáveis do shell de interface.
- **Gateway universal de risco imediato**: primeira decisão para rota de emergência vs. navegação por categorias.
- **Composição validada em runtime**: o app valida modelo ao iniciar e bloqueia execução em caso de inconsistência crítica.
- **Cobertura estrutural completa**: 7 categorias, 39 subcategorias e 39 fluxos mapeados.

## Funcionalidades principais

- Atendimento guiado por perguntas e desfechos acionáveis.
- Navegação por categorias priorizadas por criticidade.
- Motor de decisão com regras de risco e sinalização de ações institucionais.
- Página de resultado com orientações e encaminhamentos.
- Módulo de rede de apoio com mapa, filtros e detalhes de serviço.
- Módulo de recursos com glossário, FAQ e simulador de cenários.

## Getting started

### Pré-requisitos
- Node.js 22+
- npm 10+

### Instalação

```bash
git clone <url-do-repositorio>
cd B-SSOLA-MVP
npm install
```

### Execução local (até 15 min)

```bash
# Desenvolvimento (http://localhost:3000)
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview
```

## Exemplos de uso

### Fluxo principal (triagem)
1. Acesse `http://localhost:3000`.
2. Clique em **Iniciar Atendimento Guiado**.
3. Responda ao gateway inicial de risco imediato.
4. Continue no fluxo recomendado até a página de resultado.

### Navegação por rotas (frontend)

```txt
/                     -> Home
/atendimento          -> Gateway de risco imediato
/categoria/:categoryId -> Lista de situações da categoria
/fluxo/:flowId        -> Triagem de um protocolo
/resultado/:flowId    -> Saída consolidada do caso
/rede                 -> Rede de apoio
/recursos             -> Glossário, FAQ e simulador
```

### Operações de manutenção do modelo

```bash
# Regenerar registry de flows
npm run build:registry

# Validar consistência estrutural do Model.v2
npm run model:check
```

## Configuração e ambiente

### Variáveis de ambiente

| Variável | Obrigatória | Uso atual |
|---|---|---|
| `GEMINI_API_KEY` | Não | Reservada para integrações futuras (não consumida pelo runtime atual). |
| `APP_URL` | Não | Metadado de deploy (não bloqueia execução local). |

Observação: o app roda localmente sem `.env` para o fluxo principal.

### Arquivos de configuração relevantes
- `src/data/v2/categories.json`
- `src/data/v2/services.json`
- `src/data/v2/heuristics.json`
- `src/data/v2/emergency.json`
- `docs/domain/flows-v2-spec.json`
- `src/registry/flowRegistry.ts` (gerado)

## Qualidade, testes e observabilidade

```bash
# Typecheck
npm run typecheck

# Testes
npm run test:run

# Cobertura
npm run test:coverage

# Auditoria de heurísticas
npm run heuristic:audit
```

Snapshot técnico deste repositório (local): build de produção, typecheck e suíte de testes executam sem falhas.

## Roadmap e estado de maturidade

**Estado atual:** MVP validável (base funcional completa de triagem + rede + recursos).

**Próximos passos sugeridos:**
1. Revisar e promover para `EXISTING` os fluxos ainda marcados como `TO_CREATE` no spec.
2. Rodar validação com usuários-piloto (coordenação/gestão) e ajustar microcopy.
3. Instrumentar telemetria de uso por etapa do fluxo (tempo, abandono, retorno).
4. Publicar guia operacional institucional por perfil de usuário.
5. Definir trilha de hardening para produção (governança de dados e operação).

## Limitações e riscos conhecidos

- **Domínio sensível (educação/saúde/proteção):** o sistema é apoio decisório e não substitui julgamento profissional, protocolos legais locais ou avaliação especializada.
- **Privacidade e conformidade:** evitar inserir dados pessoais sensíveis sem política institucional explícita; o projeto não declara conformidade legal automática.
- **Maturidade heterogênea de conteúdo:** parte dos fluxos ainda mantém metadado `TO_CREATE` no spec, apesar de presentes no runtime.
- **Escopo atual:** foco em suporte operacional; não inclui backend clínico, prontuário ou gestão formal de casos ponta a ponta.

## Licença e créditos

- **Licença:** código fechado (todos os direitos reservados).
- **Maintainer do modelo:** Projeto Bússola AIS.
- **Contexto institucional no modelo:** EE Ermelino Matarazzo.
- **Documentação complementar:** `docs/architecture/model-v2-blueprint.md` e `docs/migrations/model-v1-to-v2.md`.
