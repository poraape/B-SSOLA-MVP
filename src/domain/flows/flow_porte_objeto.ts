import type { FlowSpec } from './flowSpec';

export const flow_porte_objeto: FlowSpec = {
  "meta": {
    "id": "flow_porte_objeto",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "ameaca_com_arma",
    "title": "Ameaça com Arma ou Objeto Perigoso",
    "description": "Orientações para resposta segura diante de porte de arma ou objeto perigoso na escola.",
    "severity": "HIGH",
    "keywords": [
      "porte de objeto",
      "arma",
      "ameaça",
      "proteção escolar"
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
        "rationale": "Ameaça de uso de objeto letal exige resposta imediata de segurança."
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
        "rationale": "Mesmo sem ameaça direta, o risco e significativo e requer ação formal."
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
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
        "label": "Ameaça verbal ou gestual de usar o objeto",
        "examples": [
          "apontar objeto para colegas",
          "falar que vai atacar"
        ],
        "weight": 3
      },
      {
        "id": "posse_sem_ameaca_direta",
        "label": "Posse do objeto sem ameaça direta no momento",
        "examples": [
          "objeto encontrado na mochila",
          "porte sem exibicao agressiva"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Reavaliar contexto com a gestão",
        "Registrar observação inicial"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Entrar em contato com responsáveis",
        "Registrar formalmente a ocorrencia"
      ],
      "CRITICAL": [
        "Acionar 190 imediatamente",
        "Isolar area com segurança",
        "Não deixar estudantes sozinhos"
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
      "content": "Objeto perigoso identificado. Priorize segurança da turma e acione a gestão.",
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
      "question": "Há ameaça de uso do objeto ou risco imediato de agressão?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_critica"
        },
        {
          "label": "Não",
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
      "question": "A posse foi identificada sem ameaça direta no momento?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_contencao_segura"
        },
        {
          "label": "Não ou situação confusa",
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
      "label": "Proteção Critica com Segurança Publica",
      "description": "Risco critico. Acione segurança publica e proteja a comunidade escolar.",
      "actions": [
        "Acionar 190 imediatamente",
        "Avisar a gestão escolar",
        "Não deixar estudantes sozinhos em area de risco",
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
      "description": "Risco alto sem ameaça imediata, com necessidade de ação formal e preventiva.",
      "actions": [
        "Avisar a gestão escolar",
        "Entrar em contato com responsáveis",
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
      "label": "Prevenção Continua",
      "description": "Sem risco imediato após contencao, mantendo acompanhamento institucional.",
      "actions": [
        "Realizar escuta acolhedora com envolvidos",
        "Reforcar orientações de convivência e segurança",
        "Monitorar recorrencia com equipe pedagógica"
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
