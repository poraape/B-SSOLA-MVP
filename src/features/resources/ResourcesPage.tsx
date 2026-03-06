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
      <section className="rounded-[2rem] border border-slate-200/90 bg-white/95 p-6 shadow-[0_10px_28px_-22px_rgba(15,23,42,0.45)] dark:border-slate-700 dark:bg-slate-900/90 md:rounded-[3rem] md:p-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">Recursos</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            Consulte definições, respostas rápidas e simulações.
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
              className={`text-left p-6 rounded-3xl border-2 transition-all group ${
                activeTab === tab.id
                  ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400'
              }`}
            >
              <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-white dark:bg-slate-700 shadow-sm'
              }`}>
                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-blue-600'}`} />
              </div>
              <h3 className="text-lg font-black tracking-tight">{tab.label}</h3>
              <p className={`text-xs mt-1 font-medium ${activeTab === tab.id ? 'text-blue-100' : 'text-slate-500'}`}>
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
