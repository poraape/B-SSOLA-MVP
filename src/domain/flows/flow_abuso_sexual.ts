import type { FlowSpec } from './flowSpec';

export const flow_abuso_sexual: FlowSpec = {
  meta: {
    id: 'flow_abuso_sexual',
    categoryId: 'protecao_direitos',
    subcategoryId: 'abuso_sexual',
    title: 'Suspeita de Abuso Sexual',
    description: 'Orientacoes para proteger, registrar e acionar a rede sem revitimizar o estudante.',
    severity: 'CRITICAL',
    keywords: ['abuso sexual', 'protecao imediata', 'escuta segura', 'preservar evidencias'],
    status: 'EXISTING',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'CRITICAL',
    escalationRules: [
      {
        id: 'rule_risco_imediato_abuso',
        ifAny: ['agressor_proximo', 'lesao_recente_grave'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_protecao_urgente',
          flags: [
            'notify_management',
            'contact_council',
            'document_formal',
            'preserve_evidence',
            'do_not_leave_alone',
            'call_190'
          ],
        },
        rationale: 'Risco imediato exige protecao integral e acionamento da rede de direitos.',
      },
      {
        id: 'rule_suspeita_consistente_abuso',
        ifAny: ['relato_consistente', 'mudanca_comportamento_importante'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_rede_direitos',
          flags: ['notify_management', 'contact_council', 'document_formal', 'preserve_evidence'],
        },
        rationale: 'Indicios consistentes exigem encaminhamento formal mesmo sem flagrante.',
      },
    ],
    protectiveFactors: ['escuta_protegida', 'sigilo_restrito', 'rede_intersetorial_acionada'],
    riskSignals: [
      {
        id: 'agressor_proximo',
        label: 'Suspeita de agressor proximo no momento',
        examples: ['agressor aguardando na escola', 'ameaca de retorno imediato'],
        weight: 3,
      },
      {
        id: 'lesao_recente_grave',
        label: 'Sinais fisicos recentes com risco importante',
        examples: ['dor intensa', 'ferimento aparente grave'],
        weight: 3,
      },
      {
        id: 'relato_consistente',
        label: 'Relato consistente de violencia sexual',
        examples: ['relato claro em escuta protegida', 'relato repetido com os mesmos elementos'],
        weight: 2,
      },
      {
        id: 'mudanca_comportamento_importante',
        label: 'Mudanca brusca de comportamento com sofrimento intenso',
        examples: ['medo extremo de adulto especifico', 'queda abrupta de participacao'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Escuta acolhedora e sem julgamento', 'Registro pedagogico protegido', 'Monitoramento com equipe'],
      HIGH: ['Avisar gestao escolar', 'Registrar formalmente', 'Acionar Conselho Tutelar e CREAS'],
      CRITICAL: ['Garantir protecao imediata', 'Nao deixar a pessoa sozinha', 'Acionar 190/192 conforme risco atual'],
    },
    recommendedServiceTagsByRisk: {
      MODERATE: ['ASSISTENCIA_SOCIAL_ESCOLAR'],
      HIGH: ['CONSELHO_TUTELAR', 'CREAS', 'DELEGACIA'],
      CRITICAL: ['CONSELHO_TUTELAR', 'CREAS', 'DELEGACIA', 'UPA_HOSPITAL'],
    },
  },
  steps: [
    {
      id: 'step_1',
      type: 'alert',
      content: 'Suspeita de abuso sexual identificada. Priorize protecao, sigilo e escuta segura.',
      riskSignals: ['relato_consistente', 'mudanca_comportamento_importante'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Nao investigar sozinho, nao repetir perguntas desnecessarias e preservar possiveis evidencias.',
      riskSignals: ['relato_consistente'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'Existe risco imediato (agressor proximo, ameaca atual ou lesao grave)?',
      actions: [
        { label: 'Sim', next: 'outcome_protecao_urgente' },
        { label: 'Nao', next: 'step_4' },
      ],
      riskSignals: ['agressor_proximo', 'lesao_recente_grave'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Ha indicios consistentes para acionar formalmente a rede de protecao?',
      actions: [
        { label: 'Sim', next: 'outcome_rede_direitos' },
        { label: 'Ainda em observacao', next: 'outcome_acompanhamento_protegido' },
      ],
      riskSignals: ['relato_consistente', 'mudanca_comportamento_importante'],
    },
  ],
  outcomes: [
    {
      id: 'outcome_protecao_urgente',
      label: 'Protecao Urgente e Rede Imediata',
      description: 'Risco critico. Acione protecao imediata e rede de direitos sem revitimizar.',
      actions: [
        'Avisar a gestao escolar imediatamente',
        'Nao deixar o estudante sozinho',
        'Acionar Conselho Tutelar e registrar formalmente',
        'Acionar 190 ou 192 conforme risco em curso',
        'Preservar evidencias sem manipulacao desnecessaria',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['CONSELHO_TUTELAR', 'DELEGACIA', 'CREAS', 'UPA_HOSPITAL'],
      flags: ['notify_management', 'contact_council', 'document_formal', 'preserve_evidence', 'do_not_leave_alone', 'call_190', 'call_192'],
    },
    {
      id: 'outcome_rede_direitos',
      label: 'Acionar Rede de Direitos',
      description: 'Risco alto com indicios consistentes. Encaminhar formalmente e manter protecao escolar.',
      actions: [
        'Avisar a gestao escolar',
        'Registrar formalmente a ocorrencia',
        'Acionar Conselho Tutelar, CREAS e Delegacia quando cabivel',
        'Organizar contato com responsaveis sem expor a vitima a novo risco',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['CONSELHO_TUTELAR', 'CREAS', 'DELEGACIA'],
      flags: ['notify_management', 'contact_council', 'document_formal', 'preserve_evidence', 'notify_guardians'],
    },
    {
      id: 'outcome_acompanhamento_protegido',
      label: 'Acompanhamento Protegido',
      description: 'Sem risco imediato identificado, com monitoramento e reavaliacao constante.',
      actions: [
        'Realizar escuta acolhedora e sem julgamento',
        'Registrar informacoes essenciais com acesso restrito',
        'Reavaliar rapidamente diante de novo sinal de risco',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['ASSISTENCIA_SOCIAL_ESCOLAR'],
      flags: ['document_formal'],
    },
  ],
};
