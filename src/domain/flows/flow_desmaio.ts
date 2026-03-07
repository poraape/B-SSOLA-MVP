import type { FlowSpec } from './flowSpec';

export const flow_desmaio: FlowSpec = {
  "meta": {
    "id": "flow_desmaio",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "desmaio_tontura",
    "title": "Desmaio ou Tontura",
    "description": "Orientações praticas para a equipe escolar sobre Desmaio ou Tontura.",
    "severity": "HIGH",
    "keywords": [],
    "status": "IMPLEMENTED"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Desmaio ou Tontura. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "sintoma_agudo"
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
        "sintoma_agudo",
        "agravamento_progressivo"
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
          "sintoma_agudo"
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
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "sintoma_agudo",
        "label": "sintoma agudo",
        "weight": 3
      },
      {
        "id": "agravamento_progressivo",
        "label": "agravamento progressivo",
        "weight": 2
      },
      {
        "id": "necessidade_avaliacao",
        "label": "necessidade avaliação",
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
