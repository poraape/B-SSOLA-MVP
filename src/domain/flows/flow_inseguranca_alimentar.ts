import type { FlowSpec } from './flowSpec';

export const flow_inseguranca_alimentar: FlowSpec = {
  "meta": {
    "id": "flow_inseguranca_alimentar",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "inseguranca_alimentar",
    "title": "Inseguranca Alimentar",
    "description": "Orientacoes praticas para a equipe escolar sobre Fome ou Inseguranca Alimentar.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Fome ou Inseguranca Alimentar. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situacao e recorrente e compromete saude?",
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
        "Orientacao interna",
        "Acompanhamento"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Encaminhamento para beneficios socioassistenciais"
      ],
      "timeline": "Horas"
    }
  ]
};
