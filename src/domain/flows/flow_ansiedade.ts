import type { FlowSpec } from './flowSpec';

export const flow_ansiedade: FlowSpec = {
  "meta": {
    "id": "flow_ansiedade",
    "categoryId": "saude_emocional",
    "subcategoryId": "ansiedade_crise",
    "title": "Ansiedade Intensa",
    "description": "Orientacoes praticas para a equipe escolar sobre Crise de Ansiedade ou Panico.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Crise de Ansiedade ou Panico. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante apresenta crise aguda neste momento (hiperventilacao, choro intenso, tremores)?",
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
      "question": "Ha perda de controle, risco fisico ou desmaio?",
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
        "Escuta ativa",
        "Orientar estrategias de regulacao emocional"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Escuta acolhedora e sem julgamento",
        "Contato com responsavel"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Monitorar sinais vitais",
        "Nao deixar estudante sozinho"
      ],
      "timeline": "Imediato"
    }
  ]
};
