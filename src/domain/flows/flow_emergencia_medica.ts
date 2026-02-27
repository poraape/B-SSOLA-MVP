import type { FlowSpec } from './flowSpec';

export const flow_emergencia_medica: FlowSpec = {
  meta: {
    id: 'flow_emergencia_medica',
    categoryId: 'emergencias_seguranca',
    subcategoryId: 'emergencia_medica',
    title: 'Emergencia Medica Grave',
    description: 'Orientacoes para resposta imediata a situacao medica grave no ambiente escolar.',
    severity: 'CRITICAL',
    keywords: ['emergencia medica', 'risco de vida', 'primeiros cuidados', 'acionamento urgente'],
    status: 'TO_CREATE',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'CRITICAL',
    escalationRules: [
      {
        id: 'rule_risco_vida_imediato',
        ifAny: ['inconsciencia', 'dificuldade_respiratoria_grave'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_urgencia_imediata',
          flags: ['call_192', 'notify_management', 'notify_guardians', 'do_not_leave_alone', 'document_formal'],
        },
        rationale: 'Inconsciencia e dificuldade respiratoria grave indicam risco imediato a vida.',
      },
      {
        id: 'rule_agravamento_rapido',
        ifAny: ['dor_intensa_persistente', 'sinais_desidratacao_importante'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_encaminhamento_rapido',
          flags: ['notify_management', 'notify_guardians', 'document_formal'],
        },
        rationale: 'Sem risco imediato claro, mas com sinais de agravamento que exigem avaliacao em saude.',
      },
    ],
    protectiveFactors: ['adulto_referencia_presente', 'espaco_seguro_para_aguardo', 'registro_previo_de_saude'],
    riskSignals: [
      {
        id: 'inconsciencia',
        label: 'Pessoa nao responde a estimulos e permanece inconsciente',
        examples: ['nao abre os olhos', 'nao responde quando chamada'],
        weight: 3,
      },
      {
        id: 'dificuldade_respiratoria_grave',
        label: 'Respiracao muito dificil, rapida ou irregular',
        examples: ['falta de ar intensa', 'labios arroxeados'],
        weight: 3,
      },
      {
        id: 'dor_intensa_persistente',
        label: 'Dor intensa que nao melhora com repouso inicial',
        examples: ['dor no peito', 'dor abdominal muito forte'],
        weight: 2,
      },
      {
        id: 'sinais_desidratacao_importante',
        label: 'Fraqueza acentuada com sinais de desidratacao',
        examples: ['tontura intensa', 'vomitos repetidos'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Acolher em local seguro e monitorar', 'Registrar ocorrencia e orientar avaliacao na UBS'],
      HIGH: ['Avisar gestao escolar', 'Entrar em contato com responsaveis', 'Encaminhar para UPA/Hospital ou UBS conforme gravidade'],
      CRITICAL: ['Acionar 192 imediatamente', 'Nao deixar a pessoa sozinha', 'Manter suporte basico ate chegada da emergencia'],
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
      content: 'Emergencia medica identificada. Priorize protecao e acionamento rapido da equipe.',
      riskSignals: ['inconsciencia', 'dificuldade_respiratoria_grave'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Mantenha a pessoa em local seguro, afaste curiosos e acione a gestao escolar.',
      riskSignals: ['inconsciencia', 'dor_intensa_persistente'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'Ha inconsciencia ou dificuldade respiratoria grave neste momento?',
      actions: [
        { label: 'Sim', next: 'outcome_urgencia_imediata' },
        { label: 'Nao', next: 'step_4' },
      ],
      riskSignals: ['inconsciencia', 'dificuldade_respiratoria_grave'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Ha sinais de agravamento rapido (dor intensa persistente, vomitos repetidos, fraqueza acentuada)?',
      actions: [
        { label: 'Sim', next: 'outcome_encaminhamento_rapido' },
        { label: 'Nao', next: 'outcome_observacao_orientada' },
      ],
      riskSignals: ['dor_intensa_persistente', 'sinais_desidratacao_importante'],
    },
  ],
  outcomes: [
    {
      id: 'outcome_urgencia_imediata',
      label: 'Urgencia Medica Imediata',
      description: 'Risco critico com necessidade de atendimento de emergencia sem atraso.',
      actions: [
        'Acionar 192 imediatamente',
        'Avisar a gestao escolar e os responsaveis',
        'Nao deixar a pessoa sozinha ate chegada da equipe de urgencia',
        'Registrar formalmente horario e medidas adotadas',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['UPA_HOSPITAL'],
      flags: ['call_192', 'notify_management', 'notify_guardians', 'do_not_leave_alone', 'document_formal'],
    },
    {
      id: 'outcome_encaminhamento_rapido',
      label: 'Encaminhamento Rapido de Saude',
      description: 'Risco alto sem colapso imediato, com necessidade de avaliacao externa no mesmo turno.',
      actions: [
        'Avisar a gestao escolar',
        'Entrar em contato com os responsaveis',
        'Encaminhar para UPA/Hospital ou UBS de referencia conforme orientacao',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['UPA_HOSPITAL', 'UBS'],
      flags: ['notify_management', 'notify_guardians', 'document_formal'],
    },
    {
      id: 'outcome_observacao_orientada',
      label: 'Observacao com Orientacao',
      description: 'Sem sinais graves no momento, mantendo acompanhamento e orientacao para familia.',
      actions: [
        'Manter observacao ate estabilidade',
        'Registrar ocorrencia no acompanhamento escolar',
        'Orientar avaliacao na UBS de referencia',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['UBS'],
      flags: ['document_formal', 'notify_guardians'],
    },
  ],
};
