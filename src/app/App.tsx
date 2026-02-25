import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { AppRoutes } from './router/routes';
import { validateModel } from '../domain/model/validateModel';
import { model } from '../domain/model/loadModel';
import { AlertCircle, Loader2 } from 'lucide-react';

import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { SearchProvider } from '../features/search/context/SearchContext';

export default function App() {
  const [validation, setValidation] = useState<{ isValid: boolean; errors: string[] } | null>(null);

  useEffect(() => {
    const result = validateModel(model);
    if (!result.isValid) {
      console.error('Model Validation Errors:', result.errors);
    }
    setValidation(result);
  }, []);

  if (validation && !validation.isValid) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
        <div className="bg-white border border-rose-200 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="flex items-center gap-3 text-rose-600">
            <AlertCircle className="w-8 h-8" />
            <h1 className="text-xl font-black uppercase tracking-tight">Erro Crítico de Dados</h1>
          </div>
          <p className="text-slate-600 leading-relaxed">
            O aplicativo detectou inconsistências graves no modelo de dados e não pode ser iniciado com segurança.
          </p>
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 max-h-40 overflow-y-auto">
            <ul className="text-xs text-rose-800 space-y-1 list-disc pl-4">
              {validation.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
          <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">
            Contate o administrador do sistema
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AccessibilityProvider>
        <SearchProvider>
          <BrowserRouter>
            <Shell>
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Carregando módulo...</p>
                </div>
              }>
                <AppRoutes />
              </Suspense>
            </Shell>
          </BrowserRouter>
        </SearchProvider>
      </AccessibilityProvider>
    </ThemeProvider>
  );
}
