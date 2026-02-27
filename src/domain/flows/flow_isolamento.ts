import type { FlowSpec } from './flowSpec';

export const flow_isolamento: FlowSpec = {
  "meta": {
    "id": "flow_isolamento",
    "categoryId": "saude_emocional",
    "subcategoryId": "isolamento_social",
    "title": "Isolamento Social Persistente",
    "description": "Orientacoes praticas para a equipe escolar sobre Isolamento Social Persistente.",
    "severity": "HIGH",
    "keywords": [],
    "status": "TO_CREATE"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Isolamento Social Persistente. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "risco_psicossocial"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha sinais de agravamento que exigem prioridade imediata?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Nao",
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
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Registrar observacoes e manter acompanhamento com a equipe escolar"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Acionar gestao para encaminhamento prioritario e monitoramento imediato"
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
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
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
