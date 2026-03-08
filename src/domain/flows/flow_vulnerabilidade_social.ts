import type { FlowSpec } from './flowSpec';

export const flow_vulnerabilidade_social: FlowSpec = {
  "meta": {
    "id": "flow_vulnerabilidade_social",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "vulnerabilidade_social_geral",
    "title": "Outras Vulnerabilidades Sociais",
    "description": "Orientações praticas para a equipe escolar sobre Outras Vulnerabilidades Sociais.",
    "severity": "MODERATE",
    "keywords": [
      "outras",
      "vulnerabilidades",
      "sociais",
      "vulnerabilidade_social_geral"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Outras Vulnerabilidades Sociais. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "vulnerabilidade_economica"
      ]
    },
    {
      "id": "step_2",
      "type": "question",
      "question": "Há risco imediato para o estudante ou para a comunidade escolar?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_imediata"
        },
        {
          "label": "Não",
          "next": "step_3"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica",
        "risco_abandono"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Os sinais de vulnerabilidade social e familiar são recorrentes ou estão se agravando na rotina escolar?",
      "actions": [
        {
          "label": "Sim",
          "next": "step_4"
        },
        {
          "label": "Não",
          "next": "outcome_acompanhamento_inicial"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica",
        "risco_abandono"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Há indicação clara de fluxo mais específico (evasão, insegurança alimentar, negligência ou trabalho infantil) para orientar melhor a conduta?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_reclassificacao_assistida"
        },
        {
          "label": "Não",
          "next": "outcome_acompanhamento_institucional"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica",
        "instabilidade_familiar",
        "risco_abandono"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_acompanhamento_inicial",
      "label": "Acompanhamento Inicial com Gestão",
      "description": "Sinais iniciais sem agravamento atual. Organizar acolhimento e monitoramento institucional.",
      "actions": [
        "Realizar acolhimento e escuta sem julgamento",
        "Registrar fatos observáveis na rotina escolar",
        "Compartilhar o caso com coordenação para monitoramento"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_acompanhamento_institucional",
      "label": "Acompanhamento Social Institucional",
      "description": "Recorrência ou agravamento sem risco imediato exige plano institucional com gestão, responsáveis e rede quando necessário.",
      "actions": [
        "Avisar gestão para acompanhamento do caso",
        "Organizar contato com responsáveis ou referência familiar",
        "Registrar objetivamente impactos em presença, participação e proteção",
        "Articular rede socioassistencial com a gestão quando houver barreiras persistentes"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_reclassificacao_assistida",
      "label": "Reclassificação Assistida para Fluxo Específico",
      "description": "Há sinais mais aderentes a fluxo específico. Redirecionar para conduta mais precisa sem interromper proteção inicial.",
      "actions": [
        "Reclassificar o caso para fluxo específico com apoio da gestão",
        "Manter acolhimento e registro objetivo durante a transição",
        "Garantir continuidade do acompanhamento institucional"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_protecao_imediata",
      "label": "Proteção Imediata e Rede",
      "description": "Risco imediato atual exige proteção na escola e acionamento prioritário da gestão e rede de proteção.",
      "actions": [
        "Acionar gestão escolar imediatamente",
        "Garantir proteção imediata do estudante no espaço escolar",
        "Registrar formalmente sinais e horário dos fatos",
        "Acionar rede protetiva conforme protocolo institucional"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "notify_management"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_risco_abandono",
        "ifAny": [
          "risco_abandono"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Risco de abandono exige articulacao institucional imediata."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Aplica severidade base definida no fluxo."
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
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "vulnerabilidade_economica",
        "label": "Vulnerabilidade economica",
        "weight": 1
      },
      {
        "id": "risco_abandono",
        "label": "Risco de abandono",
        "weight": 3
      },
      {
        "id": "instabilidade_familiar",
        "label": "Instabilidade familiar",
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [],
      "HIGH": [],
      "CRITICAL": []
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [],
      "HIGH": [],
      "CRITICAL": []
    }
  }
};
