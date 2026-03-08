import type { FlowSpec } from './flowSpec';

export const flow_inseguranca_alimentar: FlowSpec = {
  "meta": {
    "id": "flow_inseguranca_alimentar",
    "categoryId": "apoio_social_familiar",
    "subcategoryId": "inseguranca_alimentar",
    "title": "Insegurança Alimentar",
    "description": "Orientações praticas para a equipe escolar sobre Fome ou Insegurança Alimentar.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situação identificada: Fome ou Insegurança Alimentar. Fazer acolhimento, avisar a gestão e seguir os próximos passos.",
      "riskSignals": [
        "vulnerabilidade_economica"
      ]
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Hoje há necessidade imediata de alimentação ou cuidado por fome, fraqueza ou mal-estar?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_urgente"
        },
        {
          "label": "Não",
          "next": "q2"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica",
        "risco_abandono"
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "A escola observa recorrência de falta de alimentação ou outros sinais de insegurança alimentar no domicílio?",
      "actions": [
        {
          "label": "Sim",
          "next": "q3"
        },
        {
          "label": "Não",
          "next": "outcome_baixo"
        }
      ],
      "riskSignals": [
        "vulnerabilidade_economica"
      ]
    },
    {
      "id": "q3",
      "type": "question",
      "question": "Há sinais de vulnerabilidade familiar associada (ausência de adulto de referência, sobrecarga de cuidado ou risco de desproteção)?",
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
        "instabilidade_familiar",
        "risco_abandono"
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Monitoramento Alimentar Inicial",
      "description": "Sem urgência hoje e sem recorrência confirmada, com necessidade de observação escolar.",
      "actions": [
        "Registrar sinais observados na rotina escolar",
        "Orientar equipe para monitorar novos episódios",
        "Acionar coordenação se houver recorrência"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_urgente",
      "label": "Resposta Imediata de Cuidado Escolar",
      "description": "Há necessidade imediata de alimentação e cuidado no dia. A resposta escolar deve ser imediata e protegida.",
      "actions": [
        "Garantir acolhimento e alimentação imediata na escola",
        "Avisar gestão no mesmo turno para condução institucional",
        "Registrar objetivamente sinais de fome ou mal-estar"
      ],
      "timeline": "Imediato",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional com Responsáveis",
      "description": "Recorrência de insegurança alimentar sem sinal atual de desproteção grave exige plano institucional contínuo.",
      "actions": [
        "Avisar gestão para acompanhamento estruturado",
        "Organizar contato com responsáveis por canal institucional",
        "Articular encaminhamento socioassistencial com a gestão"
      ],
      "timeline": "Horas",
      "riskLevel": "HIGH",
      "flags": [
        "notify_management"
      ]
    },
    {
      "id": "outcome_alto",
      "label": "Proteção e Articulação Prioritária da Rede",
      "description": "Recorrência de insegurança alimentar associada a vulnerabilidade familiar exige proteção e articulação prioritária de rede.",
      "actions": [
        "Avisar gestão escolar imediatamente",
        "Registrar formalmente recorrência e sinais de desproteção",
        "Acionar rede socioassistencial e protetiva conforme protocolo institucional"
      ],
      "timeline": "Horas",
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
        "id": "rule_risco_abandono",
        "ifAny": [
          "risco_abandono"
        ],
        "then": {
          "riskLevel": "HIGH",
          "flags": [
            "notify_management"
          ]
        },
        "rationale": "Risco de abandono exige articulacao institucional imediata."
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
        "rationale": "Regra padrão determinística baseada na severidade de baseline."
      }
    ],
    "protectiveFactors": [],
    "riskSignals": [
      {
        "id": "vulnerabilidade_economica",
        "label": "Vulnerabilidade economica",
        "weight": 1
      },
      {
        "id": "risco_abandono",
        "label": "Risco de abandono",
        "weight": 3
      },
      {
        "id": "instabilidade_familiar",
        "label": "Instabilidade familiar",
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
