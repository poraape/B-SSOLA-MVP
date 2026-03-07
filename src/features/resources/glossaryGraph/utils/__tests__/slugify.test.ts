import { describe, expect, it } from 'vitest';
import { buildUniqueSlugMap } from '../slugify';

describe('buildUniqueSlugMap', () => {
  it('gera slugs estáveis e únicos em colisões', () => {
    const map = buildUniqueSlugMap([
      'Álcool e Drogas',
      'Alcool e Drogas',
      'Bullying',
    ]);

    const slugs = Array.from(map.values());

    expect(slugs[0]).toBe('alcool-e-drogas');
    expect(slugs[1]).toMatch(/^alcool-e-drogas-/);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
