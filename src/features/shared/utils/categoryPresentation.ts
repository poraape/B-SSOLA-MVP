export type CategoryIconName =
  | 'ShieldAlert'
  | 'HeartPulse'
  | 'Brain'
  | 'AlertTriangle'
  | 'Scale'
  | 'Home'
  | 'Accessibility';

const CATEGORY_PRESENTATION: Record<
  string,
  {
    label: string;
    icon: CategoryIconName;
    color: string;
  }
> = {
  emergencias_seguranca: {
    label: 'Urgência Médica e Segurança Física',
    icon: 'ShieldAlert',
    color: 'from-rose-500/35 to-red-500/10',
  },
  saude_bem_estar: {
    label: 'Saúde Física e Bem-Estar Escolar',
    icon: 'HeartPulse',
    color: 'from-emerald-500/35 to-green-500/10',
  },
  saude_emocional: {
    label: 'Sofrimento Emocional e Saúde',
    icon: 'Brain',
    color: 'from-purple-500/35 to-fuchsia-500/10',
  },
  convivencia_conflitos: {
    label: 'Convivência e Conflitos',
    icon: 'AlertTriangle',
    color: 'from-orange-500/35 to-amber-500/10',
  },
  protecao_direitos: {
    label: 'Proteção e Violação de Direitos',
    icon: 'Scale',
    color: 'from-blue-500/35 to-cyan-500/10',
  },
  apoio_social_familiar: {
    label: 'Vulnerabilidade Social e Familiar',
    icon: 'Home',
    color: 'from-teal-500/35 to-emerald-500/10',
  },
  inclusao_acessibilidade: {
    label: 'Pedagógico, Aprendizagem e Inclusão',
    icon: 'Accessibility',
    color: 'from-violet-500/35 to-indigo-500/10',
  },
};

export const getCategoryDisplayLabel = (categoryId: string, fallback = categoryId): string =>
  CATEGORY_PRESENTATION[categoryId]?.label || fallback;

export const getCategoryIcon = (categoryId: string): CategoryIconName =>
  CATEGORY_PRESENTATION[categoryId]?.icon || 'ShieldAlert';

export const getCategoryColor = (categoryId: string): string =>
  CATEGORY_PRESENTATION[categoryId]?.color || 'from-slate-400/25 to-transparent';
