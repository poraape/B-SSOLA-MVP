import type { FlowSpec } from './flowSpec';

export const flow_negligencia: FlowSpec = {
  "meta": {
    "id": "flow_negligencia",
    "categoryId": "protecao_direitos",
    "subcategoryId": "negligencia_familiar",
    "title": "Negligência Familiar",
    "description": "Orientações praticas para a equipe escolar sobre Negligência Familiar.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Negligência Familiar. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "relato_violacao"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A escola observou sinais recorrentes de falta de cuidados básicos (higiene, alimentação, medicação ou supervisão)?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
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
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Esses sinais já comprometem de forma importante o cuidado, a saúde ou a proteção do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "q3"
        },
        {
          "label": "Não",
          "next": "outcome_moderado"
        }
      ],
      "riskSignals": [
        "indicio_negligencia",
        "vulnerabilidade_grave"
      ]
    },
    {
      "id": "q3",
      "type": "question",
      "question": "Há risco imediato neste momento (sem supervisão segura, adoecimento sem cuidado ou exposição atual a violência)?",
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
        "vulnerabilidade_grave",
        "relato_violacao"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Protetivo Inicial",
      "description": "Sinais iniciais de negligência, sem impacto importante no momento. Exige acompanhamento escolar estruturado.",
      "actions": [
        "Escuta acolhedora e sem julgamento",
        "Registrar observações objetivas da rotina escolar",
        "Alinhar com gestão escolar contato orientador com responsáveis",
        "Reavaliar rapidamente se os sinais se tornarem recorrentes ou agravarem"
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
      "description": "Negligência recorrente com impacto relevante em cuidado, saúde ou proteção. Requer acionamento institucional e de rede.",
      "actions": [
        "Avisar a gestão escolar",
        "Registrar formalmente sinais observáveis e impactos",
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
      "description": "Risco imediato por ausência de cuidado ou proteção. Ative resposta institucional urgente.",
      "actions": [
        "Garantir proteção imediata",
        "Não deixar o estudante sem supervisão",
        "Acionar Conselho Tutelar imediatamente",
        "Acionar 190 quando houver risco atual"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "notify_management",
        "contact_council",
        "do_not_leave_alone",
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
        "label": "Relato ou observação escolar de violação de cuidados",
        "weight": 3
      },
      {
        "id": "indicio_negligencia",
        "label": "Sinais recorrentes de falta de cuidados básicos",
        "weight": 2
      },
      {
        "id": "vulnerabilidade_grave",
        "label": "Risco imediato por ausência de cuidado ou proteção",
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
