import type { FlowSpec } from './flowSpec';

export const flow_abuso_sexual: FlowSpec = {
  "meta": {
    "id": "flow_abuso_sexual",
    "categoryId": "protecao_direitos",
    "subcategoryId": "abuso_sexual",
    "title": "Suspeita de Abuso Sexual",
    "description": "Orientações para proteger, registrar e acionar a rede sem revitimizar o estudante.",
    "severity": "CRITICAL",
    "keywords": [
      "abuso sexual",
      "proteção imediata",
      "escuta segura",
      "preservar evidências"
    ],
    "status": "EXISTING"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_risco_imediato_abuso",
        "ifAny": [
          "agressor_proximo",
          "lesao_recente_grave"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_protecao_urgente",
          "flags": [
            "notify_management",
            "contact_council",
            "document_formal",
            "preserve_evidence",
            "do_not_leave_alone",
            "call_190"
          ]
        },
        "rationale": "Risco imediato exige proteção integral e acionamento da rede de direitos."
      },
      {
        "id": "rule_suspeita_consistente_abuso",
        "ifAny": [
          "relato_consistente",
          "mudanca_comportamento_importante"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_rede_direitos",
          "flags": [
            "notify_management",
            "contact_council",
            "document_formal",
            "preserve_evidence"
          ]
        },
        "rationale": "Indícios consistentes exigem encaminhamento formal mesmo sem flagrante."
      },
      {
        "id": "rule_default",
        "toRiskLevel": "CRITICAL",
        "then": {
          "riskLevel": "CRITICAL",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "escuta_protegida",
      "sigilo_restrito",
      "rede_intersetorial_acionada"
    ],
    "riskSignals": [
      {
        "id": "agressor_proximo",
        "label": "Suspeita de agressor próximo no momento",
        "examples": [
          "agressor aguardando na escola",
          "ameaça de retorno imediato"
        ],
        "weight": 3
      },
      {
        "id": "lesao_recente_grave",
        "label": "Sinais físicos recentes com risco importante",
        "examples": [
          "dor intensa",
          "ferimento aparente grave"
        ],
        "weight": 3
      },
      {
        "id": "relato_consistente",
        "label": "Relato consistente de violência sexual",
        "examples": [
          "relato claro em escuta protegida",
          "relato repetido com os mesmos elementos"
        ],
        "weight": 2
      },
      {
        "id": "mudanca_comportamento_importante",
        "label": "Mudança brusca de comportamento com sofrimento intenso",
        "examples": [
          "medo extremo de adulto especifico",
          "queda abrupta de participação"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Escuta acolhedora e sem julgamento",
        "Registro pedagógico protegido",
        "Monitoramento com equipe"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Registrar formalmente",
        "Acionar Conselho Tutelar e CREAS"
      ],
      "CRITICAL": [
        "Garantir proteção imediata",
        "Não deixar a pessoa sozinha",
        "Acionar 190/192 conforme risco atual"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "HIGH": [
        "CONSELHO_TUTELAR",
        "CREAS",
        "DELEGACIA"
      ],
      "CRITICAL": [
        "CONSELHO_TUTELAR",
        "CREAS",
        "DELEGACIA",
        "UPA_HOSPITAL"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Suspeita de abuso sexual identificada. Priorize proteção, sigilo e escuta segura.",
      "riskSignals": [
        "relato_consistente",
        "mudanca_comportamento_importante"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Não investigar sozinho, não repetir perguntas desnecessarias e preservar possíveis evidências.",
      "riskSignals": [
        "relato_consistente"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Existe risco imediato (agressor próximo, ameaça atual ou lesão grave)?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_protecao_urgente"
        },
        {
          "label": "Não",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "agressor_proximo",
        "lesao_recente_grave"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Há indícios consistentes para acionar formalmente a rede de proteção?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_rede_direitos"
        },
        {
          "label": "Ainda em observação",
          "next": "outcome_acompanhamento_protegido"
        }
      ],
      "riskSignals": [
        "relato_consistente",
        "mudanca_comportamento_importante"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_protecao_urgente",
      "label": "Proteção Urgente e Rede Imediata",
      "description": "Risco critico. Acione proteção imediata e rede de direitos sem revitimizar.",
      "actions": [
        "Avisar a gestão escolar imediatamente",
        "Não deixar o estudante sozinho",
        "Acionar Conselho Tutelar e registrar formalmente",
        "Acionar 190 ou 192 conforme risco em curso",
        "Preservar evidências sem manipulacao desnecessaria"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "DELEGACIA",
        "CREAS",
        "UPA_HOSPITAL"
      ],
      "flags": [
        "notify_management",
        "contact_council",
        "document_formal",
        "preserve_evidence",
        "do_not_leave_alone",
        "call_190",
        "call_192"
      ]
    },
    {
      "id": "outcome_rede_direitos",
      "label": "Acionar Rede de Direitos",
      "description": "Risco alto com indícios consistentes. Encaminhar formalmente e manter proteção escolar.",
      "actions": [
        "Avisar a gestão escolar",
        "Registrar formalmente a ocorrencia",
        "Acionar Conselho Tutelar, CREAS e Delegacia quando cabivel",
        "Organizar contato com responsáveis sem expor a vítima a novo risco"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "CONSELHO_TUTELAR",
        "CREAS",
        "DELEGACIA"
      ],
      "flags": [
        "notify_management",
        "contact_council",
        "document_formal",
        "preserve_evidence",
        "notify_guardians"
      ]
    },
    {
      "id": "outcome_acompanhamento_protegido",
      "label": "Acompanhamento Protegido",
      "description": "Sem risco imediato identificado, com monitoramento e reavaliação constante.",
      "actions": [
        "Realizar escuta acolhedora e sem julgamento",
        "Registrar informacoes essenciais com acesso restrito",
        "Reavaliar rapidamente diante de novo sinal de risco"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "ASSISTENCIA_SOCIAL_ESCOLAR"
      ],
      "flags": [
        "document_formal"
      ]
    }
  ]
};
