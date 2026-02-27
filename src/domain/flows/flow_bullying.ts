import type { FlowSpec } from './flowSpec';

export const flow_bullying: FlowSpec = {
  "meta": {
    "id": "flow_bullying",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "bullying",
    "title": "Bullying e Cyberbullying",
    "description": "Orientacoes para diferenciar conflito pontual de bullying e definir protecao adequada.",
    "severity": "HIGH",
    "keywords": [
      "bullying",
      "cyberbullying",
      "humilhacao recorrente",
      "protecao escolar"
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
        "rationale": "Ameacas graves e exposicao humilhante de alto alcance podem gerar risco imediato."
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
        "rationale": "Bullying recorrente exige resposta formal, protecao e plano estruturado."
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
        "label": "Ameaca grave de agressao fisica ou exposicao violenta",
        "examples": [
          "ameaca de bater apos a aula",
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
        "Escuta qualificada e registro pedagogico",
        "Acordos de convivencia e monitoramento"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Registrar formalmente",
        "Acionar responsaveis e plano de intervencao"
      ],
      "CRITICAL": [
        "Garantir protecao imediata da vitima",
        "Nao deixar estudante sozinho em risco grave",
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
      "content": "Possivel bullying identificado. Priorize escuta segura e protecao do estudante.",
      "riskSignals": [
        "repeticao_agressoes",
        "impacto_emocional_importante"
      ]
    },
    {
      "id": "step_2",
      "type": "question",
      "question": "Ha ameaca grave ou exposicao humilhante de ampla circulacao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_imediata"
        },
        {
          "label": "Nao",
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
      "question": "A situacao e repetida e esta causando impacto emocional importante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_plano_intervencao"
        },
        {
          "label": "Nao, foi episodio isolado",
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
      "label": "Protecao Imediata e Acao Formal",
      "description": "Risco critico para integridade emocional ou fisica, com resposta institucional imediata.",
      "actions": [
        "Garantir protecao imediata da vitima em local seguro",
        "Avisar a gestao escolar e os responsaveis",
        "Nao deixar estudante sozinho quando houver risco grave",
        "Registrar formalmente e acionar rede de protecao quando necessario"
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
      "label": "Plano Estruturado de Intervencao",
      "description": "Risco alto com bullying recorrente, exigindo acompanhamento estruturado.",
      "actions": [
        "Avisar gestao escolar e registrar formalmente",
        "Acionar responsaveis dos envolvidos",
        "Implementar plano de intervencao com equipe pedagogica e monitoramento"
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
      "description": "Conflito pontual sem gravidade imediata, com foco em reparacao e prevencao de repeticao.",
      "actions": [
        "Realizar escuta com os envolvidos",
        "Conduzir mediacao restaurativa com acordos de convivencia",
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
