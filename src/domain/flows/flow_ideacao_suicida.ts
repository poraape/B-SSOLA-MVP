import type { FlowSpec } from './flowSpec';

export const flow_ideacao_suicida: FlowSpec = {
  "meta": {
    "id": "flow_ideacao_suicida",
    "categoryId": "saude_emocional",
    "subcategoryId": "ideacao_suicida",
    "title": "Ideacao Suicida ou Desesperanca",
    "description": "Orientacoes para acolher, proteger e acionar apoio imediato em risco emocional grave.",
    "severity": "CRITICAL",
    "keywords": [
      "ideacao suicida",
      "risco grave",
      "protecao imediata",
      "acolhimento"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_intencao_e_plano",
        "ifAll": [
          "fala_intencao_clara",
          "acesso_a_meio"
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
        "rationale": "Intencao com plano e acesso a meio representa risco imediato de autoagressao."
      },
      {
        "id": "rule_sofrimento_intenso",
        "ifAny": [
          "desesperanca_intensa",
          "isolamento_com_risco"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_apoio_prioritario",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Sofrimento intenso requer resposta prioritaria e articulacao com rede."
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
      "presenca_de_adulto_referencia",
      "rede_familiar_acionada",
      "acompanhamento_continuo"
    ],
    "riskSignals": [
      {
        "id": "fala_intencao_clara",
        "label": "Fala direta sobre se machucar ou morrer",
        "examples": [
          "nao quero mais viver",
          "vou me machucar hoje"
        ],
        "weight": 3
      },
      {
        "id": "acesso_a_meio",
        "label": "Relato de plano e acesso a meio de autoagressao",
        "examples": [
          "ja sei como fazer",
          "tenho algo guardado para isso"
        ],
        "weight": 3
      },
      {
        "id": "desesperanca_intensa",
        "label": "Desesperanca persistente com sofrimento evidente",
        "examples": [
          "choro frequente",
          "frases de sem saida"
        ],
        "weight": 2
      },
      {
        "id": "isolamento_com_risco",
        "label": "Isolamento acentuado com perda de vinculo",
        "examples": [
          "recusa de contato",
          "afastamento abrupto da turma"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Escuta acolhedora e sem julgamento",
        "Plano de acompanhamento com equipe",
        "Registro de observacoes"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Entrar em contato com responsaveis",
        "Encaminhar ao CAPS infantojuvenil"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Nao deixar o estudante sozinho",
        "Garantir supervisao constante ate chegada de apoio"
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
      "content": "Sinal de ideacao suicida identificado. Priorize protecao imediata e acolhimento sem julgamento.",
      "riskSignals": [
        "fala_intencao_clara",
        "desesperanca_intensa"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Permaneca com o estudante em local protegido e acione a gestao escolar.",
      "riskSignals": [
        "isolamento_com_risco"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "O estudante fala em se machucar agora ou apresenta plano com acesso a meio?",
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
        "fala_intencao_clara",
        "acesso_a_meio"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Ha sofrimento intenso com isolamento e piora recente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_apoio_prioritario"
        },
        {
          "label": "Nao",
          "next": "outcome_acompanhamento_continuo"
        }
      ],
      "riskSignals": [
        "desesperanca_intensa",
        "isolamento_com_risco"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_urgente",
      "label": "Protecao Urgente em Risco Imediato",
      "description": "Risco critico. Acione urgencia e mantenha supervisao constante.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestao escolar e os responsaveis",
        "Nao deixar o estudante sozinho em nenhum momento",
        "Registrar formalmente as acoes realizadas"
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
      "id": "outcome_apoio_prioritario",
      "label": "Apoio Prioritario com Rede",
      "description": "Risco alto. Organizar suporte rapido da escola com rede de saude mental.",
      "actions": [
        "Avisar a gestao escolar",
        "Entrar em contato com responsaveis",
        "Encaminhar ao CAPS infantojuvenil e/ou UBS de referencia",
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
      "id": "outcome_acompanhamento_continuo",
      "label": "Acompanhamento Continuo com Protecao",
      "description": "Sem risco imediato identificado, com necessidade de monitoramento constante.",
      "actions": [
        "Realizar escuta acolhedora e sem julgamento",
        "Registrar observacoes e combinar pontos de apoio na escola",
        "Manter acompanhamento continuo com reavaliacao rapida se houver piora"
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
