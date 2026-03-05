import { describe, expect, it } from 'vitest';
import { calculateSimilarity } from '../similarity';

describe('calculateSimilarity', () => {
  it('mantém score maior para nós semanticamente próximos', () => {
    const base = {
      slug: 'bullying',
      term: 'Bullying',
      category: 'Convivência',
      audienceLevel: 'leigo' as const,
      text: 'Bullying repetido e agressão entre estudantes.',
    };

    const close = {
      slug: 'cyberbullying',
      term: 'Cyberbullying',
      category: 'Convivência',
      audienceLevel: 'leigo' as const,
      text: 'Agressão repetida nas redes sociais entre estudantes.',
    };

    const far = {
      slug: 'ubs',
      term: 'UBS',
      category: 'Rede de Proteção',
      audienceLevel: 'leigo' as const,
      text: 'Serviço de saúde para atendimento básico e vacinação.',
    };

    const closeScore = calculateSimilarity({ source: base, target: close });
    const farScore = calculateSimilarity({ source: base, target: far });

    expect(closeScore).toBeGreaterThan(farScore);
    expect(closeScore).toBeGreaterThan(0.2);
  });
});
