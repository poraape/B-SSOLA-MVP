import type { FlowSpec } from './flowSpec';

export const flow_violencia_armada: FlowSpec = {
  "meta": {
    "id": "flow_violencia_armada",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "violencia_armada",
    "title": "Violencia Armada ou Tiroteio",
    "description": "Orientacoes para proteger estudantes e equipe em risco armado na escola.",
    "severity": "CRITICAL",
    "keywords": [
      "violencia armada",
      "tiroteio",
      "abrigo seguro",
      "protecao imediata"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_ameaca_ativa",
        "ifAny": [
          "arma_visivel",
          "disparos_ouvidos"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_lockdown_critico",
          "flags": [
            "call_190",
            "notify_management",
            "document_formal",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Risco imediato a vida exige resposta de seguranca sem atraso."
      },
      {
        "id": "rule_ameaca_na_regiao",
        "ifAny": [
          "suspeita_ameaca_externa"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_preventiva",
          "flags": [
            "notify_management",
            "document_formal",
            "notify_guardians"
          ]
        },
        "rationale": "Sem ataque em curso, mas com risco relevante para a comunidade escolar."
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
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "plano_de_emergencia_ativo",
      "equipe_treinada",
      "salas_com_trava_funcional"
    ],
    "riskSignals": [
      {
        "id": "arma_visivel",
        "label": "Pessoa com arma visivel na escola ou entorno imediato",
        "examples": [
          "arma na entrada",
          "agressor armado no patio"
        ],
        "weight": 3
      },
      {
        "id": "disparos_ouvidos",
        "label": "Som de disparos ou explosoes proximas",
        "examples": [
          "barulho de tiros",
          "relato simultaneo de disparos"
        ],
        "weight": 3
      },
      {
        "id": "suspeita_ameaca_externa",
        "label": "Ameaca recebida por mensagem ou relato confiavel",
        "examples": [
          "aviso de ataque em rede social",
          "alerta da comunidade"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Manter observacao com a gestao",
        "Registrar informacoes iniciais"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Restringir circulacao em areas expostas",
        "Entrar em contato com responsaveis"
      ],
      "CRITICAL": [
        "Acionar 190 imediatamente",
        "Ativar abrigo seguro/lockdown",
        "Nao deixar estudantes desacompanhados"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "DELEGACIA"
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
      "content": "Risco armado identificado. Priorize protecao imediata da turma e da equipe.",
      "riskSignals": [
        "arma_visivel",
        "disparos_ouvidos"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Leve todos para abrigo seguro, trave portas e afaste pessoas de janelas.",
      "riskSignals": [
        "arma_visivel",
        "disparos_ouvidos"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Ha ataque em curso ou arma visivel neste momento?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_lockdown_critico"
        },
        {
          "label": "Nao, e uma ameaca sem ataque em curso",
          "next": "outcome_protecao_preventiva"
        }
      ],
      "riskSignals": [
        "arma_visivel",
        "disparos_ouvidos",
        "suspeita_ameaca_externa"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "A area foi liberada pela seguranca publica?",
      "actions": [
        {
          "label": "Nao",
          "next": "outcome_lockdown_critico"
        },
        {
          "label": "Sim",
          "next": "outcome_transicao_segura"
        }
      ],
      "riskSignals": [
        "risco_seguranca",
        "risco_fisico"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_lockdown_critico",
      "label": "Protecao Imediata com Seguranca Publica",
      "description": "Ataque ou ameaca armada ativa. Manter abrigo seguro ate orientacao oficial.",
      "actions": [
        "Acionar 190 imediatamente",
        "Avisar a gestao escolar e manter comunicacao interna minima",
        "Nao deixar estudantes sozinhos",
        "Registrar horario e fatos principais para documento formal"
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
      "id": "outcome_protecao_preventiva",
      "label": "Protecao Preventiva e Controle de Acesso",
      "description": "Sem ataque em curso, mas com ameaca relevante para a escola.",
      "actions": [
        "Avisar a gestao escolar e reforcar controle de acesso",
        "Entrar em contato com responsaveis com comunicacao objetiva",
        "Registrar formalmente a ocorrencia"
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
      "id": "outcome_transicao_segura",
      "label": "Retomada Segura com Acompanhamento",
      "description": "Area liberada. Retomar rotina com cuidado e observacao da equipe.",
      "actions": [
        "Realizar acolhimento coletivo e orientacoes simples",
        "Registrar medidas adotadas e pontos de melhoria",
        "Manter monitoramento continuo no periodo seguinte"
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
