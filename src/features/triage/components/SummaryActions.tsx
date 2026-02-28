import React from 'react';
import { Copy, Printer, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Flow, TriageResult } from '../../../types';
import { useAppMode } from '../../../domain/appMode/AppModeContext';
import { telemetryService } from '../../../application/telemetry/TelemetryService';

interface SummaryActionsProps {
  flow: Flow;
  result: TriageResult;
}

export const SummaryActions: React.FC<SummaryActionsProps> = ({ flow, result }) => {
  const { mode } = useAppMode();
  const now = new Date().toLocaleString('pt-BR');
  const internalLevel = result.level || 'N/A';
  const explanationPoints = result.explanationPoints;

  const buildTechnicalText = () => `
RELATÓRIO TÉCNICO - BÚSSOLA (SEM DADOS PESSOAIS)
---
Situação/Fluxo: ${flow.meta.title}
Risco (exibido): ${result.severity.toUpperCase()}
Nível (interno): ${internalLevel}
Data/Hora: ${now}

Roteiro institucional:
${result.schoolActions.map(a => `- ${a}`).join('\n')}

Serviço prioritário: ${result.primaryService?.name || 'N/A'}
Serviço complementar: ${result.secondaryService?.name || 'N/A'}

Aviso: Ferramenta de apoio institucional. Não substitui avaliação técnica especializada.
`.trim();

  const buildOrientativeText = () => {
    return `
RELATÓRIO ORIENTATIVO - BÚSSOLA (FORMAÇÃO)
---
Situação/Fluxo: ${flow.meta.title}
Data/Hora: ${now}

Por que essa classificação:
${explanationPoints?.length ? explanationPoints.map(p => `- ${p}`).join('\n') : '- Classificação definida pelo protocolo institucional'}

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
    telemetryService.track({
      event: 'referral_copied',
      flowId: flow.meta.id,
      step: 'summary_actions',
      metadata: { variant: 'technical' },
    });
    alert('Versão técnica copiada!');
  };

  const handleCopyOrientative = () => {
    navigator.clipboard.writeText(buildOrientativeText());
    telemetryService.track({
      event: 'referral_copied',
      flowId: flow.meta.id,
      step: 'summary_actions',
      metadata: { variant: 'orientative' },
    });
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
        {mode === 'formacao' ? 'Copiar versão técnica (gestão)' : 'Copiar relatório técnico'}
      </Button>
      {mode === 'formacao' && (
        <Button 
          variant="outline" 
          onClick={handleCopyOrientative}
          className="flex-1 min-w-[200px]"
        >
          <Copy className="w-4 h-4 mr-2" />
          Copiar versão orientativa
        </Button>
      )}
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
