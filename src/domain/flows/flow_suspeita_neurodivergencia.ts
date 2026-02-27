import type { FlowSpec } from './flowSpec';

export const flow_suspeita_neurodivergencia: FlowSpec = {
  "meta": {
    "id": "flow_suspeita_neurodivergencia",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "suspeita_neurodivergencia",
    "title": "Suspeita de TEA ou TDAH",
    "description": "Orientacoes praticas para a equipe escolar sobre Suspeita de TEA, TDAH ou Neurodivergencia.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Suspeita de TEA, TDAH ou Neurodivergencia. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha prejuizo significativo no aprendizado?",
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
        "Observacao estruturada"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Orientar responsaveis para avaliacao clinica",
        "Registrar plano pedagogico adaptado"
      ],
      "timeline": "Horas"
    }
  ]
};
