import type { FlowSpec } from './flowSpec';

export const flow_barreira_acessibilidade: FlowSpec = {
  "meta": {
    "id": "flow_barreira_acessibilidade",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "barreira_acessibilidade",
    "title": "Barreira de Acessibilidade",
    "description": "Orientacoes praticas para a equipe escolar sobre Barreira de Acessibilidade Fisica ou Digital.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Barreira de Acessibilidade Fisica ou Digital. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A barreira impede participacao escolar plena?",
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
        "Ajuste interno imediato"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Solicitar apoio institucional",
        "Registrar demanda formal"
      ],
      "timeline": "Horas"
    }
  ]
};
