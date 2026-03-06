import React from 'react';
import { Shield, Lock, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../../app/context/ThemeContext';

export const InstitutionalFooter: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`relative mt-16 overflow-hidden rounded-3xl border p-8 md:p-10 ${
        theme === 'dark'
          ? 'border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-900/50 backdrop-blur-xl'
          : 'border-slate-200 bg-gradient-to-br from-slate-50 to-white'
      }`}
      role="contentinfo"
      aria-label="Informações institucionais"
    >
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Compromissos Institucionais
          </h3>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Badge 1: Privacidade */}
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-50'
            }`}>
              <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Sem registro de dados pessoais do estudante
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Este sistema não armazena informações identificáveis dos estudantes atendidos.
              </p>
            </div>
          </div>

          {/* Badge 2: Protocolo */}
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              theme === 'dark' ? 'bg-emerald-500/10' : 'bg-emerald-50'
            }`}>
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Baseado em protocolo e encaminhamento seguro
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Todas as orientações seguem protocolos validados de triagem escolar.
              </p>
            </div>
          </div>

          {/* Badge 3: Transparência */}
          <div className="flex items-start gap-4 md:col-span-2 lg:col-span-1">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              theme === 'dark' ? 'bg-violet-500/10' : 'bg-violet-50'
            }`}>
              <Shield className="h-6 w-6 text-violet-600 dark:text-violet-400" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Código aberto e auditável
              </p>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                A lógica de triagem é transparente e pode ser revisada pela comunidade educacional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
