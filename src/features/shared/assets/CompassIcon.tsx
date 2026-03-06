import React from 'react';

interface CompassIconProps {
  className?: string;
}

export const CompassIcon: React.FC<CompassIconProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gradiente para profundidade */}
      <defs>
        <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </radialGradient>
        <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Base glow */}
      <circle cx="50" cy="50" r="48" fill="url(#compassGlow)" />

      {/* Outer Ring */}
      <circle 
        cx="50" cy="50" r="48" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        opacity="0.8"
      />
      
      {/* Middle Ring */}
      <circle 
        cx="50" cy="50" r="42" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeDasharray="3 2" 
        opacity="0.4"
      />
      
      {/* Inner Ring */}
      <circle 
        cx="50" cy="50" r="35" 
        stroke="currentColor" 
        strokeWidth="0.5" 
        strokeDasharray="1 3" 
        opacity="0.25"
      />
      
      {/* Cardinal Points with premium styling */}
      <g className="select-none">
        <text 
          x="50" y="15" 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="900" 
          fill="currentColor" 
          opacity="0.95"
          letterSpacing="1"
        >
          N
        </text>
        <text 
          x="50" y="90" 
          textAnchor="middle" 
          fontSize="9" 
          fontWeight="700" 
          fill="currentColor" 
          opacity="0.5"
        >
          S
        </text>
        <text 
          x="88" y="53" 
          textAnchor="middle" 
          fontSize="9" 
          fontWeight="700" 
          fill="currentColor" 
          opacity="0.5"
        >
          E
        </text>
        <text 
          x="12" y="53" 
          textAnchor="middle" 
          fontSize="9" 
          fontWeight="700" 
          fill="currentColor" 
          opacity="0.5"
        >
          O
        </text>
      </g>
      
      {/* Degree Marks (every 30°) */}
      {[...Array(12)].map((_, i) => (
        <line
          key={`major-${i}`}
          x1="50" y1="4" x2="50" y2="10"
          transform={`rotate(${i * 30} 50 50)`}
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
      ))}

      {/* Minor Degree Marks (every 10°) */}
      {[...Array(36)].map((_, i) => {
        if (i % 3 === 0) return null;
        return (
          <line
            key={`minor-${i}`}
            x1="50" y1="5" x2="50" y2="8"
            transform={`rotate(${i * 10} 50 50)`}
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.25"
          />
        );
      })}

      {/* Needle with premium gradient */}
      <g className="transition-transform duration-[3s] ease-in-out origin-center">
        {/* North Needle (Amber gradient) */}
        <path 
          d="M50 12 L56 48 L50 52 L44 48 Z" 
          fill="url(#needleGradient)" 
          stroke="rgba(245,158,11,0.8)" 
          strokeWidth="0.5"
          filter="drop-shadow(0 2px 4px rgba(245,158,11,0.3))"
        />
        {/* South Needle (subtle) */}
        <path 
          d="M50 88 L56 52 L50 48 L44 52 Z" 
          fill="currentColor" 
          fillOpacity="0.15"
          stroke="currentColor" 
          strokeWidth="0.5" 
          opacity="0.6"
        />
        {/* Center Pivot with depth */}
        <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="50" r="2.5" fill="rgba(255,255,255,0.9)" />
        <circle cx="50" cy="50" r="1" fill="currentColor" opacity="0.6" />
      </g>

      {/* Crosshair subtle */}
      <line x1="50" y1="25" x2="50" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="50" y1="68" x2="50" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="25" y1="50" x2="32" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="68" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
};
