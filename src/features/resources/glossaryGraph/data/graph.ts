import { glossaryData } from '../../data/glossary';
import { buildGlossaryGraph } from '../utils/buildGraph';

export const glossaryGraph = buildGlossaryGraph(glossaryData);
