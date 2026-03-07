import type { FlowSpec } from './flowSpec';

export const flow_agressao_fisica: FlowSpec = {
  "meta": {
    "id": "flow_agressao_fisica",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "agressao_fisica",
    "title": "Agressão Física entre Estudantes",
    "description": "Orientações para interromper agressão física e proteger envolvidos na escola.",
    "severity": "HIGH",
    "keywords": [
      "agressão física",
      "briga",
      "proteção imediata",
      "convivência escolar"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_lesao_grave_ou_objeto",
        "ifAny": [
          "lesao_grave_aparente",
          "uso_objeto_agressao"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_critica",
          "flags": [
            "call_190",
            "call_192",
            "notify_management",
            "notify_guardians",
            "document_formal",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Lesão grave ou uso de objeto pode evoluir para risco imediato a integridade."
      },
      {
        "id": "rule_reincidencia_ou_ameaca",
        "ifAny": [
          "reincidencia_conflito",
          "ameaca_pos_conflito"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_contencao_formal",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Sem risco imediato, mas com potencial de novo episodio e necessidade de resposta formal."
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
      "mediacao_rapida",
      "equipe_presente_em_area_comum",
      "registro_de_ocorrencias"
    ],
    "riskSignals": [
      {
        "id": "lesao_grave_aparente",
        "label": "Lesão física aparente com dor intensa ou sangramento",
        "examples": [
          "sangramento ativo",
          "queixa de dor intensa após impacto"
        ],
        "weight": 3
      },
      {
        "id": "uso_objeto_agressao",
        "label": "Uso de objeto para agredir",
        "examples": [
          "cadeira arremessada",
          "objeto contundente usado em briga"
        ],
        "weight": 3
      },
      {
        "id": "reincidencia_conflito",
        "label": "Conflito físico recorrente entre envolvidos",
        "examples": [
          "brigas repetidas na mesma semana"
        ],
        "weight": 2
      },
      {
        "id": "ameaca_pos_conflito",
        "label": "Ameaça de nova agressão após separacao",
        "examples": [
          "vou pegar voce depois da aula"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Realizar escuta com envolvidos",
        "Registrar e planejar acompanhamento pedagógico"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Acionar responsáveis",
        "Organizar plano de convivência com monitoramento"
      ],
      "CRITICAL": [
        "Acionar 190/192 conforme risco",
        "Garantir proteção física imediata",
        "Não deixar envolvidos sem supervisao"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "CRITICAL": [
        "UPA_HOSPITAL",
        "DELEGACIA",
        "CONSELHO_TUTELAR"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Agressão física identificada. Interrompa o conflito e priorize segurança de todos.",
      "riskSignals": [
        "lesao_grave_aparente",
        "uso_objeto_agressao"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Separe os envolvidos com segurança, sem exposicao publica, e acione a gestão.",
      "riskSignals": [
        "reincidencia_conflito",
        "ameaca_pos_conflito"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Há lesão grave aparente ou uso de objeto na agressão?",
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
        "lesao_grave_aparente",
        "uso_objeto_agressao"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Há recorrencia de brigas ou ameaça de novo episodio?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_contencao_formal"
        },
        {
          "label": "Não",
          "next": "outcome_mediacao_monitorada"
        }
      ],
      "riskSignals": [
        "reincidencia_conflito",
        "ameaca_pos_conflito"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_critica",
      "label": "Proteção Critica e Suporte de Emergência",
      "description": "Risco critico com necessidade de proteção imediata e possível urgência externa.",
      "actions": [
        "Acionar 192 em emergência médica e 190 se houver risco de violência",
        "Avisar a gestão escolar e os responsáveis",
        "Não deixar envolvidos sozinhos ate estabilizacao",
        "Registrar formalmente a ocorrencia"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "UPA_HOSPITAL",
        "DELEGACIA",
        "CONSELHO_TUTELAR"
      ],
      "flags": [
        "call_190",
        "call_192",
        "notify_management",
        "notify_guardians",
        "do_not_leave_alone",
        "document_formal"
      ]
    },
    {
      "id": "outcome_contencao_formal",
      "label": "Contencao Formal e Plano de Proteção",
      "description": "Risco alto com potencial de reincidencia, exigindo ação institucional estruturada.",
      "actions": [
        "Avisar a gestão escolar",
        "Acionar responsáveis para alinhamento",
        "Registrar formalmente e definir plano de convivência com acompanhamento"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "MEDIACAO_RESTAURATIVA",
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_mediacao_monitorada",
      "label": "Mediação Monitorada",
      "description": "Sem sinal de gravidade imediata, com reparacao e acompanhamento pedagógico.",
      "actions": [
        "Realizar escuta qualificada com os envolvidos",
        "Conduzir mediacao restaurativa com equipe pedagógica",
        "Monitorar convivência e registrar evolucao"
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
