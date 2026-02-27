import type { FlowSpec } from './flowSpec';

export const flow_incendio: FlowSpec = {
  meta: {
    id: 'flow_incendio',
    categoryId: 'emergencias_seguranca',
    subcategoryId: 'incendio_evacuacao',
    title: 'Incendio ou Evacuacao de Emergencia',
    description: 'Orientacoes para retirada segura da escola em caso de fogo, fumaca ou risco de explosao.',
    severity: 'CRITICAL',
    keywords: ['incendio', 'fumaca', 'evacuacao', 'seguranca coletiva'],
    status: 'EXISTING',
  },
  risk: {
    modelVersion: 'risk-heuristic-v1',
    baselineSeverity: 'CRITICAL',
    escalationRules: [
      {
        id: 'rule_fogo_ativo',
        ifAny: ['fogo_visivel', 'fumaca_intensa'],
        then: {
          riskLevel: 'CRITICAL',
          outcome: 'outcome_evacuacao_imediata',
          flags: ['call_190', 'notify_management', 'notify_guardians', 'document_formal', 'do_not_leave_alone'],
        },
        rationale: 'Fogo ou fumaca intensa representa risco imediato para toda a comunidade escolar.',
      },
      {
        id: 'rule_principio_controlado',
        ifAny: ['foco_controlado_sem_risco'],
        then: {
          riskLevel: 'HIGH',
          outcome: 'outcome_isolamento_area',
          flags: ['notify_management', 'document_formal', 'notify_guardians'],
        },
        rationale: 'Mesmo com foco inicial controlado, pode haver risco de retomada do incendio.',
      },
    ],
    protectiveFactors: ['plano_de_abandono_treinado', 'rotas_sinalizadas', 'equipe_em_pontos_estrategicos'],
    riskSignals: [
      {
        id: 'fogo_visivel',
        label: 'Fogo visivel em sala, corredor ou area comum',
        examples: ['chamas em equipamento', 'fogo em lixeira ou rede eletrica'],
        weight: 3,
      },
      {
        id: 'fumaca_intensa',
        label: 'Fumaca intensa com dificuldade para respirar',
        examples: ['odor forte de queimado', 'visibilidade muito reduzida'],
        weight: 3,
      },
      {
        id: 'foco_controlado_sem_risco',
        label: 'Principio de incendio aparentemente controlado',
        examples: ['foco pequeno apagado rapidamente'],
        weight: 2,
      },
    ],
    recommendedActionsByRisk: {
      MODERATE: ['Isolar local e reavaliar seguranca', 'Registrar ocorrencia com a gestao'],
      HIGH: ['Avisar gestao escolar', 'Interditar area afetada', 'Entrar em contato com responsaveis'],
      CRITICAL: ['Evacuacao imediata pela rota segura', 'Acionar 190 e bombeiros', 'Nao deixar estudantes sozinhos durante deslocamento'],
    },
    recommendedServiceTagsByRisk: {
      MODERATE: ['ASSISTENCIA_SOCIAL_ESCOLAR'],
      HIGH: ['DELEGACIA', 'ASSISTENCIA_SOCIAL_ESCOLAR'],
      CRITICAL: ['DELEGACIA', 'CONSELHO_TUTELAR'],
    },
  },
  steps: [
    {
      id: 'step_1',
      type: 'alert',
      content: 'Incendio ou fumaca identificado. Priorize retirada segura e organizacao da equipe.',
      riskSignals: ['fogo_visivel', 'fumaca_intensa'],
    },
    {
      id: 'step_2',
      type: 'action',
      action: 'Ative o plano de abandono e conduza a turma para ponto seguro sem correria.',
      riskSignals: ['fogo_visivel', 'fumaca_intensa'],
    },
    {
      id: 'step_3',
      type: 'question',
      question: 'Ha fogo ativo ou fumaca intensa no local?',
      actions: [
        { label: 'Sim', next: 'outcome_evacuacao_imediata' },
        { label: 'Nao, foco pequeno e controlado', next: 'outcome_isolamento_area' },
      ],
      riskSignals: ['fogo_visivel', 'fumaca_intensa', 'foco_controlado_sem_risco'],
    },
    {
      id: 'step_4',
      type: 'question',
      question: 'Todos os estudantes e profissionais foram conferidos no ponto de encontro?',
      actions: [
        { label: 'Nao', next: 'outcome_evacuacao_imediata' },
        { label: 'Sim', next: 'outcome_retorno_seguro' },
      ],
    },
  ],
  outcomes: [
    {
      id: 'outcome_evacuacao_imediata',
      label: 'Evacuacao Imediata com Acionamento Externo',
      description: 'Risco critico. Retirada imediata e acionamento dos servicos de emergencia.',
      actions: [
        'Acionar 190 e suporte de bombeiros imediatamente',
        'Avisar a gestao escolar e os responsaveis',
        'Nao deixar estudantes sozinhos durante a evacuacao',
        'Registrar formalmente horarios e medidas adotadas',
      ],
      timeline: 'Imediato',
      riskLevel: 'CRITICAL',
      serviceTags: ['DELEGACIA', 'CONSELHO_TUTELAR'],
      flags: ['call_190', 'notify_management', 'notify_guardians', 'do_not_leave_alone', 'document_formal'],
    },
    {
      id: 'outcome_isolamento_area',
      label: 'Isolamento da Area e Monitoramento',
      description: 'Risco alto. Manter area interditada e monitorar possibilidade de nova ocorrencia.',
      actions: [
        'Avisar a gestao escolar',
        'Isolar area afetada e impedir circulacao',
        'Entrar em contato com responsaveis com orientacao objetiva',
      ],
      timeline: 'Horas',
      riskLevel: 'HIGH',
      serviceTags: ['ASSISTENCIA_SOCIAL_ESCOLAR'],
      flags: ['notify_management', 'notify_guardians', 'document_formal'],
    },
    {
      id: 'outcome_retorno_seguro',
      label: 'Retorno Seguro com Registro',
      description: 'Situacao estabilizada. Retomar atividades com cuidado e acompanhamento.',
      actions: [
        'Realizar acolhimento breve com a turma',
        'Registrar a ocorrencia e orientar equipe para prevencao',
        'Monitorar qualquer sinal de inseguranca nos dias seguintes',
      ],
      timeline: 'Dias',
      riskLevel: 'MODERATE',
      serviceTags: ['ASSISTENCIA_SOCIAL_ESCOLAR'],
      flags: ['document_formal'],
    },
  ],
};
