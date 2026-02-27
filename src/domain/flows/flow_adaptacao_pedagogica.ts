import type { FlowSpec } from './flowSpec';

export const flow_adaptacao_pedagogica: FlowSpec = {
  "meta": {
    "id": "flow_adaptacao_pedagogica",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "adaptacao_pedagogica",
    "title": "Necessidade de Adaptacao Pedagogica",
    "description": "Orientacoes praticas para a equipe escolar sobre Necessidade de Adaptacao Pedagogica.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Necessidade de Adaptacao Pedagogica. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "barreira_aprendizagem_persistente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha laudo ou indicacao formal?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
        },
        {
          "label": "Nao",
          "next": "outcome_baixo"
        }
      ],
      "riskSignals": [
        "necessidade_apoio_pedagogico",
        "defasagem_relevante"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Plano de adaptacao individual",
        "Revisao trimestral"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_moderate",
        "ifAny": [
          "barreira_aprendizagem_persistente",
          "necessidade_apoio_pedagogico"
        ],
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Necessidades pedagogicas recorrentes requerem plano de acompanhamento."
      },
      {
        "id": "rule_high",
        "ifAny": [
          "defasagem_relevante",
          "prejuizo_participacao"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "encaminhamento_pedagogico_prioritario"
          ]
        },
        "rationale": "Defasagem relevante com prejuizo de participacao exige resposta prioritaria."
      },
      {
        "id": "rule_critical",
        "ifAny": [
          "exclusao_pedagogica_imediata",
          "rompimento_vinculo_escolar"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "protecao_vinculo_escolar"
          ]
        },
        "rationale": "Risco de exclusao escolar demanda acao imediata de protecao do vinculo."
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
        "id": "barreira_aprendizagem_persistente",
        "label": "Barreira persistente de aprendizagem",
        "weight": 1
      },
      {
        "id": "necessidade_apoio_pedagogico",
        "label": "Necessidade de apoio pedagogico adicional",
        "weight": 1
      },
      {
        "id": "defasagem_relevante",
        "label": "Defasagem pedagogica relevante",
        "weight": 2
      },
      {
        "id": "prejuizo_participacao",
        "label": "Prejuizo de participacao escolar",
        "weight": 2
      },
      {
        "id": "exclusao_pedagogica_imediata",
        "label": "Risco de exclusao pedagogica imediata",
        "weight": 3
      },
      {
        "id": "rompimento_vinculo_escolar",
        "label": "Risco de rompimento de vinculo escolar",
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
