import type { FlowSpec } from './flowSpec';

export const flow_violencia_domestica: FlowSpec = {
  "meta": {
    "id": "flow_violencia_domestica",
    "categoryId": "protecao_direitos",
    "subcategoryId": "violencia_domestica",
    "title": "Suspeita de Violência Doméstica",
    "description": "Orientações para proteger o estudante e acionar a rede de proteção de forma segura.",
    "severity": "CRITICAL",
    "keywords": [
      "violência domestica",
      "proteção",
      "escuta segura",
      "rede de direitos"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_risco_imediato",
        "ifAny": [
          "ameaca_ativa",
          "lesao_grave_aparente"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_imediata",
          "flags": [
            "call_190",
            "notify_management",
            "contact_council",
            "do_not_leave_alone",
            "document_formal"
          ]
        },
        "rationale": "Ameaça ativa exige proteção imediata e acionamento formal da rede de direitos."
      },
      {
        "id": "rule_suspeita_consistente",
        "ifAny": [
          "relato_repetido",
          "medo_de_voltar_para_casa"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_acionar_rede_protecao",
          "flags": [
            "notify_management",
            "contact_council",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Sem risco imediato, mas com indícios consistentes de violência e necessidade de rede."
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
      "escuta_segura",
      "equipe_pedagogica_articulada",
      "registro_formal_adequado"
    ],
    "riskSignals": [
      {
        "id": "ameaca_ativa",
        "label": "Agressor próximo ou ameaça atual contra o estudante",
        "examples": [
          "recado de ameaça recente",
          "responsavel agressivo aguardando na saída"
        ],
        "weight": 3
      },
      {
        "id": "lesao_grave_aparente",
        "label": "Sinais físicos importantes de violência",
        "examples": [
          "hematomas extensos",
          "dor intensa com limitacao de movimento"
        ],
        "weight": 3
      },
      {
        "id": "relato_repetido",
        "label": "Relatos repetidos de agressão em casa",
        "examples": [
          "estudante relata episodios em diferentes dias"
        ],
        "weight": 2
      },
      {
        "id": "medo_de_voltar_para_casa",
        "label": "Medo intenso de retorno para casa",
        "examples": [
          "choro ao falar de voltar",
          "pedido para não ser levado"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Escuta acolhedora e sem julgamento",
        "Registro pedagógico inicial",
        "Monitoramento em conjunto com a equipe"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Registrar formalmente",
        "Acionar Conselho Tutelar e rede de proteção"
      ],
      "CRITICAL": [
        "Acionar 190 quando houver risco atual",
        "Não deixar o estudante sozinho",
        "Garantir proteção física imediata"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "CONSELHO_TUTELAR",
        "CREAS"
      ],
      "CRITICAL": [
        "CONSELHO_TUTELAR",
        "CREAS",
        "DELEGACIA"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Suspeita de violência doméstica identificada. Priorize proteção e escuta segura.",
      "riskSignals": [
        "relato_repetido",
        "medo_de_voltar_para_casa"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Conduza escuta protegida, sem pressionar por detalhes e sem investigar sozinho.",
      "riskSignals": [
        "relato_repetido"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Há risco imediato para o estudante agora?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_imediata"
        },
        {
          "label": "Não",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "ameaca_ativa",
        "lesao_grave_aparente"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "A escola observou sinais consistentes de risco no ambiente familiar, como relatos recorrentes ou medo intenso de voltar para casa?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_acionar_rede_protecao"
        },
        {
          "label": "Não, sinais iniciais",
          "next": "outcome_acompanhamento_protetivo"
        }
      ],
      "riskSignals": [
        "relato_repetido",
        "medo_de_voltar_para_casa"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_imediata",
      "label": "Proteção Imediata do Estudante",
      "description": "Risco imediato. Garanta proteção física e acione a rede de emergência.",
      "actions": [
        "Acionar 190 quando houver risco atual",
        "Avisar a gestão escolar imediatamente",
        "Não deixar o estudante sozinho",
        "Acionar Conselho Tutelar com registro formal"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "DELEGACIA",
        "CREAS"
      ],
      "flags": [
        "call_190",
        "notify_management",
        "contact_council",
        "do_not_leave_alone",
        "document_formal"
      ]
    },
    {
      "id": "outcome_acionar_rede_protecao",
      "label": "Acionar Rede de Proteção",
      "description": "Risco alto com indícios consistentes. Organizar proteção e acompanhamento institucional.",
      "actions": [
        "Avisar a gestão escolar",
        "Registrar formalmente a situação",
        "Acionar Conselho Tutelar e CREAS",
        "Entrar em contato com responsáveis quando isso não aumentar o risco"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "CREAS"
      ],
      "flags": [
        "notify_management",
        "contact_council",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_acompanhamento_protetivo",
      "label": "Acompanhamento Protetivo Inicial",
      "description": "Sinais iniciais, sem risco imediato. Manter acompanhamento e reavaliação frequente.",
      "actions": [
        "Realizar escuta acolhedora e sem julgamento",
        "Registrar observações da equipe pedagógica",
        "Monitorar novos sinais e reavaliar rapidamente se houver agravamento"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CRAS"
      ],
      "flags": [
        "document_formal"
      ]
    }
  ]
};
