import type { FlowSpec } from './flowSpec';

export const flow_abandono: FlowSpec = {
  "meta": {
    "id": "flow_abandono",
    "categoryId": "protecao_direitos",
    "subcategoryId": "abandono_rua",
    "title": "Abandono ou Situacao de Rua",
    "description": "Orientacoes praticas para a equipe escolar sobre Abandono ou Situacao de Rua.",
    "severity": "CRITICAL",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Abandono ou Situacao de Rua. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante esta atualmente sem responsavel ou moradia?",
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
        "Avisar a gestao escolar imediatamente"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Garantir protecao imediata"
      ],
      "timeline": "Imediato"
    }
  ]
};
