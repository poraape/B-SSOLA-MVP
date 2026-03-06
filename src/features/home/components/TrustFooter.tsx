import React from 'react';
import { Shield } from 'lucide-react';

export const TrustFooter: React.FC = () => {
  return (
    <footer
      className="flex items-center justify-center gap-2.5 border-t border-slate-200 pt-8 dark:border-slate-700"
      role="contentinfo"
    >
      <Shield
        className="h-4 w-4 text-slate-400 dark:text-slate-500"
        aria-hidden="true"
      />
      <p className="text-sm text-tertiary">
        Sem registro de dados pessoais do estudante.
      </p>
    </footer>
  );
};
