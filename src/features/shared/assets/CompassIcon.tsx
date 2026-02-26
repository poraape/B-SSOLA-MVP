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
      className={`${className} group cursor-pointer`}
    >
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      
      {/* Cardinal Points */}
      <text x="50" y="18" textAnchor="middle" fontSize="10" fontWeight="900" fill="currentColor" className="select-none">N</text>
      <text x="50" y="90" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" opacity="0.6" className="select-none">S</text>
      <text x="85" y="53" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" opacity="0.6" className="select-none">E</text>
      <text x="15" y="53" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" opacity="0.6" className="select-none">W</text>
      
      {/* Tick Marks */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="50" y1="5" x2="50" y2="10"
          transform={`rotate(${i * 30} 50 50)`}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* Needle Group with transition */}
      <g className="transition-transform duration-700 ease-in-out origin-center group-hover:rotate-[135deg]">
        {/* North Needle (Red/Primary) */}
        <path 
          d="M50 15 L58 50 L50 55 L42 50 Z" 
          fill="#EF4444" 
          stroke="currentColor" 
          strokeWidth="0.5" 
        />
        {/* South Needle */}
        <path 
          d="M50 85 L58 50 L50 45 L42 50 Z" 
          fill="currentColor" 
          fillOpacity="0.2"
          stroke="currentColor" 
          strokeWidth="0.5" 
        />
        {/* Center Pivot */}
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="50" cy="50" r="1" fill="white" />
      </g>
    </svg>
  );
};
