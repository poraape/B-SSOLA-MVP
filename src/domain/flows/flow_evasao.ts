import type { FlowSpec } from './flowSpec';

export const flow_evasao: FlowSpec = {
  "meta": {
    "id": "flow_evasao",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "evasao_faltas",
    "title": "Risco de Evasão Escolar",
    "description": "Orientações praticas para a equipe escolar sobre Evasão ou Faltas Repetidas.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Evasão ou Faltas Repetidas. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "vulnerabilidade_economica"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante apresenta faltas recorrentes sem justificativa?",
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
        "vulnerabilidade_economica",
        "risco_abandono"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há indícios de trabalho infantil ou situação familiar grave?",
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
        "vulnerabilidade_economica",
        "risco_abandono"
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
        "Contato com responsavel"
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
        "Encaminhar para acompanhamento socioassistencial"
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
        "Avisar a gestão escolar imediatamente",
        "Encaminhamento formal"
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
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
