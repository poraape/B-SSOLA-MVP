import type { FlowSpec } from './flowSpec';

export const flow_agressao_verbal: FlowSpec = {
  "meta": {
    "id": "flow_agressao_verbal",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "agressao_verbal",
    "title": "Agressão Verbal ou Ameaças",
    "description": "Orientações praticas para a equipe escolar sobre Agressão Verbal ou Ameaças.",
    "severity": "MODERATE",
    "keywords": [
      "agressão verbal",
      "ameaça",
      "intimidacao",
      "humilhacao"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Agressão Verbal ou Ameaças. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "hostilidade_verbal"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há ameaça de violencia física?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Não",
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
          "label": "Não",
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
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Realizar mediacao de conflito",
        "Orientar estudantes sobre convivência respeitosa",
        "Monitorar reincidencia"
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
        "rationale": "Conflito verbal pontual exige resposta pedagógica e monitoramento."
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
        "rationale": "Ameaça com potencial de escalada exige proteção imediata."
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
        "label": "Ameaça de violencia física",
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
