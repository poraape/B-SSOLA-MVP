import type { FlowSpec } from './flowSpec';

export const flow_acidente_escolar: FlowSpec = {
  "meta": {
    "id": "flow_acidente_escolar",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "acidente_lesao",
    "title": "Acidente Escolar",
    "description": "Orientações praticas para a equipe escolar sobre Acidente ou Lesão Física.",
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
        "rationale": "Suspeita de lesão relevante exige encaminhamento rapido e proteção."
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
        "rationale": "Risco imediato ou agravamento agudo exige ação emergencial."
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
        "id": "dor_persistente",
        "label": "Dor persistente",
        "weight": 1
      },
      {
        "id": "impacto_funcional",
        "label": "Dificuldade de locomoção",
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
        "label": "Risco físico iminente",
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
      "content": "Situação identificada: Acidente ou Lesão Física. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "dor_persistente"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Há sangramento que não estanca, fratura aparente, batida forte na cabeça ou perda de consciência?",
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
        "fratura_suspeita",
        "sangramento_relevante"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Há dor forte, inchaço progressivo ou dificuldade para apoiar e mover o membro afetado?",
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
        "dor_persistente",
        "impacto_funcional"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Cuidado Local e Observação no Turno",
      "description": "Impacto leve observavel, sem sinal de gravidade imediata.",
      "actions": [
        "Realizar primeiros cuidados simples e manter observacao no turno",
        "Comunicar gestão e responsáveis com registro objetivo do ocorrido",
        "Orientar retorno imediato se houver piora da dor, inchaço ou mobilidade"
      ],
      "timeline": "Horas",
      "riskLevel": "MODERATE",
      "flags": []
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestão.",
      "actions": [
        "Acionar gestão e manter o estudante em repouso protegido",
        "Comunicar responsáveis para avaliacao de saude no mesmo turno",
        "Evitar deslocamento sem apoio quando houver dor intensa ou limitacao funcional"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
      "flags": [
        "encaminhamento_prioritario"
      ]
    },
    {
      "id": "outcome_iminente",
      "label": "Ação Imediata de Proteção",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Acionar 192 (SAMU) em emergência de saúde ou 190 em risco de violência imediatamente"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "flags": [
        "acionar_emergencia"
      ]
    }
  ]
};
