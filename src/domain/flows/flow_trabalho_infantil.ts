import type { FlowSpec } from './flowSpec';

export const flow_trabalho_infantil: FlowSpec = {
  "meta": {
    "id": "flow_trabalho_infantil",
    "categoryId": "protecao_direitos",
    "subcategoryId": "trabalho_infantil",
    "title": "Trabalho Infantil",
    "description": "Orientacoes praticas para a equipe escolar sobre Trabalho Infantil ou Exploracao.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Trabalho Infantil ou Exploracao. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "relato_violacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A atividade coloca o estudante em risco fisico ou exploracao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Nao",
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
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Registro institucional",
        "Avisar a gestao escolar"
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
      "label": "Acao Imediata de Protecao",
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
        "rationale": "Relato de violacao requer acionamento institucional e de protecao."
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
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "relato_violacao",
        "label": "Relato de violacao",
        "weight": 3
      },
      {
        "id": "indicio_negligencia",
        "label": "Indicio de negligencia",
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
