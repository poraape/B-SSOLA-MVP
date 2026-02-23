import { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  Brain, 
  Home, 
  BookOpen, 
  Heart,
  Scale,
  Search, 
  ArrowLeft, 
  ChevronRight, 
  Phone, 
  Info, 
  Copy, 
  Printer,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldAlert,
  Puzzle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import modelData from './data/model.v1.json';
import { 
  AppModel, 
  Category, 
  Flow, 
  TriageResult,
  TriageQuestion
} from './types';

const model = modelData as unknown as AppModel;

type ViewState = 'home' | 'category' | 'flow' | 'result';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [finalResult, setFinalResult] = useState<TriageResult | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGuardrail, setIsGuardrail] = useState(false);
  const [guardrailIndex, setGuardrailIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Search results
  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    const results: Array<Flow> = [];
    const term = searchTerm.toLowerCase();

    model.flows.forEach(flow => {
      const matchesLabel = flow.meta.title.toLowerCase().includes(term);
      const matchesKeywords = flow.meta.keywords.some(k => k.toLowerCase().includes(term));
      const category = model.categories.find(c => c.id === flow.meta.categoryId);
      const matchesCat = category?.label.toLowerCase().includes(term);

      if (matchesLabel || matchesKeywords || matchesCat) {
        results.push(flow);
      }
    });

    return results;
  }, [searchTerm]);

  const startFlow = (flowId: string) => {
    const flow = model.flows.find(f => f.meta.id === flowId);
    if (!flow) return;

    setSelectedFlow(flow);
    setAnswers({});
    setFinalResult(null);
    setSearchTerm('');
    
    if (model.meta.guardrailEnabled && flow.meta.categoryId !== 'seguranca_institucional') {
      setIsGuardrail(true);
      setGuardrailIndex(0);
      setView('flow');
    } else {
      setIsGuardrail(false);
      setCurrentQuestionId(flow.triage.questions[0].id);
      setView('flow');
    }
  };

  const handleAnswer = (value: boolean | string, option?: any) => {
    if (isGuardrail) {
      const question = model.guardrail.questions[guardrailIndex];
      if (value === true && question.ifTrue.startsWith('redirect:')) {
        const targetFlowId = question.ifTrue.replace('redirect:', '').toLowerCase();
        startFlow(targetFlowId);
        return;
      }

      if (guardrailIndex < model.guardrail.questions.length - 1) {
        setGuardrailIndex(guardrailIndex + 1);
      } else {
        setIsGuardrail(false);
        if (selectedFlow) {
          setCurrentQuestionId(selectedFlow.triage.questions[0].id);
        }
      }
    } else if (selectedFlow && currentQuestionId && option) {
      setAnswers(prev => ({ ...prev, [currentQuestionId]: option.label }));

      if (option.level) {
        setFinalResult(selectedFlow.results[option.level]);
        setView('result');
      } else if (option.next) {
        setCurrentQuestionId(option.next);
      }
    }
  };

  const goBack = () => {
    if (view === 'result') {
      setView('flow');
      if (selectedFlow) setCurrentQuestionId(selectedFlow.triage.questions[0].id);
    } else if (view === 'flow') {
      if (isGuardrail && guardrailIndex > 0) {
        setGuardrailIndex(guardrailIndex - 1);
      } else {
        setView('category');
        setIsGuardrail(false);
      }
    } else if (view === 'category') {
      setView('home');
      setSelectedCategory(null);
    }
  };

  const reset = () => {
    setView('home');
    setSelectedCategory(null);
    setSelectedFlow(null);
    setCurrentQuestionId(null);
    setFinalResult(null);
    setAnswers({});
    setIsGuardrail(false);
    setSearchTerm('');
  };

  const getIcon = (iconStr: string) => {
    switch (iconStr) {
      case 'alert': return <AlertTriangle className="w-6 h-6" />;
      case 'shield': return <Shield className="w-6 h-6" />;
      case 'brain': return <Brain className="w-6 h-6" />;
      case 'home': return <Home className="w-6 h-6" />;
      case 'book': return <BookOpen className="w-6 h-6" />;
      case 'heart': return <Heart className="w-6 h-6" />;
      case 'balance': return <Scale className="w-6 h-6" />;
      case 'scales': return <Scale className="w-6 h-6" />;
      case 'warning': return <AlertTriangle className="w-6 h-6" />;
      case 'puzzle': return <Puzzle className="w-6 h-6" />;
      case 'accessibility': return <Puzzle className="w-6 h-6" />;
      case 'handshake': return <BookOpen className="w-6 h-6" />;
      default: return <Info className="w-6 h-6" />;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-500 bg-red-50 border-red-100';
      case 'orange': return 'text-orange-500 bg-orange-50 border-orange-100';
      case 'purple': return 'text-purple-500 bg-purple-50 border-purple-100';
      case 'blue': return 'text-blue-500 bg-blue-50 border-blue-100';
      case 'teal': return 'text-teal-500 bg-teal-50 border-teal-100';
      case 'yellow': return 'text-yellow-500 bg-yellow-50 border-yellow-100';
      case 'indigo': return 'text-indigo-500 bg-indigo-50 border-indigo-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getButtonColorClass = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-600 hover:bg-red-700 shadow-red-200';
      case 'orange': return 'bg-orange-600 hover:bg-orange-700 shadow-orange-200';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 shadow-purple-200';
      case 'blue': return 'bg-blue-600 hover:bg-blue-700 shadow-blue-200';
      case 'teal': return 'bg-teal-600 hover:bg-teal-700 shadow-teal-200';
      case 'yellow': return 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200';
      case 'indigo': return 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200';
      default: return 'bg-slate-600 hover:bg-slate-700 shadow-slate-200';
    }
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getService = (id: string | null) => model.services.find(s => s.id === id);
  const getOrientation = (id: string) => model.orientationBlocks.find(o => o.id === id);

  const renderSummary = () => {
    if (!selectedFlow || !finalResult) return null;
    
    const primary = finalResult.primaryService;
    const secondary = finalResult.secondaryService;

    return model.summaryTemplate.structure.map((line, i) => {
      let text = line
        .replace('{{flowLabel}}', selectedFlow.meta.title)
        .replace('{{actionType}}', finalResult.severity.toUpperCase())
        .replace('{{primaryServiceName}}', primary?.name || 'N/A')
        .replace('{{secondaryServiceName}}', secondary?.name || 'N/A');
      
      return <p key={i} className="text-slate-700 font-medium">{text}</p>;
    });
  };

  const handleExport = (format: string) => {
    if (!selectedFlow || !finalResult) return;
    
    const primary = finalResult.primaryService;

    const text = `
${model.summaryTemplate.title}
---
Situação: ${selectedFlow.meta.title}
Nível de Risco: ${finalResult.severity.toUpperCase()}
Encaminhamento: ${primary?.name}
Data/Hora: ${new Date().toLocaleString('pt-BR')}

Ações Escolares:
${finalResult.schoolActions.map(a => `- ${a}`).join('\n')}
    `.trim();

    if (format === 'copy') {
      navigator.clipboard.writeText(text);
      alert('Copiado para a área de transferência!');
    } else if (format === 'pdf_print') {
      window.print();
    }
  };

  const isEmergency = selectedFlow?.meta.type === 'medical_emergency' || selectedFlow?.meta.type === 'security_emergency';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">{model.meta.appName}</h1>
              <p className="text-xs text-slate-500 font-medium">{model.meta.scope} v{model.meta.version}</p>
            </div>
          </div>
          
          <button 
            onClick={() => startFlow('emergencia_imediata')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            Emergência
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          {/* Home View */}
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Search */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input 
                  type="text"
                  placeholder="Buscar por situação (ex.: bullying, autolesão...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg"
                />
                
                {/* Search Results Dropdown */}
                {searchTerm.length >= 2 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 overflow-hidden max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((flow) => (
                        <button
                          key={flow.meta.id}
                          onClick={() => startFlow(flow.meta.id)}
                          className="w-full text-left p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 flex items-center justify-between group"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">{flow.meta.title}</p>
                            <p className="text-xs text-slate-500">
                              {model.categories.find(c => c.id === flow.meta.categoryId)?.label}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-all" />
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-500">
                        Nenhuma situação encontrada para "{searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {model.categories.map((cat) => {
                  const colorClasses = getColorClass(cat.color);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setView('category');
                      }}
                      className={`bg-white border border-slate-200 p-6 rounded-3xl text-left hover:shadow-xl transition-all group relative overflow-hidden`}
                    >
                      <div className="relative z-10">
                        <div className={`mb-4 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${colorClasses}`}>
                          {getIcon(cat.icon)}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{cat.label}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                          {cat.description}
                        </p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {cat.subcategories.length} situações catalogadas
                        </p>
                      </div>
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-6 h-6 text-blue-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Category View */}
          {view === 'category' && selectedCategory && (
            <motion.div 
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button onClick={goBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" /> Voltar para o início
              </button>
              
              <div className="bg-white border border-slate-200 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl ${getColorClass(selectedCategory.color)}`}>
                    {getIcon(selectedCategory.icon)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCategory.label}</h2>
                    <p className="text-slate-500">{selectedCategory.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedCategory.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => startFlow(sub.id)}
                      className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                    >
                      <span className="font-semibold text-lg">{sub.label}</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Flow View */}
          {view === 'flow' && (
            <motion.div 
              key="flow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="flex items-center justify-between">
                <button onClick={goBack} className="text-slate-500 hover:text-blue-600 transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex gap-1">
                  <div className={`h-1.5 w-24 rounded-full ${isEmergency ? 'bg-red-600 animate-pulse' : 'bg-blue-600'}`} />
                </div>
              </div>

              <div className={`bg-white border ${isEmergency ? 'border-red-200 shadow-red-100' : 'border-slate-200 shadow-slate-200/50'} rounded-[2.5rem] p-10 shadow-xl`}>
                {isGuardrail ? (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Checagem de Segurança</span>
                      </div>
                      <h2 className="text-2xl font-bold leading-tight">
                        {model.guardrail.questions[guardrailIndex].text}
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleAnswer(true)}
                        className="p-6 rounded-3xl border-2 border-slate-100 hover:border-red-500 hover:bg-red-50 transition-all flex flex-col items-center gap-3 group"
                      >
                        <CheckCircle2 className="w-8 h-8 text-slate-300 group-hover:text-red-500" />
                        <span className="font-bold text-lg">Sim</span>
                      </button>
                      <button
                        onClick={() => handleAnswer(false)}
                        className="p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center gap-3 group"
                      >
                        <XCircle className="w-8 h-8 text-slate-300 group-hover:text-blue-500" />
                        <span className="font-bold text-lg">Não</span>
                      </button>
                    </div>
                  </div>
                ) : selectedFlow && currentQuestionId && (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-1">
                        {selectedFlow.meta.type === 'medical_emergency' && (
                          <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter animate-pulse">Emergência Médica</span>
                        )}
                        {selectedFlow.meta.type === 'security_emergency' && (
                          <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter animate-pulse">Risco Institucional</span>
                        )}
                        <span className={`text-xs font-bold ${isEmergency ? 'text-red-600' : 'text-blue-600'} uppercase tracking-widest`}>{selectedFlow.meta.title}</span>
                      </div>
                      <h2 className="text-2xl font-bold leading-tight">
                        {selectedFlow.triage.questions.find(q => q.id === currentQuestionId)?.text}
                      </h2>
                      {isEmergency && (
                        <p className="text-sm text-red-500 font-bold flex items-center gap-1 mt-2">
                          <AlertTriangle className="w-4 h-4" /> Decisão Crítica: Responda com agilidade.
                        </p>
                      )}
                    </div>

                    <div className={`grid ${selectedFlow.triage.questions.find(q => q.id === currentQuestionId)?.options.length === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                      {selectedFlow.triage.questions.find(q => q.id === currentQuestionId)?.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(option.label, option)}
                          className={`p-6 rounded-3xl border-2 border-slate-100 transition-all flex flex-col items-center gap-3 group ${isEmergency ? 'hover:border-red-500 hover:bg-red-50' : 'hover:border-blue-500 hover:bg-blue-50'}`}
                        >
                          {option.label === 'Sim' ? (
                            <CheckCircle2 className={`w-8 h-8 text-slate-300 ${isEmergency ? 'group-hover:text-red-500' : 'group-hover:text-blue-500'}`} />
                          ) : option.label === 'Não' ? (
                            <XCircle className={`w-8 h-8 text-slate-300 ${isEmergency ? 'group-hover:text-red-500' : 'group-hover:text-blue-500'}`} />
                          ) : (
                            <div className={`w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400 ${isEmergency ? 'group-hover:border-red-500 group-hover:text-red-500' : 'group-hover:border-blue-500 group-hover:text-blue-500'}`}>
                              {idx + 1}
                            </div>
                          )}
                          <span className="font-bold text-lg">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Result View */}
          {view === 'result' && selectedFlow && finalResult && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 print:p-0"
            >
              <div className="flex items-center justify-between print:hidden">
                <button onClick={goBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium">
                  <ArrowLeft className="w-4 h-4" /> Revisar respostas
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleExport('copy')}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500" 
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleExport('pdf_print')}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                  >
                    <Printer className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                {/* Result Header */}
                <div className={`p-10 text-white ${getButtonColorClass(model.categories.find(c => c.id === selectedFlow.meta.categoryId)?.color || 'blue')}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest opacity-80">Resultado da Orientação</span>
                  </div>
                  <h2 className="text-3xl font-bold leading-tight">{selectedFlow.meta.title}</h2>
                </div>

                <div className="p-10 space-y-10">
                  {/* UI Flags / Alerts */}
                  {(finalResult.uiFlags?.confidential || finalResult.uiFlags?.avoidRetraumatization) && (
                    <div className="space-y-3">
                      {finalResult.uiFlags?.confidential && (
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-amber-800">
                          <ShieldAlert className="w-5 h-5 shrink-0" />
                          <p className="text-xs font-bold uppercase tracking-widest">Protocolo de Sigilo Reforçado Ativado</p>
                        </div>
                      )}
                      {finalResult.uiFlags?.avoidRetraumatization && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-800">
                          <Heart className="w-5 h-5 shrink-0" />
                          <p className="text-xs font-bold uppercase tracking-widest">Atenção: Evitar Revitalização / Escuta Única</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary Template */}
                  <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{model.summaryTemplate.title}</h3>
                    {renderSummary()}
                  </div>

                  {/* Services */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {finalResult.primaryService && (
                      <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
                        <div className="flex items-center gap-2 mb-3 text-blue-600">
                          <MapPin className="w-5 h-5" />
                          <span className="font-bold uppercase text-xs tracking-wider">Serviço Prioritário</span>
                        </div>
                        <p className="text-lg font-bold text-blue-900 leading-snug">{finalResult.primaryService.name}</p>
                        <p className="text-sm text-blue-700 mt-2">{getService(finalResult.primaryService.id)?.phone}</p>
                      </div>
                    )}
                    {finalResult.secondaryService && (
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl">
                        <div className="flex items-center gap-2 mb-3 text-slate-600">
                          <Info className="w-5 h-5" />
                          <span className="font-bold uppercase text-xs tracking-wider">Apoio Complementar</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900 leading-snug">{finalResult.secondaryService.name}</p>
                        <p className="text-sm text-slate-700 mt-2">{getService(finalResult.secondaryService.id)?.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* School Actions */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                      Ações Escolares Recomendadas
                    </h3>
                    <ul className="space-y-3">
                      {finalResult.schoolActions.map((item, i) => (
                        <li key={i} className="flex gap-3 items-start bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-slate-800 font-medium">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pb-12 print:hidden">
                <button 
                  onClick={reset}
                  className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  Finalizar e Voltar ao Início
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 px-4 z-40 print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <span>{model.meta.appName} v{model.meta.version}</span>
          <div className="flex gap-4">
            <span>{model.institution.name}</span>
            <span>Privacidade Garantida</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
