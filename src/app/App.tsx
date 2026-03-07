import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { AppRoutes } from './router/routes';
import { Loader2, AlertCircle, RotateCcw } from 'lucide-react';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import { telemetryService } from '../application/telemetry/TelemetryService';

import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { SearchProvider } from '../features/search/context/SearchContext';
import { AppModeProvider } from '../domain/appMode/AppModeContext';
import { TriageRecommendationProvider } from './context/TriageRecommendationContext';

function InternalErrorScreen({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="bg-white border border-rose-200 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center gap-3 text-rose-600">
          <AlertCircle className="w-8 h-8" />
          <h1 className="text-xl font-black uppercase tracking-tight">
            Erro Crítico de Inicialização
          </h1>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Falha ao carregar o modelo da aplicação. Revise os dados e tente novamente.
        </p>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 max-h-40 overflow-y-auto">
          <p className="text-xs text-rose-800 break-words font-mono">
            {error.message || 'Erro desconhecido durante a inicialização.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-rose-700 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<Error | null>(null);

  useEffect(() => {
    const isConsentGranted = () => {
      try {
        return localStorage.getItem('bssola_privacy_consent') === 'accepted';
      } catch {
        return false;
      }
    };

    if (isConsentGranted()) {
      telemetryService.track({
        event: 'session_start',
        step: 'app_bootstrap',
      });
    }

    let isCancelled = false;

    const bootstrap = async () => {
      try {
        const modelModule = await import('../domain/model/loadModel');
        await Promise.resolve(modelModule.loadModel());

        if (!isCancelled) {
          setIsModelReady(true);
          setBootstrapError(null);
        }
      } catch (error: unknown) {
        if (!isCancelled) {
          const runtimeError = error instanceof Error ? error : new Error(String(error));
          console.error('[App] Bootstrap failed:', runtimeError);
          setBootstrapError(runtimeError);
        }
      }
    };

    bootstrap();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleRetry = () => {
    setBootstrapError(null);
    setIsModelReady(false);
    window.location.reload();
  };

  return (
    <ModelErrorBoundary scope="model">
      <ThemeProvider>
        <AccessibilityProvider>
          <SearchProvider>
            <AppModeProvider>
              <TriageRecommendationProvider>
                {bootstrapError ? (
                  <InternalErrorScreen error={bootstrapError} onRetry={handleRetry} />
                ) : !isModelReady ? (
                  <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-slate-50">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                      Carregando modelo...
                    </p>
                  </div>
                ) : (
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
                )}
              </TriageRecommendationProvider>
            </AppModeProvider>
          </SearchProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ModelErrorBoundary>
  );
}
