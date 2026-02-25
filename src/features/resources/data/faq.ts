export interface FAQItem {
  question: string;
  answer: string;
  category: 'Geral' | 'Uso do App' | 'Protocolos' | 'Docentes';
}

export const faqData: FAQItem[] = [
  {
    category: 'Uso do App',
    question: 'Como funciona o Atendimento Guiado?',
    answer: 'O Atendimento Guiado (Decisor) é uma ferramenta interativa que faz perguntas simples sobre a situação observada. Com base nas suas respostas, o sistema indica o nível de risco e as ações imediatas que devem ser tomadas conforme o protocolo institucional.'
  },
  {
    category: 'Uso do App',
    question: 'Como utilizar a busca global?',
    answer: 'Você pode acessar a busca clicando no botão "Busca" no menu superior ou usando o atalho Ctrl+K (ou Cmd+K). Digite palavras-chave como "bullying", "febre" ou "conselho tutelar" para encontrar rapidamente fluxos, contatos ou termos do glossário.'
  },
  {
    category: 'Docentes',
    question: 'Qual o papel do professor ao identificar uma situação crítica?',
    answer: 'O papel primordial do docente é o acolhimento inicial e a proteção do estudante. O professor deve garantir que o aluno esteja em segurança e reportar imediatamente à coordenação ou direção, que seguirá com os trâmites do protocolo.'
  },
  {
    category: 'Protocolos',
    question: 'O que fazer se a situação não se encaixa em nenhuma categoria?',
    answer: 'Em caso de dúvida ou situações atípicas, priorize sempre o acolhimento e a segurança do estudante. Entre em contato direto com a coordenação pedagógica para uma avaliação conjunta do caso.'
  },
  {
    category: 'Geral',
    question: 'O aplicativo funciona offline?',
    answer: 'Sim, o Protocolo Bússola foi desenvolvido como um PWA (Progressive Web App). Uma vez acessado, as informações críticas de protocolos e contatos ficam disponíveis mesmo sem conexão com a internet.'
  },
  {
    category: 'Protocolos',
    question: 'As informações registradas no app são salvas?',
    answer: 'Não. Para garantir a privacidade e o sigilo absoluto, este webapp não armazena dados de atendimentos ou nomes de estudantes. Ele serve exclusivamente como um guia de consulta e orientação.'
  },
  {
    category: 'Docentes',
    question: 'Como alternar entre a visão de Docente e Gestão?',
    answer: 'Na página inicial, você encontrará um seletor no topo da seção principal que permite alternar entre os perfis. Isso ajusta algumas orientações e prioridades de visualização conforme a sua função na escola.'
  }
];
