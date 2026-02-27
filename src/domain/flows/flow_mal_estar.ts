import type { FlowSpec } from './flowSpec';

export const flow_mal_estar: FlowSpec = {
  "meta": {
    "id": "flow_mal_estar",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "mal_estar_sintomas",
    "title": "Mal-estar ou Sintomas Leves",
    "description": "Orientacoes praticas para a equipe escolar sobre Mal-estar ou Sintomas Fisicos.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Mal-estar ou Sintomas Fisicos. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "sintoma_agudo"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante esta consciente e orientado?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
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
      "question": "Os sintomas persistem ou pioram?",
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
        "sintoma_agudo",
        "agravamento_progressivo"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Acolher estudante",
        "Oferecer repouso supervisionado"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Entrar em contato com os responsaveis",
        "Encaminhar para avaliacao medica"
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
        "rationale": "Sintoma agudo requer avaliacao e monitoramento prioritario."
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
        "label": "Necessidade de avaliacao",
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
