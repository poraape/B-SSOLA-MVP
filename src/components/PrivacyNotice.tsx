import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'bussola_privacy_v1';

function canUseLocalStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const PrivacyNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!canUseLocalStorage()) return;
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    setIsVisible(dismissed !== 'accepted');
  }, []);

  const handleDismiss = () => {
    if (canUseLocalStorage()) {
      window.localStorage.setItem(STORAGE_KEY, 'accepted');
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <section
      className="mx-auto mt-4 max-w-6xl rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="leading-relaxed">
          Esta ferramenta apoia decisões institucionais. Não registra dados pessoais
          identificáveis. Uso restrito a profissionais autorizados pela instituição.
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-amber-700 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-800"
        >
          Entendi
        </button>
      </div>
    </section>
  );
};
