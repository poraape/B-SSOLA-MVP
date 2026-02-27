import type { FlowSpec } from './flowSpec';

export const flow_evasao: FlowSpec = {
  "meta": {
    "id": "flow_evasao",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "evasao_faltas",
    "title": "Risco de Evasao Escolar",
    "description": "Orientacoes praticas para a equipe escolar sobre Evasao ou Faltas Repetidas.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Evasao ou Faltas Repetidas. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante apresenta faltas recorrentes sem justificativa?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
          "next": "outcome_baixo"
        }
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Ha indicios de trabalho infantil ou situacao familiar grave?",
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
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedag\u00f3gico.",
      "actions": [
        "Acompanhamento pedagogico",
        "Contato com responsavel"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Encaminhar para acompanhamento socioassistencial"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Avisar a gestao escolar imediatamente",
        "Encaminhamento formal"
      ],
      "timeline": "Imediato"
    }
  ]
};
