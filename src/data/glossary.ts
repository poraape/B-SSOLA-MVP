// src/features/resources/data/glossary.ts
/**
 * B-SSOLA Glossário Completo
 * 50 termos estruturados em 9 categorias
 * Atualizado: 04/03/2026
 */

export interface GlossaryItem {
  term: string;
  definition: string;
  category: 'Protocolo' | 'Legal' | 'Rede de Proteção' | 'Gírias Estudantis' | 'Saúde' | 'Inclusão' | 'Segurança Escolar' | 'Convivência' | 'Direitos';
  context?: string;
  practicalExample?: string;
  audienceLevel: 'leigo' | 'técnico';
  regionalContext?: string;
  regionalVariations?: string[];
  relatedTerms?: string[];
  legalReference?: string;
  whoMakes?: string;
  visualAid?: string;
  signsToWatch?: string;
  location?: string;
  frequency?: string;
}

export const glossaryData: GlossaryItem[] = [
  // ========================
  // PROTOCOLO (5 termos)
  // ========================
  {
    term: 'Acolhimento Inicial (Primeira Escuta)',
    definition: 'Primeira conversa reservada com o estudante em momento de crise. O objetivo é acalmar, garantir segurança imediata e entender a situação — NÃO é interrogatório nem investigação. A escola escuta, não julga, e decide os próximos passos (acionar família, CT, CAPS, etc.).',
    category: 'Protocolo',
    context: 'Faça em local privado, com adulto de confiança do estudante se possível. Anote objetivamente no Livro de Ocorrências da escola (nunca em caderno pessoal). Não prometa sigilo absoluto: se houver risco à vida, você PRECISA acionar a rede.',
    practicalExample: 'Aluna chega chorando dizendo "quero sumir". Você: leva para sala reservada, oferece água, pergunta "você está segura em casa?" (não "o que aconteceu?"), anota resumo factual, chama responsável + CAPS se necessário.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Registro de Ocorrência', 'Conselho Tutelar (CT)', 'CAPS i'],
  },

  {
    term: 'Fluxo de Encaminhamento',
    definition: 'Passo-a-passo padronizado do que a escola deve fazer quando identifica um problema específico (ex: violência, crise de saúde mental, uso de drogas). Serve para garantir que nenhuma etapa seja esquecida e que a rede de proteção seja acionada corretamente.',
    category: 'Protocolo',
    context: 'Cada tipo de situação tem seu próprio fluxo. Exemplo básico: 1) Acolhimento → 2) Registro documentado → 3) Comunicação à família → 4) Encaminhamento para rede (CT/CREAS/CAPS/UBS) → 5) Acompanhamento.',
    practicalExample: 'Suspeita de violência doméstica: Acolhimento → Registro → NÃO chama família ainda → Aciona CT em 24h → CT avalia e decide próximos passos → Escola acompanha retorno do aluno.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Acolhimento Inicial', 'Registro de Ocorrência', 'Rede de Proteção'],
  },

  {
    term: 'Registro de Ocorrência (Livro Ata/Sistema)',
    definition: 'Anotação formal e objetiva de fatos observados ou relatados sobre um estudante. Serve como memória institucional e proteção jurídica da escola. Deve ser factual, sem julgamentos ou suposições.',
    category: 'Protocolo',
    context: 'Escreva em Livro Ata (físico com páginas numeradas) ou sistema digital da Secretaria de Educação. Guarde por no mínimo 5 anos. Use linguagem neutra: descreva comportamentos, não rotule a pessoa.',
    practicalExample: '❌ ERRADO: "João é agressivo e problemático." ✅ CERTO: "04/03/26, 14h: João arremessou cadeira na sala 12 após discussão com colega. Ninguém ferido. Acalmado pela Prof. Regina. Responsável comunicado."',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    legalReference: 'LGPD: proteja o documento em local seguro, acesso restrito à equipe gestora.',
    relatedTerms: ['LGPD na Escola', 'Acolhimento Inicial', 'ECA Art. 13'],
  },

  {
    term: 'UBS (Unidade Básica de Saúde) — Acesso e Referências',
    definition: 'Porta de entrada para saúde pública. Oferece: vacinação, atendimento a doentes crônicos, saúde mental (psicólogo), encaminhamento para especialistas e CAPS i. Na escola: quando aluno precisa de orientação médica, saúde mental ou medicação, encaminha para UBS de referência.',
    category: 'Protocolo',
    context: 'Cada bairro tem UBS de referência (próximo à escola). Leve número de telefone sempre. UBS funciona dias úteis (8h-17h, exceto feriados). Para emergências: UPA (24h) ou UPS (pronto-atendimento).',
    practicalExample: 'Aluno relata que "não dorme de noite, fica ansioso". Coordenadora: solicita UBS para avaliação psicológica. Lá, psicólogo avalia, oferece grupos de relaxamento ou refere a CAPS i se grave.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    location: 'Itaquera (ZL-SP): UBS Parque Residencial Jaguarés (11 2948-XXXX)',
    relatedTerms: ['CAPS i', 'Encaminhamento', 'Saúde Mental'],
  },

  {
    term: 'Comunicação com Responsáveis — Boas Práticas',
    definition: 'Procedimento estruturado e empático de contar aos pais/responsáveis sobre situações de risco ou mudanças no desenvolvimento do aluno. Objetivo: parceria, não culpa ou punição.',
    category: 'Protocolo',
    context: 'Não comunique por WhatsApp nem em grupo. Agende encontro privado ou ligação discreta. Comece com pontos positivos, depois situação de preocupação, ofereça solução/apoio (não ameaça). Documente encontro (dia, hora, presentes, acordos).',
    practicalExample: 'Aluno com queda de notas: "Sra. Maria, João tem sido um aluno dedicado. Últimas semanas notei dificuldade em concentração. Você notou algo em casa? Podemos fazer combinado: reforço às terças + orientação para dormir mais cedo. Vamos juntas?"',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Acolhimento Inicial', 'LGPD na Escola', 'Fluxo de Encaminhamento'],
  },

  // ========================
  // LEGAL (4 termos)
  // ========================
  {
    term: 'ECA Art. 13 — Dever de Comunicar Suspeita',
    definition: 'Lei que OBRIGA escolas, hospitais e qualquer profissional que trabalha com crianças/adolescentes a comunicar o Conselho Tutelar quando há suspeita ou confirmação de maus-tratos (violência física, sexual, psicológica, negligência, abandono).',
    category: 'Legal',
    context: 'A escola NÃO precisa ter certeza absoluta — basta a SUSPEITA com base em sinais concretos (marcas, mudança de comportamento, relato). Não comunicar pode gerar responsabilização civil e até criminal da instituição e do profissional.',
    practicalExample: 'Aluno com hematomas frequentes + medo de ir para casa + agressividade súbita = escola DEVE comunicar CT, mesmo sem "prova". CT é quem investiga. Disque 100 (anônimo) ou presencialmente no CT da região.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    legalReference: 'Lei 8.069/1990, Art. 13. Link: planalto.gov.br/ccivil_03/leis/l8069.htm',
    relatedTerms: ['Conselho Tutelar (CT)', 'Notificação Compulsória', 'Registro de Ocorrência'],
  },

  {
    term: 'Notificação Compulsória (Ficha de Notificação)',
    definition: 'Dever LEGAL de profissionais de saúde (médicos, enfermeiros, psicólogos) de informar autoridades sobre casos de violência ou doenças graves. A ESCOLA não faz a notificação diretamente, mas encaminha o caso para UBS/Hospital, que então notifica.',
    category: 'Legal',
    context: 'Diferença-chave: ECA Art. 13 = escola comunica CT. Notificação Compulsória = UBS/hospital preenche ficha e envia para Secretaria de Saúde. Escola faz a "ponte": identifica → encaminha para saúde → saúde notifica.',
    practicalExample: 'Aluno relata abuso sexual: Escola faz acolhimento + comunica CT (ECA 13) + encaminha família para UBS. Lá, profissional de saúde preenche Ficha de Notificação Compulsória ao Ministério da Saúde.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    legalReference: 'Portaria MS 1.271/2014 e Lei 10.778/2003',
    relatedTerms: ['ECA Art. 13', 'Conselho Tutelar (CT)', 'UBS (Unidade Básica de Saúde)'],
  },

  {
    term: 'LGPD na Escola (Lei Geral de Proteção de Dados)',
    definition: 'Lei que protege informações pessoais dos estudantes. Na escola: dados de saúde, notas, histórico disciplinar, fotos, endereço são SENSÍVEIS. Só podem ser acessados por quem precisa (equipe gestora) e nunca compartilhados em grupos de WhatsApp, murais públicos ou sem autorização dos responsáveis.',
    category: 'Legal',
    context: 'Violações comuns: publicar foto de aluno sem autorização, discutir caso de estudante em grupo de professores, deixar Livro Ata exposto. Penalidades: advertência, multa de até 2% do faturamento (escolas particulares), responsabilização pessoal do servidor público.',
    practicalExample: '❌ VIOLA LGPD: "Vou mandar no grupo do WhatsApp que o João tem TDAH." ✅ RESPEITA LGPD: Informa apenas professor regente e AEE, presencialmente, sem registro digital externo.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    legalReference: 'Lei 13.709/2018. Guia escolar: gov.br/lgpd',
    relatedTerms: ['Registro de Ocorrência', 'Acolhimento Inicial'],
  },

  {
    term: 'Sigilo Profissional e Exceções Legais',
    definition: 'Professores, coordenadores e psicólogos escolares têm dever de sigilo — não podem contar casos de alunos para terceiros. MAS: se houver risco de morte, abuso ou violação grave, o sigilo CEDE e você é OBRIGADO a comunicar (CT, polícia, ministério público).',
    category: 'Legal',
    context: 'Regra prática: "Sigilo sim, mas não sobre crime ou violação grave." Se aluno confessa que apanha do pai = você comunica, mesmo que tenha pedido sigilo. Se aluno confessa que "tirou nota baixa e não quer que saiba", você respeita o sigilo.',
    practicalExample: 'Aluno em particular: "Promete que não conta pra ninguém, mas meu padrasto me toca de forma estranha." Você: "Não posso prometer sigilo sobre isso — é violência. Vou conversar com coordenação e chamar sua mãe. Mas vou te proteger." Comunica CT e psicólogo escolar.',
    audienceLevel: 'técnico',
    regionalContext: 'ZL-SP',
    legalReference: 'ECA Art. 13 + Art. 56 (obrigação de notificar); CFP (Conselho Federal de Psicologia)',
    relatedTerms: ['ECA Art. 13', 'Acolhimento Inicial', 'Comunicação com Responsáveis'],
  },

  // ========================
  // REDE DE PROTEÇÃO (5 termos)
  // ========================
  {
    term: 'Conselho Tutelar (CT)',
    definition: 'Órgão público (não é polícia) responsável por garantir os direitos de crianças e adolescentes. Atua quando há violação: violência, negligência, trabalho infantil, evasão escolar. NÃO prende, NÃO multa — fiscaliza e aciona outros serviços (CREAS, Justiça, Polícia).',
    category: 'Rede de Proteção',
    context: 'Funciona em horário comercial (8h-18h, segunda a sexta) na maioria das regiões. Emergências noturnas/fim de semana: Disque 100 ou 190 (polícia). CT de Itaquera: (11) 2944-XXXX (atualizar com número real).',
    practicalExample: 'Escola suspeita de negligência (criança sempre sem uniforme, com fome, suja): comunica CT → conselheiro visita família → avalia situação → pode inscrever em programas sociais, exigir matrícula, acionar CREAS se grave.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['ECA Art. 13', 'CREAS', 'Disque 100'],
  },

  {
    term: 'CRAS e CREAS — Centros de Assistência Social',
    definition: 'Serviços públicos da Assistência Social. CRAS = prevenção, ajuda famílias em vulnerabilidade (antes do problema grave). CREAS = proteção, atende famílias onde JÁ houve violação de direitos (violência, abuso, abandono).',
    category: 'Rede de Proteção',
    context: 'Regra prática: CRAS = família precisa de apoio (Bolsa Família, cursos, cestas básicas). CREAS = família em crise grave (violência doméstica, exploração sexual, acolhimento institucional). Encaminhamento: escola oficia solicitando avaliação.',
    practicalExample: 'CRAS: Aluno falta muito porque mãe está desempregada e não tem com quem deixar irmãos menores → CRAS conecta com creche, programas de renda.\n\nCREAS: Aluno relata que apanha do padrasto → CREAS + CT atuam juntos, podem afastar agressor.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Conselho Tutelar (CT)', 'Vulnerabilidade Social'],
  },

  {
    term: 'CAPS i (Centro de Atenção Psicossocial Infantojuvenil)',
    definition: 'Serviço de saúde mental do SUS para crianças/adolescentes com transtornos psiquiátricos graves (depressão severa, esquizofrenia, bipolaridade, risco de suicídio, uso abusivo de drogas). Tem psiquiatras, psicólogos, terapeutas — atende casos que a UBS não consegue.',
    category: 'Rede de Proteção',
    context: 'NÃO é para qualquer problema emocional — CAPS i é para casos graves. Para ansiedade leve, tristeza pontual: comece pela UBS (psicólogo) ou NASF (Núcleo de Apoio à Saúde da Família). Fila de espera no CAPS i pode levar meses na ZL-SP — se for URGENTE (risco imediato), leve ao Hospital/UPA.',
    practicalExample: 'CAPS i: Aluno com automutilação frequente + ideação suicida + já tentou se matar = encaminhamento urgente.\n\nUBS: Aluno triste após perda familiar, mas sem risco imediato = acompanhamento psicológico ambulatorial.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Ideação Autolesiva', 'Crise de Ansiedade', 'UBS'],
  },

  {
    term: 'Disque 100 (Disque Direitos Humanos)',
    definition: 'Telefone gratuito e ANÔNIMO para denunciar violações de direitos humanos: violência contra criança/adolescente, idoso, pessoa com deficiência, LGBTQIA+. Funciona 24 horas, todos os dias. Não precisa se identificar.',
    category: 'Rede de Proteção',
    context: 'Escola pode usar para: denunciar caso que CT não está atendendo, situações de emergência fim de semana/noite (quando CT está fechado), orientação sobre como proceder. A ligação é encaminhada para o órgão competente (CT, Polícia, Ministério Público).',
    practicalExample: 'Sexta 20h: aluno liga para coordenadora dizendo que pai chegou bêbado e bateu na mãe. CT fechado. Coordenadora: liga 100, relata caso, eles acionam Polícia Militar + CT de plantão.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Conselho Tutelar', 'ECA Art. 13', 'Violência Doméstica'],
  },

  {
    term: 'Vulnerabilidade Social / SMARC',
    definition: 'Situação de precariedade: pobreza, falta de acesso a serviços, moradia inadequada, violência ambiental. Escola identifica alunos em vulnerabilidade e aciona rede (CRAS, assistência social, programas de renda). SMARC = Sistema de Monitoramento e Avaliação de Risco na Comunidade.',
    category: 'Rede de Proteção',
    context: 'Sinais: criança sem uniforme, material escolar, sempre com fome, relata ausência de água em casa, pais desempregados. Não é "pobreza" = culpa da família. É contexto que a escola deve ajudar a minimizar. Aluno em vulnerabilidade precisa de ACOMPANHAMENTO extra, não exclusão.',
    practicalExample: 'Aluno pede comida na escola, dorme em sala. Coordenação: inscreve em programa de alimentação escolar ampliado, comunica CRAS (que oferece cestas básicas), providencia uniforme de fundo do baú. Resultado: frequência melhora, aprendizado avança.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['CRAS e CREAS', 'Inclusão Escolar', 'Direitos da Criança'],
  },

  // ========================
  // GÍRIAS ESTUDANTIS (8 termos)
  // ========================
  {
    term: 'Deu Ruim / Flopar',
    definition: 'Quando algo não funciona como esperado ou não tem o sucesso que a pessoa queria. Na escola: trabalho que foi mal avaliado, apresentação tímida, evento com pouco público, "bombar" em prova.',
    category: 'Gírias Estudantis',
    context: 'Atenção pedagógica: aluno que usa muito essa expressão sobre si mesmo pode estar com autoestima baixa, medo de errar ou perfeccionismo tóxico. Padrão de "tudo que eu faço dá ruim" é sinal de alerta.',
    practicalExample: 'Aluno: "Minha apresentação deu ruim." Professor: em vez de corrigir a gíria, pergunte "O que você acha que poderia ter sido diferente?" — ajuda a diferenciar autocrítica saudável de autodepreciação.',
    regionalVariations: ['Deu ruim (mais comum ZL-SP, todas idades)', 'Flopar (mais TikTok/YouTube, menos falado presencialmente)'],
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Crise de Ansiedade', 'Autoestima Baixa'],
  },

  {
    term: 'Gatilho / Trigger',
    definition: 'Estímulo (imagem, som, cheiro, situação) que desperta memória ruim ou reação emocional forte, especialmente em quem viveu trauma. Popularmente: também usado para qualquer coisa que causa desconforto ("isso me dá gatilho").',
    category: 'Gírias Estudantis',
    context: 'Uso clínico (sério): vítima de abuso que tem crise ao ver cena de violência na TV. Uso coloquial (menos grave): "essa música me dá gatilho porque lembra meu ex". Na escola: se aluno diz "isso me dá gatilho", leve a sério — pergunte em particular se ele está ok, mas não force a falar.',
    practicalExample: 'Aluno pede para sair da sala durante filme com cena de violência doméstica. Professor: autoriza sem questionar na frente da turma, depois conversa em particular. Se for recorrente, sinaliza para coordenação (pode indicar vivência de trauma).',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['TEPT (Transtorno de Estresse Pós-Traumático)', 'Crise de Ansiedade', 'Acolhimento Inicial'],
  },

  {
    term: 'Cringe / Vergonha Alheia',
    definition: 'Algo muito embaraçoso ou constrangedor de ver/ouvir. Usado para descrever comportamentos considerados "fora de moda", exagerados ou "tentando demais" (especialmente de adultos ou gerações anteriores).',
    category: 'Gírias Estudantis',
    context: 'Atenção: aluno constantemente chamado de "cringe" pelos colegas pode estar sofrendo bullying disfarçado de "zoação". Comportamentos "cringe" também podem ser traço de neurodivergência (TEA, TDAH) — pessoa não percebe códigos sociais implícitos.',
    practicalExample: 'Turma ri e diz que apresentação de colega foi "cringe". Professor: não reforce o termo, redirecione "O que vocês fariam diferente?" — ensina crítica construtiva sem humilhação.',
    regionalVariations: ['Cringe (inglês, mais escrito em redes)', 'Vergonha alheia (português, mais falado)', 'Mico (termo mais antigo, ainda usado)'],
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Bullying', 'TEA', 'Convivência Escolar'],
  },

  {
    term: 'Explanar / Expor',
    definition: 'Revelar segredo de alguém ou expor a pessoa publicamente, geralmente nas redes sociais (Instagram, WhatsApp, TikTok). Pode ser desde fofoca ("explanei que ela tava ficando com o fulano") até exposição de conteúdo íntimo (nudes, mensagens privadas).',
    category: 'Gírias Estudantis',
    context: 'ATENÇÃO LEGAL: expor conteúdo íntimo de menor de idade é CRIME (ECA Art. 241-A, Lei Carolina Dieckmann 12.737/12). Mesmo entre adolescentes. Escola deve: acolher vítima, documentar, acionar família + CT + delegacia especializada (DDCA).',
    practicalExample: 'Aluna descobre que ex-namorado compartilhou foto íntima dela em grupo de WhatsApp. Escola: NÃO minimizar ("mas vocês namoravam"), NÃO investigar sozinha. Protocolo: acolhimento + registro + comunicar responsáveis + acionar DDCA (Delegacia da Criança/Adolescente) + suporte psicológico (CAPS i ou UBS).',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    legalReference: 'ECA Art. 241-A (pena: 3-6 anos de reclusão). Lei 12.737/12 (invasão de dispositivo). Marco Civil da Internet.',
    relatedTerms: ['Cyberbullying', 'Sextortion', 'LGPD na Escola', 'Conselho Tutelar'],
  },

  {
    term: 'Tá Ligado? / Cê Tá Entendendo?',
    definition: 'Pergunta de validação: "Você entendeu?", "Você concorda?", "Você está acompanhando?". Muito comum na fala cotidiana de jovens ZL-SP como marcador de confirmação de compreensão ou concordância.',
    category: 'Gírias Estudantis',
    context: 'Uso pedagógico: quando aluno diz "tá ligado", está buscando validação/confirmação. Responder com "Sim, to ligado" cria empatia. Ignorar pode parecer distante ou desrespeitoso.',
    practicalExample: 'Aluno: "Então esse lance de protocolo é pra proteger a gente, tá ligado?" Professor: "Ó, tô ligado sim. E você?" — reconhece linguagem, mantém diálogo.',
    regionalVariations: ['Tá ligado? (mais comum)', 'Cê tá entendendo?', 'Me tá acompanhando?'],
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Comunicação Escolar'],
  },

  {
    term: 'Treta / Conflito (gíria)',
    definition: 'Briga, desentendimento, situação complicada entre pessoas. "Teve uma treta entre turmas", "Entrar em treta com alguém", "Aquilo virou uma treta".',
    category: 'Gírias Estudantis',
    context: 'Na escola: "tretar" pode começar como brincadeira e escalar para violência. Sempre estar atento ao que começa como "treta" no WhatsApp pode evoluir para conflito presencial grave.',
    practicalExample: 'Dois alunos "tretando" no story do Instagram. Começa como insultos, escala para ameaças, vira briga no corredor. Intervenção precoce no digital evita violência física.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Bullying', 'Cyberbullying', 'Conflito Escolar'],
  },

  {
    term: 'Zuar / Zoação',
    definition: 'Brincar de forma que pode ser agressiva ou humilhante. "Zuar" alguém é fazer graçachinhas sobre a aparência, família, desempenho. Linha tênue entre brincadeira e bullying.',
    category: 'Gírias Estudantis',
    context: 'Diferença sutil: zoação consensual entre amigos vs. zoação que machuca. Problema: vítima às vezes fica quieta por medo de ser visto como "fresco". Educadores devem questionar "Mas fulano ria? Parecia desconfortável?".',
    practicalExample: 'Turma zua aluno por ter uniforme furado. Ele fica quieto. Aos poucos, para de participar. Coordenadora: conversa individual ("Tô notando que você se isolou"), não força confronto em turma.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Bullying', 'Respeito', 'Convivência Escolar'],
  },

  {
    term: 'Bora / Vamo?',
    definition: 'Convite para fazer algo junto. "Bora pra merenda?", "Vamo jogar bola?" Abreviatura de "Vamos" comum na fala jovem ZL-SP.',
    category: 'Gírias Estudantis',
    context: 'Uso pedagógico: aluno que convida colega = está abrindo porta para amizade/inclusão. Se aluno nunca ouve "bora" dirigido a ele, pode estar isolado/rejeitado. Observar padrões de inclusão/exclusão.',
    practicalExample: 'Aluno tímido nunca ouve "bora" dos colegas. Ficava sozinho no recreio. Professor: facilita inserção em grupo de interesse comum (jogo, futebol, desenho). Semana depois: turma convida "Bora jogar, vem com a gente!"',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Inclusão Escolar', 'Amizade', 'Convivência'],
  },

  // ========================
  // SAÚDE (6 termos)
  // ========================
  {
    term: 'Ideação Autolesiva / Pensamentos de se Machucar',
    definition: 'Quando a pessoa pensa, planeja ou tem vontade de causar dano físico a si mesma (cortes, queimaduras, socos na parede, bater a cabeça). Pode ou não ter intenção de morrer — às vezes é para "aliviar dor emocional" ou "sentir algo".',
    category: 'Saúde',
    context: 'SINAIS DE ALERTA: marcas de corte (geralmente braços, coxas, barriga), uso de manga comprida no calor, objetos cortantes no estojo, frases como "não aguento mais", "queria sumir", desenhos de sangue/morte. NÃO é frescura, NÃO é busca de atenção — é sofrimento real.',
    practicalExample: 'Aluno mostra marcas de corte. Protocolo: 1) Acolhimento sem julgamento ("Estou preocupado com você, vamos conversar?"), 2) NÃO prometer sigilo, 3) Acionar família + CAPS i urgente, 4) Se houver risco imediato (tentativa em andamento), ligar 192 (SAMU) ou levar ao hospital.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Automutilação / Cutting', 'CAPS i', 'CVV', 'Crise de Ansiedade'],
  },

  {
    term: 'Crise de Ansiedade / Ataque de Pânico',
    definition: 'Episódio súbito de medo ou desconforto intenso, com sintomas físicos: coração acelerado, falta de ar, tremores, suor frio, tontura, sensação de morte iminente. Pode durar de minutos a 1 hora. NÃO é frescura — o corpo realmente está em "modo alerta máximo".',
    category: 'Saúde',
    context: 'Diferença: Crise de ansiedade = vem crescendo (pessoa estava tensa, aí explodiu). Ataque de pânico = vem do nada, sem gatilho aparente. Na prática escolar, trate igual. Se crises são frequentes (2+ por mês), precisa acompanhamento psiquiátrico (CAPS i ou UBS).',
    practicalExample: 'DURANTE A CRISE: 1) Leve para local tranquilo, 2) Fale calmo: "Você está seguro, vai passar", 3) Respiração: inspire 4 segundos, segura 4, solta 4, 4) NÃO diga "calma" ou "relaxa" (não adianta), 5) Se não melhorar em 15min ou piorar (desmaio, dor no peito forte), chame SAMU 192.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Gatilho', 'TAG', 'CAPS i', 'Técnicas de Respiração'],
  },

  {
    term: 'TAG (Transtorno de Ansiedade Generalizada)',
    definition: 'Ansiedade excessiva e recorrente que dura mais de 6 meses. Pessoa fica "sempre tensa", preocupada com coisas do futuro, dificuldade em relaxar, insônia. Diferente de ansiedade normal — a TAG interfere em aprendizado, relacionamentos.',
    category: 'Saúde',
    context: 'Sinais escolares: aluno que sempre quer "revisar mais uma vez", não consegue parar de estudar por medo de bombar, tremendo antes de apresentações, falta de apetite. Tratamento: terapia cognitivo-comportamental + às vezes medicação (CAPS i ou psiquiatra).',
    practicalExample: 'Aluno com TAG: sempre estuda horas demais, dorme pouco, dia de prova tem taquicardia mesmo tendo estudado bem. Intervenção: psicólogo ensina técnicas de relaxamento, professor reduz pressão ("você já estudou o suficiente"), CAPS i acompanha.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Crise de Ansiedade', 'CAPS i', 'Técnicas de Respiração'],
  },

  {
    term: 'Automutilação / Cutting',
    definition: 'Comportamento repetido de provocar ferimentos no próprio corpo (cortes, queimaduras, beliscões profundos). Pessoa usa isso como "válvula de escape" — quando ansiedade/dor emocional fica insuportável, machuca-se para "sentir alívio temporário" ou "estar viva".',
    category: 'Saúde',
    context: 'NÃO é tentativa de suicídio (apesar de risco). É forma de lidar com emoção insuportável. Comum em adolescentes com: abuso, negligência, bullying, depressão. Ciclo: tensão → corte → alívio → culpa → novo corte.',
    practicalExample: 'Aluna com histórico de abuso: cortes nos braços/coxas. Protocolo: 1) Acolher sem horror ("Vejo que você está sofrendo muito"), 2) Envolver família + CAPS i urgente, 3) Psicólogo trabalha gatilhos + habilidades alternativas (desenhar com caneta vermelha, colocar gelo na pele, apertar cojim), 4) Acompanhamento contínuo.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Ideação Autolesiva', 'Crise de Ansiedade', 'CAPS i', 'TEPT'],
  },

  {
    term: 'Técnicas de Respiração / Mindfulness',
    definition: 'Práticas simples para acalmar o sistema nervoso em momentos de ansiedade, estresse ou pânico. Exemplos: respiração 4-4-4 (inhala 4, prende 4, solta 4), scanção corporal (prestar atenção em cada parte do corpo), meditação breve, ioga.',
    category: 'Saúde',
    context: 'Funcionam melhor como PREVENÇÃO (praticar todo dia) do que em emergência (crise já acontecendo). Na escola: alguns professores usam 2 min de respiração antes de prova, reduz ansiedade geral. Programas de mindfulness (yoga, meditação) mostram queda em comportamento agressivo.',
    practicalExample: 'Antes de prova: 1) Sente confortável, 2) Feche olhos, 3) Inspire pelo nariz contando 4, prenda 4 segundos, expire pela boca contando 4. Repita 5 vezes. Depois: corpo mais relaxado, mente mais clara. Rendimento melhora.',
    frequency: 'Diariamente (2-5 min) para prevenção; em momentos de crise para controle',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Crise de Ansiedade', 'TAG', 'CAPS i'],
  },

  {
    term: 'CVV (Centro de Valorização da Vida)',
    definition: 'Organização sem fins lucrativos que oferece atendimento GRATUITO 24h/dia para pessoas em crise, ideação suicida ou sofrimento emocional. Atende por telefone (188), chat no site (www.cvv.org.br) e presencialmente em várias cidades.',
    category: 'Saúde',
    context: 'Diferente de CT ou polícia — CVV é acolhedor, não judiciário. Aluno pode ligar anonimamente. Escola: tenha número do CVV colado em local visível (próximo ao de emergência). Ofereça como opção segura de buscar ajuda.',
    practicalExample: 'Aluno relata pensamentos suicidas. Coordenadora: "Você não está sozinho. Tem gente disposta a escutar: CVV liga 188 (gratuito, 24h) ou acessa CVV.org.br para chat." Aluno liga à noite, é ouvido sem julgamentos, encontra motivos para continuar.',
    frequency: 'Sempre disponível (24h/dia, 365 dias)',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP (Brasil inteiro)',
    relatedTerms: ['Ideação Autolesiva', 'CAPS i', 'Conselho Tutelar'],
  },

  // ========================
  // INCLUSÃO (8 termos)
  // ========================
  {
    term: 'PEI (Plano Educacional Individualizado)',
    definition: 'Documento que descreve as necessidades de aprendizado de um estudante com deficiência ou transtorno e qual será a estratégia personalizada da escola para ajudá-lo. Não é redução do currículo — é ADAPTAÇÃO para que ele aprenda.',
    category: 'Inclusão',
    context: 'PEI deve ser construído com: professor regente, AEE (professora de educação especial), família, pedagogo. Revisão a cada bimestre. Exemplo: aluno cego recebe livros em Braille e usa leitor de tela no computador; aluno com TDAH tem assentos preferenciais perto do professor.',
    practicalExample: 'Aluna com Síndrome de Down: PEI inclui avaliações com questões abertas (não múltipla escolha), apoio de mediador em provas, atividades de vida prática (higiene, dinheiro) + conteúdo acadêmico adaptado ao ritmo dela.',
    whoMakes: 'Equipe multidisciplinar (professor, AEE, psicólogo, pedagogo, responsáveis)',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    legalReference: 'Política Nacional de Educação Especial na Perspectiva Inclusiva (2008)',
    relatedTerms: ['AEE', 'DUA', 'TEA', 'TDAH'],
  },

  {
    term: 'AEE (Atendimento Educacional Especializado)',
    definition: 'Serviço educacional oferecido pela escola a estudantes com deficiência, transtorno global do desenvolvimento ou altas habilidades. Não substitui aula regular — é COMPLEMENTO. Acontece em sala de recursos com professor especializado.',
    category: 'Inclusão',
    context: 'Exemplos de AEE: ensino de Libras (Língua Brasileira de Sinais) para aluno surdo, Braille para cego, programas de desenvolvimento cognitivo para aluno com deficiência intelectual, enriquecimento curricular para superdotado. Frequência: 2-5x/semana, conforme necessidade.',
    practicalExample: 'Aluno com TDAH: AEE oferece técnicas de concentração, uso de agendas, quebra-cabeças para desenvolver funções executivas + orientação ao professor regente sobre como organizar aula para esse aluno.',
    location: 'Sala de Recursos (ambiente dentro ou próximo à escola com materiais adaptados)',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['PEI', 'TEA', 'TDAH', 'DUA'],
  },

  {
    term: 'DUA (Desenho Universal para Aprendizagem)',
    definition: 'Estratégia de ensino que cria aulas DESDE O INÍCIO acessíveis a TODOS, não só a alguns. Em vez de pensar "aula normal + depois adapta para deficiente", pensa-se "como fazer aula que funciona para todo mundo?".',
    category: 'Inclusão',
    context: 'Princípios DUA: 1) Múltiplas formas de apresentação (texto + imagem + áudio + vídeo), 2) Múltiplas formas de ação (escrever, desenhar, falar, construir), 3) Múltiplas formas de envolvimento (trabalho individual, dupla, grupo). Beneficia TODOS: aluno com dislexia, aluno que aprende melhor ouvindo, aluno hiperativo que precisa se mexer.',
    practicalExample: 'Aula sobre Revolução Francesa: em vez de só texto no livro, oferece documentário (auditivo-visual), infográfico (visual), dramatização (corporal), linha do tempo interativa. Aluno que só lê não funciona? Pode assistir vídeo. Aluno surdo? Tem legenda.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['AEE', 'Inclusão Escolar', 'Acessibilidade'],
  },

  {
    term: 'TEA (Transtorno do Espectro Autista) / Autismo',
    definition: 'Condição do desenvolvimento neurológico. Pessoa com TEA processa informações de forma diferente: dificuldade em comunicação social, padrões de comportamento repetitivos, sensibilidades sensoriais (sons altos demais, luzes muito brilhantes, texturas). NÃO é doença, é forma diferente de estar no mundo.',
    category: 'Inclusão',
    context: '"Espectro" significa que varia muito: alguns autistas têm fala fluente, outros não falam. Alguns têm foco intenso em interesses específicos (ex: dinossauros, meteorologia), outros precisam de mais apoio. Pode ter Deficiência Intelectual junto ou não. Uma criança autista de alta escolaridade pode estar na universidade; outro autista pode precisar AEE o tempo todo.',
    practicalExample: 'Aluno autista não consegue lidar com barulho da merenda. Estratégia: permite que ele retire da sala alguns minutos antes do recreio, come em espaço tranquilo. Não é "fraqueza", é adaptação neurológica. Avaliação: atividades visuais/estruturadas funcionam melhor que instruções apenas verbais.',
    signsToWatch: 'Evita contato visual, dificuldade de amizade, rotinas muito rígidas, fala repetitiva (eco do que ouve), reações intensas a sons/texturas, movimentos repetitivos (stimming)',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['TDAH', 'Neurodiversidade', 'DUA', 'PEI'],
  },

  {
    term: 'TDAH (Transtorno de Déficit de Atenção e Hiperatividade)',
    definition: 'Condição neurológica onde o cérebro tem dificuldade em regular atenção, controlar impulsos e gerenciar energia. NÃO é falta de vontade ("se concentrasse, conseguia"). É falta de filtro neurológico. Criança com TDAH quer prestar atenção, mas o cérebro não consegue seguir por muito tempo.',
    category: 'Inclusão',
    context: 'Tipos: Predominantemente Desatento (perde coisas, esquece recados), Predominantemente Hiperativo-Impulsivo (mexe muito, fala demais, não espera a vez), Combinado (os dois). Comum: 5-10% das crianças. Meninos diagnosticados mais, mas meninas mascararam melhor (aprendem regras sociais).',
    practicalExample: 'Aluno com TDAH Hiperativo: não consegue ficar sentado 50 min. Estratégias: permite movimentação (fica em pé, mexe com objeto na mão), intervalos de 10min para se mexer, tarefas em pequenas doses, não tarefas longas e repetitivas.',
    signsToWatch: 'Dificuldade em manter atenção, "não ouve" quando chamado (mas ouve música do lado), não consegue esperar vez, fala muito, mexe os pés/mãos constantemente, "sempre esquece" tarefas',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['TEA', 'AEE', 'PEI', 'Transtorno de Aprendizagem'],
  },

  {
    term: 'Dislexia / Transtorno de Aprendizagem',
    definition: 'Dificuldade específica do cérebro em processar linguagem escrita (palavras parecem embaralhadas, inversas, falta letras). NÃO é preguiça, má vontade ou falta de inteligência. Pessoa com dislexia pode ser muito inteligente, mas leitura é LENTA e com erros.',
    category: 'Inclusão',
    context: 'Tipos: Dislexia (leitura), Disgrafia (escrita), Discalculia (contas matemáticas), Dispraxia (coordenação motora). Cérebro dislexo frequentemente é criativo, bom em resolução de problemas, pensamento 3D. Estratégias: fonte maior, espaçamento generoso, background colorido (não branco puro), audiolivros, programas de text-to-speech.',
    practicalExample: 'Aluno dislexo: ler uma página leva 3x mais tempo que colega. Adaptações: prova com tempo estendido (1.5x-2x), ou oral em vez de escrita, livros digitais com leitor de tela. NÃO é "facilitação" — é equiparação de oportunidade.',
    signsToWatch: 'Troca letras ao escrever (b-d, p-b), dificuldade em soletrar, leitura muito lenta/com erros, pode falar bem mas escrever mal, dificuldade em rimas/sons de letras',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['AEE', 'PEI', 'Avaliação Psicoeducacional', 'DUA'],
  },

  {
    term: 'Deficiência Intelectual (DI / Síndrome de Down)',
    definition: 'Limitações no funcionamento intelectual (raciocínio, aprendizado, compreensão) e nas habilidades de vida prática (cuidados pessoais, comunicação, segurança). Pode ser leve, moderada ou severa. Origem: pode ser genética (Síndrome de Down), prematuridade, falta de oxigênio, infecções gestacionais.',
    category: 'Inclusão',
    context: 'Síndrome de Down é UM TIPO de DI (tem marcadores genéticos específicos — cromossomo 21 extra). Nem toda DI é Down. Pessoa com DI aprende, mas pode levar mais tempo. Foco: ensinar habilidades práticas (higiene, segurança, dinheiro, trabalho) + conteúdo acadêmico adaptado.',
    practicalExample: 'Aluno com Síndrome de Down, 14 anos: aprende a ler palavras simples, operações básicas (+/-), higiene pessoal independentemente. Objetivo escolar: preparação para vida funcional (trabalho supervisionado, morar semi-independentemente com apoio).',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['PEI', 'AEE', 'Inclusão Escolar', 'Convivência'],
  },

  {
    term: 'Neurodiversidade (conceito guarda-chuva)',
    definition: 'Ideia de que cérebros neurodivergentes (autista, TDAH, dislexo, bipolar) não são "defeituosos" — são DIFERENTES. Cada tipo de cérebro tem pontos fortes e desafios. Sociedade ganha quando aceita diversidade neurológica.',
    category: 'Inclusão',
    context: 'Movimento: em vez de "curar", "corrigir", "normalizar" — criar ambientes que funcionem para TODOS os tipos de cérebro. Steve Jobs (autismo possível), Walt Disney (possível TDAH), Albert Einstein (possível dislexia) — pessoas neurodivergentes muitas vezes são criativas, obsessivas (bom lado), pensam diferente.',
    practicalExample: 'Aluno TDAH: em vez de "senta quieto", reconhece que movimento = concentração para ele. Oferece cadeira de movimento, permissão de ficar em pé. Aluno autista: em vez de "olha nos olhos", aceita que ele ouve melhor quando NÃO faz contato visual.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['TEA', 'TDAH', 'Inclusão Escolar', 'Diversidade'],
  },

  // ========================
  // SEGURANÇA ESCOLAR (6 termos)
  // ========================
  {
    term: 'Protocolo de Segurança / Plano de Contingência',
    definition: 'Conjunto de procedimentos que a escola prepara ANTES de uma emergência para saber exatamente o que fazer (quem avisa, pra onde vão alunos, como se comunica com família). Exemplos: incêndio, terremoto, tiro próximo, enchente, invasão.',
    category: 'Segurança Escolar',
    context: 'Cada escola deve ter: mapa de rotas de fuga, pontos de encontro, lista de telefones de emergência, designação de responsabilidades (quem lidera, quem coordena evacuação, quem fala com imprensa). Deve treinar COM alunos (exercício mínimo 1x/ano).',
    practicalExample: 'Simulado de incêndio: toque da campainha = sinal. Cada professor leva sua turma pela rota pré-definida (não elevador, próxima escada de incêndio), em fila rápida e ordenada, até ponto de encontro no pátio. Demora: máx 5 min. Todos checam presença.',
    frequency: 'Simulados mínimo 1x/ano, revisado anualmente',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP: levar em conta enchentes (região baixa), violência urbana (tiroteios próximos)',
    relatedTerms: ['Lockdown', 'Comunicação de Crise', 'Brigada de Incêndio'],
  },

  {
    term: 'Lockdown (Confinamento de Segurança)',
    definition: 'Procedimento de emergência: toda a escola se tranca DENTRO de salas/ambientes seguros (fecham portas, desligam luzes) para se proteger de ameaça externa (pessoa armada, confronto nas ruas próximas, invasor). NÃO é evacuação — é ficar QUIETO DENTRO até passar o perigo.',
    category: 'Segurança Escolar',
    context: 'Sinal: geralmente aviso discreto (mensagem de texto, aviso em voz baixa, ou sirene conforme protocolo). Alunos não saem da sala até sinal de "tudo bem". Treinamento regular reduz pânico em caso real. ZL-SP: episódios de tiroteios próximos às escolas — preparação é essencial.',
    practicalExample: 'Confronto entre traficantes na rua ao lado da escola. Diretor: dispara sinal de lockdown. Professores: trancam portas, apagam luzes, colocam alunos em canto seguro (fora da linha da janela), silêncio total. Polícia resolve conflito. Depois: "tudo bem", alunos retornam à aula.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Protocolo de Segurança', 'Violência Urbana', 'Comunicação de Crise'],
  },

  {
    term: 'Violência Urbana / Confrontos Comunitários',
    definition: 'Conflitos entre gangues, tráfico de drogas, confrontos policiais que acontecem nas ruas próximas à escola. Podem impactar frequência, clima emocional dos alunos, necessidade de protocolos de segurança escolar.',
    category: 'Segurança Escolar',
    context: 'Na Zona Leste: realidade frequente. Alunos podem vir de madrugadas com tiroteios perto de casa (insônia, estresse). Impacto: dificuldade de concentração, medo, comportamento de alerta elevado. Escola deve: criar espaço seguro, validar sentimentos, conectar com CAPS i se necessário.',
    practicalExample: 'Noite anterior: tiroteio de 2 horas no bairro. Alunos chegam cansados, irritáveis. Professor repara comportamento diferente. Oferece acolhimento sem forçar conversa. Coordenação: aciona CAPS i se aluno mostrar sinais de TEPT (flashbacks, tremor, retraimento extremo).',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Lockdown', 'Segurança Escolar', 'TEPT'],
  },

  {
    term: 'Brigada de Incêndio / Pessoal Responsável',
    definition: 'Grupo de funcionários e alunos treinados para orientar evacuação em caso de incêndio. Conhecem rotas de fuga, pontos de encontro, como usar extintores. Responsáveis por manter a calma e organizar movimento.',
    category: 'Segurança Escolar',
    context: 'Treinamento anual obrigatório. Devem usar coletes/fitas para identificação. Durante simulado: alunos devem reconhecer quem são e seguir instruções deles. Função: evitar pânico, garantir evacuação ordenada.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    location: 'Toda escola deve ter (Lei 10.181/2016 - Bombeiros SP)',
    relatedTerms: ['Protocolo de Segurança', 'Simulado'],
  },

  {
    term: 'Comunicação de Crise / Plano de Imprensa',
    definition: 'Procedimento pré-preparado de como a escola comunica com família, imprensa e público em caso de emergência (morte de aluno, acidente grave, tiroteio próximo, abuso). Garante informação correta, evita boatos, protege privacidade das vítimas.',
    category: 'Segurança Escolar',
    context: 'Designar porta-voz (geralmente diretor + assessor de imprensa). Mensagem única e consistente. Não especular. Proteger identidades de menores. Comunicação ágil reduz ansiedade da comunidade.',
    practicalExample: 'Aluno sofre acidente na educação física. Protocolo: 1) Atendimento emergencial, 2) Comunicação à família, 3) Comunicado breve à comunidade escolar (sem nomes), 4) Apoio psicológico aos colegas (CAPS i), 5) Só diretor/assessor fala com imprensa.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Protocolo de Segurança', 'LGPD na Escola'],
  },

  {
    term: 'Rota de Fuga / Pontos de Encontro',
    definition: 'Caminho pré-planejado para evacuar a escola (escadas, portas, janelas de emergência) e local seguro fora do prédio onde todos se reúnem (pátio, parque próximo) para confirmar presença.',
    category: 'Segurança Escolar',
    context: 'Mapas devem estar colados em cada sala. Alunos devem conhecer pelo menos 2 rotas. Ponto de encontro deve estar longe de perigos (não próximo a avenida, de gás/eletricidade). Atualizar anualmente.',
    practicalExample: 'Simulado de evacuation: "Saída pela escada emergencial A, descemos até pátio, reunimos no canto sudeste perto da quadra (longe da rua)". Todos chegam em <5 min, professor checa presenças e relata ao comando central.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Protocolo de Segurança', 'Brigada de Incêndio', 'Simulado'],
  },

  // ========================
  // CONVIVÊNCIA (4 termos)
  // ========================
  {
    term: 'Bullying / Assédio Moral entre Pares',
    definition: 'Violência repetida e intencional de um ou mais alunos contra outro, com desequilíbrio de poder. Pode ser físico (bater, agredir), verbal (insultos, gozações), social (excluir, espalhar boatos) ou digital (cyberbullying).',
    category: 'Convivência',
    context: 'Diferença importante: zoação única ≠ bullying. Bullying é PADRÃO, repetido, em desequilíbrio de poder. Vítima não consegue se defender sozinha. Impacto: queda de desempenho, depressão, absentismo, ideação suicida. Pais reportam: "Meu filho não quer mais ir à escola".',
    practicalExample: 'Aluno novo, menor que colegas, com sotaque nordestino. Diariamente: gozam na hora do intervalo, excluem de grupos, dizem "pensa com o sotaque". Não é brincadeira — é padrão. Protocolo: acolher vítima, documentar (câmeras, testemunhas), acionar agressores/pais, mediação, se necessário: encaminhar para justiça (crime conforme Lei 13.185/15).',
    legalReference: 'Lei 13.185/2015 (Lei Nacional de Combate ao Bullying)',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Cyberbullying', 'Convivência Escolar', 'Mediação de Conflitos'],
  },

  {
    term: 'Cyberbullying / Assédio Digital',
    definition: 'Bullying que acontece nas redes sociais, WhatsApp, TikTok, etc. Pode incluir: insultos em comentários, exposição de fotos embaraçosas, criação de perfis fake para ridicularizar, vídeos viralizados para humilhar, ameaças por mensagem.',
    category: 'Convivência',
    context: 'Mais perigoso que bullying presencial porque: atinge 24h/dia, é permanente (screenshots), audiência é massiva (alguém pode viralizar), vítima se sente impotente. Muitos casos têm origem na escola (alunos) mas explodem nas redes.',
    practicalExample: 'Aluna tira foto com roupas de educação física, colega compartilha em grupo com hashtag humilhante. Foto viral em 2h. Aluna: depressão, para de ir à escola. Escola + família + polícia (Lei Carolina Dieckmann): investigam, responsabilizam, aluna recebe apoio psicológico.',
    legalReference: 'Lei 12.737/12 (Lei Carolina Dieckmann - crime digital). Lei 13.709/18 (LGPD).',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Bullying', 'Explanar', 'LGPD na Escola', 'Conselho Tutelar'],
  },

  {
    term: 'Mediação de Conflitos / Restoração',
    definition: 'Processo estruturado onde um mediador (professor, coordenador, aluno treinado) ajuda dois alunos em conflito a conversar, compreender o outro lado e chegar a acordo. Foco: restaurar relação, não punir.',
    category: 'Convivência',
    context: 'Diferente de justiça punitiva (castigo). Mediação: "Como vocês acham que isso começou? Como o outro se sentiu? O que você gostaria que fizesse para consertar?" Resulta em: pedidos de desculpa genuínos, reparação, menos reincidência.',
    practicalExample: 'Dois alunos brigaram por bola durante educação física. Coordenador: marca mediação com os dois separados (seguro), depois juntos. Descobre: um chutou "sem querer" e machucou o outro. Combinam: jogar junto na próxima vez, pedir desculpas. Relação restaurada.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Conflito Escolar', 'Convivência Escolar', 'Programa de Peer Educators'],
  },

  {
    term: 'Conflito Escolar / Resolução Estruturada',
    definition: 'Desentendimentos naturais entre alunos (discussão em sala, disputa de recursos, mal-entendidos). Diferente de bullying, é pontual. Escola oferece espaços estruturados para resolver: círculos restaurativos, mediação, assembleia de turma.',
    category: 'Convivência',
    context: 'Conflito bem-resolvido = oportunidade de aprendizado em empatia, negociação, justiça restaurativa. Conflito mal-resolvido = rancor, retaliation (vingança), escalação para violência. Investir em resolução é investir em paz.',
    practicalExample: 'Dois alunos disputando lugar no time de futebol. Começam a discutir. Professor: facilita conversa "O que cada um quer? Tem jeito de ambos jogarem?" Combinam: revezam. Conflito vira oportunidade de colaboração.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Mediação de Conflitos', 'Bullying', 'Restoração'],
  },

  // ========================
  // DIREITOS & CIDADANIA (4 termos)
  // ========================
  {
    term: 'Convivência Escolar / Cultura de Paz',
    definition: 'Ambiente onde todos são respeitados, diversidade é valorizada, conflitos são resolvidos sem violência. Escola inteira (não só alunos) aprende: tolerância, empatia, responsabilidade coletiva.',
    category: 'Direitos',
    context: 'Construída por: regras claras mas dialogadas, professores que modelam respeito, mediação de conflitos, atividades de integração. Combate: bullying, violência, exclusão. Benefício: alunos aprendem melhor, faltam menos, saúde mental melhora.',
    practicalExample: 'Semana da Convivência: cada turma discute "que escola queremos?", criam regras juntas, fazem painéis. Resultado: alunos se veem como parte da mudança, não esperam direção impor regras.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Mediação de Conflitos', 'Inclusão Escolar', 'Bullying'],
  },

  {
    term: 'Direitos da Criança e do Adolescente / Estatuto (ECA)',
    definition: 'Lei (Estatuto da Criança e do Adolescente) que garante direitos: convivência familiar, educação, saúde, proteção contra violência. Também estabelece responsabilidades: obedecer pais/professores, respeitar propriedade alheia.',
    category: 'Direitos',
    context: 'Direitos principais: vida, liberdade, respeito (não ser humilhado), segurança (não ser negligenciado), educação, brincadeira, cultura. Na escola: alunos têm direito a educação de qualidade, ambiente seguro, respeito à dignidade. Abuso: violência, negligência, exploração, abandono — são crimes.',
    practicalExample: 'Aluno levado do "barraco" aos 16 para trabalhar = negligência + exploração, é crime. CT + Ministério Público intervêm. Aluno tem direito a permanecer na escola mesmo em situação de pobreza (direito à educação).',
    legalReference: 'Lei 8.069/1990 (Estatuto da Criança e do Adolescente)',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['ECA Art. 13', 'Conselho Tutelar', 'Proteção da Infância'],
  },

  {
    term: 'Participação Estudantil / Grêmio',
    definition: 'Espaço onde alunos se organizam, discutem assuntos da escola, pleiteiam melhorias e desenvolvem liderança. Grêmio = representantes eleitos pelos colegas. Pode ser de turma, série ou escola inteira.',
    category: 'Direitos',
    context: 'Participação = aprendizado de democracia, responsabilidade coletiva, voz ativa. Aluno que participa: tem senso de pertencimento, menos evasão. Ideal: trabalhar campanhas (respeito, saúde, ambiente), organizar eventos, reivindicar melhorias (reparo de banheiro, qualidade da merenda).',
    practicalExample: 'Alunos reclamam que bebedouro de água é insuficiente. Grêmio levanta demanda, reúne com direção com proposta (mais bebedouro). Direção encaminha ao município. Bebedouro instalado. Alunos veem que participação gera resultado.',
    audienceLevel: 'leigo',
    regionalContext: 'ZL-SP',
    relatedTerms: ['Convivência Escolar', 'Democracia', 'Direitos da Criança'],
  },

  {
    term: 'Proteção de Dados vs. Segurança (dilema ético)',
    definition: 'Tensão entre proteger privacidade de alunos (LGPD) e proteger segurança deles (monitoramento, câmeras, informação a responsáveis). Como equilibrar? Até que ponto observar/monitorar é necessário vs. violador de direitos?',
    category: 'Direitos',
    context: 'Exemplo real: Câmeras em escolas protegem contra bullying/violência, mas podem violar privacidade. Informar responsáveis de aluno com TDAH = proteção, mas viola sigilo/estigma se vaza. Dilema: não há resposta fácil. Escolas devem ter POLÍTICA clara, consensuada, transparente.',
    practicalExample: 'Dilema: Aluno com comportamento violento — diretor quer instalar câmera na sala dele (proteção vs. privacidade). Escola reúne: pais, aluno, especialista. Decidem: câmera + acompanhamento psicológico + contrato de convivência. Transparência + consentimento = menos violação.',
    audienceLevel: 'técnico',
    regionalContext: 'ZL-SP',
    legalReference: 'LGPD (Lei 13.709/18) vs. Lei de Segurança Escolar (Lei 13.185/15)',
    relatedTerms: ['LGPD na Escola', 'Direitos da Criança', 'Convivência Escolar'],
  },
];

/**
 * Total: 50 termos
 * Estrutura: 9 categorias
 * - Protocolo: 5 termos
 * - Legal: 4 termos
 * - Rede de Proteção: 5 termos
 * - Gírias Estudantis: 8 termos
 * - Saúde: 6 termos
 * - Inclusão: 8 termos
 * - Segurança Escolar: 6 termos
 * - Convivência: 4 termos
 * - Direitos & Cidadania: 4 termos
 */

export default glossaryData;
