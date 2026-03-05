import type { GlossaryItem } from '../../data/glossary';
import { buildTokenFrequency, normalizeText, tokenizeFields } from './textTokenizer';

export interface GlossaryIndex {
  id: number;
  term: string;
  termNormalized: string;
  tokens: string[];
  tokenFrequency: Map<string, number>;
  category: GlossaryItem['category'];
  audienceLevel: GlossaryItem['audienceLevel'];
  content: string;
  item: GlossaryItem;
}

const buildContent = (item: GlossaryItem): string => {
  const extraFields = [
    item.regionalContext,
    item.legalReference,
    item.location,
    item.frequency,
    item.whoMakes,
    item.visualAid,
    item.signsToWatch,
    ...(item.regionalVariations ?? []),
    ...(item.relatedTerms ?? []),
  ].filter(Boolean);

  return [
    item.definition,
    item.context,
    item.practicalExample,
    ...extraFields,
  ]
    .filter(Boolean)
    .join(' ');
};

export const buildSearchIndex = (glossary: GlossaryItem[]): GlossaryIndex[] =>
  glossary.map((item, id) => {
    const content = buildContent(item);
    const tokens = tokenizeFields([
      item.term,
      item.definition,
      item.context,
      item.practicalExample,
      ...(item.regionalVariations ?? []),
      ...(item.relatedTerms ?? []),
    ]);

    return {
      id,
      term: item.term,
      termNormalized: normalizeText(item.term),
      tokens,
      tokenFrequency: buildTokenFrequency(tokens),
      category: item.category,
      audienceLevel: item.audienceLevel,
      content,
      item,
    };
  });
