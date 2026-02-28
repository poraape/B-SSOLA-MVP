import type { FlowSpec } from './flowSpec';

export const flow_ameaca_externa: FlowSpec = {
  "meta": {
    "id": "flow_ameaca_externa",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "ameaca_externa",
    "title": "Ameaca Externa a Escola",
    "description": "Orientacoes para resposta institucional a ameaca no entorno da escola.",
    "severity": "HIGH",
    "keywords": [
      "ameaca externa",
      "entorno escolar",
      "protecao coletiva",
      "seguranca"
    ],
    "status": "IMPLEMENTED"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_ameaca_iminente",
        "ifAny": [
          "agressor_nas_proximidades",
          "violencia_em_andamento"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_critica",
          "flags": [
            "call_190",
            "notify_management",
            "notify_guardians",
            "do_not_leave_alone",
            "document_formal"
          ]
        },
        "rationale": "Ameaca imediata no entorno exige resposta de emergencia e protecao coletiva."
      },
      {
        "id": "rule_alerta_confiavel",
        "ifAny": [
          "alerta_mensagem_confiavel",
          "movimentacao_suspeita_recorrente"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_contencao_preventiva",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Alerta confiavel sem ataque em curso ainda exige medidas preventivas e comunicacao."
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
      "controle_de_acesso",
      "plano_de_contingencia",
      "comunicacao_interna_rapida"
    ],
    "riskSignals": [
      {
        "id": "agressor_nas_proximidades",
        "label": "Pessoa agressiva nas proximidades da escola",
        "examples": [
          "ameaca na entrada",
          "tentativa de invasao"
        ],
        "weight": 3
      },
      {
        "id": "violencia_em_andamento",
        "label": "Violencia em andamento no entorno imediato",
        "examples": [
          "briga grave na porta",
          "barulho de disparos nas proximidades"
        ],
        "weight": 3
      },
      {
        "id": "alerta_mensagem_confiavel",
        "label": "Ameaca recebida por canal confiavel",
        "examples": [
          "comunicacao oficial",
          "relato simultaneo de equipe e comunidade"
        ],
        "weight": 2
      },
      {
        "id": "movimentacao_suspeita_recorrente",
        "label": "Movimentacao suspeita recorrente no entorno",
        "examples": [
          "rondas de intimidacao",
          "tentativas repetidas de acesso indevido"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Reforcar observacao e registro com a gestao",
        "Revisar controle de acesso da escola"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Restringir circulacao em areas expostas",
        "Informar responsaveis com orientacao objetiva"
      ],
      "CRITICAL": [
        "Acionar 190 imediatamente",
        "Ativar protecao interna da escola",
        "Nao deixar estudantes sozinhos em deslocamento"
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
      "content": "Ameaca externa identificada. Priorize protecao da comunidade escolar.",
      "riskSignals": [
        "agressor_nas_proximidades",
        "violencia_em_andamento"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Feche acessos, mantenha estudantes em area protegida e acione a gestao.",
      "riskSignals": [
        "agressor_nas_proximidades"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Ha ameaca iminente ou violencia em andamento no entorno imediato?",
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
        "agressor_nas_proximidades",
        "violencia_em_andamento"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Ha alerta confiavel ou recorrencia de movimentacao suspeita?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_contencao_preventiva"
        },
        {
          "label": "Nao",
          "next": "outcome_monitoramento_reforcado"
        }
      ],
      "riskSignals": [
        "alerta_mensagem_confiavel",
        "movimentacao_suspeita_recorrente"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_critica",
      "label": "Protecao Critica com Acionamento de Seguranca",
      "description": "Risco critico no entorno com necessidade de resposta imediata.",
      "actions": [
        "Acionar 190 imediatamente",
        "Avisar a gestao escolar e os responsaveis",
        "Manter estudantes em area protegida e acompanhados",
        "Registrar formalmente os fatos e horarios"
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
        "notify_guardians",
        "do_not_leave_alone",
        "document_formal"
      ]
    },
    {
      "id": "outcome_contencao_preventiva",
      "label": "Contencao Preventiva e Comunicacao",
      "description": "Risco alto sem ataque em curso, com medidas preventivas institucionais.",
      "actions": [
        "Avisar a gestao escolar e reforcar controle de acesso",
        "Informar responsaveis sobre medidas de seguranca",
        "Registrar formalmente a ocorrencia para acompanhamento"
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
      "id": "outcome_monitoramento_reforcado",
      "label": "Monitoramento Reforcado",
      "description": "Sem risco imediato confirmado, com vigilancia e registro continuo.",
      "actions": [
        "Manter monitoramento do entorno em articulacao com a gestao",
        "Registrar alertas e observacoes relevantes",
        "Reavaliar imediatamente se houver agravamento"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "document_formal"
      ]
    }
  ]
};
