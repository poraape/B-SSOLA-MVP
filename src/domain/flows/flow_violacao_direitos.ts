import type { FlowSpec } from './flowSpec';

export const flow_violacao_direitos: FlowSpec = {
  "meta": {
    "id": "flow_violacao_direitos",
    "categoryId": "protecao_direitos",
    "subcategoryId": "outras_violacoes_direitos",
    "title": "Outras Violações de Direitos",
    "description": "Fluxo curinga para violações de direitos que não se encaixam claramente em violência doméstica, abuso sexual, negligência, trabalho infantil ou abandono.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Use este fluxo quando a situação não se encaixar claramente nos fluxos específicos de proteção e violação de direitos.",
      "riskSignals": [
        "relato_violacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situação não se encaixa claramente em violência doméstica, abuso sexual, negligência, trabalho infantil ou abandono?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Não",
          "next": "outcome_fluxo_especifico"
        }
      ],
      "riskSignals": [
        "relato_violacao",
        "indicio_negligencia"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "A situação envolve risco imediato à integridade do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Não",
          "next": "q3"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_grave",
        "relato_violacao"
      ]
    },
    {
      "id": "q3",
      "type": "question",
      "question": "Há elementos suficientes de preocupação para acionar proteção institucional e rede?",
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
        "relato_violacao",
        "indicio_negligencia"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_fluxo_especifico",
      "label": "Reclassificar para Fluxo Específico",
      "description": "A situação está melhor contemplada por um fluxo específico de proteção e violação de direitos.",
      "actions": [
        "Retornar à seleção de protocolo e escolher o fluxo específico mais aderente",
        "Manter acolhimento e proteção imediata enquanto a reclassificação é feita",
        "Avisar a gestão escolar quando houver risco ou recorrência"
      ],
      "timeline": "Imediato",
      "riskLevel": "MODERATE",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação residual sem risco imediato, com necessidade de acompanhamento institucional e reavaliação.",
      "actions": [
        "Registrar sinais observáveis e alinhar conduta com a gestão",
        "Planejar acompanhamento e reavaliar se surgirem novos elementos de risco",
        "Encaminhar para suporte socioassistencial quando indicado"
      ],
      "timeline": "Horas",
      "riskLevel": "MODERATE",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritário",
      "description": "Elementos de preocupação suficientes na situação residual. Acione proteção institucional e rede.",
      "actions": [
        "Acionar gestão escolar imediatamente",
        "Registrar formalmente a situação com dados mínimos necessários",
        "Acionar Conselho Tutelar e rede socioassistencial conforme protocolo local"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management",
        "contact_council"
      ]
    },
    {
      "id": "outcome_iminente",
      "label": "Ação Imediata de Proteção",
      "description": "Risco imediato. Ative o protocolo institucional de proteção sem atraso.",
      "actions": [
        "Priorizar segurança imediata",
        "Acionar 190 quando houver risco atual",
        "Acionar gestão imediatamente",
        "Acionar Conselho Tutelar sem atraso"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "notify_management",
        "contact_council"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_relato_violacao",
        "ifAny": [
          "relato_violacao"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management",
            "contact_council"
          ]
        },
        "rationale": "Relato de violação requer acionamento institucional e de proteção."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management",
            "contact_council"
          ]
        },
        "rationale": "Aplica severidade base definida no fluxo."
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "relato_violacao",
        "label": "Relato de violação",
        "weight": 3
      },
      {
        "id": "indicio_negligencia",
        "label": "Elementos de preocupação em violação de direitos",
        "weight": 2
      },
      {
        "id": "vulnerabilidade_grave",
        "label": "Vulnerabilidade grave",
        "weight": 3
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
