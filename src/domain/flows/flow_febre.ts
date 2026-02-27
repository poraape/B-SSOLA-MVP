import type { FlowSpec } from './flowSpec';

export const flow_febre: FlowSpec = {
  "meta": {
    "id": "flow_febre",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "febre_infeccao",
    "title": "Febre ou Suspeita de Infeccao",
    "description": "Orientacoes praticas para a equipe escolar sobre Febre ou Suspeita de Infeccao.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Febre ou Suspeita de Infeccao. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "sintoma_agudo"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Febre acima de 39C ou acompanhada de convulsao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Nao",
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
      "question": "Ha sintomas respiratorios ou dor intensa?",
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
      "description": "Situacao que exige acompanhamento institucional estruturado.",
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
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
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
