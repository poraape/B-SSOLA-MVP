import type { FlowSpec } from './flowSpec';

export const flow_reintegracao_pos_suspensao: FlowSpec = {
  "meta": {
    "id": "flow_reintegracao_pos_suspensao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "reintegracao_pos_suspensao",
    "title": "Reintegração após Suspensão",
    "description": "Orientações praticas para a equipe escolar sobre Reintegração após Afastamento/Suspensão.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Reintegração após Afastamento/Suspensão. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "conflito_recorrente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Suspensão cumprida integralmente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
        }
      ],
      "riskSignals": [
        "conflito_recorrente",
        "agressividade"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Reuniao de reintegração",
        "Plano de acompanhamento inicial"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_agressividade",
        "ifAny": [
          "agressividade"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Sinais de agressividade exigem intervenção institucional."
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
        "id": "conflito_recorrente",
        "label": "Conflito recorrente",
        "weight": 1
      },
      {
        "id": "agressividade",
        "label": "Agressividade",
        "weight": 3
      },
      {
        "id": "escalada_tensao",
        "label": "Escalada de tensao",
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
