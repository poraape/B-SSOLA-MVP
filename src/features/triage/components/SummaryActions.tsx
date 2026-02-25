import React from 'react';
import { Copy, Printer, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Flow, TriageResult } from '../../../types';

interface SummaryActionsProps {
  flow: Flow;
  result: TriageResult;
}

export const SummaryActions: React.FC<SummaryActionsProps> = ({ flow, result }) => {
  const handleCopy = () => {
    const text = `
RESUMO DE ORIENTAÇÃO - BÚSSOLA
---
Situação: ${flow.meta.title}
Nível de Risco: ${result.severity.toUpperCase()}
Encaminhamento: ${result.primaryService?.name || 'N/A'}
Data/Hora: ${new Date().toLocaleString('pt-BR')}

Ações Escolares:
${result.schoolActions.map(a => `- ${a}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    alert('Resumo copiado para a área de transferência!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100 print:hidden">
      <Button 
        variant="outline" 
        onClick={handleCopy}
        className="flex-1 min-w-[200px]"
      >
        <Copy className="w-4 h-4 mr-2" />
        Copiar resumo
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
