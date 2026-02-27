import type { FlowSpec } from './flowSpec';

export const flow_intoxicacao: FlowSpec = {
  "meta": {
    "id": "flow_intoxicacao",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "intoxicacao",
    "title": "Intoxicacao",
    "description": "Orientacoes praticas para a equipe escolar sobre Suspeita de Intoxicacao.",
    "severity": "HIGH",
    "keywords": [],
    "status": "TO_CREATE"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Intoxicacao. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "sintoma_agudo"
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
        "sintoma_agudo",
        "risco_ambiental"
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
        "id": "risco_ambiental",
        "label": "risco ambiental",
        "weight": 2
      },
      {
        "id": "necessidade_avaliacao",
        "label": "necessidade avaliacao",
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
