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
      "content": "Situacao identificada: Outras Vulnerabilidades Sociais. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "vulnerabilidade_economica"
      ]
    },
    {
      "id": "step_2",
      "type": "question",
      "question": "Ha risco imediato para o estudante ou para a comunidade escolar?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_encaminhar_categoria"
        },
        {
          "label": "Nao",
          "next": "step_3"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica",
        "risco_abandono"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "A situacao e recorrente ou esta se agravando?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_encaminhar_categoria"
        },
        {
          "label": "Nao",
          "next": "outcome_acompanhamento"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica",
        "risco_abandono"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_acompanhamento",
      "label": "Acompanhamento Pedagogico",
      "description": "Conduzir acompanhamento pedagógico com escuta e monitoramento.",
      "actions": [
        "Realizar escuta qualificada",
        "Registrar acompanhamento pedagógico",
        "Monitorar evolucao da situacao",
        "Revisar plano de apoio com a equipe"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
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
      "timeline": "Continuo",
      "riskLevel": "MODERATE",
      "flags": []
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_risco_abandono",
        "ifAny": [
          "risco_abandono"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Risco de abandono exige articulacao institucional imediata."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Aplica severidade base definida no fluxo."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "MODERATE",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "vulnerabilidade_economica",
        "label": "Vulnerabilidade economica",
        "weight": 1
      },
      {
        "id": "risco_abandono",
        "label": "Risco de abandono",
        "weight": 3
      },
      {
        "id": "instabilidade_familiar",
        "label": "Instabilidade familiar",
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [],
      "HIGH": [],
      "CRITICAL": []
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [],
      "HIGH": [],
      "CRITICAL": []
    }
  }
};
