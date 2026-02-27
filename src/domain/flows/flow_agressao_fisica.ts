import type { FlowSpec } from './flowSpec';

export const flow_agressao_fisica: FlowSpec = {
  "meta": {
    "id": "flow_agressao_fisica",
    "categoryId": "convivencia_conflitos",
    "subcategoryId": "agressao_fisica",
    "title": "Agressao Fisica entre Estudantes",
    "description": "Orientacoes praticas para a equipe escolar sobre Agressao Fisica entre Estudantes.",
    "severity": "HIGH",
    "keywords": [
      "agressao fisica",
      "briga",
      "violencia entre estudantes",
      "lesao"
    ],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Agressao Fisica entre Estudantes. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "Houve lesao fisica?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_alto"
        },
        {
          "label": "Nao",
          "next": "outcome_moderado"
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
        "Separar envolvidos",
        "Registrar ocorrencia institucional",
        "Acionar responsaveis para acompanhamento"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Avaliacao medica imediata",
        "Garantir protecao fisica dos estudantes",
        "Entrar em contato com os responsaveis e registrar encaminhamento"
      ],
      "timeline": "Imediato"
    }
  ]
};
