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
    label: 'Emergências e Segurança',
    icon: 'ShieldAlert',
    color: 'from-rose-500/35 to-red-500/10',
  },
  saude_bem_estar: {
    label: 'Saúde e Bem-Estar',
    icon: 'HeartPulse',
    color: 'from-emerald-500/35 to-green-500/10',
  },
  saude_emocional: {
    label: 'Saúde Emocional',
    icon: 'Brain',
    color: 'from-purple-500/35 to-fuchsia-500/10',
  },
  convivencia_conflitos: {
    label: 'Convivência e Conflitos',
    icon: 'AlertTriangle',
    color: 'from-orange-500/35 to-amber-500/10',
  },
  protecao_direitos: {
    label: 'Proteção e Direitos',
    icon: 'Scale',
    color: 'from-blue-500/35 to-cyan-500/10',
  },
  apoio_social_familiar: {
    label: 'Apoio Social e Familiar',
    icon: 'Home',
    color: 'from-teal-500/35 to-emerald-500/10',
  },
  inclusao_acessibilidade: {
    label: 'Inclusão e Acessibilidade',
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
