import type { FlowSpec } from './flowSpec';

export const flow_emergencia_medica: FlowSpec = {
  "meta": {
    "id": "flow_emergencia_medica",
    "categoryId": "emergencias_seguranca",
    "subcategoryId": "emergencia_medica",
    "title": "Emergência Médica Grave",
    "description": "Orientações para resposta imediata a situação médica grave no ambiente escolar.",
    "severity": "CRITICAL",
    "keywords": [
      "emergência médica",
      "risco de vida",
      "primeiros cuidados",
      "acionamento urgente"
    ],
    "status": "IMPLEMENTED"
  },
  "risk": {
    "modelVersion": "risk-heuristic-v1",
    "baselineSeverity": "CRITICAL",
    "escalationRules": [
      {
        "id": "rule_risco_vida_imediato",
        "ifAny": [
          "inconsciencia",
          "dificuldade_respiratoria_grave"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_urgencia_imediata",
          "flags": [
            "call_192",
            "notify_management",
            "notify_guardians",
            "do_not_leave_alone",
            "document_formal"
          ]
        },
        "rationale": "Inconsciencia e dificuldade respiratória grave indicam risco imediato a vida."
      },
      {
        "id": "rule_agravamento_rapido",
        "ifAny": [
          "dor_intensa_persistente",
          "sinais_desidratacao_importante"
        ],
        "then": {
          "riskLevel": "CRITICAL",
          "outcome": "outcome_encaminhamento_rapido",
          "flags": [
            "notify_management",
            "notify_guardians",
            "document_formal"
          ]
        },
        "rationale": "Sem risco imediato claro, mas com sinais de agravamento que exigem avaliação em saúde."
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
        "rationale": "Regra padrao deterministica baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [
      "adulto_referencia_presente",
      "espaco_seguro_para_aguardo",
      "registro_previo_de_saude"
    ],
    "riskSignals": [
      {
        "id": "inconsciencia",
        "label": "Pessoa não responde a estimulos e permanece inconsciente",
        "examples": [
          "não abre os olhos",
          "não responde quando chamada"
        ],
        "weight": 3
      },
      {
        "id": "dificuldade_respiratoria_grave",
        "label": "Respiracao muito dificil, rapida ou irregular",
        "examples": [
          "falta de ar intensa",
          "labios arroxeados"
        ],
        "weight": 3
      },
      {
        "id": "dor_intensa_persistente",
        "label": "Dor intensa que não melhora com repouso inicial",
        "examples": [
          "dor no peito",
          "dor abdominal muito forte"
        ],
        "weight": 2
      },
      {
        "id": "sinais_desidratacao_importante",
        "label": "Fraqueza acentuada com sinais de desidratacao",
        "examples": [
          "tontura intensa",
          "vomitos repetidos"
        ],
        "weight": 2
      }
    ],
    "recommendedActionsByRisk": {
      "MODERATE": [
        "Acolher em local seguro e monitorar",
        "Registrar ocorrencia e orientar avaliação na UBS"
      ],
      "HIGH": [
        "Avisar gestão escolar",
        "Entrar em contato com responsaveis",
        "Encaminhar para UPA/Hospital ou UBS conforme gravidade"
      ],
      "CRITICAL": [
        "Acionar 192 imediatamente",
        "Não deixar a pessoa sozinha",
        "Manter suporte basico ate chegada da emergência"
      ]
    },
    "recommendedServiceTagsByRisk": {
      "MODERATE": [
        "UBS"
      ],
      "HIGH": [
        "UBS",
        "UPA_HOSPITAL"
      ],
      "CRITICAL": [
        "UPA_HOSPITAL"
      ]
    }
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Emergência médica identificada. Priorize proteção e acionamento rapido da equipe.",
      "riskSignals": [
        "inconsciencia",
        "dificuldade_respiratoria_grave"
      ]
    },
    {
      "id": "step_2",
      "type": "action",
      "action": "Mantenha a pessoa em local seguro, afaste curiosos e acione a gestão escolar.",
      "riskSignals": [
        "inconsciencia",
        "dor_intensa_persistente"
      ]
    },
    {
      "id": "step_3",
      "type": "question",
      "question": "Há inconsciencia ou dificuldade respiratória grave neste momento?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_urgencia_imediata"
        },
        {
          "label": "Não",
          "next": "step_4"
        }
      ],
      "riskSignals": [
        "inconsciencia",
        "dificuldade_respiratoria_grave"
      ]
    },
    {
      "id": "step_4",
      "type": "question",
      "question": "Há sinais de agravamento rapido (dor intensa persistente, vomitos repetidos, fraqueza acentuada)?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_encaminhamento_rapido"
        },
        {
          "label": "Não",
          "next": "outcome_observacao_orientada"
        }
      ],
      "riskSignals": [
        "dor_intensa_persistente",
        "sinais_desidratacao_importante"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_urgencia_imediata",
      "label": "Urgência Médica Imediata",
      "description": "Risco critico com necessidade de atendimento de emergência sem atraso.",
      "actions": [
        "Acionar 192 imediatamente",
        "Avisar a gestão escolar e os responsaveis",
        "Não deixar a pessoa sozinha ate chegada da equipe de urgência",
        "Registrar formalmente horario e medidas adotadas"
      ],
      "timeline": "Imediato",
      "riskLevel": "CRITICAL",
      "serviceTags": [
        "UPA_HOSPITAL"
      ],
      "flags": [
        "call_192",
        "notify_management",
        "notify_guardians",
        "do_not_leave_alone",
        "document_formal"
      ]
    },
    {
      "id": "outcome_encaminhamento_rapido",
      "label": "Encaminhamento Rapido de Saúde",
      "description": "Risco alto sem colapso imediato, com necessidade de avaliação externa no mesmo turno.",
      "actions": [
        "Avisar a gestão escolar",
        "Entrar em contato com os responsaveis",
        "Encaminhar para UPA/Hospital ou UBS de referência conforme orientação"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "serviceTags": [
        "UPA_HOSPITAL",
        "UBS"
      ],
      "flags": [
        "notify_management",
        "notify_guardians",
        "document_formal"
      ]
    },
    {
      "id": "outcome_observacao_orientada",
      "label": "Observação com Orientação",
      "description": "Sem sinais graves no momento, mantendo acompanhamento e orientação para família.",
      "actions": [
        "Manter observação ate estabilidade",
        "Registrar ocorrencia no acompanhamento escolar",
        "Orientar avaliação na UBS de referência"
      ],
      "timeline": "Dias",
      "riskLevel": "MODERATE",
      "serviceTags": [
        "UBS"
      ],
      "flags": [
        "document_formal",
        "notify_guardians"
      ]
    }
  ]
};
