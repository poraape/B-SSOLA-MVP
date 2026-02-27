import type { FlowSpec } from './flowSpec';

export const flow_lgbtfobia: FlowSpec = {
  "meta": {
    "id": "flow_lgbtfobia",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "lgbtfobia",
    "title": "Discriminacao ou Violencia LGBTQIA+",
    "description": "Orientacoes praticas para a equipe escolar sobre Discriminacao ou Violencia LGBTQIA+.",
    "severity": "HIGH",
    "keywords": [
      "lgbtfobia",
      "discriminacao lgbtqia+",
      "homofobia",
      "transfobia"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Discriminacao ou Violencia LGBTQIA+. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha ameaca, perseguicao ou risco de agressao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
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
      "question": "O episodio e recorrente (apelidos, exclusao, humilhacao repetida)?",
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
        "Intervencao pedagogica imediata",
        "Acolhimento e validacao do estudante",
        "Acordo de convivencia e monitoramento"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Acolhimento com escuta qualificada",
        "Plano de protecao e acompanhamento",
        "Contato com os responsaveis quando apropriado e seguro"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Cessar situacao imediatamente e proteger o estudante",
        "Acionar gestao com confidencialidade",
        "Encaminhar para apoio especializado quando necessario"
      ],
      "timeline": "Imediato"
    }
  ]
};
