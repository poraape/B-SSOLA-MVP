// src/features/resources/GlossaryPage.tsx

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { glossaryData } from './data/glossary';
import { useGlossarySearch } from './hooks/useGlossarySearch';
import { groupByAlphabet } from './utils/searchUtils';
import { GlossaryFilters } from './components/GlossaryFilters';
import { GlossaryCard } from './components/GlossaryCard';
import { AlphabetNav } from './components/AlphabetNav';

export const GlossaryPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLetters, setActiveLetters] = useState<string[]>([]);
  const glossaryRef = useRef<HTMLDivElement>(null);

  // Hook de busca otimizado com memoização
  const { categories, filteredItems } = useGlossarySearch(
    glossaryData,
    search,
    selectedCategory,
    { regionFilter: 'ZL-SP' }
  );

  // Agrupar por letra
  const groupedByLetter = groupByAlphabet(filteredItems);
  const availableLetters = Object.keys(groupedByLetter);

  // Handler para letra selecionada
  const handleLetterSelect = (letter: string) => {
    setActiveLetters([letter]);
    const element = document.getElementById(`letter-${letter}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handler para termo relacionado
  const handleRelatedClick = (relatedTerm: string) => {
    setSearch(relatedTerm);
    setSelectedCategory('all');
    glossaryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Limpar filtros
  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setActiveLetters([]);
  };

  return (
    <main className="space-y-8">
      {/* Header */}
      <section className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            Glossário B-SSOLA
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Dicionário de termos para educadores: protocolos, gírias estudantis, direitos e rede de proteção.
          <br />
          <span className="text-sm text-slate-500 italic">Contextualizado para Zona Leste, São Paulo.</span>
        </p>
      </section>

      {/* Filtros */}
      <GlossaryFilters
        search={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClear={handleClearFilters}
      />

      {/* Navegação Alfabética */}
      {filteredItems.length > 0 && (
        <AlphabetNav
          availableLetters={availableLetters}
          onLetterSelect={handleLetterSelect}
          activeLetters={activeLetters}
        />
      )}

      {/* Resultados */}
      <section ref={glossaryRef} className="space-y-8">
        {filteredItems.length === 0 ? (
          // Empty State
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-medium mb-2">
              Nenhum termo encontrado para "{search}"
            </p>
            <p className="text-slate-400 text-sm mb-4">
              Tente procurar por: protocolo, gíria, direito ou saúde
            </p>
            <button
              onClick={handleClearFilters}
              className="text-blue-600 dark:text-blue-400 font-black uppercase text-[10px] tracking-widest hover:underline"
            >
              ↺ Limpar filtros e explorar tudo
            </button>
          </div>
        ) : (
          <>
            {/* Estatísticas */}
            <div className="flex justify-between items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {filteredItems.length} termo{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {selectedCategory !== 'all' && `Filtrado: ${selectedCategory}`}
              </span>
            </div>

            {/* Grid por Letra */}
            {availableLetters.map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="space-y-4">
                {/* Título da Letra */}
                <div className="flex items-center gap-3 pt-4 border-t-2 border-slate-200 dark:border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <span className="font-black text-lg text-blue-600 dark:text-blue-400">
                      {letter}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-black text-slate-500 dark:text-slate-400">
                    {groupedByLetter[letter].length} termo{groupedByLetter[letter].length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedByLetter[letter].map((item, index) => (
                    <GlossaryCard
                      key={`${letter}-${index}`}
                      item={item}
                      searchQuery={search}
                      onRelatedClick={handleRelatedClick}
                    />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </section>

      {/* Footer com Info */}
      <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p>
          📚 <strong>50 termos</strong> contextualizados para educadores da Zona Leste, SP
        </p>
        <p>
          💡 Validação Multiperspectiva Fase 0-A | Atualizado 2026
        </p>
        <p className="text-[10px]">
          Sugestões de novos termos? Contate coordenação pedagógica.
        </p>
      </section>
    </main>
  );
};
