import { glossaryData, type GlossaryItem } from '../../data/glossary';
import { buildSearchIndex } from '../utils/buildSearchIndex';
import { normalizeText } from '../utils/textTokenizer';

export const glossarySearchIndex = buildSearchIndex(glossaryData);

export const glossaryByNormalizedTerm = new Map<string, GlossaryItem>(
  glossaryData.map((item) => [normalizeText(item.term), item])
);

export const glossaryCategories = Array.from(
  new Set(glossaryData.map((item) => item.category))
);
