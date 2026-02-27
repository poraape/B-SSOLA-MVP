import type { FlowSpec } from './flowSpec';

export const flow_negligencia: FlowSpec = {
  "meta": {
    "id": "flow_negligencia",
    "categoryId": "protecao_direitos",
    "subcategoryId": "negligencia_familiar",
    "title": "Negligencia Familiar",
    "description": "Orientacoes praticas para a equipe escolar sobre Negligencia Familiar.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Negligencia Familiar. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "relato_violacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situacao compromete saude ou integridade do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
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
      "question": "Ha risco imediato de abandono ou violencia?",
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
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Escuta acolhedora e sem julgamento",
        "Contato com os responsaveis"
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
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Avisar a gestao escolar",
        "Encaminhamento formal"
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
        "Garantir protecao imediata",
        "Acionar autoridade competente"
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
