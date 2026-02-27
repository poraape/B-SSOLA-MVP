import type { FlowSpec } from './flowSpec';

export const flow_vulnerabilidade_social: FlowSpec = {
  "meta": {
    "id": "flow_vulnerabilidade_social",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "vulnerabilidade_social_geral",
    "title": "Outras Vulnerabilidades Sociais",
    "description": "Orientacoes praticas para a equipe escolar sobre Outras Vulnerabilidades Sociais.",
    "severity": "MODERATE",
    "keywords": [
      "outras",
      "vulnerabilidades",
      "sociais",
      "vulnerabilidade_social_geral"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Outras Vulnerabilidades Sociais. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
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
          "next": "outcome_acompanhamento"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_acompanhamento",
      "label": "Acompanhamento Pedagogico",
      "description": "Conduzir acompanhamento pedag\u00f3gico com escuta e monitoramento.",
      "actions": [
        "Realizar escuta qualificada",
        "Registrar acompanhamento pedag\u00f3gico",
        "Monitorar evolucao da situacao",
        "Revisar plano de apoio com a equipe"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_encaminhar_categoria",
      "label": "Reavaliar Encaminhamento",
      "description": "Reavaliar categoria e definir fluxo institucional mais adequado.",
      "actions": [
        "Reavaliar contexto com a gestao",
        "Redirecionar para fluxo mais aderente quando necessario",
        "Registrar decisao institucional"
      ],
      "timeline": "Continuo"
    }
  ]
};
