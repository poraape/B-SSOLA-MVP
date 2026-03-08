import type { FlowSpec } from './flowSpec';

export const flow_discriminacao: FlowSpec = {
  "meta": {
    "id": "flow_discriminacao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "discriminacao_racismo",
    "title": "Discriminação ou Racismo",
    "description": "Orientações para resposta institucional diante de discriminacao, racismo e outras violacoes de direitos na escola.",
    "severity": "HIGH",
    "keywords": [
      "discriminacao",
      "racismo",
      "preconceito",
      "ofensa"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Discriminação identificada. Interrompa a violacao, acolha o estudante afetado e acione a gestão.",
      "riskSignals": [
        "episodio_discriminatorio"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há ameaca, perseguicao, tentativa de agressao fisica ou risco concreto a integridade do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_imediata"
        },
        {
          "label": "Não",
          "next": "q2"
        }
      ],
      "riskSignals": [
        "ameaca_violencia_odio"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Houve repeticao, exposicao publica ou exclusao intencional relacionada a discriminacao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_resposta_formal"
        },
        {
          "label": "Não, foi episodio isolado",
          "next": "outcome_intervencao_imediata"
        }
      ],
      "riskSignals": [
        "repeticao_exclusao"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_intervencao_imediata",
      "label": "Intervenção Institucional Imediata",
      "description": "Episodio isolado de discriminacao que exige resposta institucional, registro e ação pedagógica reparadora.",
      "actions": [
        "Interromper a conduta discriminatoria e acolher o estudante afetado",
        "Registrar objetivamente o episodio e comunicar a gestão no mesmo turno",
        "Planejar ação pedagógica de reparacao e prevenção com a equipe escolar"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CAPS_IJ"
      ],
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_resposta_formal",
      "label": "Resposta Formal com Proteção e Acompanhamento",
      "description": "Discriminacao recorrente ou com exclusao sistematica exige plano institucional e proteção continuada.",
      "actions": [
        "Formalizar registro institucional e acionar gestão e responsáveis",
        "Definir plano de proteção ao estudante afetado com monitoramento ativo",
        "Acionar rede de direitos quando houver persistencia ou omissao de proteção"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "notify_management",
        "contact_council"
      ]
    },
    {
      "id": "outcome_protecao_imediata",
      "label": "Proteção Imediata por Violência Discriminatória",
      "description": "Ameaca ou risco de agressao por discriminacao requer proteção imediata e acionamento prioritario da rede.",
      "actions": [
        "Cessar a exposição e proteger imediatamente o estudante em local seguro",
        "Acionar gestão e responsáveis sem atraso",
        "Registrar formalmente e acionar rede externa de proteção quando houver risco iminente"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "DELEGACIA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "notify_management",
        "contact_council",
        "do_not_leave_alone"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_risco_imediato",
        "ifAny": [
          "ameaca_violencia_odio"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_imediata",
          "flags": [
            "notify_management",
            "contact_council",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Discriminacao com ameaca ou risco de agressao exige proteção imediata."
      },
      {
        "id": "rule_repeticao_exclusao",
        "ifAny": [
          "repeticao_exclusao"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_resposta_formal",
          "flags": [
            "notify_management",
            "contact_council"
          ]
        },
        "rationale": "Repeticao, exposição e exclusao exigem plano institucional estruturado."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_intervencao_imediata",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Discriminacao, ainda que isolada, exige resposta institucional e registro."
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
      "adulto_referencia_disponivel",
      "registro_objetivo",
      "acao_pedagogica_antidiscriminatoria"
    ],
    "riskSignals": [
      {
        "id": "episodio_discriminatorio",
        "label": "Episodio discriminatorio identificado",
        "weight": 2
      },
      {
        "id": "repeticao_exclusao",
        "label": "Repeticao, exclusao ou exposicao discriminatoria",
        "weight": 2
      },
      {
        "id": "ameaca_violencia_odio",
        "label": "Ameaça ou risco de agressao por motivacao discriminatoria",
        "weight": 3
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [],
      "HIGH": [
        "Interromper conduta discriminatoria e registrar fato observavel",
        "Acionar gestão e plano institucional de prevenção"
      ],
      "CRITICAL": [
        "Garantir proteção imediata do estudante",
        "Acionar rede externa de proteção sem atraso"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [],
      "HIGH": [
        "CONSELHO_TUTELAR",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "CRITICAL": [
        "CONSELHO_TUTELAR",
        "DELEGACIA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ]
    }
  }
};
