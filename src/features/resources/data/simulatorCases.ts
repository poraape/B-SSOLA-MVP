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
