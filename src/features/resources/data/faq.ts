import type { FAQItem } from '../types/faq.types';

export const faqData: FAQItem[] = [
  {
    id: 'uso-app-001',
    category: 'Uso do App',
    question: 'Como funciona o Atendimento Guiado?',
    answer:
      'O Atendimento Guiado (Decisor) é uma ferramenta interativa que faz perguntas simples sobre a situação observada. Com base nas suas respostas, o sistema indica o nível de risco e as ações imediatas que devem ser tomadas conforme o protocolo institucional.',
    relatedLinks: [
      { text: 'Acessar simulador de casos', href: '/recursos?tab=simulator', type: 'internal' },
      { text: 'Ver glossário de termos', href: '/recursos?tab=glossary', type: 'internal' },
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
      { text: 'Ver Rede de Apoio completa', href: '/rede', type: 'internal' },
      { text: 'Entender níveis de risco', href: '/recursos?tab=glossary', type: 'internal' },
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
    relatedLinks: [{ text: 'Ver protocolos de emergência', href: '/recursos?tab=simulator', type: 'internal' }],
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
    relatedLinks: [{ text: 'Ver contatos da Rede de Apoio', href: '/rede', type: 'internal' }],
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
    relatedLinks: [{ text: 'Ver lista completa de contatos', href: '/rede', type: 'internal' }],
    tags: ['rede', 'serviços', 'contatos'],
    lastUpdated: '2026-03-04',
  },
  {
    id: 'rede-apoio-002',
    category: 'Rede de Apoio',
    question: 'Como saber qual serviço acionar primeiro?',
    answer:
      'O Decisor indica automaticamente a ordem de acionamento conforme o risco. Em geral: emergências médicas -> SAMU/UBS; violência iminente -> Polícia; vulnerabilidade social -> CRAS; violação de direitos -> Conselho Tutelar.',
    relatedLinks: [{ text: 'Simular casos reais', href: '/recursos?tab=simulator', type: 'internal' }],
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

  {
    id: 'pos-triagem-001',
    category: 'Pós-Triagem e Resultados',
    question: 'Recebi um resultado de risco "alto". O que isso significa na prática?',
    answer: `Os níveis de risco indicam a **urgência do encaminhamento**:

- **Baixo**: Situação sob controle, monitoramento preventivo suficiente
- **Moderado**: Atenção necessária, encaminhar em até 7 dias úteis
- **Alto**: Risco iminente, encaminhar em até 24-48h
- **Crítico**: Emergência, acionar imediatamente (SAMU 192, Polícia 190, Bombeiros 193)

**Exemplo prático:**
"Risco alto - Suspeita de violência física" → Acionar Conselho Tutelar + CREAS no mesmo dia, documentar horário do contato.

**Importante:** O nível é uma recomendação técnica. Use seu julgamento profissional para casos limítrofes e sempre priorize a segurança do estudante.`,
    relatedLinks: [
      { text: 'Ver serviços na rede', href: '/rede', type: 'internal' },
      { text: 'Protocolos de encaminhamento', href: '/recursos?tab=simulator', type: 'internal' },
    ],
    tags: ['risco', 'alto', 'crítico', 'urgência', 'resultado', 'triagem'],
    lastUpdated: '2026-03-05',
  },
  {
    id: 'pos-triagem-002',
    category: 'Pós-Triagem e Resultados',
    question: 'O resultado indica "encaminhamento imediato". Quais são os próximos passos?',
    answer: `Siga este fluxo prioritário:

1. **Acionar o serviço indicado** (consulte Rede de Apoio para contatos atualizados)
2. **Documentar data/hora** do encaminhamento em registro oficial da escola
3. **Informar a família** (se for seguro fazer isso - em casos de violência intrafamiliar, avaliar com direção)
4. **Notificar direção escolar** imediatamente via canal interno

**Prazos esperados de resposta:**
- Emergencial (risco crítico): 24-48h
- Alta prioridade: 7 dias úteis
- Moderada: 15 dias úteis

Se o prazo for ultrapassado: religar para o serviço, escalar para gestor, registrar nova tentativa em ata.`,
    relatedLinks: [
      { text: 'Contatos da Rede de Apoio', href: '/rede', type: 'internal' },
      { text: 'Ver glossário de termos', href: '/recursos?tab=glossary', type: 'internal' },
    ],
    tags: ['encaminhamento', 'imediato', 'fluxo', 'prazo', 'documentação'],
    lastUpdated: '2026-03-05',
  },
  {
    id: 'pos-triagem-003',
    category: 'Pós-Triagem e Resultados',
    question: 'Quando sou obrigado(a) a notificar o Conselho Tutelar?',
    answer: `Segundo o **Art. 13 do ECA (Estatuto da Criança e Adolescente)**, a notificação é **obrigatória** em casos de:

1. Suspeita ou confirmação de **maus-tratos** (físicos, psicológicos, negligência)
2. Suspeita de **abuso sexual**
3. Faltas escolares superiores a **30% do permitido** (≈15 dias em 200 letivos)
4. **Evasão escolar** após esgotados recursos pedagógicos
5. Qualquer situação de **violação de direitos fundamentais**

**Prazo:** Imediato (boa prática = até 24h)

**Importante:** A notificação é dever institucional intransferível. Não fazer pode configurar infração administrativa (Art. 245 ECA). Sempre documente data/hora do contato.`,
    relatedLinks: [
      { text: 'Contato do Conselho Tutelar', href: '/rede', type: 'internal' },
      {
        text: 'Texto completo do ECA Art. 13',
        href: 'https://www.planalto.gov.br/ccivil_03/leis/l8069.htm',
        type: 'external',
      },
    ],
    tags: ['conselho-tutelar', 'eca', 'notificação', 'obrigatória', 'maus-tratos', 'legal'],
    lastUpdated: '2026-03-05',
  },
  {
    id: 'pos-triagem-004',
    category: 'Pós-Triagem e Resultados',
    question: 'Posso compartilhar o resultado da triagem com outros professores?',
    answer: `**Não, exceto se houver necessidade pedagógica comprovada.**

Segundo a **LGPD (Lei Geral de Proteção de Dados) Art. 11 e 14**, dados sobre saúde/vulnerabilidade de crianças são **dados sensíveis** e exigem consentimento específico dos responsáveis.

**Princípio "Need to Know":**
✅ **PODE compartilhar com:** Direção, orientação pedagógica, professor regente, psicólogo escolar
❌ **NÃO PODE compartilhar com:** Colegas não envolvidos no caso, outros pais, grupos de WhatsApp, sem base legal

**Exceção:** Situações de **risco iminente** onde compartilhar informação é necessário para proteção do estudante (ex: alerta de crise suicida para professor de plantão).

**Importante:** Sempre use canais oficiais e seguros. Evite conversas informais sobre casos sensíveis.`,
    relatedLinks: [
      {
        text: 'LGPD nas escolas - guia prático',
        href: 'https://www.gov.br/mec/pt-br/acesso-a-informacao/lgpd',
        type: 'external',
      },
    ],
    tags: ['lgpd', 'sigilo', 'privacidade', 'compartilhamento', 'dados-sensíveis', 'consentimento'],
    lastUpdated: '2026-03-05',
  },
  {
    id: 'pos-triagem-005',
    category: 'Pós-Triagem e Resultados',
    question: 'Como conversar com a família sobre o resultado da triagem?',
    answer: `Utilize princípios de **Comunicação Não-Violenta (CNV)** para criar parceria:

**1. Prepare o contexto:**
- Escolha ambiente privado e acolhedor
- Evite tom acusatório ou alarmista
- Tenha dados objetivos em mãos (não apenas impressões)

**2. Durante a conversa:**
- **Evite:** "Seu filho está com problema grave", "Vocês precisam fazer algo urgente"
- **Prefira:** "Observamos [situação concreta] e queremos construir juntos um plano de apoio"
- Explique o resultado **sem jargão técnico** (substitua "risco moderado" por "necessita atenção")

**3. Foque em ações concretas:**
- Liste serviços disponíveis (CRAS, UBS, psicólogo)
- **Ofereça acompanhar** a família no primeiro contato
- Agende retorno para acompanhamento em 15 dias

**Importante:** Se houver suspeita de violência intrafamiliar, NÃO exponha o caso diretamente. Consulte direção antes.`,
    relatedLinks: [
      { text: 'Ver serviços de apoio disponíveis', href: '/rede', type: 'internal' },
    ],
    tags: ['família', 'comunicação', 'cnv', 'reunião', 'responsáveis', 'diálogo'],
    lastUpdated: '2026-03-05',
  },
  {
    id: 'pos-triagem-006',
    category: 'Pós-Triagem e Resultados',
    question: 'Encaminhei o caso há 2 semanas e não tive retorno. O que fazer?',
    answer: `**Prazos esperados por categoria:**

- **Emergencial (risco crítico):** 24-48h
- **Alta prioridade:** 7 dias úteis
- **Moderada prioridade:** 15 dias úteis
- **Baixa (monitoramento):** 30 dias

**Se o prazo for ultrapassado:**

1. **Religar para o serviço** (use canais alternativos: WhatsApp institucional, e-mail)
2. **Escalar para gestor** da rede (ex: coordenador CREAS, supervisor CT)
3. **Registrar nova tentativa** em ata/sistema oficial com data/hora
4. **Informar direção escolar** para possível ofício formal
5. Se persistir >30 dias: considerar notificar Ministério Público (casos graves)

**Documentação é essencial:** Guarde protocolos, números de ofício, nomes de quem atendeu.`,
    relatedLinks: [
      { text: 'Contatos completos da Rede', href: '/rede', type: 'internal' },
    ],
    tags: ['prazo', 'retorno', 'sem-resposta', 'escalação', 'documentação', 'contingência'],
    lastUpdated: '2026-03-05',
  },
  {
    id: 'pos-triagem-007',
    category: 'Pós-Triagem e Resultados',
    question: 'O resultado foi "risco baixo, monitorar". Quais ações tomar?',
    answer: `**Monitoramento ativo ≠ não fazer nada.** O acompanhamento preventivo é essencial.

**Plano de Monitoramento (Template):**

1. **Definir indicadores** (ex: frequência, participação em aula, interação social)
2. **Designar responsável** (professor regente ou orientação)
3. **Periodicidade:** Reavaliação a cada **30 dias**
4. **Registro:** Anotar evolução em sistema oficial ou caderno de acompanhamento

**Ações concretas:**
- Check-in semanal informal com estudante ("Como você está?")
- Observar mudanças de comportamento
- Manter diálogo aberto com família (contato mensal)
- Se houver piora: reavaliar risco e intensificar ações

**Importante:** Risco baixo hoje pode evoluir. Monitoramento é proteção proativa.`,
    relatedLinks: [
      { text: 'Simular casos de monitoramento', href: '/recursos?tab=simulator', type: 'internal' },
      { text: 'Glossário de termos', href: '/recursos?tab=glossary', type: 'internal' },
    ],
    tags: ['risco-baixo', 'monitoramento', 'acompanhamento', 'preventivo', 'plano', 'follow-up'],
    lastUpdated: '2026-03-05',
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
  'Pós-Triagem e Resultados',
  'Uso do App',
  'Protocolos',
  'Docentes',
  'Rede de Apoio',
  'Troubleshooting',
] as const;

export type FAQCategory = (typeof FAQ_CATEGORIES)[number];
