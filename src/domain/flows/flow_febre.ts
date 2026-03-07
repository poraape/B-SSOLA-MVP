import type { FlowSpec } from './flowSpec';

export const flow_febre: FlowSpec = {
  "meta": {
    "id": "flow_febre",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "febre_infeccao",
    "title": "Febre ou Suspeita de Infecção",
    "description": "Orientações praticas para a equipe escolar sobre Febre ou Suspeita de Infecção.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Febre ou Suspeita de Infecção. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "sintoma_agudo"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Febre acima de 39C ou acompanhada de convulsão?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Não",
          "next": "q2"
        }
      ],
      "riskSignals": [
        "sintoma_agudo",
        "agravamento_progressivo"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há sintomas respiratórios ou dor intensa?",
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
        "sintoma_agudo",
        "agravamento_progressivo"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Aguardar retirada por responsavel",
        "Monitorar temperatura"
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
        "Orientar responsavel",
        "Encaminhar para UBS"
      ],
      "timeline": "Horas",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestão.",
      "actions": [
        "Encaminhamento imediato",
        "Monitorar sinais vitais"
      ],
      "timeline": "Imediato",
      "riskLevel": "MODERATE",
      "flags": []
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_sintoma_agudo",
        "ifAny": [
          "sintoma_agudo"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Sintoma agudo requer avaliação e monitoramento prioritario."
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "sintoma_agudo",
        "label": "Sintoma agudo",
        "weight": 3
      },
      {
        "id": "agravamento_progressivo",
        "label": "Agravamento progressivo",
        "weight": 2
      },
      {
        "id": "necessidade_avaliacao",
        "label": "Necessidade de avaliação",
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
