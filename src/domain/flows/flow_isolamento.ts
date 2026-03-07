import type { FlowSpec } from './flowSpec';

export const flow_isolamento: FlowSpec = {
  "meta": {
    "id": "flow_isolamento",
    "categoryId": "saude_emocional",
    "subcategoryId": "isolamento_social",
    "title": "Isolamento Social Persistente",
    "description": "Orientações praticas para a equipe escolar sobre Isolamento Social Persistente.",
    "severity": "HIGH",
    "keywords": [],
    "status": "IMPLEMENTED"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Isolamento Social Persistente. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "risco_psicossocial"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há sinais de agravamento que exigem prioridade imediata?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Não",
          "next": "outcome_moderado"
        }
      ],
      "riskSignals": [
        "risco_psicossocial",
        "sofrimento_intenso"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Registrar observações e manter acompanhamento com a equipe escolar"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestão.",
      "actions": [
        "Acionar gestão para encaminhamento prioritario e monitoramento imediato"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    }
  ],
  "risk": {
    "modelVersion": "2.0",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_signal_priority",
        "ifAny": [
          "risco_psicossocial"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Sinal prioritario exige tratamento no nivel de baseline."
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "risco_psicossocial",
        "label": "risco psicossocial",
        "weight": 3
      },
      {
        "id": "sofrimento_intenso",
        "label": "sofrimento intenso",
        "weight": 2
      },
      {
        "id": "isolamento",
        "label": "isolamento",
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
