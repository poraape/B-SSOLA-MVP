import type { FlowSpec } from './flowSpec';

export const flow_plano_individual_acompanhamento: FlowSpec = {
  "meta": {
    "id": "flow_plano_individual_acompanhamento",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "plano_acompanhamento",
    "title": "Plano Individual de Acompanhamento",
    "description": "Orientacoes praticas para a equipe escolar sobre Plano Individual de Acompanhamento.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Plano Individual de Acompanhamento. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha reincidencia comportamental?",
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
        "Monitoramento leve"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Construir PIA com metas claras",
        "Revisao mensal"
      ],
      "timeline": "Horas"
    }
  ]
};
