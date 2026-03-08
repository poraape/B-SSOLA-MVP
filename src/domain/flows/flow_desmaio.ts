import type { FlowSpec } from './flowSpec';

export const flow_desmaio: FlowSpec = {
  "meta": {
    "id": "flow_desmaio",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "desmaio_tontura",
    "title": "Desmaio ou Tontura",
    "description": "Orientações praticas para a equipe escolar sobre Desmaio ou Tontura.",
    "severity": "HIGH",
    "keywords": [],
    "status": "IMPLEMENTED"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Desmaio ou Tontura. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "necessidade_avaliacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A pessoa recuperou a consciencia rapidamente (ate 1 minuto) e consegue responder onde esta?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Não",
          "next": "outcome_alto"
        }
      ],
      "riskSignals": [
        "recuperacao_lenta_ou_incompleta",
        "necessidade_avaliacao"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Houve batida de cabeca, falta de ar, nova perda de consciencia, dor intensa ou repeticao do desmaio?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Não",
          "next": "outcome_baixo"
        }
      ],
      "riskSignals": [
        "sinal_alerta_pos_desmaio",
        "agravamento_progressivo"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Observação Protegida no Turno",
      "description": "Recuperacao rapida e sem sinal de alerta no momento.",
      "actions": [
        "Manter em local seguro e supervisionado ate estabilizar",
        "Avisar a gestão e registrar hora, sinais observados e recuperacao",
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
      "description": "Com sinais de alerta, precisa de avaliacao no mesmo turno com apoio da gestão.",
      "actions": [
        "Acionar gestão e manter supervisao protegida ate definicao de encaminhamento",
        "Comunicar os responsáveis para avaliacao de saude no mesmo turno",
        "Se houver piora durante a espera, acionar 192 imediatamente"
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
      "label": "Urgência Médica Imediata",
      "description": "Sem recuperacao rapida ou com rebaixamento de consciencia: agir como urgencia.",
      "actions": [
        "Acionar 192 imediatamente e informar que houve desmaio sem recuperacao rapida",
        "Avisar gestão e responsáveis sem interromper a supervisao",
        "Nao deixar a pessoa sozinha ate chegada do suporte"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "notify_management",
        "notify_guardians",
        "call_192",
        "do_not_leave_alone"
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
          "recuperacao_lenta_ou_incompleta"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "notify_management",
            "call_192"
          ]
        },
        "rationale": "Sem recuperacao rapida apos desmaio indica risco imediato."
      },
      {
        "id": "rule_signal_alerta",
        "ifAny": [
          "sinal_alerta_pos_desmaio",
          "agravamento_progressivo"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management",
            "notify_guardians"
          ]
        },
        "rationale": "Sinais de alerta apos o episodio exigem avaliacao no mesmo turno."
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
        "id": "recuperacao_lenta_ou_incompleta",
        "label": "recuperacao lenta ou incompleta",
        "weight": 3
      },
      {
        "id": "agravamento_progressivo",
        "label": "agravamento progressivo",
        "weight": 2
      },
      {
        "id": "sinal_alerta_pos_desmaio",
        "label": "sinal de alerta apos desmaio",
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
