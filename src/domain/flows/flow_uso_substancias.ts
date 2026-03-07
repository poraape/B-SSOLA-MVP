import type { FlowSpec } from './flowSpec';

export const flow_uso_substancias: FlowSpec = {
  "meta": {
    "id": "flow_uso_substancias",
    "categoryId": "saude_emocional",
    "subcategoryId": "uso_substancias",
    "title": "Uso ou Suspeita de Uso de Álcool e Drogas",
    "description": "Orientações praticas para a equipe escolar sobre Uso ou Suspeita de Álcool/Drogas.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Uso ou Suspeita de Álcool/Drogas. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "sofrimento_intenso"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante esta sob efeito neste momento?",
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
        "sofrimento_intenso",
        "isolamento"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Escuta sem julgamento",
        "Orientar responsavel"
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
        "Avaliação médica imediata",
        "Garantir segurança"
      ],
      "timeline": "Imediato",
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
        "id": "rule_fala_autolesiva",
        "ifAny": [
          "fala_autolesiva"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "notify_management",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Fala autolesiva exige proteção imediata e supervisao constante."
      },
      {
        "id": "rule_sofrimento_intenso",
        "ifAny": [
          "sofrimento_intenso"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Sofrimento intenso demanda resposta institucional prioritaria."
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
        "id": "sofrimento_intenso",
        "label": "Sofrimento intenso",
        "weight": 2
      },
      {
        "id": "isolamento",
        "label": "Isolamento",
        "weight": 1
      },
      {
        "id": "fala_autolesiva",
        "label": "Fala autolesiva",
        "weight": 3
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
