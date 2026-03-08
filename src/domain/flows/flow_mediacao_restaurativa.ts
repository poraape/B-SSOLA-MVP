import type { FlowSpec } from './flowSpec';

export const flow_mediacao_restaurativa: FlowSpec = {
  "meta": {
    "id": "flow_mediacao_restaurativa",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "mediacao_restaurativa",
    "title": "Mediação Restaurativa entre Estudantes",
    "description": "Orientações para definir quando a mediacao restaurativa e adequada e segura na escola.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Considere mediacao restaurativa somente quando houver condicoes de segurança e proteção dos envolvidos.",
      "riskSignals": [
        "conflito_recorrente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha risco fisico atual, ameaca ativa ou possibilidade de revitimizacao se houver encontro entre envolvidos?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_prioritaria"
        },
        {
          "label": "Não",
          "next": "q2"
        }
      ],
      "riskSignals": [
        "agressividade",
        "escalada_tensao"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Ha assimetria grave de poder, coacao ou recusa de uma das partes em participar com seguranca?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_plano_institucional"
        },
        {
          "label": "Não",
          "next": "outcome_mediacao_elegivel"
        }
      ],
      "riskSignals": [
        "coacao_entre_partes",
        "conflito_recorrente"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_mediacao_elegivel",
      "label": "Mediação Restaurativa Elegível",
      "description": "Conflito sem risco atual e com condicoes minimas para mediacao segura.",
      "actions": [
        "Planejar mediacao com facilitacao institucional e regras claras de segurança",
        "Registrar acordos restaurativos e responsabilidades de acompanhamento",
        "Monitorar cumprimento dos acordos e revisar se houver nova tensao"
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
      "id": "outcome_plano_institucional",
      "label": "Plano Institucional sem Mediação Direta",
      "description": "Sem risco imediato, mas sem elegibilidade para mediacao direta no momento.",
      "actions": [
        "Organizar plano institucional de convivência com acompanhamento por adultos de referencia",
        "Realizar escutas em separado para evitar exposição e revitimizacao",
        "Reavaliar possibilidade de mediacao apenas apos estabilizacao do contexto"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CAPS_IJ"
      ],
      "flags": [
        "notify_management",
        "avoidRetraumatization"
      ]
    },
    {
      "id": "outcome_protecao_prioritaria",
      "label": "Proteção Prioritária sem Mediação",
      "description": "Com risco atual ou ameaca ativa, mediacao nao e indicada e a proteção deve ser priorizada.",
      "actions": [
        "Suspender tentativa de mediacao e proteger envolvidos em ambientes separados",
        "Acionar gestão escolar imediatamente e registrar formalmente",
        "Acionar rede de proteção quando houver risco iminente"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "DELEGACIA"
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
        "id": "rule_risco_imediato",
        "ifAny": [
          "agressividade",
          "escalada_tensao"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_prioritaria",
          "flags": [
            "notify_management",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Com risco ativo, mediacao nao e segura."
      },
      {
        "id": "rule_sem_elegibilidade",
        "ifAny": [
          "coacao_entre_partes",
          "conflito_recorrente"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_plano_institucional",
          "flags": [
            "notify_management",
            "avoidRetraumatization"
          ]
        },
        "rationale": "Sem condicoes minimas de seguranca, priorizar plano institucional sem mediacao direta."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "MODERATE",
          "outcome": "outcome_mediacao_elegivel",
          "flags": []
        },
        "rationale": "Conflito estabilizado sem sinais de risco permite mediacao monitorada."
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
      "acordo_formal_registrado",
      "monitoramento_continuado"
    ],
    "riskSignals": [
      {
        "id": "conflito_recorrente",
        "label": "Conflito recorrente",
        "weight": 1
      },
      {
        "id": "agressividade",
        "label": "Agressividade",
        "weight": 3
      },
      {
        "id": "escalada_tensao",
        "label": "Escalada de tensao",
        "weight": 3
      },
      {
        "id": "coacao_entre_partes",
        "label": "Coacao ou assimetria grave entre as partes",
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Conduzir mediacao com facilitacao e registro de acordos",
        "Monitorar convivência apos mediacao"
      ],
      "HIGH": [
        "Organizar plano institucional sem encontro direto das partes",
        "Reavaliar elegibilidade para mediacao apos estabilizacao"
      ],
      "CRITICAL": [
        "Priorizar proteção e cessar exposição",
        "Acionar gestão e rede externa quando necessario"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CAPS_IJ"
      ],
      "CRITICAL": [
        "CONSELHO_TUTELAR",
        "DELEGACIA"
      ]
    }
  }
};
