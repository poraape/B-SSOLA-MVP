# Inventário de Flows — ResultPage Content
Gerado em: 2026-03-02 19:25:00 | Branch: work | Total: 32 flows

## Formato de Deeplink para Rede
Filtrar por tipo: `/rede?type=interno` (valor diferente de `interno` cai na regra de serviços não-internos).
Destacar serviço: `/rede?highlight=<serviceId>`.
Parâmetros lidos via URL (`location.search`) e combinados com contexto (`TriageRecommendationContext`) quando ausentes na URL.

Trecho relevante de código (NetworkPage.tsx):
```tsx
const searchParams = new URLSearchParams(location.search);
const queryType = searchParams.get('type');
const highlightId = searchParams.get('highlight');
const effectiveHighlightId = highlightId || recommendation.highlightId;
const effectiveQueryType = queryType || recommendation.queryType;
if (effectiveQueryType) {
  result = result.filter(s => effectiveQueryType === 'interno'
    ? s.type === 'interno' || s.category === 'institucional'
    : s.type !== 'interno');
}
```

## Tipos de Serviço Disponíveis na Rede
- `externo`: 27 serviço(s)
- `interno`: 3 serviço(s)

### Serviços detalhados
- id: `gestao-direcao` | name: Direção Escolar – E.E. Ermelino Matarazzo | type: `interno` | description: N/A | lat/lng não-nulos: NÃO
- id: `gestao-vice-direcao` | name: Vice-Direção Escolar – E.E. Ermelino Matarazzo | type: `interno` | description: N/A | lat/lng não-nulos: NÃO
- id: `gestao-coordenacao` | name: Coordenação Pedagógica – E.E. Ermelino Matarazzo | type: `interno` | description: N/A | lat/lng não-nulos: NÃO
- id: `ubs-ermelino` | name: UBS Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `caps-ij` | name: CAPS Infantojuvenil II Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `caps-adulto` | name: CAPS Adulto II Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `caps-ad` | name: CAPS AD II Ermelino Matarazzo (Álcool e Drogas) | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `upa-ermelino` | name: UPA III 24h Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `ubs-paranagua` | name: UBS Vila Paranaguá | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `hospital-alipio` | name: Hospital Municipal Prof. Dr. Alípio Corrêa Netto | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `cras-ermelino` | name: CRAS Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `creas-ermelino` | name: CREAS Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `scfv-ermelino` | name: SCFV – Serviço de Convivência e Fortalecimento de Vínculos (referência CRAS Ermelino Matarazzo) | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `conselho-tutelar` | name: Conselho Tutelar de Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `dp-62` | name: 62º DP – Ermelino Matarazzo | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `dp-63` | name: 63º DP – Vila Jacuí | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `ddm-sao-miguel` | name: 7ª DDM – São Miguel Paulista (Leste) | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `mp-infancia` | name: Ministério Público do Estado de São Paulo (MPSP) – Referência para Infância e Juventude | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `defensoria-publica` | name: Defensoria Pública do Estado de São Paulo – Agendamento/Orientação | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `diretoria-ensino-leste1` | name: Diretoria de Ensino – Região Leste 1 | type: `externo` | description: N/A | lat/lng não-nulos: SIM
- id: `sed-atendimento` | name: Secretaria da Educação SP – Central de Atendimento (SED/Acessos) | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `plataforma-conviva` | name: CONVIVA SP – Contato do Programa | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `policia-civil-197` | name: Polícia Civil – 197 | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `policia-militar` | name: Polícia Militar – 190 | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `samu` | name: SAMU – 192 | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `bombeiros` | name: Corpo de Bombeiros – 193 | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `disque-100` | name: Disque 100 – Direitos Humanos | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `disque-denuncia-181` | name: Disque Denúncia – 181 (SSP-SP) | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `disque-180` | name: Ligue 180 – Central de Atendimento à Mulher | type: `externo` | description: N/A | lat/lng não-nulos: NÃO
- id: `cvv` | name: CVV – 188 (Apoio emocional 24h) | type: `externo` | description: N/A | lat/lng não-nulos: NÃO

### Contagem por type
| serviceType | quantidade de serviços |
|---|---:|
| externo | 27 |
| interno | 3 |

## Correlação Categoria → Serviço
| categoria do flow | serviceType prioritário provável | serviceType complementar provável |
|---|---|---|
| emergencias_seguranca (Emergencias e Seguranca) | externo | interno |
| saude_bem_estar (Saude e Bem-Estar) | externo | interno |
| saude_emocional (Saude Emocional) | externo | interno |
| convivencia_conflitos (Convivencia e Conflitos) | interno | externo |
| protecao_direitos (Protecao e Direitos) | externo | interno |
| apoio_social_familiar (Apoio Social e Familiar) | externo | interno |
| inclusao_acessibilidade (Inclusao e Acessibilidade) | interno | externo |

## network-config.json (conteúdo completo)
```json
{
  "layers": {
    "emergencia": {
      "id": "emergencia",
      "label": "Emergências 24h",
      "serviceIds": [
        "policia-militar",
        "samu",
        "bombeiros"
      ],
      "icon": "triangle-alert",
      "color": "#B91C1C",
      "priority": 0,
      "style": "glow",
      "defaultVisible": true
    },
    "denuncia": {
      "id": "denuncia",
      "label": "Canais de Denúncia",
      "serviceIds": [
        "disque-100",
        "disque-denuncia-181",
        "disque-180"
      ],
      "icon": "megaphone",
      "color": "#DC2626",
      "priority": 1,
      "style": "solid",
      "defaultVisible": true
    },
    "protecao": {
      "id": "protecao",
      "label": "Proteção e Direitos",
      "serviceIds": [
        "conselho-tutelar",
        "mp-infancia",
        "defensoria-publica"
      ],
      "icon": "shield-check",
      "color": "#2563EB",
      "priority": 2,
      "style": "solid",
      "defaultVisible": true
    },
    "seguranca": {
      "id": "seguranca",
      "label": "Segurança Pública",
      "serviceIds": [
        "dp-62",
        "dp-63",
        "ddm-sao-miguel",
        "policia-civil-197"
      ],
      "icon": "badge-alert",
      "color": "#F97316",
      "priority": 2,
      "style": "solid",
      "defaultVisible": true
    },
    "saude": {
      "id": "saude",
      "label": "Saúde",
      "serviceIds": [
        "ubs-ermelino",
        "ubs-paranagua",
        "upa-ermelino",
        "hospital-alipio"
      ],
      "icon": "hospital",
      "color": "#16A34A",
      "priority": 3,
      "style": "solid",
      "defaultVisible": true
    },
    "saude_mental": {
      "id": "saude_mental",
      "label": "Saúde Mental",
      "serviceIds": [
        "caps-ij",
        "caps-adulto",
        "caps-ad",
        "cvv"
      ],
      "icon": "brain",
      "color": "#7C3AED",
      "priority": 3,
      "style": "solid",
      "defaultVisible": true
    },
    "assistencia_social": {
      "id": "assistencia_social",
      "label": "Assistência Social",
      "serviceIds": [
        "cras-ermelino",
        "creas-ermelino",
        "scfv-ermelino"
      ],
      "icon": "users",
      "color": "#0EA5E9",
      "priority": 3,
      "style": "solid",
      "defaultVisible": true
    },
    "institucional": {
      "id": "institucional",
      "label": "Rede Institucional",
      "serviceIds": [
        "gestao-direcao",
        "gestao-vice-direcao",
        "gestao-coordenacao",
        "diretoria-ensino-leste1",
        "sed-atendimento",
        "plataforma-conviva"
      ],
      "icon": "school",
      "color": "#1E3A8A",
      "priority": 4,
      "style": "solid",
      "defaultVisible": false
    }
  },
  "schoolReference": {
    "name": "E.E. Ermelino Matarazzo",
    "address": "Rua Abel Tavares, s/n, Jardim Belém, São Paulo/SP, 03810-110",
    "lat": -23.50043,
    "lng": -46.4874,
    "proximityRadiusMeters": 2000
  }
}
```

## Categorias (id + título)
- `emergencias_seguranca`: Emergencias e Seguranca
- `saude_bem_estar`: Saude e Bem-Estar
- `saude_emocional`: Saude Emocional
- `convivencia_conflitos`: Convivencia e Conflitos
- `protecao_direitos`: Protecao e Direitos
- `apoio_social_familiar`: Apoio Social e Familiar
- `inclusao_acessibilidade`: Inclusao e Acessibilidade

## Flows por Categoria
### apoio_social_familiar (Apoio Social e Familiar)

---
FLOW: flow_evasao
Categoria: apoio_social_familiar
Título: Risco de Evasao Escolar
Subcategoria: evasao_faltas
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Acompanhamento pedagogico\", \"Contato com responsavel\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"cras-ermelino\", \"name\": \"CRAS\"}, \"secondaryService\": null, \"schoolActions\": [\"Encaminhar para acompanhamento socioassistencial\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"secondaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS\"}, \"schoolActions\": [\"Comunicar gestao imediatamente\", \"Encaminhamento formal\"]}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_inseguranca_alimentar
Categoria: apoio_social_familiar
Título: Inseguranca Alimentar
Subcategoria: inseguranca_alimentar
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Orientacao interna\", \"Acompanhamento\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"cras-ermelino\", \"name\": \"CRAS\"}, \"secondaryService\": null, \"schoolActions\": [\"Encaminhamento para beneficios socioassistenciais\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

### convivencia_conflitos (Convivencia e Conflitos)

---
FLOW: flow_agressao_fisica
Categoria: convivencia_conflitos
Título: Agressao Fisica entre Estudantes
Subcategoria: agressao_fisica
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar - E.E. Ermelino Matarazzo\"}, \"secondaryService\": null, \"schoolActions\": [\"Separar envolvidos\", \"Registrar ocorrencia institucional\", \"Acionar responsaveis para acompanhamento\"]}"
  high:      "{\"severity\": \"alto\", \"notifyManagement\": true, \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"schoolActions\": [\"Avaliacao medica imediata\", \"Garantir protecao fisica dos estudantes\", \"Comunicar responsaveis e registrar encaminhamento\"]}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_agressao_verbal
Categoria: convivencia_conflitos
Título: Agressao Verbal ou Ameacas
Subcategoria: agressao_verbal
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Realizar mediacao de conflito\", \"Orientar estudantes sobre convivencia respeitosa\", \"Monitorar reincidencia\"]}"
  moderate:      "{\"severity\": \"moderado\", \"notifyManagement\": true, \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Registrar formalmente a ocorrencia\", \"Comunicar responsaveis\", \"Definir plano de acompanhamento com a equipe escolar\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_bullying_piloto_v2
Categoria: convivencia_conflitos
Título: Bullying e Cyberbullying
Subcategoria: bullying
Total de perguntas: 3

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": null, \"secondaryService\": null, \"schoolActions\": [\"Realizar escuta inicial com estudante\", \"Registrar episodio e monitorar recorrencia\", \"Orientar turma sobre convivencia respeitosa\"], \"summaryTag\": \"Convivencia - Intervencao inicial\"}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": null, \"secondaryService\": null, \"schoolActions\": [\"Acionar coordenacao pedagogica e familia\", \"Conduzir mediacao estruturada com acompanhamento\", \"Definir plano de protecao e seguimento por periodo letivo\"], \"summaryTag\": \"Convivencia - Acompanhamento ativo\"}"
  high:      "{\"severity\": \"alto\", \"notifyManagement\": true, \"primaryService\": null, \"secondaryService\": null, \"schoolActions\": [\"Acionar gestao imediatamente\", \"Proteger estudante e interromper contato com agressor\", \"Formalizar encaminhamento institucional e avaliar rede de protecao\"], \"summaryTag\": \"Convivencia - Risco elevado\"}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_discriminacao
Categoria: convivencia_conflitos
Título: Discriminacao ou Racismo
Subcategoria: discriminacao_racismo
Total de perguntas: 3

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Intervencao pedagogica e orientacao imediata\", \"Apoio ao estudante afetado\", \"Acordo de convivencia e monitoramento\"], \"uiFlags\": {\"confidential\": false, \"showGuardrail\": true}}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Registrar ocorrencia institucional minima\", \"Comunicar responsaveis quando apropriado\", \"Plano de acompanhamento e prevencao\"], \"uiFlags\": {\"confidential\": false, \"showGuardrail\": true}}"
  high:      "{\"severity\": \"alto\", \"notifyManagement\": true, \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS Ermelino Matarazzo\"}, \"schoolActions\": [\"Proteger estudante e cessar situacao imediatamente\", \"Acao institucional com gestao\", \"Encaminhar para apoio especializado quando necessario\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true}}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_lgbtfobia
Categoria: convivencia_conflitos
Título: Discriminacao ou Violencia LGBTQIA+
Subcategoria: lgbtfobia
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Intervencao pedagogica imediata\", \"Acolhimento e validacao do estudante\", \"Acordo de convivencia e monitoramento\"], \"uiFlags\": {\"confidential\": false, \"showGuardrail\": true}}"
  moderate:      "{\"severity\": \"moderado\", \"notifyManagement\": true, \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"schoolActions\": [\"Acolhimento com escuta qualificada\", \"Plano de protecao e acompanhamento\", \"Contato com responsaveis quando apropriado e seguro\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true}}"
  high:      "{\"severity\": \"alto\", \"notifyManagement\": true, \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS Ermelino Matarazzo\"}, \"schoolActions\": [\"Cessar situacao imediatamente e proteger o estudante\", \"Acionar gestao com confidencialidade\", \"Encaminhar para apoio especializado quando necessario\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true}}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_mediacao_restaurativa
Categoria: convivencia_conflitos
Título: Mediacao Restaurativa entre Estudantes
Subcategoria: mediacao_restaurativa
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Reuniao mediada com ambas as partes\", \"Registro pedagogico minimo\", \"Acompanhamento por 30 dias\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Plano formal de reparacao\", \"Comunicacao aos responsaveis\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_plano_individual_acompanhamento
Categoria: convivencia_conflitos
Título: Plano Individual de Acompanhamento
Subcategoria: plano_acompanhamento
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Monitoramento leve\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Construir PIA com metas claras\", \"Revisao mensal\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_reintegracao_pos_suspensao
Categoria: convivencia_conflitos
Título: Reintegracao apos Suspensao
Subcategoria: reintegracao_pos_suspensao
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Reuniao de reintegracao\", \"Plano de acompanhamento inicial\"]}"
  moderate:      "N/A"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

### emergencias_seguranca (Emergencias e Seguranca)

---
FLOW: flow_convulsao
Categoria: emergencias_seguranca
Título: Convulsao
Subcategoria: convulsao_perda_consciencia
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Posicao lateral de seguranca\", \"Monitorar respiracao\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"secondaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h Ermelino Matarazzo\"}, \"schoolActions\": [\"Acionar 192 imediatamente\", \"Nao colocar nada na boca do estudante\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_incendio
Categoria: emergencias_seguranca
Título: Incendio ou Principio de Incendio
Subcategoria: incendio_evacuacao
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "N/A"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"bombeiros\", \"name\": \"Corpo de Bombeiros - 193\"}, \"secondaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"schoolActions\": [\"Evacuacao imediata\", \"Seguir plano de abandono\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_porte_objeto
Categoria: emergencias_seguranca
Título: Porte de Objeto Perigoso
Subcategoria: ameaca_com_arma
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"schoolActions\": [\"Isolar estudante\", \"Recolher objeto se seguro\", \"Comunicar responsaveis\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"secondaryService\": null, \"schoolActions\": [\"Evacuar area\", \"Acionar 190 imediatamente\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_risco_estrutural
Categoria: emergencias_seguranca
Título: Risco Estrutural (queda, rachaduras graves)
Subcategoria: risco_estrutural
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Isolar area afetada\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"bombeiros\", \"name\": \"Corpo de Bombeiros - 193\"}, \"secondaryService\": null, \"schoolActions\": [\"Evacuacao imediata\", \"Acionar autoridades\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_violencia_armada
Categoria: emergencias_seguranca
Título: Violencia Armada ou Tiroteio
Subcategoria: violencia_armada
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "N/A"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"secondaryService\": null, \"schoolActions\": [\"Protocolo de abrigo seguro\", \"Nao evacuar (manter todos abrigados)\", \"Acionar 190\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

### inclusao_acessibilidade (Inclusao e Acessibilidade)

---
FLOW: flow_adaptacao_pedagogica
Categoria: inclusao_acessibilidade
Título: Necessidade de Adaptacao Pedagogica
Subcategoria: adaptacao_pedagogica
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Plano de adaptacao individual\", \"Revisao trimestral\"]}"
  moderate:      "N/A"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_barreira_acessibilidade
Categoria: inclusao_acessibilidade
Título: Barreira de Acessibilidade
Subcategoria: barreira_acessibilidade
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"secondaryService\": null, \"schoolActions\": [\"Ajuste interno imediato\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"diretoria-ensino-leste1\", \"name\": \"Diretoria de Ensino Leste 1\"}, \"secondaryService\": null, \"schoolActions\": [\"Solicitar apoio institucional\", \"Registrar demanda formal\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_suspeita_neurodivergencia
Categoria: inclusao_acessibilidade
Título: Suspeita de TEA ou TDAH
Subcategoria: suspeita_neurodivergencia
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Observacao estruturada\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"ubs-ermelino\", \"name\": \"UBS Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"schoolActions\": [\"Orientar responsaveis para avaliacao clinica\", \"Registrar plano pedagogico adaptado\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

### protecao_direitos (Protecao e Direitos)

---
FLOW: flow_abandono
Categoria: protecao_direitos
Título: Abandono ou Situacao de Rua
Subcategoria: abandono_rua
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Comunicar gestao imediatamente\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"secondaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"schoolActions\": [\"Garantir protecao imediata\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_abuso_sexual
Categoria: protecao_direitos
Título: Suspeita de Abuso Sexual
Subcategoria: abuso_sexual
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"secondaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS Ermelino Matarazzo\"}, \"schoolActions\": [\"Acionar gestao imediatamente (minimas pessoas necessarias)\", \"Garantir escuta protegida e sem insistencia em detalhes\", \"Manter sigilo reforcado e minimizacao de dados\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true, \"avoidRetraumatization\": true}}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Priorizar seguranca fisica imediata\", \"Acionar 190 se houver risco atual\", \"Acionar gestao imediatamente\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true, \"avoidRetraumatization\": true}}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_negligencia
Categoria: protecao_direitos
Título: Negligencia Familiar
Subcategoria: negligencia_familiar
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"cras-ermelino\", \"name\": \"CRAS Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Escuta qualificada\", \"Contato com responsaveis\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Comunicar gestao\", \"Encaminhamento formal\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"secondaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"schoolActions\": [\"Garantir protecao imediata\", \"Acionar autoridade competente\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_trabalho_infantil
Categoria: protecao_direitos
Título: Trabalho Infantil
Subcategoria: trabalho_infantil
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Registro institucional\", \"Comunicar gestao\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"secondaryService\": {\"id\": \"disque-100\", \"name\": \"Disque 100\"}, \"schoolActions\": [\"Acionar imediatamente orgao competente\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_violacao_direitos
Categoria: protecao_direitos
Título: Outras Violacoes de Direitos
Subcategoria: outras_violacoes_direitos
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"cras-ermelino\", \"name\": \"CRAS Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Acionar gestao para triagem qualificada\", \"Encaminhar para suporte socioassistencial quando indicado\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true}}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Acionar gestao imediatamente\", \"Encaminhar formalmente a rede de protecao (minimos dados necessarios)\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true}}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Priorizar seguranca imediata\", \"Acionar 190 quando houver risco atual\", \"Acionar gestao imediatamente\"], \"uiFlags\": {\"confidential\": true, \"showGuardrail\": true}}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_violencia_domestica
Categoria: protecao_direitos
Título: Suspeita de Violencia Domestica
Subcategoria: violencia_domestica
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar de Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"creas-ermelino\", \"name\": \"CREAS Ermelino Matarazzo\"}, \"schoolActions\": [\"Escuta protegida\", \"Comunicar gestao\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"policia-militar\", \"name\": \"Policia Militar - 190\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Acionar 190 imediatamente\", \"Garantir protecao fisica\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

### saude_bem_estar (Saude e Bem-Estar)

---
FLOW: flow_acidente_escolar
Categoria: saude_bem_estar
Título: Acidente Escolar
Subcategoria: acidente_lesao
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"ubs-ermelino\", \"name\": \"UBS Ermelino\"}, \"secondaryService\": null, \"schoolActions\": [\"Primeiros socorros basicos\", \"Comunicar responsavel\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h\"}, \"secondaryService\": null, \"schoolActions\": [\"Encaminhar para avaliacao urgente\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"secondaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h Ermelino Matarazzo\"}, \"schoolActions\": [\"Acionar emergencia imediatamente\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_febre
Categoria: saude_bem_estar
Título: Febre ou Suspeita de Infeccao
Subcategoria: febre_infeccao
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"ubs-ermelino\", \"name\": \"UBS Ermelino Matarazzo\"}, \"secondaryService\": null, \"schoolActions\": [\"Aguardar retirada por responsavel\", \"Monitorar temperatura\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"ubs-ermelino\", \"name\": \"UBS Ermelino Matarazzo\"}, \"secondaryService\": null, \"schoolActions\": [\"Orientar responsavel\", \"Encaminhar para UBS\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h\"}, \"secondaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"schoolActions\": [\"Encaminhamento imediato\", \"Monitorar sinais vitais\"]}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_mal_estar
Categoria: saude_bem_estar
Título: Mal-estar ou Sintomas Leves
Subcategoria: mal_estar_sintomas
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"ubs-ermelino\", \"name\": \"UBS Ermelino Matarazzo\"}, \"secondaryService\": null, \"schoolActions\": [\"Acolher estudante\", \"Oferecer repouso supervisionado\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Comunicar responsaveis\", \"Encaminhar para avaliacao medica\"]}"
  high:      "N/A"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

### saude_emocional (Saude Emocional)

---
FLOW: flow_ansiedade
Categoria: saude_emocional
Título: Ansiedade Intensa
Subcategoria: ansiedade_crise
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Escuta ativa\", \"Orientar estrategias de regulacao emocional\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Escuta qualificada\", \"Contato com responsavel\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h\"}, \"secondaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"schoolActions\": [\"Monitorar sinais vitais\", \"Nao deixar estudante sozinho\"]}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_autolesao
Categoria: saude_emocional
Título: Autolesao
Subcategoria: autolesao
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Nao deixar estudante sozinho\", \"Escuta ativa qualificada\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"secondaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil\"}, \"schoolActions\": [\"Acionar emergencia\", \"Garantir supervisao constante\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_depressao
Categoria: saude_emocional
Título: Tristeza Persistente ou Sintomas Depressivos
Subcategoria: tristeza_depressao
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "{\"severity\": \"baixo\", \"primaryService\": {\"id\": \"gestao-coordenacao\", \"name\": \"Coordenacao Pedagogica\"}, \"secondaryService\": null, \"schoolActions\": [\"Acompanhamento pedagogico\", \"Observacao continua\"]}"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"secondaryService\": null, \"schoolActions\": [\"Encaminhamento para avaliacao psicologica\", \"Comunicar responsaveis\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"secondaryService\": {\"id\": \"conselho-tutelar\", \"name\": \"Conselho Tutelar\"}, \"schoolActions\": [\"Protecao ativa\", \"Comunicar gestao imediatamente\"]}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_ideacao_suicida
Categoria: saude_emocional
Título: Ideacao Suicida
Subcategoria: ideacao_suicida
Total de perguntas: 2

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "N/A"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"secondaryService\": {\"id\": \"cvv\", \"name\": \"CVV - 188\"}, \"schoolActions\": [\"Nao deixar estudante sozinho\", \"Comunicar gestao imediatamente\"]}"
  critical:      "{\"severity\": \"iminente\", \"primaryService\": {\"id\": \"samu\", \"name\": \"SAMU - 192\"}, \"secondaryService\": {\"id\": \"caps-ij\", \"name\": \"CAPS Infantojuvenil II\"}, \"schoolActions\": [\"Acionar emergencia\", \"Garantir supervisao constante\"]}"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

---
FLOW: flow_uso_substancias
Categoria: saude_emocional
Título: Uso ou Suspeita de Uso de Alcool e Drogas
Subcategoria: uso_substancias
Total de perguntas: 1

Textos de resultado ATUAIS:
  low:      "N/A"
  moderate:      "{\"severity\": \"moderado\", \"primaryService\": {\"id\": \"caps-ad\", \"name\": \"CAPS AD II Ermelino Matarazzo\"}, \"secondaryService\": {\"id\": \"gestao-direcao\", \"name\": \"Direcao Escolar\"}, \"schoolActions\": [\"Escuta sem julgamento\", \"Orientar responsavel\"]}"
  high:      "{\"severity\": \"alto\", \"primaryService\": {\"id\": \"upa-ermelino\", \"name\": \"UPA III 24h\"}, \"secondaryService\": {\"id\": \"caps-ad\", \"name\": \"CAPS AD II\"}, \"schoolActions\": [\"Avaliacao medica imediata\", \"Garantir seguranca\"]}"
  critical:      "N/A"

Campos SEGUROS para edição editorial:
  - meta.title
  - questions[].text
  - questions[].options[].label
  - results.<nivel>.primaryService.name
  - results.<nivel>.secondaryService.name
  - results.<nivel>.schoolActions[]

Campos PROIBIDOS:
  - meta.id, meta.type, meta.categoryId, meta.subcategoryId, meta.keywords
  - questions[].id, questions[].options[].level
  - results.<nivel>.severity
  - results.<nivel>.primaryService.id, results.<nivel>.secondaryService.id
  - qualquer chave de lógica/controle (ex.: uiFlags, notifyManagement, summaryTag, nextFlow)
---

## Tabela Resumo
| flowId | categoria | título | tem resultado low? | tem resultado critical? |
|---|---|---|---|---|
| flow_abandono | protecao_direitos | Abandono ou Situacao de Rua | NÃO | SIM |
| flow_abuso_sexual | protecao_direitos | Suspeita de Abuso Sexual | NÃO | SIM |
| flow_acidente_escolar | saude_bem_estar | Acidente Escolar | NÃO | SIM |
| flow_adaptacao_pedagogica | inclusao_acessibilidade | Necessidade de Adaptacao Pedagogica | SIM | NÃO |
| flow_agressao_fisica | convivencia_conflitos | Agressao Fisica entre Estudantes | NÃO | NÃO |
| flow_agressao_verbal | convivencia_conflitos | Agressao Verbal ou Ameacas | SIM | NÃO |
| flow_ansiedade | saude_emocional | Ansiedade Intensa | SIM | NÃO |
| flow_autolesao | saude_emocional | Autolesao | NÃO | SIM |
| flow_barreira_acessibilidade | inclusao_acessibilidade | Barreira de Acessibilidade | SIM | NÃO |
| flow_bullying_piloto_v2 | convivencia_conflitos | Bullying e Cyberbullying | SIM | NÃO |
| flow_convulsao | emergencias_seguranca | Convulsao | NÃO | SIM |
| flow_depressao | saude_emocional | Tristeza Persistente ou Sintomas Depressivos | SIM | NÃO |
| flow_discriminacao | convivencia_conflitos | Discriminacao ou Racismo | SIM | NÃO |
| flow_evasao | apoio_social_familiar | Risco de Evasao Escolar | SIM | NÃO |
| flow_febre | saude_bem_estar | Febre ou Suspeita de Infeccao | SIM | NÃO |
| flow_ideacao_suicida | saude_emocional | Ideacao Suicida | NÃO | SIM |
| flow_incendio | emergencias_seguranca | Incendio ou Principio de Incendio | NÃO | SIM |
| flow_inseguranca_alimentar | apoio_social_familiar | Inseguranca Alimentar | SIM | NÃO |
| flow_lgbtfobia | convivencia_conflitos | Discriminacao ou Violencia LGBTQIA+ | SIM | NÃO |
| flow_mal_estar | saude_bem_estar | Mal-estar ou Sintomas Leves | SIM | NÃO |
| flow_mediacao_restaurativa | convivencia_conflitos | Mediacao Restaurativa entre Estudantes | SIM | NÃO |
| flow_negligencia | protecao_direitos | Negligencia Familiar | NÃO | SIM |
| flow_plano_individual_acompanhamento | convivencia_conflitos | Plano Individual de Acompanhamento | SIM | NÃO |
| flow_porte_objeto | emergencias_seguranca | Porte de Objeto Perigoso | NÃO | SIM |
| flow_reintegracao_pos_suspensao | convivencia_conflitos | Reintegracao apos Suspensao | SIM | NÃO |
| flow_risco_estrutural | emergencias_seguranca | Risco Estrutural (queda, rachaduras graves) | NÃO | SIM |
| flow_suspeita_neurodivergencia | inclusao_acessibilidade | Suspeita de TEA ou TDAH | SIM | NÃO |
| flow_trabalho_infantil | protecao_direitos | Trabalho Infantil | NÃO | SIM |
| flow_uso_substancias | saude_emocional | Uso ou Suspeita de Uso de Alcool e Drogas | NÃO | NÃO |
| flow_violacao_direitos | protecao_direitos | Outras Violacoes de Direitos | NÃO | SIM |
| flow_violencia_armada | emergencias_seguranca | Violencia Armada ou Tiroteio | NÃO | SIM |
| flow_violencia_domestica | protecao_direitos | Suspeita de Violencia Domestica | NÃO | SIM |
