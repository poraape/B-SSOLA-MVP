import type { FlowSpec } from './flowSpec';

export const flow_discriminacao: FlowSpec = {
  "meta": {
    "id": "flow_discriminacao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "discriminacao_racismo",
    "title": "Discriminacao ou Racismo",
    "description": "Orientacoes praticas para a equipe escolar sobre Discriminacao ou Racismo.",
    "severity": "HIGH",
    "keywords": [
      "discriminacao",
      "racismo",
      "preconceito",
      "ofensa"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Discriminacao ou Racismo. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O episodio ocorreu agora e ainda ha conflito ativo?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
          "next": "q3"
        }
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Ha ameaca, perseguicao ou risco de agressao?",
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
    },
    {
      "id": "q3",
      "type": "question",
      "question": "Foi um evento pontual sem repeticao aparente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
        },
        {
          "label": "Nao / Reincidente",
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
        "Intervencao pedagogica e orientacao imediata",
        "Apoio ao estudante afetado",
        "Acordo de convivencia e monitoramento"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Registrar ocorrencia institucional minima",
        "Entrar em contato com os responsaveis quando apropriado",
        "Plano de acompanhamento e prevencao"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Proteger estudante e cessar situacao imediatamente",
        "Acao institucional com a gestao escolar",
        "Encaminhar para apoio especializado quando necessario"
      ],
      "timeline": "Imediato"
    }
  ]
};
