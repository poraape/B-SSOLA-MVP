import type { FlowSpec } from './flowSpec';

export const flow_intoxicacao: FlowSpec = {
  "meta": {
    "id": "flow_intoxicacao",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "intoxicacao",
    "title": "Intoxicação",
    "description": "Orientações praticas para a equipe escolar sobre Suspeita de Intoxicação.",
    "severity": "HIGH",
    "keywords": [],
    "status": "IMPLEMENTED"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Intoxicação. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "necessidade_avaliacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Houve contato ou ingestao recente de substancia e existem sinais atuais (vomito, tontura, ardencia, sonolencia ou mal-estar)?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Não",
          "next": "outcome_baixo"
        }
      ],
      "riskSignals": [
        "exposicao_recente_com_sinais",
        "necessidade_avaliacao",
        "risco_ambiental"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há falta de ar, desmaio, convulsao, vomitos repetidos ou risco de outras pessoas expostas no ambiente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Não",
          "next": "outcome_moderado"
        }
      ],
      "riskSignals": [
        "agravamento_agudo",
        "risco_ambiental"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Observação Protegida e Controle de Exposição",
      "description": "Sem sinais atuais de gravidade, com necessidade de vigilancia e prevencao de nova exposicao.",
      "actions": [
        "Afastar o estudante da fonte de risco e manter supervisao no turno",
        "Avisar a gestão e registrar qual substancia foi envolvida, se conhecida",
        "Comunicar os responsáveis para observacao no restante do dia"
      ],
      "timeline": "Horas",
      "riskLevel": "MODERATE",
      "flags": [
        "notify_management",
        "notify_guardians"
      ]
    },
    {
      "id": "outcome_moderado",
      "label": "Avaliação de Saúde no Mesmo Turno",
      "description": "Com sinais atuais, precisa de supervisao protegida e avaliacao no mesmo turno.",
      "actions": [
        "Manter supervisao protegida ate definicao de encaminhamento com a gestão",
        "Comunicar os responsáveis e organizar avaliacao de saude no mesmo turno",
        "Preservar embalagem ou nome da substancia para orientar atendimento"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management",
        "notify_guardians"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Urgência com Isolamento do Risco",
      "description": "Sinais de gravidade ou exposicao coletiva exigem urgencia e controle imediato do ambiente.",
      "actions": [
        "Acionar 192 imediatamente e informar suspeita de intoxicacao",
        "Isolar a area e afastar outras pessoas da possivel fonte de exposicao",
        "Acionar 193 se houver fumaca, vazamento ou risco quimico ambiental"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "notify_management",
        "notify_guardians",
        "call_192",
        "call_193"
      ]
    }
  ],
  "risk": {
    "modelVersion": "2.0",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_signal_priority",
        "ifAny": [
          "agravamento_agudo",
          "risco_ambiental"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "notify_management",
            "call_192"
          ]
        },
        "rationale": "Sinais de gravidade ou risco coletivo exigem resposta emergencial."
      },
      {
        "id": "rule_exposicao_com_sinais",
        "ifAny": [
          "exposicao_recente_com_sinais",
          "necessidade_avaliacao"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management",
            "notify_guardians"
          ]
        },
        "rationale": "Com exposicao recente e sintomas atuais, precisa avaliacao no mesmo turno."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "MODERATE",
        "then": {
          "riskLevel": "MODERATE",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "exposicao_recente_com_sinais",
        "label": "exposicao recente com sinais atuais",
        "weight": 2
      },
      {
        "id": "agravamento_agudo",
        "label": "agravamento agudo",
        "weight": 3
      },
      {
        "id": "risco_ambiental",
        "label": "risco ambiental",
        "weight": 2
      },
      {
        "id": "necessidade_avaliacao",
        "label": "necessidade avaliação",
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
