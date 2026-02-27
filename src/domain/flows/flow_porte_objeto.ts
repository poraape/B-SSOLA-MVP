import type { FlowSpec } from './flowSpec';

export const flow_porte_objeto: FlowSpec = {
  "meta": {
    "id": "flow_porte_objeto",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "ameaca_com_arma",
    "title": "Porte de Objeto Perigoso",
    "description": "Orientacoes praticas para a equipe escolar sobre Ameaca com Arma ou Objeto Perigoso.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Ameaca com Arma ou Objeto Perigoso. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O objeto e uma arma de fogo ou arma branca de grande porte?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
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
      "question": "Houve ameaca de uso?",
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
        "Isolar estudante",
        "Recolher objeto se seguro",
        "Entrar em contato com os responsaveis"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Evacuar area",
        "Acionar 190 imediatamente"
      ],
      "timeline": "Imediato"
    }
  ]
};
