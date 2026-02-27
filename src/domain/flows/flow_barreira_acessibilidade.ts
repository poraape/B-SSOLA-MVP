import type { FlowSpec } from './flowSpec';

export const flow_barreira_acessibilidade: FlowSpec = {
  "meta": {
    "id": "flow_barreira_acessibilidade",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "barreira_acessibilidade",
    "title": "Barreira de Acessibilidade",
    "description": "Orientacoes praticas para a equipe escolar sobre Barreira de Acessibilidade Fisica ou Digital.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Barreira de Acessibilidade Fisica ou Digital. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "barreira_acesso"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A barreira impede participacao escolar plena?",
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
        "restricao_participacao",
        "ausencia_adaptacao"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Ajuste interno imediato"
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
        "Solicitar apoio institucional",
        "Registrar demanda formal"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "priorizar_acessibilidade"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_moderate",
        "ifAny": [
          "barreira_acesso"
        ],
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Barreira pontual requer ajuste institucional e monitoramento."
      },
      {
        "id": "rule_high",
        "ifAny": [
          "restricao_participacao",
          "ausencia_adaptacao"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "priorizar_acessibilidade"
          ]
        },
        "rationale": "Restricao de participacao exige resposta prioritaria da escola."
      },
      {
        "id": "rule_critical",
        "ifAny": [
          "impedimento_total_acesso",
          "violacao_direito_acesso"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "protecao_direito_acesso"
          ]
        },
        "rationale": "Impedimento total de acesso configura risco critico de violacao de direitos."
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
        "label": "Barreira de acesso identificada",
        "weight": 1
      },
      {
        "id": "restricao_participacao",
        "label": "Restricao de participacao escolar",
        "weight": 2
      },
      {
        "id": "ausencia_adaptacao",
        "label": "Ausencia de adaptacao razoavel",
        "weight": 2
      },
      {
        "id": "impedimento_total_acesso",
        "label": "Impedimento total de acesso",
        "weight": 3
      },
      {
        "id": "violacao_direito_acesso",
        "label": "Violacao de direito de acesso",
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
