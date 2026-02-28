import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Shell } from './layout/Shell';
import { AppRoutes } from './router/routes';
import { loadModel } from '../domain/model/loadModel';
import { Loader2 } from 'lucide-react';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import { telemetryService } from '../application/telemetry/TelemetryService';

import { ThemeProvider } from './context/ThemeContext';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { SearchProvider } from '../features/search/context/SearchContext';
import { AppModeProvider } from '../domain/appMode/AppModeContext';

export default function App() {
  const [isModelReady, setIsModelReady] = useState(false);
  const [bootstrapError, setBootstrapError] = useState<Error | null>(null);

  useEffect(() => {
    telemetryService.track({
      event: 'session_start',
      step: 'app_bootstrap',
    });

    let isCancelled = false;

    const bootstrap = async () => {
      try {
        // Defer model load to runtime so failures are surfaced inside React.
        await Promise.resolve(loadModel());

        if (!isCancelled) {
          setIsModelReady(true);
          setBootstrapError(null);
        }
      } catch (error: unknown) {
        if (!isCancelled) {
          const runtimeError = error instanceof Error ? error : new Error(String(error));
          setBootstrapError(runtimeError);
        }
      }
    };

    bootstrap();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (bootstrapError) {
    throw bootstrapError;
  }

  if (!isModelReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4 bg-slate-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Carregando modelo...
        </p>
      </div>
    );
  }

  return (
    <ModelErrorBoundary scope="model">
      <ThemeProvider>
        <AccessibilityProvider>
          <SearchProvider>
            <AppModeProvider>
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
            </AppModeProvider>
          </SearchProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ModelErrorBoundary>
  );
}
