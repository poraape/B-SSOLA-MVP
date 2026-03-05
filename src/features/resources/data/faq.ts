import type { FAQItem } from '../types/faq.types';

export const faqData: FAQItem[] = [
  {
    id: 'uso-app-001',
    category: 'Uso do App',
    question: 'Como funciona o Atendimento Guiado?',
    answer:
      'O Atendimento Guiado (Decisor) é uma ferramenta interativa que faz perguntas simples sobre a situação observada. Com base nas suas respostas, o sistema indica o nível de risco e as ações imediatas que devem ser tomadas conforme o protocolo institucional.',
    relatedLinks: [
      { text: 'Acessar simulador de casos', href: '/resources/simulator', type: 'internal' },
      { text: 'Ver glossário de termos', href: '/resources/glossary', type: 'internal' },
    ],
    tags: ['decisor', 'triagem', 'protocolo'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'uso-app-002',
    category: 'Uso do App',
    question: 'Como utilizar a busca global?',
    answer:
      'Você pode acessar a busca clicando no botão "Busca" no menu superior ou usando o atalho Ctrl+K (ou Cmd+K no Mac). Digite palavras-chave como "bullying", "febre" ou "conselho tutelar" para encontrar rapidamente fluxos, contatos ou termos do glossário.',
    tags: ['busca', 'navegação', 'atalho'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'uso-app-003',
    category: 'Uso do App',
    question: 'Como os resultados do Decisor se conectam com a Rede de Apoio?',
    answer:
      'Após concluir uma triagem no Decisor, o sistema sugere automaticamente os contatos da Rede de Apoio mais adequados para o nível de risco identificado. Você pode acessar telefones e endereços diretamente na seção "Rede de Apoio".',
    relatedLinks: [
      { text: 'Ver Rede de Apoio completa', href: '/network', type: 'internal' },
      { text: 'Entender níveis de risco', href: '/resources/glossary', type: 'internal' },
    ],
    tags: ['decisor', 'rede', 'integração'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'uso-app-004',
    category: 'Uso do App',
    question: 'Posso compartilhar um link direto de uma pergunta do FAQ?',
    answer:
      'Sim. Ao abrir uma pergunta, a URL do navegador é atualizada automaticamente. Você pode copiar e compartilhar esse link com colegas, e eles acessarão diretamente a resposta específica.',
    tags: ['compartilhamento', 'url', 'colaboração'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'docentes-001',
    category: 'Docentes',
    question: 'Qual o papel do professor ao identificar uma situação crítica?',
    answer:
      'O papel primordial do docente é o acolhimento inicial e a proteção do estudante. O professor deve garantir que o aluno esteja em segurança e reportar imediatamente à coordenação ou direção, que seguirá com os trâmites do protocolo.',
    relatedLinks: [{ text: 'Ver protocolos de emergência', href: '/resources/simulator', type: 'internal' }],
    tags: ['acolhimento', 'emergência', 'papel'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'docentes-002',
    category: 'Docentes',
    question: 'Como alternar entre a visão de Docente e Gestão?',
    answer:
      'Na página inicial, você encontrará um seletor no topo da seção principal que permite alternar entre os perfis. Isso ajusta algumas orientações e prioridades de visualização conforme a sua função na escola.',
    tags: ['perfil', 'navegação', 'personalização'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'docentes-003',
    category: 'Docentes',
    question: 'O que fazer se o estudante recusar atendimento?',
    answer:
      'Respeite a vontade do estudante, mas mantenha o acolhimento. Informe a coordenação pedagógica sobre a recusa para que seja feito um acompanhamento discreto. Em casos de risco iminente, a proteção prevalece sobre a recusa.',
    tags: ['acolhimento', 'recusa', 'protocolo'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'protocolos-001',
    category: 'Protocolos',
    question: 'O que fazer se a situação não se encaixa em nenhuma categoria?',
    answer:
      'Em caso de dúvida ou situações atípicas, priorize sempre o acolhimento e a segurança do estudante. Entre em contato direto com a coordenação pedagógica para uma avaliação conjunta do caso.',
    tags: ['casos-atipicos', 'duvida', 'acolhimento'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'protocolos-002',
    category: 'Protocolos',
    question: 'As informações registradas no app são salvas?',
    answer:
      'Não. Para garantir a privacidade e o sigilo absoluto, este webapp não armazena dados de atendimentos ou nomes de estudantes. Ele serve exclusivamente como um guia de consulta e orientação.',
    tags: ['privacidade', 'sigilo', 'lgpd'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'protocolos-003',
    category: 'Protocolos',
    question: 'Quando devo acionar o Conselho Tutelar?',
    answer:
      'O Conselho Tutelar deve ser acionado em casos de suspeita de negligência, violência física/psicológica, abuso sexual ou situações onde a família não garante direitos básicos da criança/adolescente. A coordenação deve mediar o contato.',
    relatedLinks: [{ text: 'Ver contatos da Rede de Apoio', href: '/network', type: 'internal' }],
    tags: ['conselho-tutelar', 'escalação', 'violência'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'protocolos-004',
    category: 'Protocolos',
    question: 'Como registrar formalmente um atendimento realizado?',
    answer:
      'O registro formal deve ser feito nos sistemas oficiais da sua instituição (livro de ocorrências, sistema de gestão escolar). O Protocolo Bússola é apenas uma ferramenta de orientação, não substitui registros oficiais.',
    tags: ['registro', 'documentação', 'oficial'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'rede-apoio-001',
    category: 'Rede de Apoio',
    question: 'Quais serviços compõem a Rede de Apoio?',
    answer:
      'A Rede de Apoio inclui: Conselho Tutelar, CRAS/CREAS, UBS/CAPS, Delegacias especializadas (Mulher, Criança), Defensoria Pública, Ministério Público, e serviços voluntários locais. Cada caso requer articulação específica.',
    relatedLinks: [{ text: 'Ver lista completa de contatos', href: '/network', type: 'internal' }],
    tags: ['rede', 'serviços', 'contatos'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'rede-apoio-002',
    category: 'Rede de Apoio',
    question: 'Como saber qual serviço acionar primeiro?',
    answer:
      'O Decisor indica automaticamente a ordem de acionamento conforme o risco. Em geral: emergências médicas -> SAMU/UBS; violência iminente -> Polícia; vulnerabilidade social -> CRAS; violação de direitos -> Conselho Tutelar.',
    relatedLinks: [{ text: 'Simular casos reais', href: '/resources/simulator', type: 'internal' }],
    tags: ['triagem', 'priorização', 'fluxo'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'rede-apoio-003',
    category: 'Rede de Apoio',
    question: 'O que fazer se um serviço da rede não responder?',
    answer:
      'Documente a tentativa de contato (data, horário, meio). Tente canais alternativos (telefone fixo, WhatsApp institucional). Se persistir, informe a direção para acionamento via ofício ou comunicação oficial.',
    tags: ['contingência', 'comunicação', 'documentação'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'rede-apoio-004',
    category: 'Rede de Apoio',
    question: 'Posso atualizar os contatos da Rede de Apoio?',
    answer:
      'Apenas a gestão escolar pode solicitar atualizações de contatos. Entre em contato com a coordenação pedagógica informando o serviço desatualizado e os dados corretos para encaminhamento à equipe técnica.',
    tags: ['atualização', 'gestão', 'manutenção'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'troubleshooting-001',
    category: 'Troubleshooting',
    question: 'O aplicativo não está carregando. O que fazer?',
    answer:
      'Primeiro, verifique sua conexão com a internet. Se estiver offline, o app deve funcionar normalmente (é um PWA). Tente limpar o cache do navegador (Ctrl+Shift+Delete) ou acessar em modo anônimo. Persiste? Reporte o bug.',
    relatedLinks: [
      {
        text: 'Reportar problema técnico',
        href: 'mailto:suporte@bussola.edu.br',
        type: 'external',
      },
    ],
    tags: ['bug', 'cache', 'offline'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'troubleshooting-002',
    category: 'Troubleshooting',
    question: 'Um botão ou link não está respondendo ao clique',
    answer:
      'Recarregue a página (F5 ou Ctrl+R). Se o problema persistir, teste em outro navegador (Chrome, Firefox, Edge). Alguns bloqueadores de anúncios podem interferir, tente desativá-los temporariamente.',
    tags: ['bug', 'navegador', 'compatibilidade'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'troubleshooting-003',
    category: 'Troubleshooting',
    question: 'Como reportar um erro ou sugerir melhoria?',
    answer:
      'Envie um e-mail para suporte@bussola.edu.br descrevendo o problema: qual página, o que tentou fazer, mensagem de erro (se houver) e navegador usado. Capturas de tela ajudam muito.',
    relatedLinks: [
      { text: 'Enviar e-mail de suporte', href: 'mailto:suporte@bussola.edu.br', type: 'external' },
    ],
    tags: ['suporte', 'feedback', 'bug-report'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'troubleshooting-004',
    category: 'Troubleshooting',
    question: 'Como usar o app com leitor de tela?',
    answer:
      'O Protocolo Bússola é compatível com NVDA, JAWS e VoiceOver. Use Tab para navegar entre elementos, Enter para expandir accordions e Ctrl+K para busca global. Se encontrar barreiras, reporte para melhorias.',
    tags: ['acessibilidade', 'leitor-tela', 'nvda'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'geral-001',
    category: 'Geral',
    question: 'O aplicativo funciona offline?',
    answer:
      'Sim, o Protocolo Bússola foi desenvolvido como um PWA (Progressive Web App). Uma vez acessado, as informações críticas de protocolos e contatos ficam disponíveis mesmo sem conexão com a internet.',
    tags: ['offline', 'pwa', 'conectividade'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'geral-002',
    category: 'Geral',
    question: 'Quem pode acessar o Protocolo Bússola?',
    answer:
      'O aplicativo é destinado a profissionais da educação (docentes, coordenação pedagógica, direção escolar). Não é voltado para estudantes ou responsáveis. O acesso é livre, sem necessidade de login.',
    tags: ['acesso', 'público-alvo', 'permissões'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'geral-003',
    category: 'Geral',
    question: 'Com que frequência o conteúdo é atualizado?',
    answer:
      'Os protocolos são revisados semestralmente pela equipe pedagógica. Contatos da Rede de Apoio são validados trimestralmente. Melhorias técnicas e correções ocorrem continuamente. Sugestões de conteúdo são bem-vindas.',
    tags: ['atualização', 'revisão', 'manutenção'],
    lastUpdated: '2026-03-04',
  },
];

export function searchFAQ(query: string, category?: string): FAQItem[] {
  const lowerQuery = query.toLowerCase();
  return faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(lowerQuery) ||
      item.answer.toLowerCase().includes(lowerQuery) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery));
    const matchesCategory = !category || category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });
}

export const FAQ_CATEGORIES = [
  'all',
  'Geral',
  'Uso do App',
  'Protocolos',
  'Docentes',
  'Rede de Apoio',
  'Troubleshooting',
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number];
