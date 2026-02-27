import type { FlowSpec } from './flowSpec';

export const flow_febre: FlowSpec = {
  "meta": {
    "id": "flow_febre",
    "categoryId": "saude_bem_estar",
    "subcategoryId": "febre_infeccao",
    "title": "Febre ou Suspeita de Infeccao",
    "description": "Orientacoes praticas para a equipe escolar sobre Febre ou Suspeita de Infeccao.",
    "severity": "MODERATE",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Febre ou Suspeita de Infeccao. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Febre acima de 39C ou acompanhada de convulsao?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Nao",
          "next": "q2"
        }
      ]
    },
    {
      "id": "q2",
      "type": "question",
      "question": "Ha sintomas respiratorios ou dor intensa?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_moderado"
        },
        {
          "label": "Nao",
          "next": "outcome_baixo"
        }
      ]
    }
  ],
  "outcomes": [
    {
      "id": "outcome_baixo",
      "label": "Resposta Inicial Pedagogica",
      "description": "Situacao de menor complexidade com monitoramento pedag\u00f3gico.",
      "actions": [
        "Aguardar retirada por responsavel",
        "Monitorar temperatura"
      ],
      "timeline": "Dias"
    },
    {
      "id": "outcome_moderado",
      "label": "Acompanhamento Institucional",
      "description": "Situacao que exige acompanhamento institucional estruturado.",
      "actions": [
        "Orientar responsavel",
        "Encaminhar para UBS"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Encaminhamento imediato",
        "Monitorar sinais vitais"
      ],
      "timeline": "Imediato"
    }
  ]
};
