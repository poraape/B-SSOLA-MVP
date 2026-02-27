import React from 'react';
import type { LucideProps } from 'lucide-react';
import { Info } from 'lucide-react';

type PremiumIconProps = Omit<LucideProps, 'children'>;

const baseSvgProps = {
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const EmergencySafetyIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <path d="M12 3.25l6 2.3v5.1c0 4.2-2.6 7.9-6 9.1-3.4-1.2-6-4.9-6-9.1v-5.1l6-2.3z" />
    <path d="M12 8.2v3.3" />
    <path d="M9.8 12.1h4.4" />
    <path d="M10.2 14.6a1.8 1.8 0 003.6 0" />
  </svg>
);

export const HealthWellBeingIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <path d="M12 19.2s-6.8-4.2-8.3-8.1C2.7 8.3 4.8 5.7 7.8 5.7c1.8 0 3.1.8 4.2 2.2 1.1-1.4 2.4-2.2 4.2-2.2 3 0 5.1 2.6 4.1 5.4C18.8 15 12 19.2 12 19.2z" />
    <path d="M7 12h2.2l1.2-2.2 2.3 4.4 1.1-2.2H17" />
  </svg>
);

export const EmotionalHealthIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <path d="M10.8 18.5H8.5a3.3 3.3 0 01-3.3-3.3V9.5a6.8 6.8 0 1113.6 0v.6" />
    <path d="M9.5 14.4c.8-.9 2.4-.9 3.2 0 .8.9.8 2.2 0 3.1L11 19l-1.7-1.5a2.3 2.3 0 010-3.1z" />
    <path d="M13.8 8.7a1.3 1.3 0 11-2.6 0 1.3 1.3 0 012.6 0z" />
  </svg>
);

export const CoexistenceConflictIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <circle cx="8" cy="8" r="2.4" />
    <circle cx="16" cy="8" r="2.4" />
    <path d="M3.8 16.8a4.7 4.7 0 018.4-2.8" />
    <path d="M20.2 16.8a4.7 4.7 0 00-8.4-2.8" />
    <path d="M9.5 13.8h5" />
  </svg>
);

export const ProtectionRightsIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <path d="M12 3.3l6 2.1v5.5c0 4.3-2.5 8.1-6 9.4-3.5-1.3-6-5.1-6-9.4V5.4l6-2.1z" />
    <path d="M8.5 10.5h7" />
    <path d="M10 13.2l1.5 1.5 2.8-2.8" />
  </svg>
);

export const SocialFamilySupportIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <path d="M4.5 10.2L12 4.8l7.5 5.4" />
    <path d="M6.2 9.8v7.5h11.6V9.8" />
    <path d="M9.6 13.7c.7-.8 2-.8 2.7 0 .6.7.6 1.7 0 2.4L11 17l-1.3-.9a1.8 1.8 0 010-2.4z" />
    <path d="M14.5 17.3h3" />
  </svg>
);

export const InclusionAccessibilityIcon: React.FC<PremiumIconProps> = ({ className }) => (
  <svg {...baseSvgProps} className={className}>
    <circle cx="12" cy="5.4" r="1.8" />
    <path d="M12 8.2v4.2" />
    <path d="M12 10.2l3.8 1.1" />
    <path d="M12 12.4l-2.6 4.4" />
    <path d="M15.7 11.3a4.7 4.7 0 11-3.8-3.1" />
  </svg>
);

const normalizeIconKey = (iconStr: string) => iconStr.trim().toLowerCase().replace(/[-_\s]/g, '');

export const getPremiumCategoryIcon = (iconStr: string, className = 'w-6 h-6') => {
  switch (normalizeIconKey(iconStr)) {
    case 'alert':
    case 'alerttriangle':
    case 'warning':
      return <EmergencySafetyIcon className={className} />;
    case 'heart':
      return <HealthWellBeingIcon className={className} />;
    case 'brain':
      return <EmotionalHealthIcon className={className} />;
    case 'shield':
    case 'book':
    case 'bookopen':
      return <CoexistenceConflictIcon className={className} />;
    case 'balance':
    case 'scales':
    case 'scale':
      return <ProtectionRightsIcon className={className} />;
    case 'handshake':
    case 'home':
      return <SocialFamilySupportIcon className={className} />;
    case 'puzzle':
    case 'accessibility':
      return <InclusionAccessibilityIcon className={className} />;
    default:
      return <Info className={className} />;
  }
};

export const getPremiumCategoryColorClass = (color: string) => {
  switch (color) {
    case 'red':
      return 'text-rose-700 dark:text-rose-200 bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-500/30 dark:to-rose-700/20 border-rose-200/80 dark:border-rose-300/20 shadow-inner shadow-rose-200/50';
    case 'orange':
      return 'text-orange-700 dark:text-orange-200 bg-gradient-to-br from-orange-100 to-amber-50 dark:from-orange-500/30 dark:to-amber-600/20 border-orange-200/80 dark:border-orange-300/20 shadow-inner shadow-orange-200/50';
    case 'purple':
      return 'text-purple-700 dark:text-purple-200 bg-gradient-to-br from-purple-100 to-fuchsia-50 dark:from-purple-500/30 dark:to-fuchsia-600/20 border-purple-200/80 dark:border-purple-300/20 shadow-inner shadow-purple-200/50';
    case 'blue':
      return 'text-blue-700 dark:text-blue-200 bg-gradient-to-br from-blue-100 to-sky-50 dark:from-blue-500/30 dark:to-sky-600/20 border-blue-200/80 dark:border-blue-300/20 shadow-inner shadow-blue-200/50';
    case 'teal':
      return 'text-teal-700 dark:text-teal-200 bg-gradient-to-br from-teal-100 to-cyan-50 dark:from-teal-500/30 dark:to-cyan-600/20 border-teal-200/80 dark:border-teal-300/20 shadow-inner shadow-teal-200/50';
    case 'yellow':
      return 'text-yellow-700 dark:text-yellow-200 bg-gradient-to-br from-yellow-100 to-amber-50 dark:from-yellow-500/30 dark:to-amber-600/20 border-yellow-200/80 dark:border-yellow-300/20 shadow-inner shadow-yellow-200/50';
    case 'indigo':
      return 'text-indigo-700 dark:text-indigo-200 bg-gradient-to-br from-indigo-100 to-violet-50 dark:from-indigo-500/30 dark:to-violet-600/20 border-indigo-200/80 dark:border-indigo-300/20 shadow-inner shadow-indigo-200/50';
    default:
      return 'text-slate-700 dark:text-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-500/30 dark:to-slate-700/20 border-slate-200/80 dark:border-slate-300/20 shadow-inner shadow-slate-200/50';
  }
};
