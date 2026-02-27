import type { FlowSpec } from './flowSpec';

export const flow_discriminacao: FlowSpec = {
  "meta": {
    "id": "flow_discriminacao",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "discriminacao_racismo",
    "title": "Discriminacao ou Racismo",
    "description": "Orientacoes praticas para a equipe escolar sobre Discriminacao ou Racismo.",
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
      "content": "Situacao identificada: Discriminacao ou Racismo. Fazer acolhimento, avisar a gestao e seguir os proximos passos.",
      "riskSignals": [
        "conflito_recorrente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O episodio ocorreu agora e ainda ha conflito ativo?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
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
      "question": "Ha ameaca, perseguicao ou risco de agressao?",
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
          "label": "Nao / Reincidente",
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
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Intervencao pedagogica e orientacao imediata",
        "Apoio ao estudante afetado",
        "Acordo de convivencia e monitoramento"
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
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Registrar ocorrencia institucional minima",
        "Entrar em contato com os responsaveis quando apropriado",
        "Plano de acompanhamento e prevencao"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Proteger estudante e cessar situacao imediatamente",
        "Acao institucional com a gestao escolar",
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
        "rationale": "Sinais de agressividade exigem intervencao institucional."
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
