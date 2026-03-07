import type { FlowSpec } from './flowSpec';

export const flow_plano_individual_acompanhamento: FlowSpec = {
  "meta": {
    "id": "flow_plano_individual_acompanhamento",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "plano_acompanhamento",
    "title": "Plano Individual de Acompanhamento",
    "description": "Orientações praticas para a equipe escolar sobre Plano Individual de Acompanhamento.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Plano Individual de Acompanhamento. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "conflito_recorrente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há reincidencia comportamental?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Não",
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
        "Monitoramento leve"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Construir PIA com metas claras",
        "Revisao mensal"
      ],
      "timeline": "Horas",
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
