import type { FlowSpec } from './flowSpec';

export const flow_trabalho_infantil: FlowSpec = {
  "meta": {
    "id": "flow_trabalho_infantil",
    "categoryId": "protecao_direitos",
    "subcategoryId": "trabalho_infantil",
    "title": "Trabalho Infantil",
    "description": "Orientacoes praticas para a equipe escolar sobre Trabalho Infantil ou Exploracao.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Trabalho Infantil ou Exploracao. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A atividade coloca o estudante em risco fisico ou exploracao?",
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
        "Registro institucional",
        "Avisar a gestao escolar"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Acionar imediatamente orgao competente"
      ],
      "timeline": "Imediato"
    }
  ]
};
