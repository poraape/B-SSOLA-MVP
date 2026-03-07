import { describe, expect, it } from 'vitest';
import { buildMentionEdges } from '../mentionDetection';
import type { NodeBuildContext } from '../types';

const context: NodeBuildContext = {
  nodes: {
    bullying: {
      slug: 'bullying',
      term: 'Bullying',
      category: 'Convivência',
      audienceLevel: 'leigo',
      text: 'Bullying inclui cyberbullying e pode afetar convivência.',
    },
    cyberbullying: {
      slug: 'cyberbullying',
      term: 'Cyberbullying',
      category: 'Convivência',
      audienceLevel: 'leigo',
      text: 'Agressões em meio digital.',
    },
  },
  itemBySlug: {},
  slugByTerm: new Map([
    ['Bullying', 'bullying'],
    ['Cyberbullying', 'cyberbullying'],
  ]),
  slugByNormalizedTerm: new Map([
    ['bullying', 'bullying'],
    ['cyberbullying', 'cyberbullying'],
  ]),
};

describe('buildMentionEdges', () => {
  it('detecta menções e evita self-reference', () => {
    const edges = buildMentionEdges(context);

    expect(edges.some((edge) => edge.from === 'bullying' && edge.to === 'cyberbullying')).toBe(true);
    expect(edges.some((edge) => edge.from === 'bullying' && edge.to === 'bullying')).toBe(false);
  });
});
