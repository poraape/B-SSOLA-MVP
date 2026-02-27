import type { FlowSpec } from './flowSpec';

export const flow_agressao_verbal: FlowSpec = {
  "meta": {
    "id": "flow_agressao_verbal",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "agressao_verbal",
    "title": "Agressao Verbal ou Ameacas",
    "description": "Orientacoes praticas para a equipe escolar sobre Agressao Verbal ou Ameacas.",
    "severity": "MODERATE",
    "keywords": [
      "agressao verbal",
      "ameaca",
      "intimidacao",
      "humilhacao"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Agressao Verbal ou Ameacas. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "hostilidade_verbal"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha ameaca de violencia fisica?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Nao",
          "next": "q2"
        }
      ],
      "riskSignals": [
        "ameaca_violencia",
        "escalada_conflito"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "E um episodio recorrente?",
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
        "intimidacao_recorrente",
        "humilhacao_publica"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Realizar mediacao de conflito",
        "Orientar estudantes sobre convivencia respeitosa",
        "Monitorar reincidencia"
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
        "Registrar formalmente a ocorrencia",
        "Entrar em contato com os responsaveis",
        "Definir plano de acompanhamento com a equipe escolar"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "monitorar_reincidencia"
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
          "hostilidade_verbal"
        ],
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Conflito verbal pontual exige resposta pedagogica e monitoramento."
      },
      {
        "id": "rule_high",
        "ifAny": [
          "intimidacao_recorrente",
          "humilhacao_publica"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "monitorar_reincidencia"
          ]
        },
        "rationale": "Recorrencia e humilhacao aumentam o risco psicossocial."
      },
      {
        "id": "rule_critical",
        "ifAny": [
          "ameaca_violencia",
          "escalada_conflito"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "protecao_imediata"
          ]
        },
        "rationale": "Ameaca com potencial de escalada exige protecao imediata."
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
        "id": "hostilidade_verbal",
        "label": "Hostilidade verbal direta",
        "weight": 1
      },
      {
        "id": "intimidacao_recorrente",
        "label": "Intimidacao recorrente",
        "weight": 2
      },
      {
        "id": "ameaca_violencia",
        "label": "Ameaca de violencia fisica",
        "weight": 3
      },
      {
        "id": "humilhacao_publica",
        "label": "Humilhacao publica",
        "weight": 2
      },
      {
        "id": "escalada_conflito",
        "label": "Escalada rapida de conflito",
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
