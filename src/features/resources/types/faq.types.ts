export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category:
    | 'Geral'
    | 'Uso do App'
    | 'Protocolos'
    | 'Docentes'
    | 'Troubleshooting'
    | 'Rede de Apoio';
  relatedLinks?: Array<{
    text: string;
    href: string;
    type: 'internal' | 'external';
  }>;
  tags?: string[];
  lastUpdated?: string;
}

export interface FAQFeedbackData {
  questionId: string;
  isHelpful: boolean;
  timestamp: string;
}
