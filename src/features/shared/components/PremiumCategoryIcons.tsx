import React from 'react';

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

export const getPremiumCategoryIcon = (iconStr: string, className = 'h-20 w-20') => {
  switch (normalizeIconKey(iconStr)) {
    case 'alert':
    case 'alerttriangle':
    case 'warning':
    case 'shield':
      return <EmergencyIOSIcon className={className} />;

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
