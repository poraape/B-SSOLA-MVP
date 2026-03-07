// src/features/resources/data/simulatorTypes.ts

export type CaseCategory = 
  | 'saude_mental'
  | 'protecao_infantil'
  | 'convivencia'
  | 'inclusao'
  | 'seguranca_digital'
  | 'drogas_substancias'
  | 'desafios_pedagogicos'
  | 'familia_responsabilizacao'
  | 'identidade_genero'
  | 'conflitos_sociais';

export type Difficulty = 'basico' | 'intermediario' | 'avancado';

export interface ResourceLink {
  title: string;
  url: string;
  type: 'lei' | 'protocolo' | 'artigo' | 'video';
}

export interface ChoiceFeedback {
  immediate: string;
  analysis: string;
  protocol?: string;
  consequences?: string;
  resources?: ResourceLink[];
}

export interface SimulatorChoice {
  id: string;
  label: string;
  score: number; // 0-100
  feedback: ChoiceFeedback;
  tags?: string[];
}

export interface CaseContext {
  school?: string;
  demographics?: string;
  grade?: string;
  gradeSection?: string;
  classSize?: number | string;
  subject?: string;
  location?: string;
  populationCharacteristic?: string;
  eventContext?: string;
  riskLevel?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface SimulatorCase {
  id: string;
  title: string;
  situation: string;
  category: CaseCategory;
  difficulty: Difficulty;
  icon: string;
  context?: CaseContext;
  estimatedTime: number; // minutos
  choices: SimulatorChoice[];
  hints?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface CompletedCase {
  caseId: string;
  choiceId: string;
  score: number;
  timestamp: string;
  timeSpent: number; // segundos
}

export interface UserProgress {
  userId: string;
  completedCases: CompletedCase[];
  totalScore: number;
  lastSession: string;
  startedAt: string;
}

export const CATEGORY_LABELS: Record<CaseCategory, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  saude_mental: {
    label: 'Saúde Mental',
    icon: '🧠',
    color: 'blue',
    description: 'Ansiedade, depressão, crises, automutilação'
  },
  protecao_infantil: {
    label: 'Proteção da Criança',
    icon: '🛡️',
    color: 'rose',
    description: 'Suspeita de violência, negligência, abuso'
  },
  convivencia: {
    label: 'Convivência Escolar',
    icon: '🤝',
    color: 'emerald',
    description: 'Conflitos, bullying, mediação'
  },
  inclusao: {
    label: 'Inclusão e Acessibilidade',
    icon: '♿',
    color: 'purple',
    description: 'Necessidades especiais, adaptações, TEA'
  },
  seguranca_digital: {
    label: 'Segurança Digital',
    icon: '📱',
    color: 'amber',
    description: 'Cyberbullying, vazamento de dados, sextorsão'
  },
  drogas_substancias: {
    label: 'Drogas e Substâncias',
    icon: '💊',
    color: 'orange',
    description: 'Uso, tráfico no entorno e intoxicação'
  },
  desafios_pedagogicos: {
    label: 'Desafios Pedagógicos',
    icon: '📚',
    color: 'teal',
    description: 'Defasagem, absenteísmo e sala multisseriada'
  },
  familia_responsabilizacao: {
    label: 'Família e Responsabilização',
    icon: '🏠',
    color: 'cyan',
    description: 'Conflitos com responsáveis e corresponsabilidade'
  },
  identidade_genero: {
    label: 'Identidade de Gênero',
    icon: '🏳️‍⚧️',
    color: 'fuchsia',
    description: 'Nome social, LGBTfobia e respeito à diversidade'
  },
  conflitos_sociais: {
    label: 'Conflitos Sociais',
    icon: '⚖️',
    color: 'indigo',
    description: 'Racismo, LGBTfobia, preconceito religioso'
  }
};

export const DIFFICULTY_LABELS: Record<Difficulty, { 
  label: string; 
  color: string;
}> = {
  basico: { label: 'Básico', color: 'green' },
  intermediario: { label: 'Intermediário', color: 'yellow' },
  avancado: { label: 'Avançado', color: 'red' }
};
