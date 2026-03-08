import type { FlowSpec } from './flowSpec';

export const flow_autolesao: FlowSpec = {
  "meta": {
    "id": "flow_autolesao",
    "categoryId": "saude_emocional",
    "subcategoryId": "autolesao",
    "title": "Autolesão ou Automutilação",
    "description": "Flow consolidado de autolesão com foco em proteção imediata e rede de cuidado.",
    "severity": "CRITICAL",
    "keywords": [
      "autolesão",
      "automutilacao",
      "risco emocional grave",
      "proteção imediata"
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
        "rationale": "Lesão ativa ou intencao imediata exige resposta de urgência e supervisao continua."
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
        "rationale": "Sinais persistentes exigem plano de proteção e encaminhamento de saúde mental."
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
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
        "label": "Lesão recente ou comportamento de autoagressao no momento",
        "examples": [
          "ferimento aparente",
          "tentativa de se machucar na escola"
        ],
        "weight": 3
      },
      {
        "id": "intencao_repetir_ato",
        "label": "Fala de repetir autolesão em curto prazo",
        "examples": [
          "vou fazer de novo hoje",
          "não consigo parar"
        ],
        "weight": 3
      },
      {
        "id": "historico_recorrente",
        "label": "Historico repetido de autolesão",
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
          "isolamento com desesperança"
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
        "Avisar gestão escolar",
        "Entrar em contato com responsáveis",
        "Encaminhar ao CAPS infantojuvenil"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Não deixar a pessoa sozinha",
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
      "content": "Sinal de autolesão identificado. Priorize proteção e acolhimento sem julgamento.",
      "riskSignals": [
        "lesao_ativa",
        "sofrimento_intenso"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Permaneca com o estudante em local protegido e acione a gestão escolar.",
      "riskSignals": [
        "lesao_ativa",
        "intencao_repetir_ato"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Há lesão ativa ou risco de nova autolesão imediata?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_urgente"
        },
        {
          "label": "Não",
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
      "question": "A escola observou repetição de episódios de autolesão ou piora recente que exige apoio prioritário?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_rede_apoio_prioritaria"
        },
        {
          "label": "Não",
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
      "label": "Proteção Urgente com Suporte de Saúde",
      "description": "Risco critico. Garantir supervisao continua e acionar urgência.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestão escolar e os responsáveis",
        "Não deixar o estudante sozinho",
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
      "description": "Risco alto. Organizar plano de proteção e encaminhamento de saúde mental.",
      "actions": [
        "Avisar a gestão escolar",
        "Entrar em contato com os responsáveis",
        "Encaminhar ao CAPS infantojuvenil e UBS de referência",
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
      "description": "Sem risco imediato, com cuidado continuo e reavaliação frequente.",
      "actions": [
        "Realizar escuta acolhedora e sem julgamento",
        "Registrar evolucao no acompanhamento escolar",
        "Manter observação continua e reavaliar em caso de piora"
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
