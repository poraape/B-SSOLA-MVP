import type { FlowSpec } from './flowSpec';

export const flow_convulsao: FlowSpec = {
  meta: {
    id: 'flow_convulsao',
    categoryId: 'emergencias_seguranca',
    subcategoryId: 'convulsao_perda_consciencia',
    title: 'Convulsao ou Perda de Consciencia',
    description: 'Orientacoes para primeiros cuidados escolares em convulsao ou desmaio prolongado.',
    severity: 'CRITICAL',
    keywords: ['convulsao', 'perda de consciencia', 'primeiros cuidados', 'protecao imediata'],
    status: 'EXISTING',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'CRITICAL',
    escalationRules: [
      {
        id: 'rule_inconsciente_persistente',
        ifAny: ['inconsciente_mais_1min', 'respiracao_dificil'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_urgencia_critica',
          flags: ['call_192', 'notify_management', 'notify_guardians', 'do_not_leave_alone'],
        },
        rationale: 'Perda de consciencia prolongada e sinal de risco imediato a integridade.',
      },
      {
        id: 'rule_recupera_mas_instavel',
        ifAny: ['crise_recorrente', 'queda_com_trauma'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_encaminhamento_rapido',
          flags: ['notify_management', 'notify_guardians', 'document_formal'],
        },
        rationale: 'Mesmo com melhora, ha risco relevante e necessidade de avaliacao externa.',
      },
    ],
    protectiveFactors: ['adulto_treinado_presente', 'espaco_seguro', 'registro_de_crises_anteriores'],
    riskSignals: [
      {
        id: 'inconsciente_mais_1min',
        label: 'Pessoa permanece inconsciente por mais de 1 minuto',
        examples: ['nao responde ao chamado', 'nao abre os olhos'],
        weight: 3,
      },
      {
        id: 'respiracao_dificil',
        label: 'Respiracao irregular ou muito fraca',
        examples: ['gasping', 'pausas longas para respirar'],
        weight: 3,
      },
      {
        id: 'crise_recorrente',
        label: 'Nova crise logo apos a primeira',
        examples: ['segunda convulsao em poucos minutos'],
        weight: 2,
      },
      {
        id: 'queda_com_trauma',
        label: 'Queda com batida de cabeca ou ferimento',
        examples: ['sangramento', 'queixa de dor forte apos queda'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Acolher e observar por periodo curto', 'Registrar ocorrencia no acompanhamento escolar'],
      HIGH: ['Avisar gestao escolar', 'Entrar em contato com os responsaveis', 'Encaminhar para avaliacao em servico de saude'],
      CRITICAL: ['Acionar 192 imediatamente', 'Nao deixar a pessoa sozinha', 'Manter ambiente seguro ate chegada da emergencia'],
    },
    recommendedServiceTagsByRisk: {
      MODERATE: ['UBS'],
      HIGH: ['UBS', 'UPA_HOSPITAL'],
      CRITICAL: ['UPA_HOSPITAL'],
    },
  },
  steps: [
    {
      id: 'step_1',
      type: 'alert',
      content: 'Convulsao ou perda de consciencia identificada. Priorize seguranca e calma da equipe.',
      riskSignals: ['inconsciente_mais_1min', 'respiracao_dificil'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Proteja a cabeca da pessoa, afaste objetos ao redor e nao coloque nada na boca.',
      riskSignals: ['queda_com_trauma'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'A pessoa esta inconsciente por mais de 1 minuto ou com dificuldade para respirar?',
      actions: [
        { label: 'Sim', next: 'outcome_urgencia_critica' },
        { label: 'Nao', next: 'step_4' },
      ],
      riskSignals: ['inconsciente_mais_1min', 'respiracao_dificil'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Houve queda com trauma ou repeticao da crise?',
      actions: [
        { label: 'Sim', next: 'outcome_encaminhamento_rapido' },
        { label: 'Nao', next: 'outcome_observacao_orientada' },
      ],
      riskSignals: ['crise_recorrente', 'queda_com_trauma'],
    },
  ],
  outcomes: [
    {
      id: 'outcome_urgencia_critica',
      label: 'Urgencia Medica Imediata',
      description: 'Risco imediato. Acione emergencia e mantenha supervisao continua.',
      actions: [
        'Acionar 192 imediatamente',
        'Avisar a gestao escolar e os responsaveis',
        'Nao deixar a pessoa sozinha ate chegada da equipe de urgencia',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['UPA_HOSPITAL'],
      flags: ['call_192', 'notify_management', 'notify_guardians', 'do_not_leave_alone', 'document_formal'],
    },
    {
      id: 'outcome_encaminhamento_rapido',
      label: 'Encaminhamento Rapido para Avaliacao',
      description: 'Com melhora parcial, ainda ha risco alto e necessidade de avaliacao externa.',
      actions: [
        'Avisar a gestao escolar',
        'Entrar em contato com os responsaveis para busca imediata',
        'Encaminhar para UPA/Hospital ou UBS conforme orientacao da equipe de saude',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['UPA_HOSPITAL', 'UBS'],
      flags: ['notify_management', 'notify_guardians', 'document_formal'],
    },
    {
      id: 'outcome_observacao_orientada',
      label: 'Observacao com Orientacao',
      description: 'Sem sinais graves no momento, manter acompanhamento escolar e da familia.',
      actions: [
        'Realizar escuta acolhedora e sem julgamento',
        'Registrar a ocorrencia no acompanhamento escolar',
        'Orientar familia para avaliacao na UBS de referencia',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['UBS'],
      flags: ['document_formal', 'notify_guardians'],
    },
  ],
};
