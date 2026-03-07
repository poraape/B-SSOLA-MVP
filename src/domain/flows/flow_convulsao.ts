import type { FlowSpec } from './flowSpec';

export const flow_convulsao: FlowSpec = {
  "meta": {
    "id": "flow_convulsao",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "convulsao_perda_consciencia",
    "title": "Convulsão ou Perda de Consciência",
    "description": "Orientações para primeiros cuidados escolares em convulsão ou desmaio prolongado.",
    "severity": "CRITICAL",
    "keywords": [
      "convulsão",
      "perda de consciência",
      "primeiros cuidados",
      "proteção imediata"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_inconsciente_persistente",
        "ifAny": [
          "inconsciente_mais_1min",
          "respiracao_dificil"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_urgencia_critica",
          "flags": [
            "call_192",
            "notify_management",
            "notify_guardians",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Perda de consciência prolongada e sinal de risco imediato a integridade."
      },
      {
        "id": "rule_recupera_mas_instavel",
        "ifAny": [
          "crise_recorrente",
          "queda_com_trauma"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_encaminhamento_rapido",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Mesmo com melhora, há risco relevante e necessidade de avaliação externa."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "CRITICAL",
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "adulto_treinado_presente",
      "espaco_seguro",
      "registro_de_crises_anteriores"
    ],
    "riskSignals": [
      {
        "id": "inconsciente_mais_1min",
        "label": "Pessoa permanece inconsciente por mais de 1 minuto",
        "examples": [
          "não responde ao chamado",
          "não abre os olhos"
        ],
        "weight": 3
      },
      {
        "id": "respiracao_dificil",
        "label": "Respiracao irregular ou muito fraca",
        "examples": [
          "gasping",
          "pausas longas para respirar"
        ],
        "weight": 3
      },
      {
        "id": "crise_recorrente",
        "label": "Nova crise logo após a primeira",
        "examples": [
          "segunda convulsão em poucos minutos"
        ],
        "weight": 2
      },
      {
        "id": "queda_com_trauma",
        "label": "Queda com batida de cabeca ou ferimento",
        "examples": [
          "sangramento",
          "queixa de dor forte após queda"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Acolher e observar por período curto",
        "Registrar ocorrencia no acompanhamento escolar"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Entrar em contato com os responsáveis",
        "Encaminhar para avaliação em servico de saúde"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Não deixar a pessoa sozinha",
        "Manter ambiente seguro ate chegada da emergência"
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
      "content": "Convulsão ou perda de consciência identificada. Priorize segurança e calma da equipe.",
      "riskSignals": [
        "inconsciente_mais_1min",
        "respiracao_dificil"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Proteja a cabeca da pessoa, afaste objetos ao redor e não coloque nada na boca.",
      "riskSignals": [
        "queda_com_trauma"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "A pessoa esta inconsciente por mais de 1 minuto ou com dificuldade para respirar?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_urgencia_critica"
        },
        {
          "label": "Não",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "inconsciente_mais_1min",
        "respiracao_dificil"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Houve queda com trauma ou repeticao da crise?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_encaminhamento_rapido"
        },
        {
          "label": "Não",
          "next": "outcome_observacao_orientada"
        }
      ],
      "riskSignals": [
        "crise_recorrente",
        "queda_com_trauma"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_urgencia_critica",
      "label": "Urgência Médica Imediata",
      "description": "Risco imediato. Acione emergência e mantenha supervisao continua.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestão escolar e os responsáveis",
        "Não deixar a pessoa sozinha ate chegada da equipe de urgência"
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
      "id": "outcome_encaminhamento_rapido",
      "label": "Encaminhamento Rapido para Avaliação",
      "description": "Com melhora parcial, ainda há risco alto e necessidade de avaliação externa.",
      "actions": [
        "Avisar a gestão escolar",
        "Entrar em contato com os responsáveis para busca imediata",
        "Encaminhar para UPA/Hospital ou UBS conforme orientação da equipe de saúde"
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
      "id": "outcome_observacao_orientada",
      "label": "Observação com Orientação",
      "description": "Sem sinais graves no momento, manter acompanhamento escolar e da família.",
      "actions": [
        "Realizar escuta acolhedora e sem julgamento",
        "Registrar a ocorrencia no acompanhamento escolar",
        "Orientar família para avaliação na UBS de referência"
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
