import type { FlowSpec } from './flowSpec';

export const flow_reintegracao_pos_suspensao: FlowSpec = {
  "meta": {
    "id": "flow_reintegracao_pos_suspensao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "reintegracao_pos_suspensao",
    "title": "Reintegração após Suspensão",
    "description": "Orientações para retorno protegido e pactuação institucional apos suspensao.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Retorno apos suspensao identificado. Priorize acolhimento, alinhamento com a gestão e proteção da convivência.",
      "riskSignals": [
        "retorno_sem_plano"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O retorno foi alinhado com gestão, equipe pedagógica e responsáveis, com combinados claros para a rotina?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Não",
          "next": "outcome_plano_reintegracao"
        }
      ],
      "riskSignals": [
        "retorno_sem_plano"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há risco de nova escalada (ameacas, hostilidade intensa ou conflito ativo) no retorno?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_prioritaria"
        },
        {
          "label": "Não",
          "next": "outcome_retorno_monitorado"
        }
      ],
      "riskSignals": [
        "risco_reescalada",
        "agressividade"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_retorno_monitorado",
      "label": "Retorno Monitorado com Pactuação",
      "description": "Retorno sem risco imediato, com combinados institucionais e acompanhamento inicial.",
      "actions": [
        "Realizar acolhimento de retorno com adulto de referencia",
        "Registrar combinados de convivência e acompanhamento pedagógico",
        "Revisar evolução nas primeiras semanas com gestão e equipe"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "MEDIACAO_RESTAURATIVA"
      ],
      "flags": []
    },
    {
      "id": "outcome_plano_reintegracao",
      "label": "Plano Formal de Reintegração",
      "description": "Retorno sem alinhamento institucional exige plano formal de reintegracao e acompanhamento.",
      "actions": [
        "Articular reunião imediata com gestão, equipe e responsáveis para pactuar o retorno",
        "Definir plano de reintegração com metas objetivas de convivência e participação",
        "Registrar responsabilidades e cronograma de monitoramento"
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
      "id": "outcome_protecao_prioritaria",
      "label": "Proteção Prioritária no Retorno",
      "description": "Risco de nova escalada no retorno exige proteção imediata e ajuste institucional urgente.",
      "actions": [
        "Proteger estudantes envolvidos e reorganizar rotina para cessar risco imediato",
        "Acionar gestão escolar e responsáveis sem atraso",
        "Registrar formalmente e acionar rede externa quando houver risco iminente"
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
        "id": "rule_risco_reescalada",
        "ifAny": [
          "risco_reescalada",
          "agressividade"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_prioritaria",
          "flags": [
            "notify_management",
            "do_not_leave_alone"
          ]
        },
        "rationale": "Risco de nova escalada no retorno exige resposta de proteção imediata."
      },
      {
        "id": "rule_retorno_sem_plano",
        "ifAny": [
          "retorno_sem_plano"
        ],
        "then": {
          "riskLevel": "HIGH",
          "outcome": "outcome_plano_reintegracao",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Retorno sem alinhamento formal aumenta risco de falha na reintegracao."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "MODERATE",
          "outcome": "outcome_retorno_monitorado",
          "flags": []
        },
        "rationale": "Retorno alinhado e sem risco ativo segue monitoramento pedagógico."
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
      "plano_de_retorno_formal",
      "monitoramento_inicial"
    ],
    "riskSignals": [
      {
        "id": "retorno_sem_plano",
        "label": "Retorno sem alinhamento institucional previo",
        "weight": 2
      },
      {
        "id": "risco_reescalada",
        "label": "Risco de nova escalada no retorno",
        "weight": 3
      },
      {
        "id": "agressividade",
        "label": "Agressividade",
        "weight": 3
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Acolher retorno e pactuar rotina com acompanhamento inicial",
        "Registrar monitoramento pedagógico nas primeiras semanas"
      ],
      "HIGH": [
        "Formalizar plano de reintegracao com gestão e responsáveis",
        "Definir metas e revisao periódica"
      ],
      "CRITICAL": [
        "Priorizar proteção imediata e cessar risco de nova escalada",
        "Acionar rede externa quando houver risco iminente"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR",
        "MEDIACAO_RESTAURATIVA"
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
