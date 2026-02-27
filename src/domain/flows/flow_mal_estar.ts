import type { FlowSpec } from './flowSpec';

export const flow_mal_estar: FlowSpec = {
  "meta": {
    "id": "flow_mal_estar",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "mal_estar_sintomas",
    "title": "Mal-estar ou Sintomas Leves",
    "description": "Orientacoes praticas para a equipe escolar sobre Mal-estar ou Sintomas Fisicos.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Mal-estar ou Sintomas Fisicos. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante esta consciente e orientado?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
        }
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Os sintomas persistem ou pioram?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Nao",
          "next": "outcome_baixo"
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
        "Acolher estudante",
        "Oferecer repouso supervisionado"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Entrar em contato com os responsaveis",
        "Encaminhar para avaliacao medica"
      ],
      "timeline": "Horas"
    }
  ]
};
