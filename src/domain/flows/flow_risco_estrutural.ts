import type { FlowSpec } from './flowSpec';

export const flow_risco_estrutural: FlowSpec = {
  "meta": {
    "id": "flow_risco_estrutural",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "risco_estrutural",
    "title": "Risco Estrutural (queda, rachaduras graves)",
    "description": "Orientacoes praticas para a equipe escolar sobre Risco Estrutural.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Risco Estrutural. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha risco imediato de colapso?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Nao",
          "next": "outcome_alto"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Isolar area afetada"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Evacuacao imediata",
        "Acionar autoridades"
      ],
      "timeline": "Imediato"
    }
  ]
};
