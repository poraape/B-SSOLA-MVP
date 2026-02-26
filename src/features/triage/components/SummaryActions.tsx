import React from 'react';
import { Copy, Printer, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Flow, TriageResult } from '../../../types';

interface SummaryActionsProps {
  flow: Flow;
  result: TriageResult;
}

export const SummaryActions: React.FC<SummaryActionsProps> = ({ flow, result }) => {
  const now = new Date().toLocaleString('pt-BR');

  const buildTechnicalText = () => `
RELATÓRIO TÉCNICO - BÚSSOLA (SEM DADOS PESSOAIS)
---
Situação/Fluxo: ${flow.meta.title}
Risco (exibido): ${result.severity.toUpperCase()}
Nível (interno): ${(result as any).level || 'N/A'}
Data/Hora: ${now}

Roteiro institucional:
${result.schoolActions.map(a => `- ${a}`).join('\n')}

Serviço prioritário: ${result.primaryService?.name || 'N/A'}
Serviço complementar: ${result.secondaryService?.name || 'N/A'}

Aviso: Ferramenta de apoio institucional. Não substitui avaliação técnica especializada.
`.trim();

  const buildOrientativeText = () => {
    const pts = (result as any).explanationPoints as string[] | undefined;
    return `
RELATÓRIO ORIENTATIVO - BÚSSOLA (FORMAÇÃO)
---
Situação/Fluxo: ${flow.meta.title}
Data/Hora: ${now}

Por que essa classificação:
${pts?.length ? pts.map(p => `- ${p}`).join('\n') : '- Classificação definida pelo protocolo institucional'}

Boas práticas:
- Escuta qualificada, sem julgamentos
- Registro objetivo (sem interpretações)
- Não prometer sigilo absoluto
- Evitar exposição e repetição desnecessária do relato

Roteiro institucional:
${result.schoolActions.map(a => `- ${a}`).join('\n')}
`.trim();
  };

  const handleCopyTechnical = () => {
    navigator.clipboard.writeText(buildTechnicalText());
    alert('Versão técnica copiada!');
  };

  const handleCopyOrientative = () => {
    navigator.clipboard.writeText(buildOrientativeText());
    alert('Versão orientativa copiada!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100 print:hidden">
      <Button 
        variant="outline" 
        onClick={handleCopyTechnical}
        className="flex-1 min-w-[200px]"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copiar técnica
      </Button>
      <Button 
        variant="outline" 
        onClick={handleCopyOrientative}
        className="flex-1 min-w-[200px]"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copiar orientativa
      </Button>
      <Button 
        variant="outline" 
        onClick={handlePrint}
        className="flex-1 min-w-[200px]"
      >
        <Printer className="w-4 h-4 mr-2" />
        Exportar PDF
      </Button>
      <Button 
        variant="primary" 
        onClick={() => alert('Gestão acionada via protocolo interno.')}
        className="flex-1 min-w-[200px]"
      >
        <CheckCircle2 className="w-4 h-4 mr-2" />
        Acionar Gestão
      </Button>
    </div>
  );
};
