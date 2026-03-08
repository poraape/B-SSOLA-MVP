import type { FlowSpec } from './flowSpec';

export const flow_suspeita_neurodivergencia: FlowSpec = {
  "meta": {
    "id": "flow_suspeita_neurodivergencia",
    "categoryId": "inclusao_acessibilidade",
    "subcategoryId": "suspeita_neurodivergencia",
    "title": "Sinais Persistentes de Necessidade de Apoio à Aprendizagem",
    "description": "Orientações para registrar sinais observáveis de aprendizagem e participação, organizar apoio pedagógico e acionar gestão/rede quando necessário.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: sinais persistentes de necessidade de apoio à aprendizagem e participação. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "barreira_acesso"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há prejuízo persistente de participação e aprendizagem, mesmo com apoio pedagógico inicial?",
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
        "barreira_acesso",
        "dificuldade_persistente"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagógica",
      "description": "Situação de menor complexidade com monitoramento pedagógico.",
      "actions": [
        "Observação estruturada"
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
        "Registrar sinais observáveis em sala e no contexto escolar",
        "Organizar plano pedagógico adaptado com gestão e equipe de apoio",
        "Orientar responsáveis sobre acesso à rede especializada quando necessário"
      ],
      "timeline": "Horas",
      "riskLevel": "MODERATE",
      "flags": []
    }
  ],
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "MODERATE",
    "escalationRules": [
      {
        "id": "rule_default_baseline",
        "then": {
          "riskLevel": "MODERATE",
          "flags": []
        },
        "rationale": "Aplica severidade base definida no fluxo."
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
        "id": "barreira_acesso",
        "label": "Barreira de participação e acesso",
        "weight": 1
      },
      {
        "id": "dificuldade_persistente",
        "label": "Dificuldade persistente de aprendizagem",
        "weight": 2
      },
      {
        "id": "necessidade_adaptacao",
        "label": "Necessidade de adaptação",
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
