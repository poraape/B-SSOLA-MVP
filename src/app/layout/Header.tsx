import React, { useState } from 'react';
import { Compass, Sun, Moon, Settings, Search as SearchIcon, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from '../../features/search/components/SearchBar';
import { AccessibilityMenu } from '../../features/accessibility/components/AccessibilityMenu';
import { useSearch } from '../../features/search/context/SearchContext';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isSearchOpen, toggleSearch, closeSearch } = useSearch();
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Decisor', path: '/categoria/saude_fisica' }, // Example path
    { label: 'Rede', path: '/rede' },
    { label: 'Recursos', path: '/recursos' },
  ];

  return (
    <header className={`sticky top-0 z-[1001] transition-colors duration-300 border-b ${
      theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
    } backdrop-blur-md shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeSearch}>
          <div className="w-12 h-12 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center shadow-md">
            <Compass className="text-slate-900 w-8 h-8" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">Bússola</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Guia de Acolhimento</p>
          </div>
        </Link>
        
        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={closeSearch}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleSearch}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              isSearchOpen 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isSearchOpen ? <X className="w-4 h-4" /> : <SearchIcon className="w-4 h-4" />}
            {isSearchOpen ? 'Fechar' : 'Busca'}
          </button>
        </nav>

        {/* Right Section: School Info & Actions */}
        <div className="flex items-center gap-6">
          {/* School Info */}
          <div className="hidden xl:flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter leading-none">Unidade Escolar</p>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">E.E. Ermelino Matarazzo</p>
            </div>
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center shadow-sm overflow-hidden border border-slate-200">
              <img 
                src="https://images.tcdn.com.br/img/img_prod/1043126/adesivo_brasao_escola_estadual_ermelino_matarazzo_1013_1_86567f80590453580498704987049870.jpg" 
                alt="Logo E.E. Ermelino Matarazzo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-slate-900 font-black text-xs">EM</span>';
                }}
              />
            </div>
          </div>

          {/* Theme & Accessibility */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              title="Alternar Tema"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-500" />}
            </button>
            <button
              onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
              className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${
                isAccessibilityOpen 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Acessibilidade"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
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
              <SearchBar />
              <div className="mt-4 flex justify-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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
