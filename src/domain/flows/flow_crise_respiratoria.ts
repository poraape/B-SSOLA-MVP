import type { FlowSpec } from './flowSpec';

export const flow_crise_respiratoria: FlowSpec = {
  "meta": {
    "id": "flow_crise_respiratoria",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "crise_respiratoria",
    "title": "Crise Respiratória ou Asmatica",
    "description": "Orientações para resposta segura em falta de ar e crise respiratória na escola.",
    "severity": "HIGH",
    "keywords": [
      "crise respiratória",
      "asma",
      "falta de ar",
      "urgência escolar"
    ],
    "status": "IMPLEMENTED"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_insuficiencia_respiratoria",
        "ifAny": [
          "falta_ar_intensa",
          "sinais_hipoxia"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_urgencia_respiratoria",
          "flags": [
            "call_192",
            "notify_management",
            "notify_guardians",
            "do_not_leave_alone",
            "document_formal"
          ]
        },
        "rationale": "Sinais de insuficiencia respiratória representam risco imediato e exigem urgência."
      },
      {
        "id": "rule_crise_sem_melhora",
        "ifAny": [
          "chiado_persistente",
          "resposta_insuficiente_medida_inicial"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_encaminhamento_prioritario",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Crise sem melhora inicial precisa de avaliação rapida na rede de saúde."
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
      "ambiente_ventilado",
      "adulto_referencia_presente",
      "plano_individual_de_saude"
    ],
    "riskSignals": [
      {
        "id": "falta_ar_intensa",
        "label": "Falta de ar intensa com dificuldade para falar",
        "examples": [
          "fala entrecortada",
          "uso de musculatura do pescoco para respirar"
        ],
        "weight": 3
      },
      {
        "id": "sinais_hipoxia",
        "label": "Sinais de baixa oxigenacao",
        "examples": [
          "labios arroxeados",
          "confusao por falta de ar"
        ],
        "weight": 3
      },
      {
        "id": "chiado_persistente",
        "label": "Chiado no peito persistente sem alivio",
        "examples": [
          "chiado continuo por varios minutos"
        ],
        "weight": 2
      },
      {
        "id": "resposta_insuficiente_medida_inicial",
        "label": "Sem melhora após medidas iniciais seguras",
        "examples": [
          "sem alivio após repouso e orientação"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Acolher em local ventilado e observar",
        "Orientar avaliação na UBS de referência"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Acionar responsaveis",
        "Encaminhar para UPA/Hospital ou UBS conforme gravidade"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Não deixar a pessoa sozinha",
        "Manter posicao confortavel e ambiente ventilado"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "UBS"
      ],
      "HIGH": [
        "UBS",
        "UPA_HOSPITAL"
      ],
      "CRITICAL": [
        "UPA_HOSPITAL"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Crise respiratória identificada. Priorize calma, ventilacao e suporte imediato.",
      "riskSignals": [
        "falta_ar_intensa",
        "sinais_hipoxia"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Mantenha a pessoa sentada, em local ventilado, e acione a gestão escolar.",
      "riskSignals": [
        "chiado_persistente",
        "resposta_insuficiente_medida_inicial"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Há falta de ar intensa, dificuldade para falar ou sinais de baixa oxigenacao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_urgencia_respiratoria"
        },
        {
          "label": "Não",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "falta_ar_intensa",
        "sinais_hipoxia"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "A crise persiste sem melhora após as medidas iniciais?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_encaminhamento_prioritario"
        },
        {
          "label": "Não",
          "next": "outcome_observacao_respiratoria"
        }
      ],
      "riskSignals": [
        "chiado_persistente",
        "resposta_insuficiente_medida_inicial"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_urgencia_respiratoria",
      "label": "Urgência Respiratória Imediata",
      "description": "Risco critico com necessidade de atendimento de emergência.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestão escolar e os responsaveis",
        "Não deixar a pessoa sozinha ate chegada da equipe de urgência",
        "Registrar formalmente o ocorrido"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "UPA_HOSPITAL"
      ],
      "flags": [
        "call_192",
        "notify_management",
        "notify_guardians",
        "do_not_leave_alone",
        "document_formal"
      ]
    },
    {
      "id": "outcome_encaminhamento_prioritario",
      "label": "Encaminhamento Prioritario de Saúde",
      "description": "Risco alto sem colapso respiratório no momento, com avaliação rapida necessaria.",
      "actions": [
        "Avisar a gestão escolar",
        "Entrar em contato com os responsaveis",
        "Encaminhar para UPA/Hospital ou UBS de referência"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "UPA_HOSPITAL",
        "UBS"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_observacao_respiratoria",
      "label": "Observação Respiratória Assistida",
      "description": "Sem sinais de gravidade imediata, com monitoramento e orientação para família.",
      "actions": [
        "Manter observação por período acordado com a gestão",
        "Registrar ocorrencia no acompanhamento escolar",
        "Orientar avaliação na UBS de referência"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "UBS"
      ],
      "flags": [
        "document_formal",
        "notify_guardians"
      ]
    }
  ]
};
