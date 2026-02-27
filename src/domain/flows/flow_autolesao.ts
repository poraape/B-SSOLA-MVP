import type { FlowSpec } from './flowSpec';

export const flow_autolesao: FlowSpec = {
  "meta": {
    "id": "flow_autolesao",
    "categoryId": "saude_emocional",
    "subcategoryId": "autolesao",
    "title": "Autolesao",
    "description": "Orientacoes praticas para a equipe escolar sobre Autolesao ou Automutilacao.",
    "severity": "CRITICAL",
    "keywords": [],
    "status": "CONSOLIDATED"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Autolesao ou Automutilacao. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha risco imediato de agravamento?",
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
        "Nao deixar estudante sozinho",
        "Escuta ativa qualificada"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Acionar 192 (SAMU) em emergencia de saude ou 190 em risco de violencia",
        "Garantir supervisao constante"
      ],
      "timeline": "Imediato"
    }
  ]
};
