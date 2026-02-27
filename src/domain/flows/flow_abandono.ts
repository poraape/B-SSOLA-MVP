import type { FlowSpec } from './flowSpec';

export const flow_abandono: FlowSpec = {
  meta: {
    id: 'flow_abandono',
    categoryId: 'protecao_direitos',
    subcategoryId: 'abandono_rua',
    title: 'Abandono ou Situacao de Rua',
    description: 'Orientacoes para protecao imediata e articulacao de rede em abandono ou situacao de rua.',
    severity: 'CRITICAL',
    keywords: ['abandono', 'situacao de rua', 'protecao integral', 'rede de direitos'],
    status: 'EXISTING',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'CRITICAL',
    escalationRules: [
      {
        id: 'rule_sem_responsavel_imediato',
        ifAny: ['sem_responsavel_agora', 'risco_na_rua'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_protecao_imediata',
          flags: ['notify_management', 'contact_council', 'do_not_leave_alone', 'document_formal'],
        },
        rationale: 'Sem adulto responsavel e com risco em rua, a protecao deve ser imediata.',
      },
      {
        id: 'rule_vulnerabilidade_alta',
        ifAny: ['ausencia_familiar_recorrente', 'falta_abrigo_noturno'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_rede_assistencia',
          flags: ['notify_management', 'contact_council', 'notify_guardians', 'document_formal'],
        },
        rationale: 'Vulnerabilidade social elevada exige acao da rede de assistencia e protecao.',
      },
    ],
    protectiveFactors: ['busca_ativa_escolar', 'rede_assistencia_municipal', 'registro_continuado'],
    riskSignals: [
      {
        id: 'sem_responsavel_agora',
        label: 'Estudante sem responsavel de referencia no momento',
        examples: ['ninguem atende contato', 'sem adulto para busca'],
        weight: 3,
      },
      {
        id: 'risco_na_rua',
        label: 'Exposicao atual a risco em rua',
        examples: ['dorme em local aberto', 'relato de inseguranca noturna'],
        weight: 3,
      },
      {
        id: 'ausencia_familiar_recorrente',
        label: 'Ausencia recorrente de cuidado familiar',
        examples: ['dias seguidos sem acompanhamento adulto'],
        weight: 2,
      },
      {
        id: 'falta_abrigo_noturno',
        label: 'Sem local seguro para pernoite',
        examples: ['sem endereco fixo', 'rotina de rua'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Escuta acolhedora e registro pedagogico', 'Plano de acompanhamento com assistencia escolar'],
      HIGH: ['Avisar gestao escolar', 'Acionar CRAS/CREAS e Conselho Tutelar', 'Entrar em contato com responsaveis quando possivel'],
      CRITICAL: ['Garantir protecao imediata na escola', 'Nao deixar estudante sozinho', 'Acionar Conselho Tutelar com prioridade'],
    },
    recommendedServiceTagsByRisk: {
      MODERATE: ['ASSISTENCIA_SOCIAL_ESCOLAR', 'CRAS'],
      HIGH: ['CRAS', 'CREAS', 'CONSELHO_TUTELAR'],
      CRITICAL: ['CONSELHO_TUTELAR', 'CREAS'],
    },
  },
  steps: [
    {
      id: 'step_1',
      type: 'alert',
      content: 'Possivel abandono ou situacao de rua identificado. Priorize protecao e acolhimento.',
      riskSignals: ['sem_responsavel_agora', 'risco_na_rua'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Mantenha o estudante em local seguro e acione imediatamente a gestao escolar.',
      riskSignals: ['sem_responsavel_agora'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'O estudante esta sem responsavel e sem local seguro neste momento?',
      actions: [
        { label: 'Sim', next: 'outcome_protecao_imediata' },
        { label: 'Nao', next: 'step_4' },
      ],
      riskSignals: ['sem_responsavel_agora', 'risco_na_rua'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Ha sinais de vulnerabilidade recorrente (falta de abrigo, ausencia familiar frequente)?',
      actions: [
        { label: 'Sim', next: 'outcome_rede_assistencia' },
        { label: 'Nao, caso inicial', next: 'outcome_acompanhamento_social' },
      ],
      riskSignals: ['ausencia_familiar_recorrente', 'falta_abrigo_noturno'],
    },
  ],
  outcomes: [
    {
      id: 'outcome_protecao_imediata',
      label: 'Protecao Imediata com Conselho Tutelar',
      description: 'Risco critico. Garantir permanencia segura e acionar rede de protecao urgente.',
      actions: [
        'Avisar a gestao escolar imediatamente',
        'Nao deixar o estudante sozinho',
        'Acionar Conselho Tutelar com prioridade',
        'Registrar formalmente a ocorrencia',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['CONSELHO_TUTELAR', 'CREAS'],
      flags: ['notify_management', 'contact_council', 'do_not_leave_alone', 'document_formal'],
    },
    {
      id: 'outcome_rede_assistencia',
      label: 'Rede de Assistencia Prioritaria',
      description: 'Risco alto com vulnerabilidade social importante. Acionar rede socioassistencial.',
      actions: [
        'Avisar a gestao escolar',
        'Acionar CRAS/CREAS e Conselho Tutelar',
        'Registrar formalmente e organizar busca ativa escolar',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['CRAS', 'CREAS', 'CONSELHO_TUTELAR'],
      flags: ['notify_management', 'contact_council', 'document_formal', 'notify_guardians'],
    },
    {
      id: 'outcome_acompanhamento_social',
      label: 'Acompanhamento Social Escolar',
      description: 'Sem risco imediato, com plano de acompanhamento e prevencao de agravamento.',
      actions: [
        'Realizar escuta acolhedora e sem julgamento',
        'Registrar plano de acompanhamento com assistencia escolar',
        'Monitorar frequencia e condicoes de cuidado',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['ASSISTENCIA_SOCIAL_ESCOLAR', 'CRAS'],
      flags: ['document_formal'],
    },
  ],
};
