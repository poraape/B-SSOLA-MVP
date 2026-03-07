import React from 'react';
import {
  Accessibility as AccessibilityIcon,
  AlertTriangle as AlertTriangleIcon,
  Brain as BrainIcon,
  HeartPulse as HeartPulseIcon,
  Home as HomeIcon,
  Scale as ScaleIcon,
  ShieldAlert as ShieldAlertIcon,
} from 'lucide-react';
import {
  getCategoryDisplayLabel as getCategoryDisplayLabelFromMap,
  getCategoryIcon,
  type CategoryIconName,
} from '@/features/shared/utils/categoryPresentation';

import {
  EmergencyIOSIcon,
  HealthIOSIcon,
  EmotionalHealthIOSIcon,
  ConvivenceIOSIcon,
  ProtectionIOSIcon,
  SocialSupportIOSIcon,
  InclusionIOSIcon,
} from '../assets/IOSStyleIcons';

const normalizeIconKey = (iconStr: string) => iconStr.trim().toLowerCase().replace(/[-_\s]/g, '');

const getMappedCategoryIcon = (mappedIcon: CategoryIconName, className: string) => {
  const baseClass = `${className} rounded-[22px] border shadow-[inset_0_1px_8px_rgba(255,255,255,0.35),inset_0_-2px_6px_rgba(0,0,0,0.22),0_8px_16px_-6px_rgba(15,23,42,0.45)]`;
  const iconClass = 'h-[54%] w-[54%] text-white drop-shadow-sm';

  switch (mappedIcon) {
    case 'ShieldAlert':
      return (
        <div className={`${baseClass} border-rose-300/55 bg-gradient-to-br from-rose-400 via-rose-500 to-red-600 flex items-center justify-center`}>
          <ShieldAlertIcon className={iconClass} />
        </div>
      );
    case 'HeartPulse':
      return (
        <div className={`${baseClass} border-emerald-300/55 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-600 flex items-center justify-center`}>
          <HeartPulseIcon className={iconClass} />
        </div>
      );
    case 'Brain':
      return (
        <div className={`${baseClass} border-purple-300/55 bg-gradient-to-br from-purple-400 via-purple-500 to-fuchsia-600 flex items-center justify-center`}>
          <BrainIcon className={iconClass} />
        </div>
      );
    case 'AlertTriangle':
      return (
        <div className={`${baseClass} border-orange-300/55 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 flex items-center justify-center`}>
          <AlertTriangleIcon className={iconClass} />
        </div>
      );
    case 'Scale':
      return (
        <div className={`${baseClass} border-blue-300/55 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600 flex items-center justify-center`}>
          <ScaleIcon className={iconClass} />
        </div>
      );
    case 'Home':
      return (
        <div className={`${baseClass} border-teal-300/55 bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 flex items-center justify-center`}>
          <HomeIcon className={iconClass} />
        </div>
      );
    case 'Accessibility':
      return (
        <div className={`${baseClass} border-violet-300/55 bg-gradient-to-br from-violet-400 via-violet-500 to-indigo-600 flex items-center justify-center`}>
          <AccessibilityIcon className={iconClass} />
        </div>
      );
    default:
      return <EmergencyIOSIcon className={className} />;
  }
};

export const getPremiumCategoryIcon = (iconStr: string, className = 'h-20 w-20') => {
  switch (normalizeIconKey(iconStr)) {
    case 'shieldalert':
    case 'alert':
    case 'alerttriangle':
    case 'warning':
    case 'shield':
      return <EmergencyIOSIcon className={className} />;

    case 'heartpulse':
    case 'heart':
    case 'health':
      return <HealthIOSIcon className={className} />;

    case 'brain':
    case 'emotional':
      return <EmotionalHealthIOSIcon className={className} />;

    case 'users':
    case 'handshake':
    case 'book':
    case 'bookopen':
      return <ConvivenceIOSIcon className={className} />;

    case 'balance':
    case 'scales':
    case 'scale':
      return <ProtectionIOSIcon className={className} />;

    case 'home':
    case 'family':
      return <SocialSupportIOSIcon className={className} />;

    case 'puzzle':
    case 'accessibility':
      return <InclusionIOSIcon className={className} />;

    default:
      return <EmergencyIOSIcon className={className} />;
  }
};

export const getPremiumCategoryIconByName = (
  iconName: CategoryIconName,
  className = 'h-20 w-20',
) => getMappedCategoryIcon(iconName, className);

export const getPremiumCategoryIconByCategoryId = (
  categoryId: string,
  className = 'h-20 w-20',
) => {
  return getMappedCategoryIcon(getCategoryIcon(categoryId), className);
};

export const getCategoryDisplayLabel = (categoryId: string, fallbackLabel: string) =>
  getCategoryDisplayLabelFromMap(categoryId) || fallbackLabel;
