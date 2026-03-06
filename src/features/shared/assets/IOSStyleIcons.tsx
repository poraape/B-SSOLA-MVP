import React from 'react';

interface IOSIconProps {
  className?: string;
}

export const EmergencyIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="emergencyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#emergencyGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <path
      d="M40 16L30 20v12c0 7 4 13.5 10 15 6-1.5 10-8 10-15V20l-10-4z"
      fill="white"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.95"
    />

    <circle cx="40" cy="38" r="2" fill="#ef4444" />
    <path d="M40 28v6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />

    <circle cx="60" cy="20" r="8" fill="#dc2626" />
    <path d="M56 20l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HealthIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#healthGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <path d="M40 56s-12-8-15-14c-2-4 0-9 4-9 2 0 4 1 6 3 2-2 4-3 6-3 4 0 6 5 4 9-3 6-15 14-15 14z" fill="white" opacity="0.95" />

    <path
      d="M25 38h6l3-5 4 10 3-5h6"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.85"
    />
  </svg>
);

export const EmotionalHealthIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="emotionalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#emotionalGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <ellipse cx="40" cy="36" rx="14" ry="16" fill="none" stroke="white" strokeWidth="2.5" opacity="0.95" />

    <path
      d="M40 44s-5-3-6.5-6c-1-2 0-4 2-4 1 0 2 0.5 3 1.5 1-1 2-1.5 3-1.5 2 0 3 2 2 4-1.5 3-6.5 6-6.5 6z"
      fill="white"
      opacity="0.9"
    />

    <path d="M32 28c1-1 2 0 3 1s2 0 3-1" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const ConvivenceIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="convivenceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#convivenceGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <circle cx="32" cy="30" r="5" fill="white" opacity="0.95" />
    <path d="M24 50c0-4 3-7 8-7s8 3 8 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />

    <circle cx="48" cy="30" r="5" fill="white" opacity="0.95" />
    <path d="M40 50c0-4 3-7 8-7s8 3 8 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />

    <path d="M32 40h16" stroke="white" strokeWidth="2" strokeDasharray="2 2" opacity="0.7" />
  </svg>
);

export const ProtectionIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="protectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="50%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#protectionGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <path d="M40 18L28 23v13c0 9 5 17 12 19 7-2 12-10 12-19V23l-12-5z" fill="white" opacity="0.95" />

    <path d="M32 35h16M40 30v10" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="40" r="3" stroke="#14b8a6" strokeWidth="1.5" fill="none" />
    <circle cx="48" cy="40" r="3" stroke="#14b8a6" strokeWidth="1.5" fill="none" />
  </svg>
);

export const SocialSupportIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="socialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#socialGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <path d="M26 38L40 26l14 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
    <rect x="30" y="38" width="20" height="18" fill="white" opacity="0.95" rx="2" />

    <path
      d="M40 48s-4-2-5-4c-0.8-1.5 0-3 1.5-3 0.8 0 1.5 0.5 2 1 0.5-0.5 1.2-1 2-1 1.5 0 2.3 1.5 1.5 3-1 2-5 4-5 4z"
      fill="#f59e0b"
    />
  </svg>
);

export const InclusionIOSIcon: React.FC<IOSIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="inclusionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>

    <rect width="80" height="80" rx="22" fill="url(#inclusionGrad)" />
    <rect x="1" y="1" width="78" height="20" rx="21" fill="rgba(255,255,255,0.3)" opacity="0.6" />
    <rect width="80" height="80" rx="22" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />

    <circle cx="40" cy="28" r="4" fill="white" opacity="0.95" />
    <circle cx="40" cy="40" r="13" stroke="white" strokeWidth="2.5" opacity="0.95" fill="none" />

    <path d="M40 32v8M40 36l8 2M40 40l-6 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" />
  </svg>
);
