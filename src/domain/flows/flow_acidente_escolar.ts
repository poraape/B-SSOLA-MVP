import type { FlowSpec } from './flowSpec';

export const flow_acidente_escolar: FlowSpec = {
  "meta": {
    "id": "flow_acidente_escolar",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "acidente_lesao",
    "title": "Acidente Escolar",
    "description": "Orientacoes praticas para a equipe escolar sobre Acidente ou Lesao Fisica.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Acidente ou Lesao Fisica. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha sangramento intenso ou fratura aparente?",
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
      "question": "Ha dor persistente ou dificuldade de locomocao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Primeiros socorros basicos",
        "Comunicar responsavel"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Encaminhar para avaliacao urgente"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Acionar 192 (SAMU) em emergencia de saude ou 190 em risco de violencia imediatamente"
      ],
      "timeline": "Imediato"
    }
  ]
};
