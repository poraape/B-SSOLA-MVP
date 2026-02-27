import type { FlowSpec } from './flowSpec';

export const flow_reintegracao_pos_suspensao: FlowSpec = {
  "meta": {
    "id": "flow_reintegracao_pos_suspensao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "reintegracao_pos_suspensao",
    "title": "Reintegracao apos Suspensao",
    "description": "Orientacoes praticas para a equipe escolar sobre Reintegracao apos Afastamento/Suspensao.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Reintegracao apos Afastamento/Suspensao. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Suspensao cumprida integralmente?",
      "actions": [
        {
          "label": "Sim",
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
        "Reuniao de reintegracao",
        "Plano de acompanhamento inicial"
      ],
      "timeline": "Dias"
    }
  ]
};
