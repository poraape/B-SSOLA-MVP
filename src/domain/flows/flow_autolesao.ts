import type { FlowSpec } from './flowSpec';

export const flow_autolesao: FlowSpec = {
  "meta": {
    "id": "flow_autolesao",
    "categoryId": "saude_emocional",
    "subcategoryId": "autolesao",
    "title": "Autolesao ou Automutilacao",
    "description": "Flow consolidado de autolesao com foco em protecao imediata e rede de cuidado.",
    "severity": "CRITICAL",
    "keywords": [
      "autolesao",
      "automutilacao",
      "risco emocional grave",
      "protecao imediata"
    ],
    "status": "CONSOLIDATED"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_lesao_ativa_ou_plano",
        "ifAny": [
          "lesao_ativa",
          "intencao_repetir_ato"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_urgente",
          "flags": [
            "call_192",
            "notify_management",
            "notify_guardians",
            "do_not_leave_alone",
            "document_formal"
          ]
        },
        "rationale": "Lesao ativa ou intencao imediata exige resposta de urgencia e supervisao continua."
      },
      {
        "id": "rule_sinais_persistentes",
        "ifAny": [
          "historico_recorrente",
          "sofrimento_intenso"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_rede_apoio_prioritaria",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Sinais persistentes exigem plano de protecao e encaminhamento de saude mental."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "CRITICAL",
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "adulto_referencia_disponivel",
      "plano_individual_de_apoio",
      "rede_familiar_acionada"
    ],
    "riskSignals": [
      {
        "id": "lesao_ativa",
        "label": "Lesao recente ou comportamento de autoagressao no momento",
        "examples": [
          "ferimento aparente",
          "tentativa de se machucar na escola"
        ],
        "weight": 3
      },
      {
        "id": "intencao_repetir_ato",
        "label": "Fala de repetir autolesao em curto prazo",
        "examples": [
          "vou fazer de novo hoje",
          "nao consigo parar"
        ],
        "weight": 3
      },
      {
        "id": "historico_recorrente",
        "label": "Historico repetido de autolesao",
        "examples": [
          "episodios frequentes nas ultimas semanas"
        ],
        "weight": 2
      },
      {
        "id": "sofrimento_intenso",
        "label": "Sofrimento emocional intenso e persistente",
        "examples": [
          "choro frequente",
          "isolamento com desesperanca"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Escuta acolhedora e sem julgamento",
        "Registro no acompanhamento escolar",
        "Plano de cuidado com equipe"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Entrar em contato com responsaveis",
        "Encaminhar ao CAPS infantojuvenil"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Nao deixar a pessoa sozinha",
        "Garantir supervisao continua"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "CAPS_IJ",
        "UBS"
      ],
      "CRITICAL": [
        "UPA_HOSPITAL",
        "CAPS_IJ"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Sinal de autolesao identificado. Priorize protecao e acolhimento sem julgamento.",
      "riskSignals": [
        "lesao_ativa",
        "sofrimento_intenso"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Permaneca com o estudante em local protegido e acione a gestao escolar.",
      "riskSignals": [
        "lesao_ativa",
        "intencao_repetir_ato"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Ha lesao ativa ou risco de nova autolesao imediata?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_urgente"
        },
        {
          "label": "Nao",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "lesao_ativa",
        "intencao_repetir_ato"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Ha historico recorrente e sofrimento intenso?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_rede_apoio_prioritaria"
        },
        {
          "label": "Nao",
          "next": "outcome_acompanhamento_protegido"
        }
      ],
      "riskSignals": [
        "historico_recorrente",
        "sofrimento_intenso"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_urgente",
      "label": "Protecao Urgente com Suporte de Saude",
      "description": "Risco critico. Garantir supervisao continua e acionar urgencia.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestao escolar e os responsaveis",
        "Nao deixar o estudante sozinho",
        "Registrar formalmente as medidas adotadas"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "UPA_HOSPITAL",
        "CAPS_IJ"
      ],
      "flags": [
        "call_192",
        "notify_management",
        "notify_guardians",
        "do_not_leave_alone",
        "document_formal"
      ]
    },
    {
      "id": "outcome_rede_apoio_prioritaria",
      "label": "Rede de Apoio Prioritaria",
      "description": "Risco alto. Organizar plano de protecao e encaminhamento de saude mental.",
      "actions": [
        "Avisar a gestao escolar",
        "Entrar em contato com os responsaveis",
        "Encaminhar ao CAPS infantojuvenil e UBS de referencia",
        "Definir plano de acompanhamento com revisao frequente"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "CAPS_IJ",
        "UBS"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal",
        "do_not_leave_alone"
      ]
    },
    {
      "id": "outcome_acompanhamento_protegido",
      "label": "Acompanhamento Protegido",
      "description": "Sem risco imediato, com cuidado continuo e reavaliacao frequente.",
      "actions": [
        "Realizar escuta acolhedora e sem julgamento",
        "Registrar evolucao no acompanhamento escolar",
        "Manter observacao continua e reavaliar em caso de piora"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "UBS"
      ],
      "flags": [
        "document_formal",
        "notify_management"
      ]
    }
  ]
};
