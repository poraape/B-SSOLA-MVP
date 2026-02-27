import type { FlowSpec } from './flowSpec';

export const flow_violencia_domestica: FlowSpec = {
  meta: {
    id: 'flow_violencia_domestica',
    categoryId: 'protecao_direitos',
    subcategoryId: 'violencia_domestica',
    title: 'Suspeita de Violencia Domestica',
    description: 'Orientacoes para proteger o estudante e acionar a rede de protecao de forma segura.',
    severity: 'CRITICAL',
    keywords: ['violencia domestica', 'protecao', 'escuta segura', 'rede de direitos'],
    status: 'EXISTING',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'CRITICAL',
    escalationRules: [
      {
        id: 'rule_risco_imediato',
        ifAny: ['ameaca_ativa', 'lesao_grave_aparente'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_protecao_imediata',
          flags: ['call_190', 'notify_management', 'contact_council', 'do_not_leave_alone', 'document_formal'],
        },
        rationale: 'Ameaca ativa exige protecao imediata e acionamento formal da rede de direitos.',
      },
      {
        id: 'rule_suspeita_consistente',
        ifAny: ['relato_repetido', 'medo_de_voltar_para_casa'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_acionar_rede_protecao',
          flags: ['notify_management', 'contact_council', 'notify_guardians', 'document_formal'],
        },
        rationale: 'Sem risco imediato, mas com indicios consistentes de violencia e necessidade de rede.',
      },
    ],
    protectiveFactors: ['escuta_segura', 'equipe_pedagogica_articulada', 'registro_formal_adequado'],
    riskSignals: [
      {
        id: 'ameaca_ativa',
        label: 'Agressor proximo ou ameaca atual contra o estudante',
        examples: ['recado de ameaca recente', 'responsavel agressivo aguardando na saida'],
        weight: 3,
      },
      {
        id: 'lesao_grave_aparente',
        label: 'Sinais fisicos importantes de violencia',
        examples: ['hematomas extensos', 'dor intensa com limitacao de movimento'],
        weight: 3,
      },
      {
        id: 'relato_repetido',
        label: 'Relatos repetidos de agressao em casa',
        examples: ['estudante relata episodios em diferentes dias'],
        weight: 2,
      },
      {
        id: 'medo_de_voltar_para_casa',
        label: 'Medo intenso de retorno para casa',
        examples: ['choro ao falar de voltar', 'pedido para nao ser levado'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Escuta acolhedora e sem julgamento', 'Registro pedagógico inicial', 'Monitoramento em conjunto com a equipe'],
      HIGH: ['Avisar gestao escolar', 'Registrar formalmente', 'Acionar Conselho Tutelar e rede de protecao'],
      CRITICAL: ['Acionar 190 quando houver risco atual', 'Nao deixar o estudante sozinho', 'Garantir protecao fisica imediata'],
    },
    recommendedServiceTagsByRisk: {
      MODERATE: ['ASSISTENCIA_SOCIAL_ESCOLAR'],
      HIGH: ['CONSELHO_TUTELAR', 'CREAS'],
      CRITICAL: ['CONSELHO_TUTELAR', 'CREAS', 'DELEGACIA'],
    },
  },
  steps: [
    {
      id: 'step_1',
      type: 'alert',
      content: 'Suspeita de violencia domestica identificada. Priorize protecao e escuta segura.',
      riskSignals: ['relato_repetido', 'medo_de_voltar_para_casa'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Conduza escuta protegida, sem pressionar por detalhes e sem investigar sozinho.',
      riskSignals: ['relato_repetido'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'Ha risco imediato para o estudante agora?',
      actions: [
        { label: 'Sim', next: 'outcome_protecao_imediata' },
        { label: 'Nao', next: 'step_4' },
      ],
      riskSignals: ['ameaca_ativa', 'lesao_grave_aparente'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Existem sinais consistentes de violencia (relato repetido ou medo intenso de voltar para casa)?',
      actions: [
        { label: 'Sim', next: 'outcome_acionar_rede_protecao' },
        { label: 'Nao, sinais iniciais', next: 'outcome_acompanhamento_protetivo' },
      ],
      riskSignals: ['relato_repetido', 'medo_de_voltar_para_casa'],
    },
  ],
  outcomes: [
    {
      id: 'outcome_protecao_imediata',
      label: 'Protecao Imediata do Estudante',
      description: 'Risco imediato. Garanta protecao fisica e acione a rede de emergencia.',
      actions: [
        'Acionar 190 quando houver risco atual',
        'Avisar a gestao escolar imediatamente',
        'Nao deixar o estudante sozinho',
        'Acionar Conselho Tutelar com registro formal',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['CONSELHO_TUTELAR', 'DELEGACIA', 'CREAS'],
      flags: ['call_190', 'notify_management', 'contact_council', 'do_not_leave_alone', 'document_formal'],
    },
    {
      id: 'outcome_acionar_rede_protecao',
      label: 'Acionar Rede de Protecao',
      description: 'Risco alto com indicios consistentes. Organizar protecao e acompanhamento institucional.',
      actions: [
        'Avisar a gestao escolar',
        'Registrar formalmente a situacao',
        'Acionar Conselho Tutelar e CREAS',
        'Entrar em contato com responsaveis quando isso nao aumentar o risco',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['CONSELHO_TUTELAR', 'CREAS'],
      flags: ['notify_management', 'contact_council', 'notify_guardians', 'document_formal'],
    },
    {
      id: 'outcome_acompanhamento_protetivo',
      label: 'Acompanhamento Protetivo Inicial',
      description: 'Sinais iniciais, sem risco imediato. Manter acompanhamento e reavaliacao frequente.',
      actions: [
        'Realizar escuta acolhedora e sem julgamento',
        'Registrar observacoes da equipe pedagogica',
        'Monitorar novos sinais e reavaliar rapidamente se houver agravamento',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['ASSISTENCIA_SOCIAL_ESCOLAR', 'CRAS'],
      flags: ['document_formal'],
    },
  ],
};
