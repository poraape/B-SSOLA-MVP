import type { FlowSpec } from './flowSpec';

export const flow_ansiedade: FlowSpec = {
  "meta": {
    "id": "flow_ansiedade",
    "categoryId": "saude_emocional",
    "subcategoryId": "ansiedade_crise",
    "title": "Ansiedade Intensa",
    "description": "Orientações praticas para a equipe escolar sobre Crise de Ansiedade ou Pânico.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Crise de Ansiedade ou Pânico. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "sinais_ansiedade"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante apresenta crise aguda neste momento (hiperventilacao, choro intenso, tremores)?",
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
        "crise_aguda",
        "desregulacao_importante"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há perda de controle, risco físico ou desmaio?",
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
        "risco_fisico_agudo",
        "desmaio_ou_queda"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Escuta ativa",
        "Orientar estratégias de regulação emocional"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situação que exige acompanhamento institucional estruturado.",
      "actions": [
        "Escuta acolhedora e sem julgamento",
        "Contato com responsavel"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "acompanhamento_prioritario"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Situação crítica de proteção. Garanta supervisão protegida e acione urgência com apoio da gestão.",
      "actions": [
        "Manter o estudante em local protegido, com supervisão contínua",
        "Acionar a gestão escolar e os responsáveis imediatamente",
        "Acionar urgência (192) se houver risco físico, desmaio ou piora importante"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "protecao_imediata"
      ]
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_moderate",
        "ifAny": [
          "sinais_ansiedade"
        ],
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Sinais de ansiedade sem agravamento imediato pedem acolhimento e monitoramento."
      },
      {
        "id": "rule_high",
        "ifAny": [
          "crise_aguda",
          "desregulacao_importante"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "acompanhamento_prioritario"
          ]
        },
        "rationale": "Crise aguda exige acompanhamento institucional prioritario."
      },
      {
        "id": "rule_critical",
        "ifAny": [
          "risco_fisico_agudo",
          "desmaio_ou_queda"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "protecao_imediata"
          ]
        },
        "rationale": "Risco físico associado requer ação imediata de proteção."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "MODERATE",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "sinais_ansiedade",
        "label": "Sinais de ansiedade intensa",
        "weight": 1
      },
      {
        "id": "crise_aguda",
        "label": "Crise emocional aguda",
        "weight": 2
      },
      {
        "id": "desregulacao_importante",
        "label": "Desregulacao emocional importante",
        "weight": 2
      },
      {
        "id": "risco_fisico_agudo",
        "label": "Risco físico agudo associado",
        "weight": 3
      },
      {
        "id": "desmaio_ou_queda",
        "label": "Desmaio ou queda",
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
