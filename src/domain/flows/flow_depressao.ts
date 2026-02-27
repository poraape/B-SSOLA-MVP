import type { FlowSpec } from './flowSpec';

export const flow_depressao: FlowSpec = {
  "meta": {
    "id": "flow_depressao",
    "categoryId": "saude_emocional",
    "subcategoryId": "tristeza_depressao",
    "title": "Tristeza Persistente ou Sintomas Depressivos",
    "description": "Orientacoes praticas para a equipe escolar sobre Tristeza Persistente ou Depressao.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Tristeza Persistente ou Depressao. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Os sintomas persistem por semanas e impactam desempenho escolar?",
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
      "question": "Ha relato de desesperanca intensa ou isolamento extremo?",
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
        "Observacao continua"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Encaminhamento para avaliacao psicologica",
        "Entrar em contato com os responsaveis"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Protecao ativa",
        "Avisar a gestao escolar imediatamente"
      ],
      "timeline": "Imediato"
    }
  ]
};
