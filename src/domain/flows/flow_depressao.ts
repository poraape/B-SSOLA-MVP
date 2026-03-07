import type { FlowSpec } from './flowSpec';

export const flow_depressao: FlowSpec = {
  "meta": {
    "id": "flow_depressao",
    "categoryId": "saude_emocional",
    "subcategoryId": "tristeza_depressao",
    "title": "Tristeza Persistente ou Sintomas Depressivos",
    "description": "Orientações praticas para a equipe escolar sobre Tristeza Persistente ou Depressao.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Tristeza Persistente ou Depressao. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "sofrimento_intenso"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Os sintomas persistem por semanas e impactam desempenho escolar?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Não",
          "next": "outcome_baixo"
        }
      ],
      "riskSignals": [
        "sofrimento_intenso",
        "isolamento"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há relato de desesperança intensa ou isolamento extremo?",
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
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Acompanhamento pedagógico",
        "Observação continua"
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
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Encaminhamento para avaliação psicologica",
        "Entrar em contato com os responsaveis"
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
        "Proteção ativa",
        "Avisar a gestão escolar imediatamente"
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
