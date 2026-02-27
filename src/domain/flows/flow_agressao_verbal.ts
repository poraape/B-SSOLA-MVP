import type { FlowSpec } from './flowSpec';

export const flow_agressao_verbal: FlowSpec = {
  "meta": {
    "id": "flow_agressao_verbal",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "agressao_verbal",
    "title": "Agressao Verbal ou Ameacas",
    "description": "Orientacoes praticas para a equipe escolar sobre Agressao Verbal ou Ameacas.",
    "severity": "MODERATE",
    "keywords": [
      "agressao verbal",
      "ameaca",
      "intimidacao",
      "humilhacao"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Agressao Verbal ou Ameacas. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha ameaca de violencia fisica?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Nao",
          "next": "q2"
        }
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "E um episodio recorrente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Nao",
          "next": "outcome_baixo"
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
        "Realizar mediacao de conflito",
        "Orientar estudantes sobre convivencia respeitosa",
        "Monitorar reincidencia"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Registrar formalmente a ocorrencia",
        "Entrar em contato com os responsaveis",
        "Definir plano de acompanhamento com a equipe escolar"
      ],
      "timeline": "Horas"
    }
  ]
};
