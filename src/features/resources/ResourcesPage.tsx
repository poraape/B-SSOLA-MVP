import { Book, HelpCircle, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { FAQPage } from './FAQPage';
import { GlossaryPage } from './GlossaryPage';
import { SimulatorPage } from './SimulatorPage';

type ResourceTab = 'glossary' | 'faq' | 'simulator';
type TabDefinition = {
  id: ResourceTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

export const ResourcesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as ResourceTab) || 'glossary';

  const setActiveTab = (tab: ResourceTab) => {
    setSearchParams({ tab }, { replace: true });
  };

  const tabs: TabDefinition[] = [
    { id: 'glossary', label: 'Glossário', icon: Book, description: 'Termos e conceitos' },
    { id: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Respostas rápidas' },
    { id: 'simulator', label: 'Simulador', icon: PlayCircle, description: 'Treino guiado' },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="rounded-[20px] border border-slate-200/70 bg-white/45 p-6 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/35 md:p-8">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">Recursos</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Consulte termos e conceitos, respostas rápidas e simulações.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ResourceTab)}
              className={`text-left p-6 rounded-[20px] border transition-all group ${
                activeTab === tab.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-[0_10px_24px_-18px_rgba(37,99,235,0.75)]'
                  : 'bg-white/75 border-slate-200/90 text-slate-600 hover:border-blue-400 hover:bg-white dark:bg-slate-900/70 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500'
              }`}
            >
              <div className={`mb-4 h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                activeTab === tab.id ? 'bg-white/20 dark:bg-slate-800/20' : 'bg-white/90 dark:bg-slate-800 shadow-sm'
              }`}>
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white dark:text-slate-100' : 'text-blue-600 dark:text-blue-400'}`} />
              </div>
              <h3 className="text-lg font-black tracking-tight">{tab.label}</h3>
              <p className={`mt-1 text-xs font-medium ${activeTab === tab.id ? 'text-slate-200 dark:text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {tab.description}
              </p>
            </button>
            );
          })}
        </div>
      </section>

      {/* Content Section */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'glossary' && <GlossaryPage />}
            {activeTab === 'faq' && <FAQPage />}
            {activeTab === 'simulator' && <SimulatorPage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
