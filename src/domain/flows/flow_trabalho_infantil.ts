import type { FlowSpec } from './flowSpec';

export const flow_trabalho_infantil: FlowSpec = {
  "meta": {
    "id": "flow_trabalho_infantil",
    "categoryId": "protecao_direitos",
    "subcategoryId": "trabalho_infantil",
    "title": "Trabalho Infantil",
    "description": "Orientações praticas para a equipe escolar sobre Trabalho Infantil ou Exploração.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Trabalho Infantil ou Exploração. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "relato_violacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A atividade coloca o estudante em risco físico ou exploração?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Não",
          "next": "outcome_alto"
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
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestão.",
      "actions": [
        "Registro institucional",
        "Avisar a gestão escolar"
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
        "Acionar imediatamente orgao competente"
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
