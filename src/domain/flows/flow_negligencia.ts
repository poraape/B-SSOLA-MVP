import type { FlowSpec } from './flowSpec';

export const flow_negligencia: FlowSpec = {
  "meta": {
    "id": "flow_negligencia",
    "categoryId": "protecao_direitos",
    "subcategoryId": "negligencia_familiar",
    "title": "Negligencia Familiar",
    "description": "Orientacoes praticas para a equipe escolar sobre Negligencia Familiar.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Negligencia Familiar. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situacao compromete saude ou integridade do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "q2"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
        }
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Ha risco imediato de abandono ou violencia?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
        },
        {
          "label": "Nao",
          "next": "outcome_alto"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Escuta acolhedora e sem julgamento",
        "Contato com os responsaveis"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Avisar a gestao escolar",
        "Encaminhamento formal"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Garantir protecao imediata",
        "Acionar autoridade competente"
      ],
      "timeline": "Imediato"
    }
  ]
};
