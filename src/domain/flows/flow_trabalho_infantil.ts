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
      "question": "Há indícios de exploração ou risco físico na atividade realizada pelo estudante?",
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
        "vulnerabilidade_grave"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "A atividade é recorrente e já compromete frequência, aprendizagem ou descanso do estudante?",
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
      "label": "Acompanhamento Protetivo Inicial",
      "description": "Sem indício atual de exploração grave, mas com necessidade de prevenção e monitoramento escolar.",
      "actions": [
        "Registrar observações objetivas da rotina escolar",
        "Avisar a gestão para acompanhamento do caso",
        "Orientar responsáveis sobre impacto do trabalho na escolarização"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritário",
      "description": "Trabalho recorrente com prejuízo escolar relevante. Exige proteção e acionamento institucional da rede.",
      "actions": [
        "Avisar a gestão escolar",
        "Registrar formalmente impactos em frequência, aprendizagem ou descanso",
        "Acionar Conselho Tutelar e rede socioassistencial"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management",
        "contact_council"
      ]
    },
    {
      "id": "outcome_iminente",
      "label": "Ação Imediata de Proteção",
      "description": "Situação com exploração ou risco físico atual. Ative proteção imediata e rede de direitos.",
      "actions": [
        "Garantir proteção imediata na escola",
        "Avisar a gestão escolar sem atraso",
        "Acionar Conselho Tutelar imediatamente",
        "Acionar 190 quando houver risco atual"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "notify_management",
        "contact_council",
        "call_190"
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
        "label": "Relato ou observação de trabalho infantil",
        "weight": 3
      },
      {
        "id": "indicio_negligencia",
        "label": "Prejuízo recorrente em frequência, aprendizagem ou descanso",
        "weight": 2
      },
      {
        "id": "vulnerabilidade_grave",
        "label": "Exploração ou risco físico na atividade",
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
