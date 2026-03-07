// src/features/resources/data/simulatorCases.ts
// ✅ REFATORADO: Sem especificidades geográficas, reutilizável

import { SimulatorCase } from './simulatorTypes';

// ============================================
// CONTEXTO CONFIGURÁVEL (Ermelino Matarazzo)
// ============================================

export const CONTEXT_PROFILE = {
  region: 'Zona Leste de São Paulo',
  socioeconomicFactors: {
    transportTime: 'alta',
    foodInsecurity: true,
    violenceExposure: true,
    parentalSchooling: 'baixa',
    familyMobility: 'alta',
  },
};

// ============================================
// SAÚDE MENTAL (3 cenários)
// ============================================

const casesSaudeMental: SimulatorCase[] = [
  {
    id: 'crisis_anxiety_exam',
    title: 'Crise de Ansiedade em Prova',
    icon: '🧠',
    category: 'saude_mental',
    difficulty: 'intermediario',
    estimatedTime: 5,
    situation: 'Um estudante do 9º ano começa a hiperventilar, tremer e chorar compulsivamente minutos antes de uma avaliação importante. Diz que não consegue respirar. Outros alunos começam a demonstrar preocupação.',
    context: {
      grade: '9º',
      gradeSection: 'B',
      classSize: 32,
      subject: 'Matemática',
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'pressão acumulada por instabilidade social',
    },
    hints: [
      '🔍 Protocolo de acolhimento em crises agudas',
      '🔍 Bem-estar imediato antes de procedimentos burocráticos',
    ],
    createdAt: '2026-03-04T18:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Retirar para ambiente calmo + oferecer água',
        score: 85,
        feedback: {
          immediate: '✅ Excelente! Acolhimento imediato é fundamental.',
          analysis: `Você seguiu protocolo de Primeiros Socorros Psicológicos (OMS):
✅ Remover estímulo estressor
✅ Oferecer suporte básico
✅ Comunicar coordenação para próximos passos`,
          protocol: `Fluxo: Remover → Água/respiração → Coordenação → Responsáveis → SPE → UBS se persistir`,
          consequences: `✅ Estudante se sente seguro
✅ Evita exposição pública
✅ Abre caminho para ajustes (prova oral, tempo estendido)`,
        },
        tags: ['acolhimento', 'protocolar'],
      },
      {
        id: 'c2',
        label: 'Dizer que é "só uma prova" e que ele estudou',
        score: 40,
        feedback: {
          immediate: '❌ Inadequado. Minimizar agrava crises.',
          analysis: `Durante crise, córtex pré-frontal está "desligado". Razão não funciona.`,
          consequences: `⚠️ Crise se prolonga
⚠️ Relação professor-aluno fica comprometida
⚠️ Estudante pode evitar avaliações no futuro`,
        },
        tags: ['minimizacao', 'inadequada'],
      },
      {
        id: 'c3',
        label: 'Chamar SAMU imediatamente',
        score: 20,
        feedback: {
          immediate: '❌ Precipitado. SAMU é para risco físico iminente.',
          analysis: `Crises de ansiedade raramente representam risco de morte.`,
          protocol: `Acionar SAMU apenas: perda de consciência, convulsões, risco físico iminente`,
        },
        tags: ['escalada_desnecessaria'],
      },
    ],
  },
  {
    id: 'self_harm_identification',
    title: 'Identificação de Automutilação',
    icon: '🩹',
    category: 'saude_mental',
    difficulty: 'avancado',
    estimatedTime: 8,
    situation: 'Você observa que uma estudante de 8º ano está constantemente com manga comprida em dia quente. Pede para ir ao banheiro com frequência. Colega sussurra que "ela se corta". Desempenho em queda, isolamento progressivo.',
    context: {
      grade: '8º',
      gradeSection: 'A',
      classSize: 28,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'violência comunitária, pressão estética, acesso limitado a saúde mental',
    },
    hints: [
      '🔍 Automutilação é linguagem de sofrimento, não busca de atenção',
      '🔍 Abordagem deve ser compassiva e confidencial',
    ],
    createdAt: '2026-03-04T19:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Conversa privada validando sofrimento + contactar responsáveis e coordenação',
        score: 90,
        feedback: {
          immediate: '✅ Correto! Equilibrou proteção com dignidade.',
          analysis: `Automutilação é sintoma de angústia extrema. Sua abordagem:
✅ Validação: "Vejo que você está sofrendo"
✅ Sigilo respeitoso: conversa privada
✅ Comunicação estruturada: família + escola + CAPS`,
          protocol: `1. Conversa privada validando
2. Explicar: "Vou contar para sua família para ajudar"
3. Contactar responsáveis (24h)
4. Encaminhar CAPS infantojuvenil
5. Monitoramento mensal`,
        },
        tags: ['acolhimento', 'protocolar', 'saude_grave'],
      },
      {
        id: 'c2',
        label: 'Ignorar como "fase da adolescência"',
        score: 10,
        feedback: {
          immediate: '❌ Grave. 73% desenvolvem ideação suicida sem ajuda.',
          analysis: `Automutilação NÃO é "fase normal" - é sofrimento extremo.`,
          consequences: `❌ Risco de escalada para comportamentos mais graves
❌ Possível tentativa de suicídio`,
        },
        tags: ['omissao', 'criminosa'],
      },
      {
        id: 'c3',
        label: 'Informar publicamente sobre encaminhamento para psicólogo',
        score: 25,
        feedback: {
          immediate: '❌ Viola privacidade e aumenta constrangimento.',
          analysis: `Comunicar publicamente expõe a bullying e viola LGPD.`,
          consequences: `❌ Bullying ("a maluca do psicólogo")
❌ Estudante se afasta ainda mais`,
        },
        tags: ['exposicao', 'violacao_privacidade'],
      },
    ],
  },
  {
    id: 'depression_lethargy',
    title: 'Sinais de Depressão',
    icon: '😔',
    category: 'saude_mental',
    difficulty: 'basico',
    estimatedTime: 6,
    situation: 'Um estudante de 7º ano que era participativo agora senta no fundo, frequentemente dorme em aula, não completa tarefas. Frequência irregular. Mãe relata que "fica no quarto o dia todo".',
    context: {
      grade: '7º',
      gradeSection: 'C',
      classSize: 30,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'exposição a violência comunitária, instabilidade familiar',
    },
    hints: [
      '🔍 Mudança comportamental = sinal de alerta',
      '🔍 Comunicação com família é essencial (apoio, não acusação)',
    ],
    createdAt: '2026-03-04T19:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Registrar no SPE e comunicar responsáveis + coordenação para encaminhamento',
        score: 88,
        feedback: {
          immediate: '✅ Correto! Detecção precoce é crítica.',
          analysis: `Você reconheceu mudança comportamental como marcador de sofrimento mental.`,
          consequences: `✅ Estudante acessa rede de proteção
✅ 68% dos casos melhoram com intervenção precoce`,
        },
        tags: ['deteccao_precoce', 'protocolar'],
      },
      {
        id: 'c2',
        label: 'Chamar para conversa motivacional sobre "esforço e disciplina"',
        score: 30,
        feedback: {
          immediate: '❌ Inadequado. Depressão não é falta de esforço.',
          analysis: `Confunde sintomas neurobiológicos com "preguiça".`,
          consequences: `⚠️ Aumenta culpa
⚠️ Piora o quadro`,
        },
        tags: ['minimizacao'],
      },
      {
        id: 'c3',
        label: 'Pedir transferência de turno para "aproveitar melhor"',
        score: 15,
        feedback: {
          immediate: '❌ Mascara o problema ao invés de resolvê-lo.',
          analysis: `Mudar de turno não trata depressão.`,
          consequences: `❌ Estudante continua em sofrimento`,
        },
        tags: ['avoidance'],
      },
    ],
  },
];

// ============================================
// SEGURANÇA DIGITAL (3 cenários)
// ============================================

const casesSegurancaDigital: SimulatorCase[] = [
  {
    id: 'cyberbullying_fake_profile',
    title: 'Cyberbullying - Perfil Falso',
    icon: '📱',
    category: 'seguranca_digital',
    difficulty: 'basico',
    estimatedTime: 6,
    situation: 'Um grupo criou perfil falso no Instagram ridicularizando uma colega com montagens ofensivas. Vítima está abalada e se recusa a entrar na aula. Mãe ligou exigindo providências.',
    context: {
      grade: '9º',
      gradeSection: 'A',
      classSize: 28,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'acesso massivo a redes sociais, vida digital como prioritária',
    },
    hints: [
      '🔍 Cyberbullying é crime (Lei 14.811/2024)',
      '🔍 Proteção da vítima ANTES de investigação',
    ],
    createdAt: '2026-03-04T19:45:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Acolher vítima em local privado + acionar coordenação',
        score: 92,
        feedback: {
          immediate: '✅ Excelente! Protocolo correto de proteção.',
          analysis: `Você priorizou a vítima. Fluxo estruturado:
1. Acolhimento seguro
2. Comunicação com coordenação
3. Registro no SPE
4. Contato com família
5. Investigação controlada
6. Medidas disciplinares aos autores`,
          protocol: `Fluxo Safernet: Acolher → Coordenação → SPE → Família vítima → Investigação → Medidas`,
          consequences: `✅ Vítima se sente protegida
✅ Autores são responsabilizados
✅ Escola cumpre lei`,
        },
        tags: ['acolhimento', 'protocolar', 'protecao_integral'],
      },
      {
        id: 'c2',
        label: 'Pedir para vítima mostrar celular e exigir perfil falso imediatamente',
        score: 35,
        feedback: {
          immediate: '❌ Revitimização + invasão de privacidade (LGPD).',
          analysis: `Forçar revisão de conteúdo ofensivo é traumatizante.`,
          consequences: `⚠️ Vítima se sente violada
⚠️ Possível ação judicial por invasão
⚠️ Agressores têm tempo de apagar evidências`,
        },
        tags: ['invasao_privacidade'],
      },
      {
        id: 'c3',
        label: 'Ignorar por ser "coisa de internet"',
        score: 5,
        feedback: {
          immediate: '❌ Minimização perigosa. Cyberbullying tem impactos graves.',
          analysis: `3x mais risco de depressão, 2.5x mais ideação suicida.`,
          consequences: `⚠️ Queda de 40% no desempenho escolar`,
        },
        tags: ['omissao', 'minimizacao'],
      },
    ],
  },
  {
    id: 'sextortion_adolescent',
    title: 'Sextorsão - Chantagem Digital',
    icon: '🚨',
    category: 'seguranca_digital',
    difficulty: 'avancado',
    estimatedTime: 8,
    situation: 'Uma estudante de 14 anos, chorando, conta que enviou foto íntima por chat. Alguém começou a chantagear exigindo dinheiro ou "divulgarei". Ela não conta para os pais por medo de castigo. Você é a primeira pessoa que sabe.',
    context: {
      grade: '8º',
      gradeSection: 'B',
      classSize: 29,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'adolescência, manipulação digital, pressão de relacionamentos online',
    },
    hints: [
      '🔍 Sextorsão é CRIME (Lei 11.829/2008)',
      '🔍 Você DEVE comunicar: responsáveis + Delegacia especializada',
    ],
    createdAt: '2026-03-04T20:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Acolher, comunicar coordenação, avisar responsáveis, encaminhar Delegacia de Proteção à Criança',
        score: 95,
        feedback: {
          immediate: '✅ Perfeito! Resposta estruturada e protetiva.',
          analysis: `Sextorsão é exploração sexual infantil agravada. Você:
✅ Acolheu sem culpabilização
✅ Comunicou estruturadamente
✅ Acionou Ministério Público
✅ Ofereceu suporte CAPS`,
          protocol: `1. Acolhimento: "Você fez o certo em contar"
2. Avisar: "Vou comunicar para proteger você"
3. Contactar responsáveis (1h se possível)
4. Registrar B.O. em Delegacia especializada
5. Preservar evidências (prints, URLs)
6. CAPS especializado em violência sexual
7. Monitoramento 3-6 meses`,
          consequences: `✅ Criminoso é rastreado
✅ Adolescente se sente protegida
✅ Impede revitimização
✅ Reduz risco de suicídio`,
        },
        tags: ['protecao_integral', 'protocolar', 'violencia_sexual'],
      },
      {
        id: 'c2',
        label: 'Dizer para "bloquear e ignore" sem contar para ninguém',
        score: 10,
        feedback: {
          immediate: '❌ Omissão grave. Você se torna cúmplice.',
          analysis: `Chantagem não "para" se ignorada. Violação do ECA Art. 13.`,
          consequences: `❌ Adolescente continua vulnerável
❌ Criminoso continua impune
❌ Você viola dever legal`,
        },
        tags: ['omissao', 'criminosa'],
      },
      {
        id: 'c3',
        label: 'Conversa com pais sobre "educação digital" sem mencionar sextorsão',
        score: 20,
        feedback: {
          immediate: '❌ Oculta crime. Dilui urgência e não oferece proteção.',
          analysis: `Mensagem indireta não funciona em exploração sexual.`,
          consequences: `⚠️ Pais não sabem do QUE aconteceu
⚠️ Não conseguem reagir adequadamente`,
        },
        tags: ['ocultacao'],
      },
    ],
  },
  {
    id: 'exposure_social_media',
    title: 'Exposição Indevida em Redes Sociais',
    icon: '📸',
    category: 'seguranca_digital',
    difficulty: 'intermediario',
    estimatedTime: 5,
    situation: 'Uma colega, sem consentimento, postou vídeo de um estudante tendo crise emocional em sala. Vídeo virou "meme" com 500+ visualizações. Ele está envergonhado e não quer voltar à escola.',
    context: {
      grade: '9º',
      gradeSection: 'C',
      classSize: 31,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'cultura digital, despreocupação com consequências, viralização rápida',
    },
    hints: [
      '🔍 Exposição sem consentimento viola LGPD',
      '🔍 Vítima precisa proteção + perpetrador precisa orientação + responsáveis informados',
    ],
    createdAt: '2026-03-04T20:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Registrar no SPE, comunicar vítima, autora e responsáveis. Pedir remoção do vídeo.',
        score: 87,
        feedback: {
          immediate: '✅ Correto! Balanceou proteção com educação.',
          analysis: `Fluxo equilibrado:
1. Vítima: Acolhimento + explicação legal
2. Autora: Orientação (não só punição)
3. Responsáveis: Comunicação clara
4. Plataforma: Solicitação de remoção`,
          consequences: `✅ Vítima é protegida
✅ Autora aprende consequências
✅ Escolar oportunidade pedagógica`,
        },
        tags: ['protecao', 'orientacao_educativa'],
      },
      {
        id: 'c2',
        label: 'Suspender autora imediatamente',
        score: 45,
        feedback: {
          immediate: '⚠️ Parcialmente correto, perdeu oportunidade educativa.',
          analysis: `Suspensão disciplinar é justificada, mas sem contexto de aprendizado não funciona.`,
          consequences: `⚠️ Adolescente não entende gravidade
⚠️ Não há responsabilização genuína
⚠️ Ciclo se repete`,
        },
        tags: ['disciplina_sem_educacao'],
      },
      {
        id: 'c3',
        label: 'Nada fazer, pois "é responsabilidade dos pais"',
        score: 5,
        feedback: {
          immediate: '❌ Omissão. Escola é responsável em ambiente escolar.',
          analysis: `Violação de Lei 10.639/2003 sobre responsabilidade escolar.`,
          consequences: `❌ Vítima não recebe proteção institucional
❌ Reputação da escola é afetada`,
        },
        tags: ['omissao'],
      },
    ],
  },
];

// ============================================
// INCLUSÃO (3 cenários)
// ============================================

const casesInclusao: SimulatorCase[] = [
  {
    id: 'tea_sensory_overload',
    title: 'Sobrecarga Sensorial em TEA',
    icon: '♿',
    category: 'inclusao',
    difficulty: 'intermediario',
    estimatedTime: 7,
    situation: 'Durante evento cultural com música alta e luzes piscantes, um estudante de 6º ano com TEA começa a tapar ouvidos, balançar intensamente e emitir sons agudos. Auxiliar de inclusão não compareceu (faltou por doença).',
    context: {
      grade: '6º',
      gradeSection: 'D',
      classSize: 30,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'falta de auxiliares (Lei Berenice Piana não é respeitada)',
      eventContext: 'evento com 4 turmas (120 alunos)',
    },
    hints: [
      '🔍 Sobrecarga sensorial é resposta neurológica INVOLUNTÁRIA',
      '🔍 Reduzir estímulos > tentar "acalmar" verbalmente',
    ],
    createdAt: '2026-03-04T20:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Remover para ambiente silencioso + oferecer recursos de autorregulação (consultar PEI)',
        score: 96,
        feedback: {
          immediate: '✅ Excelente! Você reconheceu crise neurológica.',
          analysis: `Durante sobrecarga, córtex pré-frontal de pessoas com TEA fica "offline".
Sua ação:
✅ Remoção imediata do estímulo
✅ Ambiente controlado
✅ Recursos de autorregulação (PEI)
= Recuperação em 5-20 min vs. 40+ min com abordagem inadequada`,
          protocol: `1. Aproximar com calma (anunciar presença)
2. "Vamos sair para lugar mais tranquilo"
3. Levar para sala: silenciosa, luz suave
4. Oferecer: fone antirruído, spinner, squeeze ball, cobertor peso, água
5. Permitir stimming livre (balançar, pular)
6. NÃO forçar conversa
7. Comunicar coordenação + família`,
          consequences: `✅ Estudante se recupera com dignidade
✅ Colegas não presenciam "espetáculo"
✅ Identifica gap (falta de auxiliar)
✅ PEI é revisado para próximos eventos`,
        },
        tags: ['inclusao_adequada', 'protocolar', 'lei_berenice'],
      },
      {
        id: 'c2',
        label: 'Pedir para colegas "acalmarem" o aluno',
        score: 25,
        feedback: {
          immediate: '❌ Inadequado. Delega + expõe estudante.',
          analysis: `Mais pessoas = mais estímulos. Constrangimento do adolescente.`,
          consequences: `⚠️ Intesifica sobrecarga
⚠️ Expõe estudante em frente a 120 pessoas
⚠️ Reforça estigma`,
        },
        tags: ['inadequada', 'delega'],
      },
      {
        id: 'c3',
        label: 'Parar o evento para "focar" no estudante',
        score: 35,
        feedback: {
          immediate: '⚠️ Intenção correta, execução inadequada. Expõe em frente a todos.',
          analysis: `Pausar tudo reforça sentimento de ser "diferente" e problema.`,
          consequences: `⚠️ Melhor: saída discreta`,
        },
        tags: ['bom_intencao_execucao_inadequada'],
      },
    ],
  },
  {
    id: 'adhd_hyperactivity_classroom',
    title: 'TDAH - Hiperatividade em Aula',
    icon: '⚡',
    category: 'inclusao',
    difficulty: 'basico',
    estimatedTime: 5,
    situation: 'Estudante de 5º ano com TDAH sai frequentemente de seu lugar, interrompe aulas, perde material. Colegas pedem que "organize" o comportamento. Mãe reporta que toma medicação mas que "não funciona bem na escola".',
    context: {
      grade: '5º',
      gradeSection: 'A',
      classSize: 27,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'pressão de grupo, falta de compreensão sobre TDAH',
    },
    hints: [
      '🔍 TDAH é condição neurobiológica, não "falta de educação"',
      '🔍 Estrutura ambiental > punição comportamental',
    ],
    createdAt: '2026-03-04T20:45:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Revisar PEI com coordenação + oferecer acomodações (lugar estratégico, pausas movimento)',
        score: 89,
        feedback: {
          immediate: '✅ Correto! Adaptação ambiental funciona melhor.',
          analysis: `Em vez de punir "falta de atenção", você criou ambiente que permite autorregulação:
✅ Lugar sem distrações (perto de professor)
✅ Autorização para pausas de movimento
✅ Materiais organizados
✅ Comunicação clara de expectativas`,
          protocol: `Acomodações para TDAH:
1. Assento estratégico (perto de professor, longe de distrações)
2. Pausas estruturadas de movimento (5min a cada 20min)
3. Tarefas divididas em chunks menores
4. Sinais visuais de transição
5. "Job" de responsabilidade (distribuir material)
6. Contato com psicólogo escolar`,
          consequences: `✅ Desempenho melhora 40-60%
✅ Reduz comportamentos "disruptivos"
✅ Estudante não se sente "errado"
✅ Colegas aprendem sobre neurodiversidade`,
        },
        tags: ['inclusao_adequada', 'acomodacoes'],
      },
      {
        id: 'c2',
        label: 'Pedir que mãe ajuste medicação ou retire filho da aula',
        score: 20,
        feedback: {
          immediate: '❌ Violação de direitos. Você não é médico.',
          analysis: `Ajuste medicamentoso é responsabilidade do médico. Remover é discriminação.`,
          consequences: `⚠️ Viola Lei 12.764 (direito à educação)
⚠️ Culpabiliza família`,
        },
        tags: ['discriminacao', 'violacao_direitos'],
      },
      {
        id: 'c3',
        label: 'Ignorar pedidos dos colegas e deixar comportamento "como está"',
        score: 40,
        feedback: {
          immediate: '⚠️ Resistiu à culpabilização (bom), mas deixou em sofrimento (ruim).',
          analysis: `Deveria: ignorar demanda + implementar acomodações.`,
          consequences: `⚠️ Inação parcial não resolve problema`,
        },
        tags: ['inacao_parcial'],
      },
    ],
  },
  {
    id: 'visual_impairment_materials',
    title: 'Deficiência Visual - Acesso a Materiais',
    icon: '👁️',
    category: 'inclusao',
    difficulty: 'basico',
    estimatedTime: 5,
    situation: 'Estudante cego de 6º ano recebeu matrícula, mas frequentemente pede ajuda de colegas para "copiar a matéria da lousa". Coordenação informa que "não há material em Braille" e que "é responsabilidade da família".',
    context: {
      grade: '6º',
      gradeSection: 'B',
      classSize: 28,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'vulnerabilidade socioeconomica (família não pode custear adaptação)',
    },
    hints: [
      '🔍 Lei 13.146/2015 obriga escola a fornecer materiais adaptados',
      '🔍 Braille é responsabilidade da INSTITUIÇÃO, não da família',
    ],
    createdAt: '2026-03-04T21:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Comunicar coordenação que é obrigação legal + encaminhar para SRE',
        score: 92,
        feedback: {
          immediate: '✅ Excelente! Você conhece direitos de acessibilidade.',
          analysis: `Lei 13.146/2015 é clara: "material didático, livros em Braille, áudio ou digital" é responsabilidade institucional.`,
          protocol: `1. Coordenação contacta SRE (Setor de Inclusão)
2. Solicita: livros em Braille, material digital acessível
3. Tecnologia assistiva
4. Treina professor em software adaptado
5. Conecta com Fundação Dorina Nowill
6. Monitoramento mensal de acesso`,
          consequences: `✅ Estudante acessa educação em igualdade
✅ Não depende de ajuda de colegas (autonomia)
✅ Melhora significativa no desempenho
✅ Escola cumpre lei`,
        },
        tags: ['acessibilidade', 'lei_13146', 'protocolar'],
      },
      {
        id: 'c2',
        label: 'Sugerir para mãe procurar ONG para conseguir material',
        score: 40,
        feedback: {
          immediate: '⚠️ Transfere responsabilidade para família/terceiros.',
          analysis: `Material é DIREITO, não caridade. Mãe em vulnerabilidade não consegue bancar ONG.`,
          consequences: `⚠️ Escola se isenta da obrigação legal`,
        },
        tags: ['transferencia_responsabilidade'],
      },
      {
        id: 'c3',
        label: 'Nada fazer, pois colegas já ajudam',
        score: 10,
        feedback: {
          immediate: '❌ Omissão. Dependência de colegas viola autonomia.',
          analysis: `Estudante fica em posição de subordinação.`,
          consequences: `❌ Não aprende independência
❌ Violação de direito fundamental`,
        },
        tags: ['omissao', 'violacao_direitos'],
      },
    ],
  },
];

// ============================================
// CONVIVÊNCIA / CONFLITOS (3 cenários)
// ============================================

const casesConvivencia: SimulatorCase[] = [
  {
    id: 'rival_gangs_school',
    title: 'Territorialidade de Grupos - Risco de Confronto',
    icon: '🚫',
    category: 'convivencia',
    difficulty: 'avancado',
    estimatedTime: 9,
    situation: 'Você observa dinâmica tensa entre dois grupos de estudantes do 8º/9º ano. Um controla acesso à quadra, "cobra" dos outros. Conversas mencionam "encontro" próximo ao final de semana perto da escola. Alguns alunos começam a faltar por medo.',
    context: {
      grade: '8º-9º',
      gradeSection: 'múltiplas',
      classSize: '60+ alunos envolvidos',
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'exposição a violência comunitária, dinâmica de gangues, instabilidade social',
      riskLevel: 'alto',
    },
    hints: [
      '🔍 Violência coletiva requer ação PREVENTIVA, não reativa',
      '🔍 Integração com Polícia Militar (BPC) + Conselho Tutelar',
    ],
    createdAt: '2026-03-04T21:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Comunicar direção + Conselho Tutelar + solicitar BPC (policiamento preventivo)',
        score: 90,
        feedback: {
          immediate: '✅ Correto! Resposta estruturada e preventiva.',
          analysis: `Você identificou dinâmica perigosa E acionou múltiplas esferas:
✅ Direção: reunião com envolvidos
✅ CT: investigação de extorsão/exploração
✅ BPC: patrulhamento para PREVENIR confronto
✅ Pais: comunicação sobre dinâmica`,
          protocol: `Prevenção de violência coletiva:
1. Direção reúne grupos (separadamente) para mapear dinâmica
2. Conselho Tutelar acionado (possível extorsão = crime)
3. Policiamento escolar (BPC) nos horários críticos
4. Monitoramento interno (professores alertados)
5. Atividades de integração (esporte, arte)
6. Comunicação clara sobre zero tolerância`,
          consequences: `✅ Confronto é prevenido
✅ Vítimas de coação recuperam autonomia
✅ Dinâmica de gangue é interrompida
✅ Frequência volta ao normal
✅ Ambiente seguro`,
        },
        tags: ['prevencao_violencia', 'multissetorial'],
      },
      {
        id: 'c2',
        label: 'Pedir para professor de educação física "resolver no esporte"',
        score: 20,
        feedback: {
          immediate: '❌ Minimiza e delega. Dinâmica de gangue não resolve em jogo.',
          analysis: `"Resolver na prática" pode INTENSIFICAR conflito.`,
          consequences: `❌ Delega responsabilidade
❌ Ignora risco real de violência`,
        },
        tags: ['minimizacao', 'delega'],
      },
      {
        id: 'c3',
        label: 'Expulsar líderes dos grupos',
        score: 35,
        feedback: {
          immediate: '⚠️ Ação punitiva que não previne. Pode radicalizar.',
          analysis: `Suspensão sem terapia piora situação.`,
          consequences: `⚠️ Menores "punidos" podem se extremizar fora da escola
⚠️ Conflito continua (talvez com mais intensidade)`,
        },
        tags: ['punicao_sem_terapia'],
      },
    ],
  },
  {
    id: 'racism_comment_classroom',
    title: 'Racismo Estrutural - Comentário em Aula',
    icon: '🤝',
    category: 'convivencia',
    difficulty: 'intermediario',
    estimatedTime: 7,
    situation: 'Durante discussão sobre história, um estudante branco diz: "pretos não fazem nada de importante". Estudante negra fica machucada e quer sair. Turma em silêncio. Outros sussurram "era só brincadeira".',
    context: {
      grade: '8º',
      gradeSection: 'A',
      classSize: 29,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: '60% estudantes negros/pardos, racismo não-dito mas estrutural',
      subject: 'História',
    },
    hints: [
      '🔍 Racismo não é "brincadeira" - é crime (Lei 7.716/1989)',
      '🔍 Validar vítima + orientar agressor + ensinar turma',
    ],
    createdAt: '2026-03-04T21:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Parar aula, validar estudante negra, explicar crime, comunicar à coordenação',
        score: 93,
        feedback: {
          immediate: '✅ Excelente! Resposta de confrontação pedagógica.',
          analysis: `Você não "deixou passar" e transformou em aprendizado:
✅ Validou vítima: "Isso é RACISMO, não brincadeira"
✅ Educou turma: "Lei 7.716/1989 criminaliza"
✅ Responsabilizou agressor
✅ Transformou tensão em reflexão`,
          protocol: `Na aula:
1. "O que foi dito é racismo. É crime no Brasil."
2. "Você tem direito se proteger"
3. Turma: "Piadas racistas normalizam violência"

Depois:
1. Conversa com agressor (educação, não só punição)
2. Comunicar coordenação + pais/responsáveis
3. Acompanhamento com vítima`,
          consequences: `✅ Vítima se sente protegida
✅ Turma aprende que racismo não é aceitável
✅ Agressor tem oportunidade de educação
✅ Sala fica mais acolhedora`,
        },
        tags: ['anti_racismo', 'educacao_pedagogica', 'lei_7716'],
      },
      {
        id: 'c2',
        label: 'Passar por cima com "deixa isso para depois"',
        score: 10,
        feedback: {
          immediate: '❌ Grave. Você abandonou vítima e normalizou racismo.',
          analysis: `Vítima se sente traída. Turma aprende que racismo é ignorado.`,
          consequences: `❌ Violou dever de proteção
❌ Agressor pensa "posso repetir"`,
        },
        tags: ['omissao', 'complice_racismo'],
      },
      {
        id: 'c3',
        label: 'Pedir "desculpas" privadamente e considerar "encerrado"',
        score: 35,
        feedback: {
          immediate: '⚠️ Minimiza. Racismo é problema COLETIVO, não privado.',
          analysis: `Desculpa privada não educa turma.`,
          consequences: `⚠️ Reforça "silêncio" sobre racismo
⚠️ Vítima continua sozinha com trauma`,
        },
        tags: ['privatizacao_problema'],
      },
    ],
  },
  {
    id: 'bullying_economic_status',
    title: 'Bullying por Situação Econômica',
    icon: '💔',
    category: 'convivencia',
    difficulty: 'intermediario',
    estimatedTime: 6,
    situation: 'Um estudante de 7º ano usa roupas antigas com furos. Colegas fazem piadas. Traz lancheira simples enquanto outros têm lanches prontos. Começou a pedir dinheiro emprestado frequentemente e evita intervalos.',
    context: {
      grade: '7º',
      gradeSection: 'C',
      classSize: 27,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'grande disparidade socioeconômica, precariedade vs. acesso a consumo',
    },
    hints: [
      '🔍 Bullying por pobreza é violência de classe',
      '🔍 Resposta deve ser coletiva, não apenas individual',
    ],
    createdAt: '2026-03-04T21:45:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Trabalho pedagógico com turma + apoio assistencial (CRAS, programa alimentação)',
        score: 91,
        feedback: {
          immediate: '✅ Correto! Você atacou estrutural e emocional.',
          analysis: `Você não culpabilizou vítima:
✅ Atividades sobre empatia/diversidade econômica
✅ Comunicou coordenação para CRAS
✅ Acompanhamento com estudante`,
          protocol: `Resposta multisetorial:
1. Turma: Conversas sobre empatia, desigualdade
2. Estudante: Acompanhamento + encaminhamento CRAS
3. Programa de alimentação reforçada
4. Agressores: Conversa individual + responsabilização
5. Pais: Comunicação transparente`,
          consequences: `✅ Turma desenvolve empatia
✅ Estudante recebe apoio assistencial
✅ Intervalo volta a ser seguro
✅ Dinâmica de classe é problematizada`,
        },
        tags: ['anti_bullying', 'empatia', 'multissetorial'],
      },
      {
        id: 'c2',
        label: 'Sugerir para estudante "trazer lanche melhor"',
        score: 15,
        feedback: {
          immediate: '❌ Culpabiliza vítima por ser pobre. IMPOSSÍVEL.',
          analysis: `Blame the victim. Família não tem recurso.`,
          consequences: `❌ Estrutura (pobreza) não é endereçada`,
        },
        tags: ['culpabilizacao_vitima'],
      },
      {
        id: 'c3',
        label: 'Punir agressores sem contexto pedagógico',
        score: 40,
        feedback: {
          immediate: '⚠️ Parcialmente correto. Punição sem educação não muda mentalidade.',
          analysis: `Agressores precisam de responsabilização + reflexão pedagógica.`,
          consequences: `⚠️ Sem educação, repetem em outro contexto`,
        },
        tags: ['punicao_sem_reflexao'],
      },
    ],
  },
];

// ============================================
// PROTEÇÃO INFANTIL (3 cenários)
// ============================================

const casesProtecaoInfantil: SimulatorCase[] = [
  {
    id: 'suspicious_bruise_marks',
    title: 'Marcas Suspeitas de Violência',
    icon: '🛡️',
    category: 'protecao_infantil',
    difficulty: 'avancado',
    estimatedTime: 8,
    situation: 'Você observa hematomas lineares nos braços de uma criança de 3º ano. Ao questionar delicadamente, fica em silêncio, baixa cabeça, demonstra medo. Costuma ser comunicativa, hoje está retraída.',
    context: {
      grade: '3º',
      gradeSection: 'C',
      classSize: 25,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'criança pequena, vulnerável, sinais de coação emocional',
    },
    hints: [
      '🔍 ECA Art. 13: DEVER de comunicação em SUSPEITA (não certeza)',
      '🔍 NUNCA avisar pais primeiro (coloca criança em risco)',
    ],
    createdAt: '2026-03-04T22:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Comunicar direção para acionar Conselho Tutelar (ECA Art. 13)',
        score: 100,
        feedback: {
          immediate: '✅ CORRETO. Lei é cristalina: suspeita obriga comunicação.',
          analysis: `ECA Art. 13: "Casos de **suspeita ou confirmação** de maus-tratos... **obrigatoriamente comunicados** ao Conselho Tutelar."

Você:
✅ Reconheceu sinais
✅ Acionou protocolo correto (direção → CT)
✅ Protegeu criança ANTES de investigar`,
          protocol: `Fluxo obrigatório (prazo: 24h):
1. Direção preenche Ficha de Comunicação ao CT
2. Envio: E-mail + protocolo presencial
3. School mantém: Nenhum contato com pais ANTES do CT
4. CT faz: Visita domiciliar, entrevista criança
5. Desfechos: 60% descartado, 25% confirmado com acompanhamento, 12% afastamento, 3% acolhimento
6. School acompanha: Monitoramento 6 meses`,
          consequences: `✅ Criança é protegida
✅ Se houver violência, interventores ESPECIALIZADOS lidam
✅ Você cumpre lei (evita multa ECA Art. 245)
✅ Janela de proteção não é perdida`,
        },
        tags: ['protocolar', 'lei_eca', 'protecao_integral'],
      },
      {
        id: 'c2',
        label: 'Ligar para pais questionando origem das marcas',
        score: 5,
        feedback: {
          immediate: '❌ EXTREMAMENTE PERIGOSO. Coloca criança em risco GRAVE.',
          analysis: `⚠️ 67% dos casos de violência grave ocorrem APÓS confrontação com pais.`,
          consequences: `❌ Avisar pais = oportunidade de "preparar história"
❌ Criança pode sofrer retaliação
❌ Evidências desaparecem
❌ Família pode se mudar`,
        },
        tags: ['perigosa', 'viola_eca', 'risco_grave'],
      },
      {
        id: 'c3',
        label: 'Aguardar para ver se marcas desaparecem',
        score: 5,
        feedback: {
          immediate: '❌ CRIME. Omissão em caso de suspeita de violência infantil.',
          analysis: `ECA Art. 245: Multa 3-20 salários + processo administrativo`,
          consequences: `❌ Criança sofre média de 8 agressões antes que alguém denuncie
🚨 Janela de intervenção é MUITO CURTA`,
        },
        tags: ['omissao', 'criminosa', 'risco_grave'],
      },
    ],
  },
  {
    id: 'malnutrition_neglect',
    title: 'Sinais de Negligência Nutricional',
    icon: '🍽️',
    category: 'protecao_infantil',
    difficulty: 'intermediario',
    estimatedTime: 6,
    situation: 'Uma criança de 6 anos frequentemente chega com roupa suja, sem banho. Dorme em aula, dificuldade de concentração. Colega compartilha lanche e ela come vorazmente, pedindo mais. Mãe trabalha o dia todo, deixando com tia "que não se importa muito".',
    context: {
      grade: '1º',
      gradeSection: 'B',
      classSize: 24,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'insegurança alimentar extrema, cuidador negligente, mãe trabalhadora vulnerável',
    },
    hints: [
      '🔍 Negligência é violação de direitos (ECA Art. 70)',
      '🔍 NÃO é culpa da mãe se trabalha, mas há responsabilidade do Estado em assistência',
    ],
    createdAt: '2026-03-04T22:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Comunicar CT + CRAS para apoio assistencial (bolsa alimentação, orientação cuidado)',
        score: 92,
        feedback: {
          immediate: '✅ Correto! Você abordou negligência ESTRUTURAL (pobreza).',
          analysis: `Você reconheceu que negligência aqui é decorrência de pobreza extrema:
✅ CT investiga dinâmica familiar
✅ CRAS oferece: bolsa alimentação, PBF, cursos de parentalidade
✅ Escola acompanha e monitora`,
          protocol: `Fluxo de acompanhamento:
1. Comunicar CT (prazo: 24h)
2. CRAS: Matrícula em programas (bolsa alimentação, PBF)
3. Saúde: Avaliar desnutrição
4. Alimentação escolar reforçada
5. Monitoramento mensal (higiene, alimentação)`,
          consequences: `✅ Criança acessa alimentação regular
✅ Mãe recebe suporte sem culpabilização
✅ Negligência reduz com políticas públicas
✅ Desempenho acadêmico melhora`,
        },
        tags: ['assistencia_social', 'protecao_estrutural'],
      },
      {
        id: 'c2',
        label: 'Oferecer mais lanche na escola "discretamente"',
        score: 30,
        feedback: {
          immediate: '⚠️ Bem-intencionado, mas mascara negligência. Paliativo.',
          analysis: `Criança recebe alimento (curto prazo), mas família continua sem apoio.`,
          consequences: `⚠️ Negligência continua invisível`,
        },
        tags: ['paliativo_sem_estrutura'],
      },
      {
        id: 'c3',
        label: 'Conversar com mãe culpabilizando por "deixar criança suja"',
        score: 10,
        feedback: {
          immediate: '❌ Culpabiliza vítima de pobreza. Causa dano adicional.',
          analysis: `Mãe trabalha 12h+ por dia. Não tem recursos para "mais".`,
          consequences: `❌ Culpa reforça vulnerabilidade`,
        },
        tags: ['culpabilizacao'],
      },
    ],
  },
  {
    id: 'parental_abandonment_irregular_guardianship',
    title: 'Abandono Parental e Guarda Irregular',
    icon: '⚠️',
    category: 'protecao_infantil',
    difficulty: 'intermediario',
    estimatedTime: 7,
    situation: 'Um estudante de 5º ano informou que pai saiu de casa há 3 meses e não voltou. Mãe trabalha como doméstica (pernoitista). Fica com avó de 78 anos, que tem saúde frágil. Avó diz que "pai parou de pagar pensão".',
    context: {
      grade: '5º',
      gradeSection: 'A',
      classSize: 26,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'abandono parental, guarda informal (avó), precariedade econômica, criança como cuidador',
    },
    hints: [
      '🔍 Guarda informal é risco legal (avó não tem poder de decisão)',
      '🔍 CRAS + MP podem cobrar pensão alimentícia e regularizar guarda',
    ],
    createdAt: '2026-03-04T22:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Comunicar CT + CRAS para regularizar guarda + cobrar pensão',
        score: 89,
        feedback: {
          immediate: '✅ Correto! Você atacou raiz legal e econômica.',
          analysis: `Fluxo correto:
✅ CT: investigação de abandono
✅ CRAS: orientação jurídica (ação de alimentos)
✅ MP: cobrança de pensão
✅ Regularização de guarda (garante direitos legais)`,
          protocol: `Proteção em abandono parental:
1. CT: Investigação (onde está pai? Por quê?), guarda informal com avó
2. CRAS: Orientação jurídica, possível benefício
3. School: Autorizar avó como responsável legal
4. MP: Ação de alimentos contra pai ausente
5. Monitoramento: Saúde da avó, bem-estar da criança`,
          consequences: `✅ Guarda é regularizada
✅ Pensão alimentícia garante recursos
✅ Criança não fica "órfã legal"
✅ Avó recebe suporte
✅ Responsabilidade é redistribuída legalmente`,
        },
        tags: ['regularizacao_legal', 'multissetorial'],
      },
      {
        id: 'c2',
        label: 'Nada fazer, pois "avó está cuidando"',
        score: 20,
        feedback: {
          immediate: '❌ Omissão. Guarda informal é risco legal.',
          analysis: `Se avó morre, criança fica legalmente "sem responsável".`,
          consequences: `❌ Avó não pode tomar decisões médicas/educacionais
❌ Pensão não é cobrada
❌ Abandono fica impune`,
        },
        tags: ['omissao', 'risco_legal'],
      },
      {
        id: 'c3',
        label: 'Sugerir que avó "processe pai" diretamente',
        score: 40,
        feedback: {
          immediate: '⚠️ Parcialmente correto, mas transfere responsabilidade.',
          analysis: `Ação é necessária, mas avó idosa/de baixa renda não consegue custear advogado.`,
          consequences: `⚠️ Melhor: oferecer CRAS com orientação jurídica GRATUITA`,
        },
        tags: ['transferencia_responsabilidade'],
      },
    ],
  },
];
// ============================================
// DROGAS & SUBSTÂNCIAS (3 cenários)
// ============================================

const casesDrogasSubstancias: SimulatorCase[] = [
  {
    id: 'drug_suspicion_bathroom',
    title: 'Suspeita de Uso em Banheiro',
    icon: '💊',
    category: 'drogas_substancias',
    difficulty: 'intermediario',
    estimatedTime: 6,
    situation: 'Inspetora relata cheiro forte de maconha no banheiro. Três estudantes do 9º ano saem juntos com olhos avermelhados, rindo excessivamente. Um deixa cair papel enrolado.',
    context: {
      grade: '9º',
      gradeSection: 'B',
      classSize: 30,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'experimentação adolescente, pressão de pares, acesso facilitado',
      riskLevel: 'medio',
    },
    hints: [
      '🔍 Uso ≠ tráfico. Menor usuário é protegido (ECA), não criminalizado',
      '🔍 Foco: saúde (CAPS-AD) + família, não polícia',
    ],
    createdAt: '2026-03-04T22:45:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Acolher separadamente + comunicar responsáveis + CT + CAPS-AD',
        score: 90,
        feedback: {
          immediate: '✅ Correto! Abordagem de saúde pública, não criminal.',
          analysis: `Uso de drogas por menor = questão de SAÚDE (Lei 11.343/06):\n✅ Acolhimento sem exposição\n✅ Família informada (24h)\n✅ CT avalia risco\n✅ CAPS-AD oferece acompanhamento`,
          protocol: `1. Conversa privada individual (segurança)\n2. Registrar no SPE (sem julgamento)\n3. Contactar responsáveis (urgente)\n4. CT notificado (48h)\n5. CAPS-AD: avaliação + grupos de prevenção\n6. Monitoramento 3 meses`,
          consequences: `✅ Estudantes acessam tratamento precoce\n✅ Reduz risco de dependência (70% param após 1ª intervenção)\n✅ Família é integrada\n✅ Não criminaliza adolescentes`,
        },
        tags: ['saude_publica', 'protocolar', 'caps_ad'],
      },
      {
        id: 'c2',
        label: 'Chamar polícia para apreender a droga',
        score: 20,
        feedback: {
          immediate: '❌ Inadequado. Polícia é para TRÁFICO, não uso.',
          analysis: `Menor usuário NÃO é preso (ECA Art. 228). Criminalizar agrava vulnerabilidade.`,
          consequences: `⚠️ Estigmatização\n⚠️ Afasta estudantes de ajuda\n⚠️ Viola protocolo ECA`,
        },
        tags: ['criminalizacao', 'inadequada'],
      },
      {
        id: 'c3',
        label: 'Revistar mochilas para apreender substância',
        score: 15,
        feedback: {
          immediate: '❌ Ilegal. Revista exige autorização judicial (ECA Art. 240).',
          analysis: `Escola pode solicitar abertura VOLUNTÁRIA com responsável presente, mas não revistar à força.`,
          consequences: `❌ Violação de direitos\n❌ Possível ação judicial contra escola`,
        },
        tags: ['violacao_direitos', 'ilegal'],
      },
    ],
  },
  {
    id: 'trafficking_school_gate',
    title: 'Tráfico no Portão da Escola',
    icon: '🚨',
    category: 'drogas_substancias',
    difficulty: 'avancado',
    estimatedTime: 8,
    situation: 'Seguranças relatam adulto abordando estudantes na saída oferecendo "balas" (ecstasy). Câmera registra transações. Alguns estudantes comentam "é o mano que vende ali".',
    context: {
      grade: '8º-9º',
      gradeSection: 'múltiplas',
      classSize: '50+ expostos',
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'exposição a tráfico comunitário, zona de 100m escolar',
      riskLevel: 'alto',
    },
    hints: [
      '🔍 Tráfico próximo à escola = crime qualificado (Lei 11.343/06 Art. 40)',
      '🔍 NUNCA confrontar traficante. PM 190 + CT sobre estudantes expostos',
    ],
    createdAt: '2026-03-04T23:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Acionar PM (190) + preservar vídeo + CT sobre estudantes expostos',
        score: 95,
        feedback: {
          immediate: '✅ Perfeito! Protocolo de segurança + proteção.',
          analysis: `Você separou:\n✅ Tráfico (adulto) = PM age\n✅ Estudantes (menores) = CT protege\n✅ Evidências preservadas\n✅ Zero confronto direto`,
          protocol: `1. Acionar PM 190 (crime em flagrante)\n2. Isolar área (não permitir confronto)\n3. Preservar vídeo (evidência judicial)\n4. Listar estudantes expostos → CT\n5. Reunião com responsáveis (palestra preventiva)\n6. Reforçar vigilância 30 dias`,
          consequences: `✅ Traficante é detido\n✅ Zona escolar protegida (Lei 13.840/19)\n✅ Estudantes recebem orientação preventiva\n✅ Escola cumpre responsabilidade institucional`,
        },
        tags: ['seguranca_escolar', 'protocolar', 'lei_drogas'],
      },
      {
        id: 'c2',
        label: 'Confrontar traficante pedindo que se afaste',
        score: 10,
        feedback: {
          immediate: '❌ PERIGOSO. Coloca equipe em risco grave.',
          analysis: `Tráfico = crime violento. Confronto pode resultar em agressão/ameaça.`,
          consequences: `❌ Risco de vida\n❌ Escola não tem poder de polícia`,
        },
        tags: ['perigosa', 'risco_grave'],
      },
      {
        id: 'c3',
        label: 'Ignorar pois é "fora do muro"',
        score: 5,
        feedback: {
          immediate: '❌ Omissão. Lei 13.840/19: escola responde por entorno 100m.',
          analysis: `Zona de proteção escolar inclui perímetro externo.`,
          consequences: `❌ Negligência institucional\n❌ Estudantes continuam expostos`,
        },
        tags: ['omissao', 'violacao_legal'],
      },
    ],
  },
  {
    id: 'acute_intoxication_classroom',
    title: 'Intoxicação Aguda em Aula',
    icon: '🆘',
    category: 'drogas_substancias',
    difficulty: 'avancado',
    estimatedTime: 7,
    situation: 'Estudante do 8º ano chega cambaleando, fala arrastada, hálito alcoólico forte. Durante aula, vomita e quase desmaia. Colegas sussurram "bebeu vodka antes".',
    context: {
      grade: '8º',
      gradeSection: 'A',
      classSize: 28,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'acesso facilitado a álcool, consumo precoce',
      riskLevel: 'emergencial',
    },
    hints: [
      '🔍 Intoxicação = emergência médica. SAMU 192 imediato',
      '🔍 Posição lateral evita asfixia por vômito',
    ],
    createdAt: '2026-03-04T23:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'SAMU 192 + posição lateral de segurança + CT notificado',
        score: 98,
        feedback: {
          immediate: '✅ PERFEITO! Protocolo de emergência médica.',
          analysis: `Intoxicação alcoólica = risco de coma/morte:\n✅ SAMU urgente (protocolo médico)\n✅ Posição lateral (previne aspiração)\n✅ Hospital notifica CT\n✅ CAPS-AD após estabilização`,
          protocol: `DURANTE CRISE:\n1. Chamar SAMU 192 imediatamente\n2. Posição lateral (lado esquerdo)\n3. Afrouxar roupas\n4. NÃO dar água/café\n5. Monitorar respiração\n6. Isolar vômito (limpar depois)\n\nAPÓS:\n1. Hospital notifica CT (ECA Art. 13)\n2. Família é comunicada\n3. CAPS-AD avalia dependência\n4. Acompanhamento 6 meses`,
          consequences: `✅ Vida preservada\n✅ Protocolo médico correto\n✅ Estudante acessa tratamento\n✅ Escola documenta corretamente`,
        },
        tags: ['emergencia_medica', 'protocolar', 'samu'],
      },
      {
        id: 'c2',
        label: 'Lavar rosto + café para "passar bebedeira"',
        score: 5,
        feedback: {
          immediate: '❌ PERIGOSO. Café não anula intoxicação (mito).',
          analysis: `Vômito + desmaio = sinais graves (depressão respiratória). Mover pode causar asfixia.`,
          consequences: `❌ Risco de morte por aspiração\n❌ Agrava quadro`,
        },
        tags: ['mito_perigoso', 'risco_morte'],
      },
      {
        id: 'c3',
        label: 'Suspender por 5 dias + exigir busca imediata',
        score: 15,
        feedback: {
          immediate: '❌ Punição antes de saúde. Inverte prioridades.',
          analysis: `Prioridade 1: Salvar vida (SAMU). Prioridade 2: Tratamento (CAPS-AD). Medida educativa vem depois.`,
          consequences: `⚠️ Estudante pode morrer antes de responsável chegar\n⚠️ Punição não trata dependência`,
        },
        tags: ['inverte_prioridades'],
      },
    ],
  },
];
// ============================================
// DESAFIOS PEDAGÓGICOS (3 cenários)
// ============================================

const casesDesafiosPedagogicos: SimulatorCase[] = [
  {
    id: 'severe_learning_gap',
    title: 'Defasagem Severa - Não Alfabetizado no 6º Ano',
    icon: '📚',
    category: 'desafios_pedagogicos',
    difficulty: 'intermediario',
    estimatedTime: 7,
    situation: 'Estudante do 6º ano não consegue ler frases simples. Avaliação diagnóstica revela nível de 2º ano. Histórico mostra aprovação automática sem acompanhamento. Está envergonhado e evita atividades escritas.',
    context: {
      grade: '6º',
      gradeSection: 'C',
      classSize: 32,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'defasagem idade-série, pandemia COVID agravou, aprovação automática sem suporte',
    },
    hints: [
      '🔍 Defasagem não é "burrice" - é falha sistêmica',
      '🔍 PIA (Plano Individual de Aprendizagem) + reforço estruturado',
    ],
    createdAt: '2026-03-04T23:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'PIA estruturado + reforço específico + avaliação adaptada',
        score: 92,
        feedback: {
          immediate: '✅ Correto! Abordagem individualizada e digna.',
          analysis: `Você criou caminho de aprendizagem realista:\n✅ PIA (objetivos adaptados ao nível real)\n✅ Reforço 3x/semana (alfabetização)\n✅ Avaliação por nível, não por série\n✅ Sem constrangimento público`,
          protocol: `PIA para defasagem severa:\n1. Avaliação diagnóstica precisa\n2. Objetivos: alfabetização funcional (1º trimestre)\n3. Reforço: 3x/semana, 90min (contraturno)\n4. Material adaptado (livros nível 2º ano)\n5. Avaliação processual (não comparativa)\n6. Acompanhamento psicopedagógico\n7. Parceria com família (orientação)\n8. Meta: 2 anos para equiparação`,
          consequences: `✅ Estudante progride sem vergonha\n✅ Aprendizagem real (não "empurrado")\n✅ Autoestima recuperada\n✅ 85% atingem alfabetização em 18 meses`,
        },
        tags: ['individualizacao', 'protocolar', 'pia'],
      },
      {
        id: 'c2',
        label: 'Reter na mesma série para "refazer"',
        score: 30,
        feedback: {
          immediate: '⚠️ Parcialmente correto, mas estigmatizante.',
          analysis: `Retenção sem suporte = repetir falha. Estudante envelhece entre colegas menores.`,
          consequences: `⚠️ Evasão aumenta 40% após retenção\n⚠️ Autoestima piora\n⚠️ Não garante aprendizagem`,
        },
        tags: ['retencao_sem_suporte'],
      },
      {
        id: 'c3',
        label: 'Aprovar para próxima série "para não atrasar mais"',
        score: 10,
        feedback: {
          immediate: '❌ Empurra problema adiante. "Aprovação social" sem aprendizado.',
          analysis: `Estudante chega ao 9º ano sem ler. Evade com 15 anos.`,
          consequences: `❌ Defasagem se aprofunda\n❌ Frustração acumula\n❌ Evasão garantida`,
        },
        tags: ['aprovacao_automatica', 'inadequada'],
      },
    ],
  },
  {
    id: 'chronic_absenteeism',
    title: 'Absenteísmo Crônico - Risco de Evasão',
    icon: '🚪',
    category: 'desafios_pedagogicos',
    difficulty: 'intermediario',
    estimatedTime: 6,
    situation: 'Estudante de 7º ano faltou 18 dias em 2 meses (45% de ausência). Quando vem, chega atrasado. Mãe trabalha longe, sai antes dele acordar. Ele alega "não vejo sentido em vir".',
    context: {
      grade: '7º',
      gradeSection: 'B',
      classSize: 29,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'falta de supervisão adulta, desmotivação escolar, transporte precário',
      riskLevel: 'alto',
    },
    hints: [
      '🔍 >15% ausência = risco crítico de evasão (UNESCO)',
      '🔍 Busca ativa + CT + engajamento pedagógico',
    ],
    createdAt: '2026-03-04T23:45:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Busca ativa + CT + projeto de engajamento personalizado',
        score: 90,
        feedback: {
          immediate: '✅ Correto! Abordagem multifatorial.',
          analysis: `Você atacou:\n✅ Supervisão (CT orienta família)\n✅ Logística (vale-transporte, merenda reforçada)\n✅ Sentido (projeto conectado a interesses)\n✅ Acompanhamento mensal`,
          protocol: `Combate ao absenteísmo:\n1. Busca ativa: visita domiciliar (professor + coordenação)\n2. CT: orientar mãe sobre supervisão\n3. Diagnóstico: "O que te faria querer vir?"\n4. Projeto de interesse (esporte, música, tecnologia)\n5. Mentor estudantil (aluno veterano)\n6. Flexibilização: reposição de conteúdo\n7. Monitoramento semanal de frequência`,
          consequences: `✅ 72% retornam após busca ativa\n✅ Estudante encontra pertencimento\n✅ Risco de evasão reduz 60%`,
        },
        tags: ['busca_ativa', 'engajamento', 'protocolar'],
      },
      {
        id: 'c2',
        label: 'Comunicar apenas formalmente (carta registrada)',
        score: 40,
        feedback: {
          immediate: '⚠️ Burocrático demais. Não resolve raiz do problema.',
          analysis: `Carta registrada cumpre lei, mas não reconecta estudante.`,
          consequences: `⚠️ Família recebe, mas não muda dinâmica\n⚠️ Absenteísmo continua`,
        },
        tags: ['burocratico_sem_afeto'],
      },
      {
        id: 'c3',
        label: 'Aguardar completar 20% para "dar baixa por abandono"',
        score: 5,
        feedback: {
          immediate: '❌ Omissão. Escola tem dever de busca ativa (CF Art. 208).',
          analysis: `Permitir evasão = violar direito à educação.`,
          consequences: `❌ Estudante evade aos 13 anos\n❌ Vida comprometida\n❌ Escola viola lei`,
        },
        tags: ['omissao', 'violacao_constitucional'],
      },
    ],
  },
  {
    id: 'demotivation_apathy',
    title: 'Desmotivação Coletiva - Turma Apática',
    icon: '😑',
    category: 'desafios_pedagogicos',
    difficulty: 'basico',
    estimatedTime: 5,
    situation: 'Uma turma de 8º ano está completamente apática. Ninguém participa, fazem mínimo necessário, conversam durante explicações. Dizem "isso não serve pra nada". Professores rotulam como "turma problema".',
    context: {
      grade: '8º',
      gradeSection: 'D',
      classSize: 31,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'adolescência, desconexão currículo-realidade, professores desanimados',
    },
    hints: [
      '🔍 Apatia não é preguiça - é sintoma de desconexão',
      '🔍 Metodologias ativas + protagonismo estudantil',
    ],
    createdAt: '2026-03-05T00:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Projeto de escuta + metodologias ativas + protagonismo estudantil',
        score: 88,
        feedback: {
          immediate: '✅ Correto! Você reconheceu desconexão pedagógica.',
          analysis: `Apatia = sintoma de currículo descontextualizado:\n✅ Escuta: "O que vocês querem aprender?"\n✅ Metodologias ativas (PBL, sala invertida)\n✅ Protagonismo (estudantes propõem projetos)\n✅ Professores reanimados com nova abordagem`,
          protocol: `Reengajamento de turma apática:\n1. Roda de escuta: O que importa para vocês?\n2. Conectar conteúdo com realidade (ZL-SP)\n3. Projetos escolha (ex: podcast, documentário)\n4. Avaliação processual (não só prova)\n5. Celebração de conquistas (pequenas)\n6. Formação professores (metodologias ativas)\n7. Acompanhamento trimestral`,
          consequences: `✅ Participação aumenta 65%\n✅ Professores recuperam motivação\n✅ Turma deixa de ser "problema"\n✅ Aprendizagem significativa`,
        },
        tags: ['metodologias_ativas', 'escuta', 'protagonismo'],
      },
      {
        id: 'c2',
        label: 'Reforçar disciplina (advertências, suspensões)',
        score: 25,
        feedback: {
          immediate: '❌ Punição não gera motivação. Agrava resistência.',
          analysis: `Adolescentes resistem mais quando controlados externamente.`,
          consequences: `⚠️ Apatia vira revolta\n⚠️ Evasão aumenta`,
        },
        tags: ['punicao_inadequada'],
      },
      {
        id: 'c3',
        label: 'Aceitar como "realidade dessa turma"',
        score: 15,
        feedback: {
          immediate: '❌ Resignação. Naturaliza fracasso escolar.',
          analysis: `"Turma problema" é rótulo que perpetua ciclo de baixa expectativa.`,
          consequences: `❌ Profecia autorrealizável\n❌ Estudantes internalizam "não sou capaz"`,
        },
        tags: ['resignacao', 'baixa_expectativa'],
      },
    ],
  },
];
// ============================================
// FAMÍLIA & RESPONSABILIZAÇÃO (3 cenários)
// ============================================

const casesFamiliaResponsabilizacao: SimulatorCase[] = [
  {
    id: 'family_refuses_psychological_referral',
    title: 'Família Recusa Encaminhamento Psicológico',
    icon: '🏠',
    category: 'familia_responsabilizacao',
    difficulty: 'intermediario',
    estimatedTime: 7,
    situation: 'Estudante de 7º ano apresenta sinais graves: automutilação, isolamento, queda brusca no desempenho. Coordenação propõe encaminhamento ao CAPS. Pai recusa: "Psicólogo é coisa de louco. Ele só precisa de disciplina".',
    context: {
      grade: '7º',
      gradeSection: 'B',
      classSize: 28,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'estigma sobre saúde mental, desconhecimento sobre direitos',
    },
    hints: [
      '🔍 Quando há risco, escola pode acionar CT mesmo sem anuência familiar',
      '🔍 Dialogar com empatia, mas não paralisa ação protetiva',
    ],
    createdAt: '2026-03-05T00:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Conversa educativa sobre saúde mental + se recusa persiste, acionar CT',
        score: 92,
        feedback: {
          immediate: '✅ Correto! Balanceou diálogo e proteção.',
          analysis: `Você tentou construir aliança com família:\n✅ Primeira abordagem: educativa (desmistificar)\n✅ Explicou: "Não é loucura, é sofrimento"\n✅ Persistindo recusa + risco grave = CT\n✅ CT pode determinar acompanhamento obrigatório`,
          protocol: `Protocolo de recusa familiar:\n1. Reunião com família (coordenação + psicólogo escolar)\n2. Apresentar evidências objetivas (sem alarmar)\n3. Desmistificar: "CAPS ≠ manicômio"\n4. Oferecer acompanhar primeira consulta\n5. Prazo: 7 dias para família decidir\n6. Persistindo recusa + risco grave = CT notificado\n7. CT pode determinar medida protetiva (ECA Art. 101)`,
          consequences: `✅ 60% das famílias aceitam após orientação\n✅ CT age quando família não protege\n✅ Estudante não fica desamparado\n✅ Escola cumpre dever de proteção`,
        },
        tags: ['dialogo', 'protecao_subsidiaria', 'eca'],
      },
      {
        id: 'c2',
        label: 'Respeitar decisão familiar e não fazer mais nada',
        score: 15,
        feedback: {
          immediate: '❌ Omissão grave. ECA Art. 13 obriga comunicação em risco.',
          analysis: `Automutilação = risco grave. Escola não pode se omitir porque família recusa.`,
          consequences: `❌ Estudante em risco sem proteção\n❌ Escola viola dever legal\n❌ Possível agravamento (tentativa de suicídio)`,
        },
        tags: ['omissao', 'violacao_eca'],
      },
      {
        id: 'c3',
        label: 'Acionar CT imediatamente sem tentar diálogo',
        score: 45,
        feedback: {
          immediate: '⚠️ Correto em proteger, mas precipitado. Perde oportunidade de parceria.',
          analysis: `CT é ultima ratio quando família não colabora. Tentar construir aliança primeiro preserva relação escola-família.`,
          consequences: `⚠️ Família se sente "atacada"\n⚠️ Dificulta colaboração futura\n⚠️ Melhor: diálogo + prazo + CT se necessário`,
        },
        tags: ['precipitado', 'rompe_vinculo'],
      },
    ],
  },
  {
    id: 'aggressive_parent_confrontation',
    title: 'Responsável Agressivo em Reunião',
    icon: '😡',
    category: 'familia_responsabilizacao',
    difficulty: 'intermediario',
    estimatedTime: 6,
    situation: 'Pai chega alterado em reunião sobre desempenho do filho. Grita com professora: "Você que não sabe ensinar! Meu filho não é burro!". Outros responsáveis ficam constrangidos. Ameaça "falar com diretoria sobre sua incompetência".',
    context: {
      grade: '5º',
      gradeSection: 'A',
      classSize: 26,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'estresse familiar, defesa do filho como autodefesa',
    },
    hints: [
      '🔍 Agressividade muitas vezes é manifestação de impotência/medo',
      '🔍 Protocolo: acolher emoção + proteger profissional + retomar em privado',
    ],
    createdAt: '2026-03-05T00:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Interromper respeitosamente + convidar para conversa privada com coordenação',
        score: 90,
        feedback: {
          immediate: '✅ Excelente! Protegeu profissional e manteve abertura ao diálogo.',
          analysis: `Você reconheceu que reunião pública não é espaço para confronto:\n✅ Interrompeu sem revidar agressão\n✅ Validou preocupação: "Vejo que está preocupado"\n✅ Redirecionou: ambiente privado + mediador (coordenação)\n✅ Protegeu outros responsáveis do constrangimento`,
          protocol: `Manejo de responsável agressivo:\n1. Tom calmo: "Entendo sua preocupação"\n2. "Vamos conversar com calma em particular?"\n3. Coordenação presente (mediação + testemunha)\n4. Em privado: escuta ativa + explicação objetiva\n5. Se persiste agressão: encerrar reunião\n6. Registrar em ata (sem julgamentos)\n7. Se ameaça/violência física: acionar segurança/PM`,
          consequences: `✅ 80% se acalmam em ambiente privado\n✅ Professora protegida de exposição\n✅ Diálogo possível em novo contexto\n✅ Demonstra profissionalismo institucional`,
        },
        tags: ['mediacao', 'protocolar', 'protecao_profissional'],
      },
      {
        id: 'c2',
        label: 'Rebater na hora: "O senhor está sendo desrespeitoso"',
        score: 30,
        feedback: {
          immediate: '⚠️ Tecnicamente correto, mas escalada emocional piora situação.',
          analysis: `Confronto direto em público tende a intensificar, não resolver.`,
          consequences: `⚠️ Pai se sente mais atacado\n⚠️ Situação vira "batalha"\n⚠️ Inviabiliza diálogo futuro`,
        },
        tags: ['escalada', 'confronto'],
      },
      {
        id: 'c3',
        label: 'Concordar para acalmar: "O senhor tem razão"',
        score: 20,
        feedback: {
          immediate: '❌ Submissão inadequada. Desautoriza professora e não resolve.',
          analysis: `Concordar por medo cria precedente perigoso: agressão funciona como estratégia.`,
          consequences: `❌ Professora se sente desprotegida\n❌ Pai repete comportamento\n❌ Outros responsáveis aprendem que gritar funciona`,
        },
        tags: ['submissao', 'precedente_perigoso'],
      },
    ],
  },
  {
    id: 'family_overprotection_infantilization',
    title: 'Superproteção Familiar - Infantilização',
    icon: '🛡️',
    category: 'familia_responsabilizacao',
    difficulty: 'basico',
    estimatedTime: 5,
    situation: 'Mãe de estudante do 8º ano resolve todas as tarefas por ele. Leva mochila, pede para professores "não cobrarem tanto". Estudante não participa de trabalhos em grupo "porque a mãe faz melhor". Colegas o excluem por ser "bebê da mamãe".',
    context: {
      grade: '8º',
      gradeSection: 'C',
      classSize: 29,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'superproteção como compensação, filho único, ansiedade parental',
    },
    hints: [
      '🔍 Superproteção impede desenvolvimento de autonomia',
      '🔍 Conversa empática sobre desenvolvimento adolescente',
    ],
    createdAt: '2026-03-05T00:45:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Reunião empática explicando impacto no desenvolvimento + autonomia progressiva',
        score: 88,
        feedback: {
          immediate: '✅ Correto! Abordagem educativa sem culpabilização.',
          analysis: `Você reconheceu boa intenção da mãe, mas redirecionou:\n✅ "Vejo que ama seu filho e quer proteger"\n✅ "Mas adolescência é tempo de desenvolver autonomia"\n✅ Proposta gradual: tarefas com supervisão → independência\n✅ Apoio psicológico escolar (ansiedade parental)`,
          protocol: `Manejo de superproteção:\n1. Reunião sem julgamento: "Seu cuidado é valioso"\n2. Educação: marcos desenvolvimento adolescente\n3. Consequências: dependência, bullying, ansiedade\n4. Plano progressivo:\n   - Semana 1-2: Mãe supervisiona, não faz\n   - Semana 3-4: Estudante faz sozinho, mãe revisa\n   - Semana 5+: Autonomia total\n5. Acompanhamento quinzenal\n6. Grupo de pais (compartilhar experiências)`,
          consequences: `✅ Estudante desenvolve autoconfiança\n✅ Colegas param de excluir\n✅ Mãe aprende a "amar de longe"\n✅ Relação mãe-filho amadurece`,
        },
        tags: ['orientacao_familiar', 'desenvolvimento', 'empatia'],
      },
      {
        id: 'c2',
        label: 'Proibir mãe de fazer tarefas sob pena de zerar nota',
        score: 35,
        feedback: {
          immediate: '⚠️ Punição sem educação. Gera resistência.',
          analysis: `Ameaça pode funcionar pontualmente, mas não muda mentalidade familiar.`,
          consequences: `⚠️ Mãe faz escondido\n⚠️ Não entende POR QUE é prejudicial\n⚠️ Relação escola-família fica hostil`,
        },
        tags: ['punicao_sem_educacao'],
      },
      {
        id: 'c3',
        label: 'Ignorar, pois "é problema familiar"',
        score: 20,
        feedback: {
          immediate: '❌ Omissão. Impacto no aprendizado É responsabilidade escolar.',
          analysis: `Superproteção prejudica desenvolvimento socioemocional e acadêmico - escola deve intervir.`,
          consequences: `❌ Estudante chega à vida adulta sem autonomia\n❌ Bullying se intensifica\n❌ Escola perde oportunidade educativa`,
        },
        tags: ['omissao', 'perde_oportunidade'],
      },
    ],
  },
];
// ============================================
// IDENTIDADE DE GÊNERO & SEXUALIDADE (3 cenários)
// ============================================

const casesIdentidadeGenero: SimulatorCase[] = [
  {
    id: 'transgender_student_name',
    title: 'Estudante Trans - Uso do Nome Social',
    icon: '🏳️‍⚧️',
    category: 'identidade_genero',
    difficulty: 'intermediario',
    estimatedTime: 7,
    situation: 'Estudante designado "menino" ao nascer pede para ser chamado por nome feminino (Júlia) e usar banheiro feminino. Alguns professores se recusam: "Vou chamar pelo nome da certidão". Colegas divididos: alguns apoiam, outros zombam.',
    context: {
      grade: '9º',
      gradeSection: 'A',
      classSize: 30,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'conservadorismo religioso, desinformação sobre transexualidade, bullying LGBTfóbico',
    },
    hints: [
      '🔍 Nome social é DIREITO (Decreto 8.727/2016 + Resolução CNE)',
      '🔍 Banheiro: segurança da estudante em primeiro lugar',
    ],
    createdAt: '2026-03-05T01:00:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Implementar nome social + banheiro adequado + formação para equipe',
        score: 95,
        feedback: {
          immediate: '✅ PERFEITO! Respeitou direitos e promoveu ambiente seguro.',
          analysis: `Você garantiu direitos fundamentais:\n✅ Nome social em chamada, atividades, comunicados (Decreto 8.727/16)\n✅ Banheiro conforme identidade de gênero (Nota Técnica MEC 24/2015)\n✅ Formação para professores (desmistificar transexualidade)\n✅ Conversa com turma (respeito à diversidade)`,
          protocol: `Acolhimento estudante trans:\n1. Reunião privada: validar identidade\n2. Responsáveis: comunicar (se estudante autorizar)\n3. Nome social: incluir em todos sistemas\n4. Banheiro: usar conforme identidade (ou unissex se disponível)\n5. Uniforme: permitir conforme identidade\n6. Formação professores (2h): identidade de gênero\n7. Conversa com turma (com consentimento estudante)\n8. Protocolo anti-LGBTfobia: zero tolerância\n9. Acompanhamento psicológico (se estudante desejar)`,
          consequences: `✅ Estudante se sente respeitada\n✅ Reduz evasão (70% jovens trans evadem sem apoio)\n✅ Equipe aprende sobre diversidade\n✅ Escola cumpre legislação\n✅ Bullying diminui com posicionamento institucional`,
        },
        tags: ['direitos_humanos', 'nome_social', 'protocolar'],
      },
      {
        id: 'c2',
        label: 'Usar nome social só em particular, manter banheiro "de origem"',
        score: 30,
        feedback: {
          immediate: '⚠️ Meio-termo inadequado. Nega identidade publicamente.',
          analysis: `Nome social "escondido" reforça vergonha. Banheiro inadequado expõe a constrangimento/violência.`,
          consequences: `⚠️ Estudante se sente invisibilizada\n⚠️ Colegas não aprendem respeito\n⚠️ Risco de violência no banheiro "de origem"`,
        },
        tags: ['meio_termo_inadequado', 'invisibilizacao'],
      },
      {
        id: 'c3',
        label: 'Recusar: "Só mudamos com retificação na certidão"',
        score: 5,
        feedback: {
          immediate: '❌ ILEGAL. Viola Decreto 8.727/16 e Resolução CNE 12/2015.',
          analysis: `Nome social NÃO depende de retificação judicial. É direito administrativo.`,
          consequences: `❌ Discriminação institucional\n❌ Estudante pode processar escola\n❌ Risco de evasão/suicídio (41% jovens trans tentam sem apoio)\n❌ Ministério Público pode intervir`,
        },
        tags: ['ilegal', 'discriminacao', 'risco_grave'],
      },
    ],
  },
  {
    id: 'lgbtphobic_bullying',
    title: 'Bullying LGBTfóbico',
    icon: '🏳️‍🌈',
    category: 'identidade_genero',
    difficulty: 'intermediario',
    estimatedTime: 6,
    situation: 'Estudante gay do 8º ano é constantemente chamado de "viadinho", "bichinha". Colegas imitam trejeitos, fazem piadas. Ele está isolado, falta frequentemente. Professor de Educação Física permite "brincadeiras" dizendo "é assim mesmo entre meninos".',
    context: {
      grade: '8º',
      gradeSection: 'B',
      classSize: 28,
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'masculinidade tóxica, homofobia normalizada, omissão adulta',
    },
    hints: [
      '🔍 LGBTfobia é violência, não "brincadeira" (Lei 7.716/89)',
      '🔍 Omissão de professor = corresponsabilidade',
    ],
    createdAt: '2026-03-05T01:15:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Intervir imediatamente + responsabilizar agressores + orientar professor',
        score: 93,
        feedback: {
          immediate: '✅ Correto! Posicionamento institucional claro.',
          analysis: `Você não permitiu normalização da violência:\n✅ Interrompeu agressões na hora\n✅ Deixou claro: "Isso é LGBTfobia, é crime"\n✅ Responsabilizou agressores (conversa + pais)\n✅ Orientou professor sobre dever de proteção`,
          protocol: `Combate à LGBTfobia:\n1. Intervenção imediata: "Isso é discriminação"\n2. Vítima: acolhimento + validação\n3. Agressores: conversa individual + responsabilização\n4. Pais agressores: comunicar gravidade (Lei 7.716/89)\n5. Professor omisso: advertência + formação obrigatória\n6. Turma: roda de conversa sobre diversidade\n7. Campanha institucional (Dia do Orgulho, palestras)\n8. Monitoramento 3 meses`,
          consequences: `✅ Vítima se sente protegida\n✅ Agressores entendem gravidade\n✅ Professor aprende responsabilidade\n✅ Cultura escolar muda: intolerância à LGBTfobia`,
        },
        tags: ['anti_lgbtfobia', 'protocolar', 'lei_7716'],
      },
      {
        id: 'c2',
        label: 'Pedir para vítima "não dar bandeira" para evitar conflitos',
        score: 10,
        feedback: {
          immediate: '❌ GRAVE. Culpabiliza vítima e legitima violência.',
          analysis: `"Não dar bandeira" = "se esconda para não ser agredido" = viola dignidade.`,
          consequences: `❌ Reforça: "problema é ser gay, não agredir"\n❌ Vítima internaliza culpa\n❌ Agressores entendem que violência é tolerada`,
        },
        tags: ['culpabilizacao_vitima', 'inadmissivel'],
      },
      {
        id: 'c3',
        label: 'Ignorar como "parte da adolescência"',
        score: 5,
        feedback: {
          immediate: '❌ Omissão criminosa. Escola tem dever de proteção.',
          analysis: `LGBTfobia não é "fase" - é violência com impactos graves (evasão, depressão, suicídio).`,
          consequences: `❌ 73% jovens LGBTQIA+ em escolas hostis desenvolvem depressão\n❌ Risco de suicídio 5x maior\n❌ Escola corresponsável`,
        },
        tags: ['omissao', 'corresponsabilidade'],
      },
    ],
  },
  {
    id: 'sex_education_family_resistance',
    title: 'Educação Sexual - Resistência Familiar',
    icon: '📚',
    category: 'identidade_genero',
    difficulty: 'avancado',
    estimatedTime: 8,
    situation: 'Escola planeja palestra sobre diversidade sexual e prevenção de ISTs para 9º ano. Grupo de pais organiza abaixo-assinado: "Isso é ideologia de gênero. Querem transformar nossos filhos em gays". Ameaçam retirar estudantes no dia.',
    context: {
      grade: '9º',
      gradeSection: 'múltiplas',
      classSize: '120 estudantes',
      location: 'Zona Leste de São Paulo',
      populationCharacteristic: 'conservadorismo religioso, desinformação sobre educação sexual, pânico moral',
    },
    hints: [
      '🔍 Educação sexual é obrigatória (Lei 9.394/96 LDB + PCN)',
      '🔍 "Ideologia de gênero" não existe - é desinformação',
    ],
    createdAt: '2026-03-05T01:30:00-03:00',
    choices: [
      {
        id: 'c1',
        label: 'Reunião informativa com pais + manter palestra (é direito educacional)',
        score: 90,
        feedback: {
          immediate: '✅ Correto! Dialogou mas manteve compromisso educacional.',
          analysis: `Você equilibrou diálogo e firmeza institucional:\n✅ Reunião prévia: explicar objetivos (saúde, respeito, prevenção)\n✅ Desmistificar: "Não é conversão, é informação"\n✅ Base legal: LDB + PCN obrigam educação sexual\n✅ Palestra mantida: direito dos estudantes à informação`,
          protocol: `Manejo de resistência à educação sexual:\n1. Reunião pré-palestra com responsáveis\n2. Apresentar: conteúdo, metodologia, palestrante\n3. Esclarecer mitos: "Não muda orientação sexual"\n4. Base científica: OMS, UNESCO, Ministério da Saúde\n5. Base legal: LDB Art. 26 (temas transversais)\n6. Oferecer: pais podem assistir\n7. Manter palestra (é currículo obrigatório)\n8. Diálogo pós: avaliar com estudantes`,
          consequences: `✅ 80% dos pais se tranquilizam após esclarecimentos\n✅ Estudantes acessam informações essenciais\n✅ Reduz gravidez precoce, ISTs\n✅ Escola cumpre função educativa`,
        },
        tags: ['dialogo_firmeza', 'direito_educacional', 'protocolar'],
      },
      {
        id: 'c2',
        label: 'Cancelar palestra para "não causar conflito"',
        score: 20,
        feedback: {
          immediate: '❌ Capitulação. Nega direito educacional por pressão.',
          analysis: `Ceder à desinformação impede estudantes de acessar informação científica.`,
          consequences: `❌ Estudantes sem educação sexual ficam vulneráveis\n❌ Gravidez precoce aumenta 40%\n❌ ISTs não são prevenidas\n❌ Escola abandona função educativa`,
        },
        tags: ['capitulacao', 'nega_direitos'],
      },
      {
        id: 'c3',
        label: 'Realizar palestra sem avisar famílias',
        score: 35,
        feedback: {
          immediate: '⚠️ Correto em manter, mas erro estratégico. Gera conflito desnecessário.',
          analysis: `Transparência prévia constrói confiança. Surpresa alimenta desconfiança.`,
          consequences: `⚠️ Pais se sentem traídos\n⚠️ Amplifica conflito\n⚠️ Melhor: informar + dialogar + manter`,
        },
        tags: ['falta_transparencia', 'erro_estrategico'],
      },
    ],
  },
];


// ============================================
// EXPORTAÇÃO FINAL
// ============================================

export const simulatorCases: SimulatorCase[] = [
  ...casesSaudeMental,
  ...casesSegurancaDigital,
  ...casesInclusao,
  ...casesConvivencia,
  ...casesProtecaoInfantil,
  ...casesDrogasSubstancias,
  ...casesDesafiosPedagogicos,
  ...casesFamiliaResponsabilizacao,
  ...casesIdentidadeGenero,
];

export const CASES_SUMMARY = {
  total: simulatorCases.length,
  byCategory: {
    saude_mental: casesSaudeMental.length,
    seguranca_digital: casesSegurancaDigital.length,
    inclusao: casesInclusao.length,
    convivencia: casesConvivencia.length,
    protecao_infantil: casesProtecaoInfantil.length,
    drogas_substancias: casesDrogasSubstancias.length,
    desafios_pedagogicos: casesDesafiosPedagogicos.length,
    familia_responsabilizacao: casesFamiliaResponsabilizacao.length,
    identidade_genero: casesIdentidadeGenero.length,
  },
  byDifficulty: {
    basico: simulatorCases.filter(c => c.difficulty === 'basico').length,
    intermediario: simulatorCases.filter(c => c.difficulty === 'intermediario').length,
    avancado: simulatorCases.filter(c => c.difficulty === 'avancado').length,
  },
  lastUpdated: '2026-03-05T01:30:00-03:00',
  version: '2.1.0-refactored',
};
