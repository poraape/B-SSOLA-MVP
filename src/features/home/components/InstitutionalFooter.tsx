import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../../app/context/ThemeContext';

export const InstitutionalFooter: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer 
      className={`mt-16 rounded-2xl border p-6 ${
        theme === 'dark' 
          ? 'border-slate-800 bg-slate-900/50' 
          : 'border-slate-200 bg-slate-50'
      }`}
      role="contentinfo"
      aria-label="Informações institucionais"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Sem registro de dados pessoais do estudante.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Este sistema não armazena informações identificáveis dos estudantes atendidos.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              Baseado em protocolo e encaminhamento seguro.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Todas as orientações seguem protocolos validados de triagem escolar.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
