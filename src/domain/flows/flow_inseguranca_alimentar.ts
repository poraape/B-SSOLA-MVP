import type { FlowSpec } from './flowSpec';

export const flow_inseguranca_alimentar: FlowSpec = {
  "meta": {
    "id": "flow_inseguranca_alimentar",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "inseguranca_alimentar",
    "title": "Inseguranca Alimentar",
    "description": "Orientacoes praticas para a equipe escolar sobre Fome ou Inseguranca Alimentar.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Fome ou Inseguranca Alimentar. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "vulnerabilidade_economica"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situacao e recorrente e compromete saude?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Nao",
          "next": "outcome_baixo"
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
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Orientacao interna",
        "Acompanhamento"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Encaminhamento para beneficios socioassistenciais"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
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
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Aplica severidade base definida no fluxo."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "HIGH",
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
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
