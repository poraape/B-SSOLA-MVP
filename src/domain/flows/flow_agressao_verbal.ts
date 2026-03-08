import type { FlowSpec } from './flowSpec';

export const flow_agressao_verbal: FlowSpec = {
  "meta": {
    "id": "flow_agressao_verbal",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "agressao_verbal",
    "title": "Agressão Verbal ou Ameaças",
    "description": "Orientações para diferenciar ofensa pontual, intimidacao recorrente e ameaca concreta na escola.",
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
      "content": "Agressão verbal identificada. Interrompa a exposição, acolha os envolvidos e acione a gestão quando necessario.",
      "riskSignals": [
        "hostilidade_verbal"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há ameaca concreta de agressao fisica, perseguicao apos a aula ou incentivo para atacar alguem?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_critico"
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
      "question": "Houve humilhacao publica, exposicao digital ou intimidacao recorrente contra o mesmo estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Não",
          "next": "q3"
        }
      ],
      "riskSignals": [
        "intimidacao_recorrente",
        "humilhacao_publica"
      ]
    },
    {
      "id": "q3",
      "type": "question",
      "question": "Foi um episodio pontual, com conflito cessado e possibilidade de reparacao pedagógica segura?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
        },
        {
          "label": "Não",
          "next": "outcome_moderado"
        }
      ],
      "riskSignals": [
        "hostilidade_verbal"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Intervenção Pedagógica Imediata",
      "description": "Episodio pontual sem ameaca concreta, com reparacao e monitoramento em sala.",
      "actions": [
        "Interromper a ofensa e registrar o fato de forma objetiva",
        "Realizar escuta breve com os envolvidos em separado",
        "Pactuar combinados de convivência e monitorar recorrencia"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": []
    },
    {
      "id": "outcome_moderado",
      "label": "Resposta Institucional Estruturada",
      "description": "Intimidacao recorrente ou humilhacao publica com impacto na segurança relacional.",
      "actions": [
        "Avisar a gestão escolar e registrar formalmente a ocorrencia",
        "Acionar responsáveis para alinhamento de proteção e acompanhamento",
        "Definir plano de acompanhamento e avaliar mediacao apenas se houver condicoes seguras"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "MEDIACAO_RESTAURATIVA"
      ],
      "flags": [
        "notify_management",
        "monitorar_reincidencia"
      ]
    },
    {
      "id": "outcome_critico",
      "label": "Proteção Imediata por Ameaça Concreta",
      "description": "Ameaca com potencial de agressao fisica exige proteção prioritaria e resposta institucional imediata.",
      "actions": [
        "Afastar envolvidos e manter estudante ameaçado em local protegido",
        "Avisar gestão escolar e responsáveis imediatamente",
        "Registrar formalmente e acionar suporte externo quando houver risco iminente"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "DELEGACIA",
        "CONSELHO_TUTELAR"
      ],
      "flags": [
        "notify_management",
        "do_not_leave_alone"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_critical",
        "ifAny": [
          "ameaca_violencia",
          "escalada_conflito"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_critico",
          "flags": [
            "notify_management",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Ameaca concreta ou escalada rapida exigem proteção imediata."
      },
      {
        "id": "rule_high",
        "ifAny": [
          "intimidacao_recorrente",
          "humilhacao_publica"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_moderado",
          "flags": [
            "notify_management",
            "monitorar_reincidencia"
          ]
        },
        "rationale": "Intimidacao recorrente e humilhacao publica exigem resposta institucional estruturada."
      },
      {
        "id": "rule_moderate",
        "ifAny": [
          "hostilidade_verbal"
        ],
        "then": {
          "riskLevel": "MODERATE",
          "outcome": "outcome_baixo",
          "flags": []
        },
        "rationale": "Ofensa pontual sem escalada pede intervencao pedagogica e acompanhamento."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "MODERATE",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "adulto_referencia_disponivel",
      "registro_objetivo",
      "acordo_de_convivencia"
    ],
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
        "label": "Ameaça de violência física",
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
      "MODERATE": [
        "Interromper exposição verbal e registrar fato observavel",
        "Ajustar convivência com acompanhamento pedagógico"
      ],
      "HIGH": [
        "Acionar gestão e responsáveis",
        "Definir plano institucional de acompanhamento"
      ],
      "CRITICAL": [
        "Garantir proteção imediata do estudante ameaçado",
        "Acionar suporte externo quando houver risco iminente"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "MEDIACAO_RESTAURATIVA"
      ],
      "CRITICAL": [
        "DELEGACIA",
        "CONSELHO_TUTELAR"
      ]
    }
  }
};
