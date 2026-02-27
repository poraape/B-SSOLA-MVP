import type { FlowSpec } from './flowSpec';

export const flow_agressao_fisica: FlowSpec = {
  meta: {
    id: 'flow_agressao_fisica',
    categoryId: 'convivencia_conflitos',
    subcategoryId: 'agressao_fisica',
    title: 'Agressao Fisica entre Estudantes',
    description: 'Orientacoes para interromper agressao fisica e proteger envolvidos na escola.',
    severity: 'HIGH',
    keywords: ['agressao fisica', 'briga', 'protecao imediata', 'convivencia escolar'],
    status: 'EXISTING',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'HIGH',
    escalationRules: [
      {
        id: 'rule_lesao_grave_ou_objeto',
        ifAny: ['lesao_grave_aparente', 'uso_objeto_agressao'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_protecao_critica',
          flags: ['call_190', 'call_192', 'notify_management', 'notify_guardians', 'document_formal', 'do_not_leave_alone'],
        },
        rationale: 'Lesao grave ou uso de objeto pode evoluir para risco imediato a integridade.',
      },
      {
        id: 'rule_reincidencia_ou_ameaca',
        ifAny: ['reincidencia_conflito', 'ameaca_pos_conflito'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_contencao_formal',
          flags: ['notify_management', 'notify_guardians', 'document_formal'],
        },
        rationale: 'Sem risco imediato, mas com potencial de novo episodio e necessidade de resposta formal.',
      },
    ],
    protectiveFactors: ['mediacao_rapida', 'equipe_presente_em_area_comum', 'registro_de_ocorrencias'],
    riskSignals: [
      {
        id: 'lesao_grave_aparente',
        label: 'Lesao fisica aparente com dor intensa ou sangramento',
        examples: ['sangramento ativo', 'queixa de dor intensa apos impacto'],
        weight: 3,
      },
      {
        id: 'uso_objeto_agressao',
        label: 'Uso de objeto para agredir',
        examples: ['cadeira arremessada', 'objeto contundente usado em briga'],
        weight: 3,
      },
      {
        id: 'reincidencia_conflito',
        label: 'Conflito fisico recorrente entre envolvidos',
        examples: ['brigas repetidas na mesma semana'],
        weight: 2,
      },
      {
        id: 'ameaca_pos_conflito',
        label: 'Ameaca de nova agressao apos separacao',
        examples: ['vou pegar voce depois da aula'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Realizar escuta com envolvidos', 'Registrar e planejar acompanhamento pedagogico'],
      HIGH: ['Avisar gestao escolar', 'Acionar responsaveis', 'Organizar plano de convivencia com monitoramento'],
      CRITICAL: ['Acionar 190/192 conforme risco', 'Garantir protecao fisica imediata', 'Nao deixar envolvidos sem supervisao'],
    },
    recommendedServiceTagsByRisk: {
      MODERATE: ['MEDIACAO_RESTAURATIVA', 'ASSISTENCIA_SOCIAL_ESCOLAR'],
      HIGH: ['MEDIACAO_RESTAURATIVA', 'ASSISTENCIA_SOCIAL_ESCOLAR'],
      CRITICAL: ['UPA_HOSPITAL', 'DELEGACIA', 'CONSELHO_TUTELAR'],
    },
  },
  steps: [
    {
      id: 'step_1',
      type: 'alert',
      content: 'Agressao fisica identificada. Interrompa o conflito e priorize seguranca de todos.',
      riskSignals: ['lesao_grave_aparente', 'uso_objeto_agressao'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Separe os envolvidos com seguranca, sem exposicao publica, e acione a gestao.',
      riskSignals: ['reincidencia_conflito', 'ameaca_pos_conflito'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'Ha lesao grave aparente ou uso de objeto na agressao?',
      actions: [
        { label: 'Sim', next: 'outcome_protecao_critica' },
        { label: 'Nao', next: 'step_4' },
      ],
      riskSignals: ['lesao_grave_aparente', 'uso_objeto_agressao'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Ha recorrencia de brigas ou ameaca de novo episodio?',
      actions: [
        { label: 'Sim', next: 'outcome_contencao_formal' },
        { label: 'Nao', next: 'outcome_mediacao_monitorada' },
      ],
      riskSignals: ['reincidencia_conflito', 'ameaca_pos_conflito'],
    },
  ],
  outcomes: [
    {
      id: 'outcome_protecao_critica',
      label: 'Protecao Critica e Suporte de Emergencia',
      description: 'Risco critico com necessidade de protecao imediata e possivel urgencia externa.',
      actions: [
        'Acionar 192 em emergencia medica e 190 se houver risco de violencia',
        'Avisar a gestao escolar e os responsaveis',
        'Nao deixar envolvidos sozinhos ate estabilizacao',
        'Registrar formalmente a ocorrencia',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['UPA_HOSPITAL', 'DELEGACIA', 'CONSELHO_TUTELAR'],
      flags: ['call_190', 'call_192', 'notify_management', 'notify_guardians', 'do_not_leave_alone', 'document_formal'],
    },
    {
      id: 'outcome_contencao_formal',
      label: 'Contencao Formal e Plano de Protecao',
      description: 'Risco alto com potencial de reincidencia, exigindo acao institucional estruturada.',
      actions: [
        'Avisar a gestao escolar',
        'Acionar responsaveis para alinhamento',
        'Registrar formalmente e definir plano de convivencia com acompanhamento',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['MEDIACAO_RESTAURATIVA', 'ASSISTENCIA_SOCIAL_ESCOLAR'],
      flags: ['notify_management', 'notify_guardians', 'document_formal'],
    },
    {
      id: 'outcome_mediacao_monitorada',
      label: 'Mediacao Monitorada',
      description: 'Sem sinal de gravidade imediata, com reparacao e acompanhamento pedagogico.',
      actions: [
        'Realizar escuta qualificada com os envolvidos',
        'Conduzir mediacao restaurativa com equipe pedagogica',
        'Monitorar convivencia e registrar evolucao',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['MEDIACAO_RESTAURATIVA', 'ASSISTENCIA_SOCIAL_ESCOLAR'],
      flags: ['document_formal'],
    },
  ],
};
