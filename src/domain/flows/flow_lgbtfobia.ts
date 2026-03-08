import type { FlowSpec } from './flowSpec';

export const flow_lgbtfobia: FlowSpec = {
  "meta": {
    "id": "flow_lgbtfobia",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "lgbtfobia",
    "title": "Discriminação ou Violência LGBTQIA+",
    "description": "Orientações para proteção institucional em casos de LGBTfobia, com cuidado de segurança e confidencialidade.",
    "severity": "HIGH",
    "keywords": [
      "lgbtfobia",
      "discriminação lgbtqia+",
      "homofobia",
      "transfobia"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "LGBTfobia identificada. Interrompa a violencia, acolha o estudante e preserve confidencialidade quando necessario.",
      "riskSignals": [
        "episodio_lgbtfobico"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há ameaca, perseguicao, risco de agressao fisica ou exposicao nao autorizada que aumente o risco ao estudante?",
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
        "risco_imediato_lgbtfobia",
        "exposicao_revitimizacao"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Houve recorrencia, exclusao de espacos escolares ou humilhacao repetida por identidade/orientacao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_plano_protecao"
        },
        {
          "label": "Não, foi episodio isolado",
          "next": "outcome_intervencao_imediata"
        }
      ],
      "riskSignals": [
        "recorrencia_lgbtfobia"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_intervencao_imediata",
      "label": "Intervenção Imediata com Acolhimento Protegido",
      "description": "Episodio isolado de LGBTfobia com necessidade de resposta institucional, acolhimento e prevenção.",
      "actions": [
        "Interromper a conduta lgbtfobica e acolher o estudante em ambiente protegido",
        "Registrar o episodio com linguagem objetiva e comunicar a gestão",
        "Reforçar pactos de convivência e prevenir nova exposição"
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
      "id": "outcome_plano_protecao",
      "label": "Plano Institucional de Proteção e Acompanhamento",
      "description": "LGBTfobia recorrente exige plano formal de proteção, monitoramento e cuidado com confidencialidade.",
      "actions": [
        "Formalizar registro e acionar gestão e responsáveis com criterio de proteção",
        "Definir plano de proteção com acompanhamento continuado da rotina escolar",
        "Preservar confidencialidade sobre identidade/orientacao quando a divulgação aumentar risco"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CONSELHO_TUTELAR"
      ],
      "flags": [
        "notify_management",
        "confidential",
        "avoidRetraumatization"
      ]
    },
    {
      "id": "outcome_protecao_imediata",
      "label": "Proteção Imediata por Risco de Violência LGBTfóbica",
      "description": "Risco imediato por ameaca, perseguicao ou exposição exige proteção imediata e acionamento prioritario.",
      "actions": [
        "Garantir proteção imediata do estudante e afastar risco no ambiente escolar",
        "Acionar gestão escolar e responsáveis sem exposição desnecessaria",
        "Registrar formalmente e acionar rede externa quando houver risco iminente"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "DELEGACIA",
        "CAPS_IJ"
      ],
      "flags": [
        "notify_management",
        "confidential",
        "avoidRetraumatization",
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
          "risco_imediato_lgbtfobia",
          "exposicao_revitimizacao"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_imediata",
          "flags": [
            "notify_management",
            "confidential",
            "avoidRetraumatization",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Ameaca, perseguicao e exposição de risco exigem proteção imediata."
      },
      {
        "id": "rule_recorrencia",
        "ifAny": [
          "recorrencia_lgbtfobia"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_plano_protecao",
          "flags": [
            "notify_management",
            "confidential",
            "avoidRetraumatization"
          ]
        },
        "rationale": "Recorrencia de LGBTfobia exige plano institucional de proteção."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_intervencao_imediata",
          "flags": [
            "notify_management",
            "avoidRetraumatization"
          ]
        },
        "rationale": "Mesmo episodio isolado exige resposta institucional e cuidado com revitimizacao."
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
      "ambiente_seguro",
      "sigilo_adequado"
    ],
    "riskSignals": [
      {
        "id": "episodio_lgbtfobico",
        "label": "Episodio lgbtfobico identificado",
        "weight": 2
      },
      {
        "id": "recorrencia_lgbtfobia",
        "label": "LGBTfobia recorrente com exclusao ou humilhacao",
        "weight": 2
      },
      {
        "id": "risco_imediato_lgbtfobia",
        "label": "Ameaça, perseguicao ou risco de agressao fisica",
        "weight": 3
      },
      {
        "id": "exposicao_revitimizacao",
        "label": "Exposição nao autorizada que amplia risco e revitimizacao",
        "weight": 3
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [],
      "HIGH": [
        "Interromper conduta lgbtfobica e registrar fato observavel",
        "Organizar acompanhamento institucional com proteção e sigilo"
      ],
      "CRITICAL": [
        "Garantir proteção imediata e não exposição do estudante",
        "Acionar rede externa quando houver risco iminente"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [],
      "HIGH": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "CAPS_IJ"
      ],
      "CRITICAL": [
        "CONSELHO_TUTELAR",
        "DELEGACIA",
        "CAPS_IJ"
      ]
    }
  }
};
