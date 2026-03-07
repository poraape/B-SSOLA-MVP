import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme } from '../context/ThemeContext';

import { Header } from './Header';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans selection:bg-blue-100 flex flex-col ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer / Meta Info */}
      <footer className={`py-8 border-t print:hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Protocolo Bússola © 2026 • Ermelino Matarazzo
          </p>
          <p className="mx-auto max-w-md text-[0.72rem] text-slate-500 dark:text-slate-400 sm:text-xs">
            Este aplicativo é uma ferramenta de apoio. Em situações de risco de vida, acione imediatamente os serviços de emergência (190, 192, 193).
          </p>
        </div>
      </footer>
    </div>
  );
};
