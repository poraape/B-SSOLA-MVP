import { normalizeText } from './normalizeText';

const hashShort = (value: string): string => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36).slice(0, 4);
};

export const toSlugBase = (term: string): string =>
  normalizeText(term)
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export const buildUniqueSlugMap = (terms: string[]): Map<string, string> => {
  const usedSlugs = new Set<string>();
  const slugByTerm = new Map<string, string>();

  for (const term of terms) {
    const base = toSlugBase(term) || 'termo';
    let slug = base;

    if (usedSlugs.has(slug)) {
      const suffix = hashShort(`${term}-${base}`);
      slug = `${base}-${suffix}`;

      let attempt = 1;
      while (usedSlugs.has(slug)) {
        slug = `${base}-${suffix}${attempt}`;
        attempt += 1;
      }
    }

    usedSlugs.add(slug);
    slugByTerm.set(term, slug);
  }

  return slugByTerm;
};
