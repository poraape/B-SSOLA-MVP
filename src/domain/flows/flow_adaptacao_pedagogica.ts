import type { FlowSpec } from './flowSpec';

export const flow_adaptacao_pedagogica: FlowSpec = {
  "meta": {
    "id": "flow_adaptacao_pedagogica",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "adaptacao_pedagogica",
    "title": "Necessidade de Adaptacao Pedagogica",
    "description": "Orientacoes praticas para a equipe escolar sobre Necessidade de Adaptacao Pedagogica.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Necessidade de Adaptacao Pedagogica. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha laudo ou indicacao formal?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
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
        "Plano de adaptacao individual",
        "Revisao trimestral"
      ],
      "timeline": "Dias"
    }
  ]
};
