import React from 'react';
import { X, Type, Eye, RotateCcw, Check } from 'lucide-react';
import { useAccessibility } from '../../../app/context/AccessibilityContext';
import { useTheme } from '../../../app/context/ThemeContext';

interface AccessibilityMenuProps {
  onClose: () => void;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ onClose }) => {
  const { settings, updateSettings, resetSettings } = useAccessibility();
  const { theme } = useTheme();

  const fontSizes: { label: string; value: 'small' | 'medium' | 'large' | 'extra-large' }[] = [
    { label: 'Pequena', value: 'small' },
    { label: 'Padrão', value: 'medium' },
    { label: 'Grande', value: 'large' },
    { label: 'Extra Grande', value: 'extra-large' },
  ];

  return (
    <div className={`fixed top-24 right-4 w-80 rounded-3xl shadow-2xl z-[2000] border p-6 animate-in slide-in-from-top-4 duration-200 ${
      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black uppercase tracking-tight">Acessibilidade</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Font Size */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Type className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Tamanho da Fonte</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => updateSettings({ fontSize: size.value })}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                  settings.fontSize === size.value
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Options */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Opções Visuais</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => updateSettings({ highContrast: !settings.highContrast })}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                settings.highContrast
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <span className="text-sm font-bold">Alto Contraste</span>
              {settings.highContrast && <Check className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => updateSettings({ dyslexicFont: !settings.dyslexicFont })}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                settings.dyslexicFont
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              <span className="text-sm font-bold">Fonte para Dislexia</span>
              {settings.dyslexicFont && <Check className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={resetSettings}
          className="w-full flex items-center justify-center gap-2 p-4 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
        >
          <RotateCcw className="w-4 h-4" />
          Restaurar Padrões
        </button>
      </div>
    </div>
  );
};
