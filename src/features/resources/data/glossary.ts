export interface GlossaryItem {
  term: string;
  definition: string;
  category: 'Protocolo' | 'Legal' | 'Rede de Proteção' | 'Gírias Estudantis' | 'Saúde';
  context?: string;
}

export const glossaryData: GlossaryItem[] = [
  // Protocolo
  {
    term: 'Acolhimento Inicial',
    definition: 'Primeira escuta do estudante em situação de crise, focada na estabilização emocional e segurança, sem caráter investigativo.',
    category: 'Protocolo'
  },
  {
    term: 'Fluxo de Encaminhamento',
    definition: 'Sequência padronizada de ações que a escola deve seguir ao identificar uma demanda específica (saúde, violência, etc).',
    category: 'Protocolo'
  },
  {
    term: 'Registro de Ocorrência',
    definition: 'Documentação formal e sigilosa de fatos observados ou relatados, essencial para a memória institucional e segurança jurídica.',
    category: 'Protocolo'
  },
  
  // Legal
  {
    term: 'ECA (Art. 13)',
    definition: 'Artigo do Estatuto da Criança e do Adolescente que obriga a comunicação de casos de suspeita ou confirmação de maus-tratos ao Conselho Tutelar.',
    category: 'Legal'
  },
  {
    term: 'Notificação Compulsória',
    definition: 'Dever legal de comunicar autoridades sobre agravos à saúde ou situações de violência previstos em lei.',
    category: 'Legal'
  },
  {
    term: 'LGPD na Escola',
    definition: 'Lei Geral de Proteção de Dados aplicada ao contexto escolar, garantindo o sigilo de informações sensíveis dos estudantes.',
    category: 'Legal'
  },

  // Rede de Proteção
  {
    term: 'Conselho Tutelar (CT)',
    definition: 'Órgão encarregado pela sociedade de zelar pelo cumprimento dos direitos da criança e do adolescente.',
    category: 'Rede de Proteção'
  },
  {
    term: 'CRAS / CREAS',
    definition: 'Centros de Referência de Assistência Social. O CRAS foca na prevenção; o CREAS atende casos onde já houve violação de direitos.',
    category: 'Rede de Proteção'
  },
  {
    term: 'CAPS i',
    definition: 'Centro de Atenção Psicossocial Infanto-Juvenil. Serviço de saúde mental para crianças e adolescentes com transtornos graves.',
    category: 'Rede de Proteção'
  },

  // Gírias Estudantis (Contextualizadas para Educadores)
  {
    term: 'Flopar',
    definition: 'Fracassar em algo ou não ter o engajamento esperado. No contexto escolar, pode referir-se a uma atividade ou evento.',
    category: 'Gírias Estudantis',
    context: 'Importante para entender o nível de frustração ou desinteresse do aluno.'
  },
  {
    term: 'Gatilho',
    definition: 'Estímulo que desencadeia uma forte reação emocional ou recordação traumática.',
    category: 'Gírias Estudantis',
    context: 'Termo comum entre jovens para descrever desconforto psicológico imediato.'
  },
  {
    term: 'Mitar',
    definition: 'Fazer algo extraordinário ou ganhar uma discussão de forma impactante.',
    category: 'Gírias Estudantis'
  },
  {
    term: 'Cringe',
    definition: 'Algo vergonhoso ou embaraçoso. Frequentemente usado para descrever comportamentos de adultos ou gerações anteriores.',
    category: 'Gírias Estudantis'
  },
  {
    term: 'Explanar',
    definition: 'Contar um segredo ou expor alguém publicamente (muitas vezes nas redes sociais).',
    category: 'Gírias Estudantis',
    context: 'Pode ser o início de um caso de cyberbullying ou conflito.'
  },

  // Saúde
  {
    term: 'Ideação Autolesiva',
    definition: 'Pensamentos ou planos de causar dano físico a si mesmo, com ou sem intenção suicida.',
    category: 'Saúde'
  },
  {
    term: 'Crise de Ansiedade',
    definition: 'Episódio súbito de medo intenso acompanhado de sintomas físicos (taquicardia, falta de ar, tremores).',
    category: 'Saúde'
  }
];
