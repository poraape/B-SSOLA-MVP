import type { FlowSpec } from './flowSpec';

export const flow_violacao_direitos: FlowSpec = {
  "meta": {
    "id": "flow_violacao_direitos",
    "categoryId": "protecao_direitos",
    "subcategoryId": "outras_violacoes_direitos",
    "title": "Outras Violacoes de Direitos",
    "description": "Orientacoes praticas para a equipe escolar sobre Outras Violacoes de Direitos.",
    "severity": "HIGH",
    "keywords": [],
    "status": "EXISTING"
  },
  "steps": [
    {
      "id": "step_1",
      "type": "alert",
      "content": "Situacao identificada: Outras Violacoes de Direitos. Fazer acolhimento, avisar a gestao e seguir os proximos passos."
    },
    {
      "id": "q1",
      "type": "question",
      "question": "A situacao envolve risco imediato a integridade do estudante?",
      "actions": [
        {
          "label": "Sim",
          "next": "outcome_iminente"
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
      "question": "Ha indicio de violencia, negligencia grave ou exploracao continua?",
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
        "Acionar gestao para triagem qualificada",
        "Encaminhar para suporte socioassistencial quando indicado"
      ],
      "timeline": "Horas"
    },
    {
      "id": "outcome_alto",
      "label": "Protecao e Encaminhamento Prioritario",
      "description": "Risco alto. Proteja o estudante e organize encaminhamento com a gestao.",
      "actions": [
        "Acionar gestao imediatamente",
        "Encaminhar formalmente a rede de protecao (minimos dados necessarios)"
      ],
      "timeline": "Imediato"
    },
    {
      "id": "outcome_iminente",
      "label": "Acao Imediata de Protecao",
      "description": "Risco imediato. Ative o protocolo interno sem atraso.",
      "actions": [
        "Priorizar seguranca imediata",
        "Acionar 190 quando houver risco atual",
        "Acionar gestao imediatamente"
      ],
      "timeline": "Imediato"
    }
  ]
};
