import type { FlowSpec } from './flowSpec';

export const flow_risco_estrutural: FlowSpec = {
  "meta": {
    "id": "flow_risco_estrutural",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "risco_estrutural",
    "title": "Risco Estrutural",
    "description": "Orientacoes para isolar area e proteger a comunidade em risco de colapso ou queda estrutural.",
    "severity": "HIGH",
    "keywords": [
      "risco estrutural",
      "rachadura grave",
      "isolamento de area",
      "evacuacao"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_colapso_iminente",
        "ifAny": [
          "sinais_colapso_imediato",
          "queda_de_elementos"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_evacuacao_critica",
          "flags": [
            "call_190",
            "notify_management",
            "notify_guardians",
            "document_formal",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Sinais de colapso ou queda demandam retirada imediata e acionamento externo."
      },
      {
        "id": "rule_dano_importante_sem_colapso",
        "ifAny": [
          "rachadura_grave",
          "interdicao_parcial_necessaria"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_isolamento_preventivo",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Dano estrutural relevante exige isolamento e avaliacao tecnica com urgencia."
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
      "plano_de_contingencia_predial",
      "rotas_de_saida_livres",
      "equipe_orientada_para_evacuacao"
    ],
    "riskSignals": [
      {
        "id": "sinais_colapso_imediato",
        "label": "Estalos fortes, inclinacao ou afundamento visivel",
        "examples": [
          "barulho de rompimento",
          "parede cedendo"
        ],
        "weight": 3
      },
      {
        "id": "queda_de_elementos",
        "label": "Queda de parte de teto, reboco ou estrutura",
        "examples": [
          "placas caindo",
          "pedaos de concreto no chao"
        ],
        "weight": 3
      },
      {
        "id": "rachadura_grave",
        "label": "Rachaduras amplas com progressao aparente",
        "examples": [
          "trinca aumentando no mesmo dia"
        ],
        "weight": 2
      },
      {
        "id": "interdicao_parcial_necessaria",
        "label": "Area com risco que exige bloqueio imediato",
        "examples": [
          "sala interditada",
          "corredor com risco de queda"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Registrar observacao predial",
        "Monitorar area com equipe de apoio"
      ],
      "HIGH": [
        "Avisar gestao escolar",
        "Isolar area afetada",
        "Entrar em contato com responsaveis"
      ],
      "CRITICAL": [
        "Evacuar imediatamente",
        "Acionar 190 e defesa civil local",
        "Nao deixar estudantes sozinhos durante retirada"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
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
      "content": "Risco estrutural identificado. Priorize seguranca da comunidade escolar.",
      "riskSignals": [
        "rachadura_grave",
        "interdicao_parcial_necessaria"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Isole imediatamente a area de risco e organize deslocamento para local seguro.",
      "riskSignals": [
        "interdicao_parcial_necessaria",
        "queda_de_elementos"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Ha sinais de colapso imediato ou queda de partes da estrutura?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_evacuacao_critica"
        },
        {
          "label": "Nao",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "sinais_colapso_imediato",
        "queda_de_elementos"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "A area precisa permanecer interditada para avaliacao tecnica?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_isolamento_preventivo"
        },
        {
          "label": "Nao",
          "next": "outcome_monitoramento_predial"
        }
      ],
      "riskSignals": [
        "rachadura_grave",
        "interdicao_parcial_necessaria"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_evacuacao_critica",
      "label": "Evacuacao Critica da Area",
      "description": "Risco critico de colapso. Retirar imediatamente e acionar suporte externo.",
      "actions": [
        "Evacuar imediatamente para ponto seguro",
        "Acionar 190 e suporte tecnico emergencial",
        "Avisar a gestao escolar e responsaveis",
        "Nao deixar estudantes sozinhos durante a retirada"
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
      "id": "outcome_isolamento_preventivo",
      "label": "Isolamento Preventivo com Interdicao",
      "description": "Risco alto sem colapso imediato, mantendo area interditada e monitorada.",
      "actions": [
        "Avisar a gestao escolar",
        "Isolar area e interromper uso ate avaliacao tecnica",
        "Entrar em contato com responsaveis sobre ajustes de rotina"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_monitoramento_predial",
      "label": "Monitoramento Predial Continuo",
      "description": "Sem risco imediato confirmado, com observacao tecnica e registro preventivo.",
      "actions": [
        "Registrar evidencias observadas pela equipe",
        "Manter monitoramento continuo da estrutura",
        "Reavaliar imediatamente se houver novos sinais de agravamento"
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
