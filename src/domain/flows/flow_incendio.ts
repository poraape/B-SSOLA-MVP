import type { FlowSpec } from './flowSpec';

export const flow_incendio: FlowSpec = {
  "meta": {
    "id": "flow_incendio",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "incendio_evacuacao",
    "title": "Incendio ou Principio de Incendio",
    "description": "Orientacoes praticas para a equipe escolar sobre Incendio ou Evacuacao de Emergencia.",
    "severity": "CRITICAL",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Incendio ou Evacuacao de Emergencia. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha fogo ativo ou fumaca?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Evacuacao imediata",
        "Seguir plano de abandono"
      ],
      "timeline": "Imediato"
    }
  ]
};
