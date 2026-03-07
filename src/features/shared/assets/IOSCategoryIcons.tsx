import React from 'react';

interface CategoryIconProps {
  className?: string;
}

// EMERGÊNCIAS E SEGURANÇA (Vermelho com gradiente)
export const EmergencyIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Container com gradiente */}
    <rect width="100" height="100" rx="22" fill="url(#redGrad)" filter="url(#glow)"/>
    
    {/* Inner shadow (brilho superior) */}
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    
    {/* Outer border sutil */}
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Ícone Shield + Alerta */}
    <path 
      d="M50 20L35 26v18c0 11 7 21 15 23 8-2 15-12 15-23V26L50 20z" 
      fill="white" 
      stroke="white" 
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.95"
    />
    
    {/* Badge emergência (círculo vermelho no canto) */}
    <circle cx="75" cy="25" r="10" fill="#dc2626" stroke="white" strokeWidth="2"/>
    <path d="M72 25l2.5 2.5L80 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SAÚDE E BEM-ESTAR (Laranja com gradiente)
export const HealthIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" rx="22" fill="url(#orangeGrad)"/>
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Coração com batimento */}
    <path 
      d="M50 70s-18-12-22-20c-3-6 0-13 6-13 3 0 6 1.5 9 4.5 3-3 6-4.5 9-4.5 6 0 9 7 6 13-4 8-22 20-22 20z" 
      fill="white" 
      opacity="0.95"
    />
    <path 
      d="M30 48h9l5-8 6 16 5-8h9" 
      stroke="white" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      opacity="0.85"
    />
  </svg>
);

// SAÚDE EMOCIONAL (Roxo com gradiente)
export const EmotionalIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c084fc" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#9333ea" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" rx="22" fill="url(#purpleGrad)"/>
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Smile com sorriso feliz */}
    <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="3" opacity="0.95"/>
    <circle cx="42" cy="45" r="3" fill="white"/>
    <circle cx="58" cy="45" r="3" fill="white"/>
    <path d="M38 55c3 5 9 8 12 8s9-3 12-8" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
  </svg>
);

// CONVIVÊNCIA E CONFLITOS (Azul com gradiente)
export const ConvivenceIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="50%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" rx="22" fill="url(#blueGrad)"/>
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Duas pessoas de mãos dadas */}
    <circle cx="38" cy="38" r="8" fill="white" opacity="0.95"/>
    <path d="M28 70c0-6 4-10 10-10s10 4 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
    
    <circle cx="62" cy="38" r="8" fill="white" opacity="0.95"/>
    <path d="M52 70c0-6 4-10 10-10s10 4 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
    
    {/* Linha de conexão */}
    <path d="M38 52h24" stroke="white" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.7"/>
  </svg>
);

// PROTEÇÃO E DIREITOS (Verde-azulado com gradiente)
export const ProtectionIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="50%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" rx="22" fill="url(#tealGrad)"/>
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Shield com balança */}
    <path 
      d="M50 22L33 28v20c0 14 8 26 17 29 9-3 17-15 17-29V28L50 22z" 
      fill="white" 
      opacity="0.95"
    />
    
    {/* Balança de justiça */}
    <path d="M38 52h24M50 45v15" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="38" cy="58" r="5" stroke="#14b8a6" strokeWidth="2" fill="none"/>
    <circle cx="62" cy="58" r="5" stroke="#14b8a6" strokeWidth="2" fill="none"/>
  </svg>
);

// APOIO SOCIAL E FAMILIAR (Amarelo com gradiente)
export const SocialIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" rx="22" fill="url(#yellowGrad)"/>
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Casa com coração */}
    <path d="M30 50L50 32l20 18" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
    <rect x="35" y="50" width="30" height="25" fill="white" opacity="0.95" rx="2"/>
    
    {/* Coração */}
    <path 
      d="M50 62s-6-3-7.5-6c-1-2 0-4 2.5-4 1.2 0 2.5 1 3.5 2 1-1 2.3-2 3.5-2 2.5 0 3.5 2 2.5 4-1.5 3-7.5 6-7.5 6z" 
      fill="#f59e0b"
    />
  </svg>
);

// INCLUSÃO E ACESSIBILIDADE (Índigo com gradiente)
export const InclusionIcon: React.FC<CategoryIconProps> = ({ className = 'h-20 w-20' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
    
    <rect width="100" height="100" rx="22" fill="url(#indigoGrad)"/>
    <rect x="2" y="2" width="96" height="30" rx="20" fill="rgba(255,255,255,0.25)" opacity="0.8"/>
    <rect width="100" height="100" rx="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    
    {/* Símbolo acessibilidade */}
    <circle cx="50" cy="35" r="6" fill="white" opacity="0.95"/>
    <circle cx="50" cy="54" r="20" stroke="white" strokeWidth="3" opacity="0.95" fill="none"/>
    
    {/* Braços e pernas estilizados */}
    <path d="M50 41v12M50 47l12 3M50 53l-9 12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.95"/>
  </svg>
);

// Mapeamento de ícones
export const getCategoryIcon = (iconName: string, className?: string) => {
  const normalized = iconName.toLowerCase().replace(/[-_\s]/g, '');
  
  switch (normalized) {
    case 'alert':
    case 'alerttriangle':
    case 'warning':
    case 'shield':
      return <EmergencyIcon className={className} />;
    
    case 'heart':
    case 'health':
      return <HealthIcon className={className} />;
    
    case 'brain':
    case 'smile':
    case 'emotional':
      return <EmotionalIcon className={className} />;
    
    case 'users':
    case 'handshake':
    case 'book':
    case 'bookopen':
      return <ConvivenceIcon className={className} />;
    
    case 'balance':
    case 'scales':
    case 'scale':
      return <ProtectionIcon className={className} />;
    
    case 'home':
    case 'family':
      return <SocialIcon className={className} />;
    
    case 'puzzle':
    case 'accessibility':
      return <InclusionIcon className={className} />;
    
    default:
      return <EmergencyIcon className={className} />;
  }
};
