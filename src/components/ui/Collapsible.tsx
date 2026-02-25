import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  defaultOpen = false,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-slate-400">{icon}</div>}
          <span className="font-bold text-slate-700">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 border-t border-slate-100 bg-white">
          <div className="mt-4 text-slate-600 leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
