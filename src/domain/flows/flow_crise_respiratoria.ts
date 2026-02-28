import type { FlowSpec } from './flowSpec';

export const flow_crise_respiratoria: FlowSpec = {
  "meta": {
    "id": "flow_crise_respiratoria",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "crise_respiratoria",
    "title": "Crise Respiratoria ou Asmatica",
    "description": "Orientacoes para resposta segura em falta de ar e crise respiratoria na escola.",
    "severity": "HIGH",
    "keywords": [
      "crise respiratoria",
      "asma",
      "falta de ar",
      "urgencia escolar"
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
        "rationale": "Sinais de insuficiencia respiratoria representam risco imediato e exigem urgencia."
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
        "rationale": "Crise sem melhora inicial precisa de avaliacao rapida na rede de saude."
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
        "label": "Sem melhora apos medidas iniciais seguras",
        "examples": [
          "sem alivio apos repouso e orientacao"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Acolher em local ventilado e observar",
        "Orientar avaliacao na UBS de referencia"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Acionar responsaveis",
        "Encaminhar para UPA/Hospital ou UBS conforme gravidade"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Nao deixar a pessoa sozinha",
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
      "content": "Crise respiratoria identificada. Priorize calma, ventilacao e suporte imediato.",
      "riskSignals": [
        "falta_ar_intensa",
        "sinais_hipoxia"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Mantenha a pessoa sentada, em local ventilado, e acione a gestao escolar.",
      "riskSignals": [
        "chiado_persistente",
        "resposta_insuficiente_medida_inicial"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Ha falta de ar intensa, dificuldade para falar ou sinais de baixa oxigenacao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_urgencia_respiratoria"
        },
        {
          "label": "Nao",
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
      "question": "A crise persiste sem melhora apos as medidas iniciais?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_encaminhamento_prioritario"
        },
        {
          "label": "Nao",
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
      "label": "Urgencia Respiratoria Imediata",
      "description": "Risco critico com necessidade de atendimento de emergencia.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestao escolar e os responsaveis",
        "Nao deixar a pessoa sozinha ate chegada da equipe de urgencia",
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
      "label": "Encaminhamento Prioritario de Saude",
      "description": "Risco alto sem colapso respiratorio no momento, com avaliacao rapida necessaria.",
      "actions": [
        "Avisar a gestao escolar",
        "Entrar em contato com os responsaveis",
        "Encaminhar para UPA/Hospital ou UBS de referencia"
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
      "label": "Observacao Respiratoria Assistida",
      "description": "Sem sinais de gravidade imediata, com monitoramento e orientacao para familia.",
      "actions": [
        "Manter observacao por periodo acordado com a gestao",
        "Registrar ocorrencia no acompanhamento escolar",
        "Orientar avaliacao na UBS de referencia"
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
