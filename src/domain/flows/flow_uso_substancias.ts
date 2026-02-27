import type { FlowSpec } from './flowSpec';

export const flow_uso_substancias: FlowSpec = {
  "meta": {
    "id": "flow_uso_substancias",
    "categoryId": "saude_emocional",
    "subcategoryId": "uso_substancias",
    "title": "Uso ou Suspeita de Uso de Alcool e Drogas",
    "description": "Orientacoes praticas para a equipe escolar sobre Uso ou Suspeita de Alcool/Drogas.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Uso ou Suspeita de Alcool/Drogas. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "O estudante esta sob efeito neste momento?",
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
        "Escuta sem julgamento",
        "Orientar responsavel"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Avaliacao medica imediata",
        "Garantir seguranca"
      ],
      "timeline": "Imediato"
    }
  ]
};
