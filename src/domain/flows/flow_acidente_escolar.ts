import type { FlowSpec } from './flowSpec';

export const flow_acidente_escolar: FlowSpec = {
  "meta": {
    "id": "flow_acidente_escolar",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "acidente_lesao",
    "title": "Acidente Escolar",
    "description": "Orientacoes praticas para a equipe escolar sobre Acidente ou Lesao Fisica.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_moderate",
        "ifAny": [
          "dor_persistente",
          "impacto_funcional"
        ],
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Sinais de dor e limitacao funcional demandam acompanhamento institucional."
      },
      {
        "id": "rule_high",
        "ifAny": [
          "fratura_suspeita",
          "sangramento_relevante"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "encaminhamento_prioritario"
          ]
        },
        "rationale": "Suspeita de lesao relevante exige encaminhamento rapido e protecao."
      },
      {
        "id": "rule_critical",
        "ifAny": [
          "risco_iminente",
          "agravamento_agudo"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "acionar_emergencia"
          ]
        },
        "rationale": "Risco imediato ou agravamento agudo exige acao emergencial."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "MODERATE",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "dor_persistente",
        "label": "Dor persistente",
        "weight": 1
      },
      {
        "id": "impacto_funcional",
        "label": "Dificuldade de locomocao",
        "weight": 1
      },
      {
        "id": "fratura_suspeita",
        "label": "Suspeita de fratura",
        "weight": 2
      },
      {
        "id": "sangramento_relevante",
        "label": "Sangramento intenso",
        "weight": 2
      },
      {
        "id": "risco_iminente",
        "label": "Risco fisico iminente",
        "weight": 3
      },
      {
        "id": "agravamento_agudo",
        "label": "Agravamento agudo do quadro",
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
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Acidente ou Lesao Fisica. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "dor_persistente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Ha sangramento intenso ou fratura aparente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Nao",
          "next": "q2"
        }
      ],
      "riskSignals": [
        "fratura_suspeita",
        "sangramento_relevante"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Ha dor persistente ou dificuldade de locomocao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
        }
      ],
      "riskSignals": [
        "dor_persistente",
        "impacto_funcional"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Primeiros socorros basicos",
        "Comunicar responsavel"
      ],
      "timeline": "Horas",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Encaminhar para avaliacao urgente"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
      "flags": [
        "encaminhamento_prioritario"
      ]
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Acionar 192 (SAMU) em emergencia de saude ou 190 em risco de violencia imediatamente"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "acionar_emergencia"
      ]
    }
  ]
};
