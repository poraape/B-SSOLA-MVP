import type { FlowSpec } from './flowSpec';

export const flow_suspeita_neurodivergencia: FlowSpec = {
  "meta": {
    "id": "flow_suspeita_neurodivergencia",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "suspeita_neurodivergencia",
    "title": "Suspeita de TEA ou TDAH",
    "description": "Orientações praticas para a equipe escolar sobre Suspeita de TEA, TDAH ou Neurodivergencia.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Suspeita de TEA, TDAH ou Neurodivergencia. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "barreira_acesso"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há prejuizo significativo no aprendizado?",
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
        "barreira_acesso",
        "dificuldade_persistente"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Observação estruturada"
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
        "Orientar responsaveis para avaliação clinica",
        "Registrar plano pedagógico adaptado"
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
        "id": "barreira_acesso",
        "label": "Barreira de acesso",
        "weight": 1
      },
      {
        "id": "dificuldade_persistente",
        "label": "Dificuldade persistente",
        "weight": 2
      },
      {
        "id": "necessidade_adaptacao",
        "label": "Necessidade de adaptação",
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
