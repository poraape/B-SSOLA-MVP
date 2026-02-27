import type { FlowSpec } from './flowSpec';

export const flow_porte_objeto: FlowSpec = {
  "meta": {
    "id": "flow_porte_objeto",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "ameaca_com_arma",
    "title": "Ameaca com Arma ou Objeto Perigoso",
    "description": "Orientacoes para resposta segura diante de porte de arma ou objeto perigoso na escola.",
    "severity": "HIGH",
    "keywords": [
      "porte de objeto",
      "arma",
      "ameaca",
      "protecao escolar"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_ameaca_ativa_com_objeto",
        "ifAny": [
          "objeto_letal",
          "ameaca_de_uso"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_critica",
          "flags": [
            "call_190",
            "notify_management",
            "document_formal",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Ameaca de uso de objeto letal exige resposta imediata de seguranca."
      },
      {
        "id": "rule_posse_sem_ameaca",
        "ifAny": [
          "posse_sem_ameaca_direta"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_contencao_segura",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Mesmo sem ameaca direta, o risco e significativo e requer acao formal."
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
      "equipe_treinada_em_crise",
      "rotina_de_contencao_segura",
      "apoio_da_gestao"
    ],
    "riskSignals": [
      {
        "id": "objeto_letal",
        "label": "Objeto com alto potencial de ferimento grave",
        "examples": [
          "arma de fogo",
          "faca de grande porte"
        ],
        "weight": 3
      },
      {
        "id": "ameaca_de_uso",
        "label": "Ameaca verbal ou gestual de usar o objeto",
        "examples": [
          "apontar objeto para colegas",
          "falar que vai atacar"
        ],
        "weight": 3
      },
      {
        "id": "posse_sem_ameaca_direta",
        "label": "Posse do objeto sem ameaca direta no momento",
        "examples": [
          "objeto encontrado na mochila",
          "porte sem exibicao agressiva"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Reavaliar contexto com a gestao",
        "Registrar observacao inicial"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Entrar em contato com responsaveis",
        "Registrar formalmente a ocorrencia"
      ],
      "CRITICAL": [
        "Acionar 190 imediatamente",
        "Isolar area com seguranca",
        "Nao deixar estudantes sozinhos"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "DELEGACIA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "CRITICAL": [
        "DELEGACIA",
        "CONSELHO_TUTELAR"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Objeto perigoso identificado. Priorize seguranca da turma e acione a gestao.",
      "riskSignals": [
        "objeto_letal",
        "ameaca_de_uso"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Afaste estudantes da area e evite confronto direto sem apoio adequado.",
      "riskSignals": [
        "objeto_letal"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Ha ameaca de uso do objeto ou risco imediato de agressao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_critica"
        },
        {
          "label": "Nao",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "ameaca_de_uso",
        "objeto_letal"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "A posse foi identificada sem ameaca direta no momento?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_contencao_segura"
        },
        {
          "label": "Nao ou situacao confusa",
          "next": "outcome_protecao_critica"
        }
      ],
      "riskSignals": [
        "posse_sem_ameaca_direta"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_critica",
      "label": "Protecao Critica com Seguranca Publica",
      "description": "Risco critico. Acione seguranca publica e proteja a comunidade escolar.",
      "actions": [
        "Acionar 190 imediatamente",
        "Avisar a gestao escolar",
        "Nao deixar estudantes sozinhos em area de risco",
        "Registrar formalmente os fatos observados"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "DELEGACIA",
        "CONSELHO_TUTELAR"
      ],
      "flags": [
        "call_190",
        "notify_management",
        "document_formal",
        "do_not_leave_alone"
      ]
    },
    {
      "id": "outcome_contencao_segura",
      "label": "Contencao Segura e Encaminhamento",
      "description": "Risco alto sem ameaca imediata, com necessidade de acao formal e preventiva.",
      "actions": [
        "Avisar a gestao escolar",
        "Entrar em contato com responsaveis",
        "Registrar formalmente e avaliar encaminhamento de rede"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "DELEGACIA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_prevencao_continua",
      "label": "Prevencao Continua",
      "description": "Sem risco imediato apos contencao, mantendo acompanhamento institucional.",
      "actions": [
        "Realizar escuta acolhedora com envolvidos",
        "Reforcar orientacoes de convivencia e seguranca",
        "Monitorar recorrencia com equipe pedagogica"
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
