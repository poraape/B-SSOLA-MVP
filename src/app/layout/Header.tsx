import React, { Suspense, lazy, useState } from 'react';
import { Sun, Moon, Settings, Search as SearchIcon, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AccessibilityMenu } from '../../features/accessibility/components/AccessibilityMenu';
import { useSearch } from '../../features/search/context/SearchContext';
import { motion, AnimatePresence } from 'motion/react';
import { CompassIcon } from '../../features/shared/assets/CompassIcon';
import schoolLogo from '../../features/shared/assets/logoescola.png';
import schoolLogoFallback from '../../assets/school-logo-fallback.svg';
import { useAppMode } from '../../domain/appMode/AppModeContext';

const SearchBar = lazy(() =>
  import('../../features/search/components/SearchBar').then((module) => ({
    default: module.SearchBar,
  })),
);

export const Header: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isSearchOpen, toggleSearch, closeSearch } = useSearch();
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const { mode, setMode } = useAppMode();

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Decisor', path: '/atendimento' },
    { label: 'Rede', path: '/rede' },
    { label: 'Recursos', path: '/recursos' },
  ];

  const isNavItemActive = (path: string): boolean => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/atendimento') {
      return (
        location.pathname === '/atendimento' ||
        location.pathname.startsWith('/fluxo/') ||
        location.pathname.startsWith('/resultado/')
      );
    }
    if (path === '/rede') {
      return location.pathname === '/rede' || location.pathname.startsWith('/rede/');
    }
    if (path === '/recursos') {
      return location.pathname === '/recursos' || location.pathname.startsWith('/recursos/');
    }
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-[1001] border-b transition-colors duration-300 ${
      theme === 'dark'
        ? 'border-slate-700/80 bg-slate-900/70 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.9)]'
        : 'border-white/60 bg-white/70 shadow-[0_12px_30px_-22px_rgba(15,23,42,0.4)]'
    } backdrop-blur-2xl`}>
      <div className="mx-auto grid w-full max-w-[112rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-4 lg:gap-6 lg:px-6">
        {/* Logo Section */}
        <Link to="/" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3.5" onClick={closeSearch}>
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/70 bg-gradient-to-b from-white to-slate-100 shadow-[0_6px_18px_-12px_rgba(15,23,42,0.7)] dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 sm:h-12 sm:w-12">
            <motion.div
              animate={{ 
                rotate: [0, 1.5, 0, -1.5, 0],
                scale: [1, 1.008, 1]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: 'easeInOut',
                repeatType: 'loop'
              }}
              className="flex items-center justify-center"
            >
              <CompassIcon className="h-8 w-8 text-slate-900 dark:text-slate-100 sm:h-10 sm:w-10" />
            </motion.div>
          </div>
          <div className="min-w-0">
            <h1 className="leading-none text-base font-black tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg md:text-xl">Bússola</h1>
            <p className="hidden text-[0.65rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 md:block">Decisão e encaminhamento escolar</p>
          </div>
        </Link>
        
        {/* School Info (mobile: first line right) */}
        <div className="flex items-center gap-2 rounded-[18px] border border-slate-200/90 bg-white/80 px-2.5 py-1.5 shadow-[0_10px_20px_-16px_rgba(15,23,42,0.75)] dark:border-slate-700 dark:bg-slate-800/80 md:hidden">
          <div className="text-right leading-tight">
            <p className="text-[0.55rem] font-black uppercase tracking-[0.1em] text-blue-600">Unidade</p>
            <p className="text-[0.65rem] font-bold text-slate-700 dark:text-slate-200">E.E. Ermelino</p>
          </div>
          <img
            src={schoolLogo}
            alt="Logo Escola"
            className="h-7 w-auto shrink-0 object-contain"
            onError={(e) => {
              e.currentTarget.src = schoolLogoFallback;
            }}
          />
        </div>

        {/* Navigation Menu (mobile: second line left) */}
        <nav className="max-w-full justify-self-stretch overflow-x-auto rounded-full border border-white/65 bg-white/65 p-1.5 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)] backdrop-blur-lg no-scrollbar dark:border-slate-700/80 dark:bg-slate-800/70 md:col-span-1 md:justify-self-center">
          <div className="flex min-w-max items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeSearch}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all sm:px-4 sm:text-sm md:px-6 ${
                  isNavItemActive(item.path)
                    ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.9)]'
                    : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/70 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleSearch}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all sm:gap-2 sm:px-4 sm:text-sm md:px-6 ${
                isSearchOpen
                  ? 'bg-blue-600 text-white shadow-[0_8px_16px_-12px_rgba(37,99,235,0.9)]'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700/70 dark:hover:text-white'
              }`}
            >
              {isSearchOpen ? <X className="w-4 h-4" /> : <SearchIcon className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSearchOpen ? 'Fechar' : 'Busca'}</span>
            </button>
          </div>
        </nav>

        {/* Right Section: School Info & Actions */}
        <div className="hidden shrink-0 items-center gap-2 justify-self-end sm:gap-3.5 md:flex md:gap-4.5">
          {/* App Mode — Hidden per design spec, context preserved for future use */}
          {false && (
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/70 p-1 text-xs font-bold uppercase shadow-[0_6px_16px_-14px_rgba(15,23,42,0.5)] dark:border-slate-700 dark:bg-slate-800/70">
              <button
                onClick={() => setMode('operacional')}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  mode === 'operacional'
                    ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                }`}
              >
                Operacional
              </button>
              <button
                onClick={() => setMode('formacao')}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  mode === 'formacao'
                    ? 'bg-emerald-600 text-white shadow-[0_8px_16px_-12px_rgba(5,150,105,0.9)]'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                }`}
              >
                Formação
              </button>
            </div>
          )}

          {/* School Info */}
          <div className="flex items-center gap-2.5 rounded-[20px] border border-slate-200/90 bg-white/80 px-3.5 py-2 shadow-[0_12px_24px_-18px_rgba(15,23,42,0.75)] dark:border-slate-700 dark:bg-slate-800/80 md:gap-3">
            <div className="text-right">
              <p className="text-[0.65rem] font-black uppercase leading-none tracking-[0.14em] text-blue-600 md:text-[0.7rem]">Unidade Escolar</p>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">E.E. Ermelino Matarazzo</p>
            </div>
            <img 
              src={schoolLogo} 
              alt="Logo Escola" 
              className="h-10 w-auto shrink-0 object-contain md:h-12"
              onError={(e) => {
                e.currentTarget.src = schoolLogoFallback;
              }}
            />
          </div>

          {/* Theme & Accessibility */}
          <div className="flex items-center gap-1.5 rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-1 shadow-[0_10px_20px_-16px_rgba(15,23,42,0.5)] dark:border-slate-700 dark:bg-slate-800/70 sm:gap-2 sm:p-1.5">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 sm:h-11 sm:w-11"
              title="Alternar Tema"
            >
              {theme === 'light' ? <Moon className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5" />}
            </button>
            <button
              onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all sm:h-11 sm:w-11 ${
                isAccessibilityOpen
                  ? 'bg-blue-600 text-white shadow-[0_8px_16px_-10px_rgba(59,130,246,0.7)]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
              title="Acessibilidade"
            >
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Theme & Accessibility (mobile: second line right) */}
        <div className="flex items-center gap-1.5 justify-self-end rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-1 shadow-[0_10px_20px_-16px_rgba(15,23,42,0.5)] dark:border-slate-700 dark:bg-slate-800/70 sm:gap-2 sm:p-1.5 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            title="Alternar Tema"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-yellow-500" />}
          </button>
          <button
            onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
              isAccessibilityOpen
                ? 'bg-blue-600 text-white shadow-[0_8px_16px_-10px_rgba(59,130,246,0.7)]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
            title="Acessibilidade"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Accessibility Menu Overlay */}
      {isAccessibilityOpen && (
        <AccessibilityMenu onClose={() => setIsAccessibilityOpen(false)} />
      )}

      {/* Collapsible Search Panel - Respects Layout Flow */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="max-w-4xl mx-auto px-4 py-8">
              <Suspense fallback={<div className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
                <SearchBar />
              </Suspense>
              <div className="mt-4 flex justify-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Pressione ESC para fechar a busca
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
