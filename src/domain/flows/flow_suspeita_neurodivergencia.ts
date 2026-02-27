import type { FlowSpec } from './flowSpec';

export const flow_suspeita_neurodivergencia: FlowSpec = {
  "meta": {
    "id": "flow_suspeita_neurodivergencia",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "suspeita_neurodivergencia",
    "title": "Suspeita de TEA ou TDAH",
    "description": "Orientacoes praticas para a equipe escolar sobre Suspeita de TEA, TDAH ou Neurodivergencia.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Suspeita de TEA, TDAH ou Neurodivergencia. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "barreira_acesso"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha prejuizo significativo no aprendizado?",
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
        "barreira_acesso",
        "dificuldade_persistente"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Observacao estruturada"
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
        "Orientar responsaveis para avaliacao clinica",
        "Registrar plano pedagogico adaptado"
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
        "label": "Necessidade de adaptacao",
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
