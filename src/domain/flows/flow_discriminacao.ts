import type { FlowSpec } from './flowSpec';

export const flow_discriminacao: FlowSpec = {
  "meta": {
    "id": "flow_discriminacao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "discriminacao_racismo",
    "title": "Discriminacao ou Racismo",
    "description": "Orientações praticas para a equipe escolar sobre Discriminacao ou Racismo.",
    "severity": "HIGH",
    "keywords": [
      "discriminacao",
      "racismo",
      "preconceito",
      "ofensa"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Discriminacao ou Racismo. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "conflito_recorrente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O episodio ocorreu agora e ainda há conflito ativo?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Não",
          "next": "q3"
        }
      ],
      "riskSignals": [
        "conflito_recorrente",
        "agressividade"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há ameaça, perseguicao ou risco de agressão?",
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
        "conflito_recorrente",
        "agressividade"
      ]
    },
    {
      "id": "q3",
      "type": "question",
      "question": "Foi um evento pontual sem repeticao aparente?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_baixo"
        },
        {
          "label": "Não / Reincidente",
          "next": "outcome_moderado"
        }
      ],
      "riskSignals": [
        "conflito_recorrente",
        "agressividade"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Intervenção pedagógica e orientação imediata",
        "Apoio ao estudante afetado",
        "Acordo de convivência e monitoramento"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Registrar ocorrencia institucional minima",
        "Entrar em contato com os responsaveis quando apropriado",
        "Plano de acompanhamento e prevenção"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestão.",
      "actions": [
        "Proteger estudante e cessar situação imediatamente",
        "Ação institucional com a gestão escolar",
        "Encaminhar para apoio especializado quando necessario"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "HIGH",
    "escalationRules": [
      {
        "id": "rule_agressividade",
        "ifAny": [
          "agressividade"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Sinais de agressividade exigem intervenção institucional."
      },
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
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
        "id": "conflito_recorrente",
        "label": "Conflito recorrente",
        "weight": 1
      },
      {
        "id": "agressividade",
        "label": "Agressividade",
        "weight": 3
      },
      {
        "id": "escalada_tensao",
        "label": "Escalada de tensao",
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
