import type { FlowSpec } from './flowSpec';

export const flow_bullying: FlowSpec = {
  "meta": {
    "id": "flow_bullying",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "bullying",
    "title": "Bullying e Cyberbullying",
    "description": "Orientações para diferenciar conflito pontual de bullying e definir proteção adequada.",
    "severity": "HIGH",
    "keywords": [
      "bullying",
      "cyberbullying",
      "humilhacao recorrente",
      "proteção escolar"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_risco_iminente",
        "ifAny": [
          "ameaca_grave",
          "exposicao_viral_humilhante"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_imediata",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Ameaças graves e exposicao humilhante de alto alcance podem gerar risco imediato."
      },
      {
        "id": "rule_repeticao_sistematica",
        "ifAny": [
          "repeticao_agressoes",
          "impacto_emocional_importante"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_plano_intervencao",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Bullying recorrente exige resposta formal, proteção e plano estruturado."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "HIGH",
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "adulto_referencia_disponivel",
      "canal_de_escuta_ativa",
      "mediacao_restaurativa"
    ],
    "riskSignals": [
      {
        "id": "ameaca_grave",
        "label": "Ameaça grave de agressão física ou exposicao violenta",
        "examples": [
          "ameaça de bater após a aula",
          "chantagem com imagens intimas"
        ],
        "weight": 3
      },
      {
        "id": "exposicao_viral_humilhante",
        "label": "Conteudo humilhante com ampla circulacao digital",
        "examples": [
          "video de humilhacao em grupos",
          "perfil falso para ataques"
        ],
        "weight": 3
      },
      {
        "id": "repeticao_agressoes",
        "label": "Agressoes verbais/sociais repetidas contra o mesmo estudante",
        "examples": [
          "apelidos ofensivos diarios",
          "isolamento forcado no recreio"
        ],
        "weight": 2
      },
      {
        "id": "impacto_emocional_importante",
        "label": "Sofrimento emocional relevante associado ao bullying",
        "examples": [
          "medo de vir a escola",
          "queda acentuada de participacao"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Escuta qualificada e registro pedagógico",
        "Acordos de convivência e monitoramento"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Registrar formalmente",
        "Acionar responsaveis e plano de intervenção"
      ],
      "CRITICAL": [
        "Garantir proteção imediata da vítima",
        "Não deixar estudante sozinho em risco grave",
        "Ativar protocolo interno imediato"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CAPS_IJ"
      ],
      "CRITICAL": [
        "CONSELHO_TUTELAR",
        "CAPS_IJ",
        "DELEGACIA"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Possível bullying identificado. Priorize escuta segura e proteção do estudante.",
      "riskSignals": [
        "repeticao_agressoes",
        "impacto_emocional_importante"
      ]
    },
    {
      "id": "step_2",
      "type": "question",
      "question": "Há ameaça grave ou exposicao humilhante de ampla circulacao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_imediata"
        },
        {
          "label": "Não",
          "next": "step_3"
        }
      ],
      "riskSignals": [
        "ameaca_grave",
        "exposicao_viral_humilhante"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "A situação e repetida e esta causando impacto emocional importante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_plano_intervencao"
        },
        {
          "label": "Não, foi episodio isolado",
          "next": "outcome_mediacao_preventiva"
        }
      ],
      "riskSignals": [
        "repeticao_agressoes",
        "impacto_emocional_importante"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_imediata",
      "label": "Proteção Imediata e Ação Formal",
      "description": "Risco critico para integridade emocional ou física, com resposta institucional imediata.",
      "actions": [
        "Garantir proteção imediata da vítima em local seguro",
        "Avisar a gestão escolar e os responsaveis",
        "Não deixar estudante sozinho quando houver risco grave",
        "Registrar formalmente e acionar rede de proteção quando necessario"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "CAPS_IJ",
        "DELEGACIA"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "do_not_leave_alone",
        "document_formal",
        "contact_council"
      ]
    },
    {
      "id": "outcome_plano_intervencao",
      "label": "Plano Estruturado de Intervenção",
      "description": "Risco alto com bullying recorrente, exigindo acompanhamento estruturado.",
      "actions": [
        "Avisar gestão escolar e registrar formalmente",
        "Acionar responsaveis dos envolvidos",
        "Implementar plano de intervenção com equipe pedagógica e monitoramento"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CAPS_IJ"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_mediacao_preventiva",
      "label": "Mediacao Preventiva e Monitoramento",
      "description": "Conflito pontual sem gravidade imediata, com foco em reparacao e prevenção de repeticao.",
      "actions": [
        "Realizar escuta com os envolvidos",
        "Conduzir mediacao restaurativa com acordos de convivência",
        "Monitorar evolucao e registrar acompanhamento"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "document_formal"
      ]
    }
  ]
};
