import type { FlowSpec } from './flowSpec';

export const flow_violacao_direitos: FlowSpec = {
  "meta": {
    "id": "flow_violacao_direitos",
    "categoryId": "protecao_direitos",
    "subcategoryId": "outras_violacoes_direitos",
    "title": "Outras Violacoes de Direitos",
    "description": "Orientações praticas para a equipe escolar sobre Outras Violacoes de Direitos.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Outras Violacoes de Direitos. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "relato_violacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situação envolve risco imediato a integridade do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Não",
          "next": "q2"
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
      "question": "Há indicio de violência, negligência grave ou exploração continua?",
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
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Acionar gestão para triagem qualificada",
        "Encaminhar para suporte socioassistencial quando indicado"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management",
        "contact_council"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestão.",
      "actions": [
        "Acionar gestão imediatamente",
        "Encaminhar formalmente a rede de proteção (minimos dados necessarios)"
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
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Priorizar segurança imediata",
        "Acionar 190 quando houver risco atual",
        "Acionar gestão imediatamente"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
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
        "label": "Indicio de negligência",
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
