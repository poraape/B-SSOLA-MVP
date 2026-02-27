import type { FlowSpec } from './flowSpec';

export const flow_mediacao_restaurativa: FlowSpec = {
  "meta": {
    "id": "flow_mediacao_restaurativa",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "mediacao_restaurativa",
    "title": "Mediacao Restaurativa entre Estudantes",
    "description": "Orientacoes praticas para a equipe escolar sobre Mediacao e Dialogo Restaurativo.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Mediacao e Dialogo Restaurativo. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O conflito ja cessou e nao ha risco fisico?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedag\u00f3gico.",
      "actions": [
        "Reuniao mediada com ambas as partes",
        "Registro pedagogico minimo",
        "Acompanhamento por 30 dias"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Plano formal de reparacao",
        "Comunicacao aos responsaveis"
      ],
      "timeline": "Horas"
    }
  ]
};
