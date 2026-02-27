import type { FlowSpec } from './flowSpec';

export const flow_bullying: FlowSpec = {
  "meta": {
    "id": "flow_bullying",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "bullying",
    "title": "Bullying e Cyberbullying",
    "description": "Orientacoes praticas para a equipe escolar sobre Bullying e Cyberbullying.",
    "severity": "HIGH",
    "keywords": [
      "bullying",
      "cyberbullying"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Bullying e Cyberbullying. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "step_2",
      "type": "question",
      "question": "Ha risco imediato para o estudante ou para a comunidade escolar?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_acompanhamento_prioritario"
        },
        {
          "label": "Nao",
          "next": "step_3"
        }
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "A situacao e recorrente ou esta se agravando?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_plano_seguimento"
        },
        {
          "label": "Nao",
          "next": "outcome_plano_seguimento"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_acompanhamento_prioritario",
      "label": "Acompanhamento Prioritario",
      "description": "Manter acompanhamento prioritario com foco em seguranca e cuidado.",
      "actions": [
        "Avisar a gestao escolar escolar",
        "Registrar formalmente a ocorrencia",
        "Entrar em contato com os responsaveis",
        "Encaminhar a UBS de referencia, CAPS infantojuvenil ou CREAS quando necessario"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_plano_seguimento",
      "label": "Plano de Seguimento",
      "description": "Definir plano de acompanhamento com monitoramento continuo.",
      "actions": [
        "Realizar escuta qualificada",
        "Definir plano de acompanhamento com equipe pedagogica",
        "Monitorar evolucao da situacao"
      ],
      "timeline": "Dias"
    }
  ]
};
