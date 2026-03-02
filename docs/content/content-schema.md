# Schema de Conteúdo — B-SSOLA MVP
Gerado em: 2026-03-02
Branch: New | Commit: [hash]

## GLOSSÁRIO
Arquivo: `src/features/resources/data/glossary.ts`
Interface:
```ts
export interface GlossaryItem {
  term: string;
  definition: string;
  category: 'Protocolo' | 'Legal' | 'Rede de Proteção' | 'Gírias Estudantis' | 'Saúde';
  context?: string;
}
```
Campos seguros para edição: `term`, `definition`, `context` (conteúdo textual).
Campos PROIBIDOS: `category` (controla filtros da UI e união de categorias).
Limite de caracteres por campo: `term`: 23, `definition`: 143, `category`: 17, `context`: 73
Markdown suportado: `term`: NÃO, `definition`: NÃO, `category`: NÃO, `context`: NÃO
Entradas existentes: 16

## FAQ
Arquivo: `src/features/resources/data/faq.ts`
Interface:
```ts
export interface FAQItem {
  question: string;
  answer: string;
  category: 'Geral' | 'Uso do App' | 'Protocolos' | 'Docentes';
}
```
Campos seguros para edição: `question`, `answer` (texto).
Campos PROIBIDOS: `category` (alimenta filtro por categoria no FAQPage).
Limite de caracteres por campo: `question`: 62, `answer`: 254, `category`: 10
Markdown suportado: `question`: NÃO, `answer`: NÃO, `category`: NÃO
Entradas existentes: 7
Categorias disponíveis: Geral, Uso do App, Protocolos, Docentes

## SIMULATOR
Arquivo: `src/features/resources/data/simulatorCases.ts` + render em `src/features/resources/SimulatorPage.tsx`
Interface:
```ts
export interface SimulatorChoice {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface SimulatorCase {
  id: string;
  title: string;
  situation: string;
  icon: string;
  choices: SimulatorChoice[];
}
```
Campos seguros para edição: `title`, `situation`, `icon`, `choices[].label`, `choices[].feedback`.
Campos PROIBIDOS: `id`, `choices[].id`, `choices[].isCorrect` (governam seleção/avaliação do simulador).
Limite de caracteres por campo: `id`: 20, `title`: 27, `situation`: 168, `icon`: 2, `label`: 76, `feedback`: 156
Markdown suportado: `title`: NÃO, `situation`: NÃO, `label`: NÃO, `feedback`: NÃO
Entradas existentes: 3
Acoplamento com flows reais: NÃO
Se NÃO — estrutura independente: casos estáticos em `simulatorCases.ts`, com estado local (`selection`/`case`/`result`) e avaliação por `isCorrect`.

## BLOCO 1 — EXTRAÇÕES DE RENDERIZAÇÃO
- Glossário renderiza `Card` por item (`<Card ...>`), termo em `<h3>` e definição em `<p>`, com badges por categoria.
- Truncamento visual: apenas na seleção de cenários do simulador (`line-clamp-1` em `SimulatorPage`), não no texto do glossário.
- Busca do glossário: por `term` e `definition`; chave de render atual é índice do map.
- Paginação/infinite scroll: não há; apenas lista filtrada.
- FAQ: renderização em accordion próprio com `<button>` + div de conteúdo (`max-h`/`opacity` para abrir/fechar).
- Links em resposta FAQ: NÃO suportados (resposta renderizada como texto em `<p>`; sem `<a>`, `<Link>` ou HTML injetado).
- FAQ tem filtro por categoria e busca por `question`/`answer`.
- Simulator usa cenários importados de `./data/simulatorCases` (não hardcoded inline).
- Simulator usa `flowId` real: NÃO.
- Simulação independente do motor real: SIM.
- Professor pode interagir: SIM, selecionando cenário e clicando condutas (`choices`).

### Exemplo completo de cenário (simulatorCases)
```ts
{
    id: 'bullying_digital',
    title: 'Cyberbullying no 9º Ano',
    situation: 'Um grupo de alunos criou um perfil falso para ridicularizar um colega com montagens ofensivas. A vítima está visivelmente abalada e se recusa a entrar na sala de aula.',
    icon: '📱',
    choices: [
      {
        id: 'c1',
        label: 'Aconselhar o aluno a ignorar e focar nos estudos.',
        isCorrect: false,
        feedback: 'Incorreto. O cyberbullying tem impactos psicológicos graves e requer intervenção institucional imediata para proteger a vítima e responsabilizar os autores.'
      },
      {
        id: 'c2',
        label: 'Acolher o aluno em local reservado e acionar a coordenação pedagógica.',
        isCorrect: true,
        feedback: 'Correto! O acolhimento protege o estudante e a coordenação deve iniciar o protocolo de mediação e registro, envolvendo as famílias se necessário.'
      },
      {
        id: 'c3',
        label: 'Exigir que o aluno mostre o celular para identificar os culpados na hora.',
        isCorrect: false,
        feedback: 'Incorreto. Embora a identificação seja importante, a prioridade é o acolhimento. A investigação deve ser feita pela gestão seguindo os ritos adequados.'
      }
    ]
  },
```

## BLOCO 1A — Conteúdo completo dos arquivos de recursos
### src/features/resources/data/glossary.ts
```ts
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
```
### src/features/resources/data/faq.ts
```ts
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
```
### src/features/resources/data/simulatorCases.ts
```ts
export interface SimulatorChoice {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface SimulatorCase {
  id: string;
  title: string;
  situation: string;
  icon: string;
  choices: SimulatorChoice[];
}

export const simulatorCases: SimulatorCase[] = [
  {
    id: 'bullying_digital',
    title: 'Cyberbullying no 9º Ano',
    situation: 'Um grupo de alunos criou um perfil falso para ridicularizar um colega com montagens ofensivas. A vítima está visivelmente abalada e se recusa a entrar na sala de aula.',
    icon: '📱',
    choices: [
      {
        id: 'c1',
        label: 'Aconselhar o aluno a ignorar e focar nos estudos.',
        isCorrect: false,
        feedback: 'Incorreto. O cyberbullying tem impactos psicológicos graves e requer intervenção institucional imediata para proteger a vítima e responsabilizar os autores.'
      },
      {
        id: 'c2',
        label: 'Acolher o aluno em local reservado e acionar a coordenação pedagógica.',
        isCorrect: true,
        feedback: 'Correto! O acolhimento protege o estudante e a coordenação deve iniciar o protocolo de mediação e registro, envolvendo as famílias se necessário.'
      },
      {
        id: 'c3',
        label: 'Exigir que o aluno mostre o celular para identificar os culpados na hora.',
        isCorrect: false,
        feedback: 'Incorreto. Embora a identificação seja importante, a prioridade é o acolhimento. A investigação deve ser feita pela gestão seguindo os ritos adequados.'
      }
    ]
  },
  {
    id: 'suspeita_maus_tratos',
    title: 'Marcas Suspeitas',
    situation: 'Durante a aula de Educação Física, você percebe hematomas lineares nos braços de uma criança do 3º ano. Ao ser questionada, a criança fica em silêncio e demonstra medo.',
    icon: '🛡️',
    choices: [
      {
        id: 'c1',
        label: 'Ligar diretamente para os pais para questionar a origem das marcas.',
        isCorrect: false,
        feedback: 'Incorreto. Se houver suspeita de violência doméstica, avisar os pais pode colocar a criança em risco ainda maior antes da intervenção das autoridades.'
      },
      {
        id: 'c2',
        label: 'Comunicar a direção para que o Conselho Tutelar seja acionado (ECA Art. 13).',
        isCorrect: true,
        feedback: 'Correto! Em casos de suspeita de maus-tratos, a escola tem o dever legal de comunicar o Conselho Tutelar em até 24 horas.'
      },
      {
        id: 'c3',
        label: 'Aguardar o próximo dia para ver se as marcas desaparecem.',
        isCorrect: false,
        feedback: 'Incorreto. A omissão em casos de violência infantil é grave. A dúvida deve sempre favorecer a proteção da criança.'
      }
    ]
  },
  {
    id: 'crise_ansiedade',
    title: 'Crise de Ansiedade em Prova',
    situation: 'Um estudante começa a hiperventilar, tremer e chorar compulsivamente minutos antes de uma avaliação importante, dizendo que não consegue respirar.',
    icon: '🧠',
    choices: [
      {
        id: 'c1',
        label: 'Retirar o aluno da sala para um ambiente calmo e oferecer água.',
        isCorrect: true,
        feedback: 'Correto! O primeiro passo é o acolhimento e a redução do estímulo estressor, garantindo que o aluno se sinta seguro.'
      },
      {
        id: 'c2',
        label: 'Dizer para o aluno se acalmar, pois a prova é simples e ele estudou.',
        isCorrect: false,
        feedback: 'Incorreto. Minimizar o sofrimento do aluno pode aumentar a ansiedade. Crises de pânico requerem validação e suporte, não julgamento.'
      },
      {
        id: 'c3',
        label: 'Chamar o SAMU imediatamente sem tentar conversar com o aluno.',
        isCorrect: false,
        feedback: 'Incorreto. Embora casos graves possam exigir suporte médico, a maioria das crises de ansiedade pode ser estabilizada com acolhimento inicial na escola.'
      }
    ]
  }
];
```
## FLOWS (campos editáveis)
Total de flows: 32
Campos SEGUROS: `meta.title`, `meta.keywords[]`, `questions[].text`, `questions[].options[].label`, `results.*.summaryTag`, `results.*.schoolActions[]` (texto exibido).
Campos PROIBIDOS: `meta.id`, `meta.type`, `meta.categoryId`, `meta.subcategoryId`, `questions[].id`, `questions[].options[].next`, `questions[].options[].level`, chaves de `results`, `results.*.severity`, `results.*.notifyManagement`, `results.*.primaryService`, `results.*.secondaryService`, `results.*.uiFlags`.
- Justificativa técnica (consumo): `processAnswer` usa `questions[].id`, `options[].label`, `options[].next`, `options[].level` e lê `results[level]`; `initFlow` usa `meta.id`. `enrichPremium` usa `meta.type`, `schoolActions`, `primaryService`, `secondaryService`. `applyRiskHeuristics` usa `meta.type`. `runDecision` usa `flow.meta.id` em telemetria. `composeModelV2` valida/normaliza `meta.id`, `categoryId`, `subcategoryId`, `status/severity` do registro.
Formato de resultados: objeto `results` com chaves de nível em PT-BR (principalmente `baixo|moderado|alto|iminente`), cada entrada contendo `severity`, `primaryService`, `secondaryService`, `schoolActions`, `summaryTag`, opcionais (`notifyManagement`, `uiFlags`). Não há chave `critical` literal nos JSON atuais.

## BLOCO 2 — Inventário completo de flows
Diretório de flows JSON: `src/data/v2/flows/`
Arquivos `.json` em `src/data/`:
- `src/data/flows.v2.json`
- `src/data/model.v1.json`
- `src/data/model.v2.extensions.json`
- `src/data/model.v2.json`
- `src/data/v2/categories.json`
- `src/data/v2/emergency.json`
- `src/data/v2/flows/abandono.json`
- `src/data/v2/flows/abuso_sexual.json`
- `src/data/v2/flows/acidente_escolar.json`
- `src/data/v2/flows/adaptacao_pedagogica.json`
- `src/data/v2/flows/agressao_fisica.json`
- `src/data/v2/flows/agressao_verbal.json`
- `src/data/v2/flows/ansiedade.json`
- `src/data/v2/flows/autolesao.json`
- `src/data/v2/flows/barreira_acessibilidade.json`
- `src/data/v2/flows/bullying.json`
- `src/data/v2/flows/convulsao.json`
- `src/data/v2/flows/depressao.json`
- `src/data/v2/flows/discriminacao.json`
- `src/data/v2/flows/evasao.json`
- `src/data/v2/flows/febre.json`
- `src/data/v2/flows/ideacao_suicida.json`
- `src/data/v2/flows/incendio.json`
- `src/data/v2/flows/inseguranca_alimentar.json`
- `src/data/v2/flows/lgbtfobia.json`
- `src/data/v2/flows/mal_estar.json`
- `src/data/v2/flows/mediacao_restaurativa.json`
- `src/data/v2/flows/negligencia.json`
- `src/data/v2/flows/plano_individual_acompanhamento.json`
- `src/data/v2/flows/porte_objeto.json`
- `src/data/v2/flows/reintegracao_pos_suspensao.json`
- `src/data/v2/flows/risco_estrutural.json`
- `src/data/v2/flows/suspeita_neurodivergencia.json`
- `src/data/v2/flows/trabalho_infantil.json`
- `src/data/v2/flows/uso_substancias.json`
- `src/data/v2/flows/violacao_direitos.json`
- `src/data/v2/flows/violencia_armada.json`
- `src/data/v2/flows/violencia_domestica.json`
- `src/data/v2/heuristics.json`
- `src/data/v2/map-tiles.json`
- `src/data/v2/network-config.json`
- `src/data/v2/services.json`
### src/data/v2/flows/abandono.json
title: "Abandono ou Situacao de Rua"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "creas-ermelino", "name": "CREAS"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Comunicar gestao imediatamente"]}
critical: {"severity": "iminente", "primaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "secondaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "schoolActions": ["Garantir protecao imediata"]}

### src/data/v2/flows/abuso_sexual.json
title: "Suspeita de Abuso Sexual"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "secondaryService": {"id": "creas-ermelino", "name": "CREAS Ermelino Matarazzo"}, "schoolActions": ["Acionar gestao imediatamente (minimas pessoas necessarias)", "Garantir escuta protegida e sem insistencia em detalhes", "Manter sigilo reforcado e minimizacao de dados"], "uiFlags": {"confidential": true, "showGuardrail": true, "avoidRetraumatization": true}}
critical: {"severity": "iminente", "primaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Priorizar seguranca fisica imediata", "Acionar 190 se houver risco atual", "Acionar gestao imediatamente"], "uiFlags": {"confidential": true, "showGuardrail": true, "avoidRetraumatization": true}}

### src/data/v2/flows/acidente_escolar.json
title: "Acidente Escolar"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: {"severity": "moderado", "primaryService": {"id": "ubs-ermelino", "name": "UBS Ermelino"}, "secondaryService": null, "schoolActions": ["Primeiros socorros basicos", "Comunicar responsavel"]}
high: {"severity": "alto", "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h"}, "secondaryService": null, "schoolActions": ["Encaminhar para avaliacao urgente"]}
critical: {"severity": "iminente", "primaryService": {"id": "samu", "name": "SAMU - 192"}, "secondaryService": {"id": "upa-ermelino", "name": "UPA III 24h Ermelino Matarazzo"}, "schoolActions": ["Acionar emergencia imediatamente"]}

### src/data/v2/flows/adaptacao_pedagogica.json
title: "Necessidade de Adaptacao Pedagogica"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Plano de adaptacao individual", "Revisao trimestral"]}
moderate: (não existe)
high: (não existe)
critical: (não existe)

### src/data/v2/flows/agressao_fisica.json
title: "Agressao Fisica entre Estudantes"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: {"severity": "moderado", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar - E.E. Ermelino Matarazzo"}, "secondaryService": null, "schoolActions": ["Separar envolvidos", "Registrar ocorrencia institucional", "Acionar responsaveis para acompanhamento"]}
high: {"severity": "alto", "notifyManagement": true, "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h Ermelino Matarazzo"}, "secondaryService": {"id": "samu", "name": "SAMU - 192"}, "schoolActions": ["Avaliacao medica imediata", "Garantir protecao fisica dos estudantes", "Comunicar responsaveis e registrar encaminhamento"]}
critical: (não existe)

### src/data/v2/flows/agressao_verbal.json
title: "Agressao Verbal ou Ameacas"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Realizar mediacao de conflito", "Orientar estudantes sobre convivencia respeitosa", "Monitorar reincidencia"]}
moderate: {"severity": "moderado", "notifyManagement": true, "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Registrar formalmente a ocorrencia", "Comunicar responsaveis", "Definir plano de acompanhamento com a equipe escolar"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/ansiedade.json
title: "Ansiedade Intensa"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Escuta ativa", "Orientar estrategias de regulacao emocional"]}
moderate: {"severity": "moderado", "primaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Escuta qualificada", "Contato com responsavel"]}
high: {"severity": "alto", "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h"}, "secondaryService": {"id": "samu", "name": "SAMU - 192"}, "schoolActions": ["Monitorar sinais vitais", "Nao deixar estudante sozinho"]}
critical: (não existe)

### src/data/v2/flows/autolesao.json
title: "Autolesao"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II Ermelino Matarazzo"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Nao deixar estudante sozinho", "Escuta ativa qualificada"]}
critical: {"severity": "iminente", "primaryService": {"id": "samu", "name": "SAMU - 192"}, "secondaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil"}, "schoolActions": ["Acionar emergencia", "Garantir supervisao constante"]}

### src/data/v2/flows/barreira_acessibilidade.json
title: "Barreira de Acessibilidade"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Ajuste interno imediato"]}
moderate: {"severity": "moderado", "primaryService": {"id": "diretoria-ensino-leste1", "name": "Diretoria de Ensino Leste 1"}, "secondaryService": null, "schoolActions": ["Solicitar apoio institucional", "Registrar demanda formal"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/bullying.json
title: "Bullying e Cyberbullying"
description: "(não existe)"
totalQuestions: 3
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": null, "secondaryService": null, "schoolActions": ["Realizar escuta inicial com estudante", "Registrar episodio e monitorar recorrencia", "Orientar turma sobre convivencia respeitosa"], "summaryTag": "Convivencia - Intervencao inicial"}
moderate: {"severity": "moderado", "primaryService": null, "secondaryService": null, "schoolActions": ["Acionar coordenacao pedagogica e familia", "Conduzir mediacao estruturada com acompanhamento", "Definir plano de protecao e seguimento por periodo letivo"], "summaryTag": "Convivencia - Acompanhamento ativo"}
high: {"severity": "alto", "notifyManagement": true, "primaryService": null, "secondaryService": null, "schoolActions": ["Acionar gestao imediatamente", "Proteger estudante e interromper contato com agressor", "Formalizar encaminhamento institucional e avaliar rede de protecao"], "summaryTag": "Convivencia - Risco elevado"}
critical: (não existe)

### src/data/v2/flows/convulsao.json
title: "Convulsao"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Posicao lateral de seguranca", "Monitorar respiracao"]}
critical: {"severity": "iminente", "primaryService": {"id": "samu", "name": "SAMU - 192"}, "secondaryService": {"id": "upa-ermelino", "name": "UPA III 24h Ermelino Matarazzo"}, "schoolActions": ["Acionar 192 imediatamente", "Nao colocar nada na boca do estudante"]}

### src/data/v2/flows/depressao.json
title: "Tristeza Persistente ou Sintomas Depressivos"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Acompanhamento pedagogico", "Observacao continua"]}
moderate: {"severity": "moderado", "primaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "secondaryService": null, "schoolActions": ["Encaminhamento para avaliacao psicologica", "Comunicar responsaveis"]}
high: {"severity": "alto", "primaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Protecao ativa", "Comunicar gestao imediatamente"]}
critical: (não existe)

### src/data/v2/flows/discriminacao.json
title: "Discriminacao ou Racismo"
description: "(não existe)"
totalQuestions: 3
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Intervencao pedagogica e orientacao imediata", "Apoio ao estudante afetado", "Acordo de convivencia e monitoramento"], "uiFlags": {"confidential": false, "showGuardrail": true}}
moderate: {"severity": "moderado", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Registrar ocorrencia institucional minima", "Comunicar responsaveis quando apropriado", "Plano de acompanhamento e prevencao"], "uiFlags": {"confidential": false, "showGuardrail": true}}
high: {"severity": "alto", "notifyManagement": true, "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": {"id": "creas-ermelino", "name": "CREAS Ermelino Matarazzo"}, "schoolActions": ["Proteger estudante e cessar situacao imediatamente", "Acao institucional com gestao", "Encaminhar para apoio especializado quando necessario"], "uiFlags": {"confidential": true, "showGuardrail": true}}
critical: (não existe)

### src/data/v2/flows/evasao.json
title: "Risco de Evasao Escolar"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Acompanhamento pedagogico", "Contato com responsavel"]}
moderate: {"severity": "moderado", "primaryService": {"id": "cras-ermelino", "name": "CRAS"}, "secondaryService": null, "schoolActions": ["Encaminhar para acompanhamento socioassistencial"]}
high: {"severity": "alto", "primaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "secondaryService": {"id": "creas-ermelino", "name": "CREAS"}, "schoolActions": ["Comunicar gestao imediatamente", "Encaminhamento formal"]}
critical: (não existe)

### src/data/v2/flows/febre.json
title: "Febre ou Suspeita de Infeccao"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "ubs-ermelino", "name": "UBS Ermelino Matarazzo"}, "secondaryService": null, "schoolActions": ["Aguardar retirada por responsavel", "Monitorar temperatura"]}
moderate: {"severity": "moderado", "primaryService": {"id": "ubs-ermelino", "name": "UBS Ermelino Matarazzo"}, "secondaryService": null, "schoolActions": ["Orientar responsavel", "Encaminhar para UBS"]}
high: {"severity": "alto", "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h"}, "secondaryService": {"id": "samu", "name": "SAMU - 192"}, "schoolActions": ["Encaminhamento imediato", "Monitorar sinais vitais"]}
critical: (não existe)

### src/data/v2/flows/ideacao_suicida.json
title: "Ideacao Suicida"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "secondaryService": {"id": "cvv", "name": "CVV - 188"}, "schoolActions": ["Nao deixar estudante sozinho", "Comunicar gestao imediatamente"]}
critical: {"severity": "iminente", "primaryService": {"id": "samu", "name": "SAMU - 192"}, "secondaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "schoolActions": ["Acionar emergencia", "Garantir supervisao constante"]}

### src/data/v2/flows/incendio.json
title: "Incendio ou Principio de Incendio"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: (não existe)
critical: {"severity": "iminente", "primaryService": {"id": "bombeiros", "name": "Corpo de Bombeiros - 193"}, "secondaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "schoolActions": ["Evacuacao imediata", "Seguir plano de abandono"]}

### src/data/v2/flows/inseguranca_alimentar.json
title: "Inseguranca Alimentar"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Orientacao interna", "Acompanhamento"]}
moderate: {"severity": "moderado", "primaryService": {"id": "cras-ermelino", "name": "CRAS"}, "secondaryService": null, "schoolActions": ["Encaminhamento para beneficios socioassistenciais"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/lgbtfobia.json
title: "Discriminacao ou Violencia LGBTQIA+"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Intervencao pedagogica imediata", "Acolhimento e validacao do estudante", "Acordo de convivencia e monitoramento"], "uiFlags": {"confidential": false, "showGuardrail": true}}
moderate: {"severity": "moderado", "notifyManagement": true, "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "schoolActions": ["Acolhimento com escuta qualificada", "Plano de protecao e acompanhamento", "Contato com responsaveis quando apropriado e seguro"], "uiFlags": {"confidential": true, "showGuardrail": true}}
high: {"severity": "alto", "notifyManagement": true, "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": {"id": "creas-ermelino", "name": "CREAS Ermelino Matarazzo"}, "schoolActions": ["Cessar situacao imediatamente e proteger o estudante", "Acionar gestao com confidencialidade", "Encaminhar para apoio especializado quando necessario"], "uiFlags": {"confidential": true, "showGuardrail": true}}
critical: (não existe)

### src/data/v2/flows/mal_estar.json
title: "Mal-estar ou Sintomas Leves"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "ubs-ermelino", "name": "UBS Ermelino Matarazzo"}, "secondaryService": null, "schoolActions": ["Acolher estudante", "Oferecer repouso supervisionado"]}
moderate: {"severity": "moderado", "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h Ermelino Matarazzo"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Comunicar responsaveis", "Encaminhar para avaliacao medica"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/mediacao_restaurativa.json
title: "Mediacao Restaurativa entre Estudantes"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Reuniao mediada com ambas as partes", "Registro pedagogico minimo", "Acompanhamento por 30 dias"]}
moderate: {"severity": "moderado", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Plano formal de reparacao", "Comunicacao aos responsaveis"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/negligencia.json
title: "Negligencia Familiar"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: {"severity": "moderado", "primaryService": {"id": "cras-ermelino", "name": "CRAS Ermelino Matarazzo"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Escuta qualificada", "Contato com responsaveis"]}
high: {"severity": "alto", "primaryService": {"id": "creas-ermelino", "name": "CREAS Ermelino Matarazzo"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Comunicar gestao", "Encaminhamento formal"]}
critical: {"severity": "iminente", "primaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "secondaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "schoolActions": ["Garantir protecao imediata", "Acionar autoridade competente"]}

### src/data/v2/flows/plano_individual_acompanhamento.json
title: "Plano Individual de Acompanhamento"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Monitoramento leve"]}
moderate: {"severity": "moderado", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Construir PIA com metas claras", "Revisao mensal"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/porte_objeto.json
title: "Porte de Objeto Perigoso"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "schoolActions": ["Isolar estudante", "Recolher objeto se seguro", "Comunicar responsaveis"]}
critical: {"severity": "iminente", "primaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "secondaryService": null, "schoolActions": ["Evacuar area", "Acionar 190 imediatamente"]}

### src/data/v2/flows/reintegracao_pos_suspensao.json
title: "Reintegracao apos Suspensao"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Reuniao de reintegracao", "Plano de acompanhamento inicial"]}
moderate: (não existe)
high: (não existe)
critical: (não existe)

### src/data/v2/flows/risco_estrutural.json
title: "Risco Estrutural (queda, rachaduras graves)"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "secondaryService": null, "schoolActions": ["Isolar area afetada"]}
critical: {"severity": "iminente", "primaryService": {"id": "bombeiros", "name": "Corpo de Bombeiros - 193"}, "secondaryService": null, "schoolActions": ["Evacuacao imediata", "Acionar autoridades"]}

### src/data/v2/flows/suspeita_neurodivergencia.json
title: "Suspeita de TEA ou TDAH"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: {"severity": "baixo", "primaryService": {"id": "gestao-coordenacao", "name": "Coordenacao Pedagogica"}, "secondaryService": null, "schoolActions": ["Observacao estruturada"]}
moderate: {"severity": "moderado", "primaryService": {"id": "ubs-ermelino", "name": "UBS Ermelino Matarazzo"}, "secondaryService": {"id": "caps-ij", "name": "CAPS Infantojuvenil II"}, "schoolActions": ["Orientar responsaveis para avaliacao clinica", "Registrar plano pedagogico adaptado"]}
high: (não existe)
critical: (não existe)

### src/data/v2/flows/trabalho_infantil.json
title: "Trabalho Infantil"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "creas-ermelino", "name": "CREAS"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Registro institucional", "Comunicar gestao"]}
critical: {"severity": "iminente", "primaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "secondaryService": {"id": "disque-100", "name": "Disque 100"}, "schoolActions": ["Acionar imediatamente orgao competente"]}

### src/data/v2/flows/uso_substancias.json
title: "Uso ou Suspeita de Uso de Alcool e Drogas"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: {"severity": "moderado", "primaryService": {"id": "caps-ad", "name": "CAPS AD II Ermelino Matarazzo"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Escuta sem julgamento", "Orientar responsavel"]}
high: {"severity": "alto", "primaryService": {"id": "upa-ermelino", "name": "UPA III 24h"}, "secondaryService": {"id": "caps-ad", "name": "CAPS AD II"}, "schoolActions": ["Avaliacao medica imediata", "Garantir seguranca"]}
critical: (não existe)

### src/data/v2/flows/violacao_direitos.json
title: "Outras Violacoes de Direitos"
description: "(não existe)"
totalQuestions: 2
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: {"severity": "moderado", "primaryService": {"id": "cras-ermelino", "name": "CRAS Ermelino Matarazzo"}, "secondaryService": {"id": "gestao-direcao", "name": "Direcao Escolar"}, "schoolActions": ["Acionar gestao para triagem qualificada", "Encaminhar para suporte socioassistencial quando indicado"], "uiFlags": {"confidential": true, "showGuardrail": true}}
high: {"severity": "alto", "primaryService": {"id": "creas-ermelino", "name": "CREAS Ermelino Matarazzo"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Acionar gestao imediatamente", "Encaminhar formalmente a rede de protecao (minimos dados necessarios)"], "uiFlags": {"confidential": true, "showGuardrail": true}}
critical: {"severity": "iminente", "primaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Priorizar seguranca imediata", "Acionar 190 quando houver risco atual", "Acionar gestao imediatamente"], "uiFlags": {"confidential": true, "showGuardrail": true}}

### src/data/v2/flows/violencia_armada.json
title: "Violencia Armada ou Tiroteio"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: (não existe)
critical: {"severity": "iminente", "primaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "secondaryService": null, "schoolActions": ["Protocolo de abrigo seguro", "Nao evacuar (manter todos abrigados)", "Acionar 190"]}

### src/data/v2/flows/violencia_domestica.json
title: "Suspeita de Violencia Domestica"
description: "(não existe)"
totalQuestions: 1
camposDeTextoExibição: [meta.title, meta.keywords[], questions[].text, questions[].options[].label, results.*.summaryTag, results.*.schoolActions[]]
camposLógicos: [meta.id, meta.type, meta.categoryId, meta.subcategoryId, questions[].id, questions[].options[].next, questions[].options[].level, results keys (níveis), results.*.severity, results.*.notifyManagement, results.*.primaryService.id, results.*.secondaryService.id, results.*.uiFlags]
resultados:
low: (não existe)
moderate: (não existe)
high: {"severity": "alto", "primaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar de Ermelino Matarazzo"}, "secondaryService": {"id": "creas-ermelino", "name": "CREAS Ermelino Matarazzo"}, "schoolActions": ["Escuta protegida", "Comunicar gestao"]}
critical: {"severity": "iminente", "primaryService": {"id": "policia-militar", "name": "Policia Militar - 190"}, "secondaryService": {"id": "conselho-tutelar", "name": "Conselho Tutelar"}, "schoolActions": ["Acionar 190 imediatamente", "Garantir protecao fisica"]}

