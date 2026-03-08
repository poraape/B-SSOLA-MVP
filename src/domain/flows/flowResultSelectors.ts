import { FlowPriority, FlowResultMessage } from '../../types';
import { model } from '../model/loadModel';

const isFlowResultLevel = (
  level: FlowPriority | undefined
): level is FlowResultMessage['level'] =>
  level === 'low' || level === 'moderate' || level === 'high' || level === 'critical';

export const getFlowResultMessage = (
  flowId: string,
  level: FlowPriority | undefined
): FlowResultMessage | undefined => {
  if (!isFlowResultLevel(level)) {
    return undefined;
  }

  return model.flowResultMessagesByFlowIdAndLevel?.[flowId]?.[level];
};

export const buildNetworkServiceLink = (queryType: string): string => {
  const normalized = queryType.trim();
  if (!normalized) return '/rede';

  if (normalized.startsWith('highlight=')) {
    const serviceId = normalized.slice('highlight='.length).trim();
    if (!serviceId) return '/rede';
    const encodedId = encodeURIComponent(serviceId);
    const encodedQueryType = encodeURIComponent(normalized);
    return `/rede/servico/${encodedId}?queryType=${encodedQueryType}&highlight=${encodedId}`;
  }

  // Mantem compatibilidade com a Rede atual e preserva o valor bruto de queryType.
  if (normalized.includes('=')) {
    return `/rede?queryType=${encodeURIComponent(normalized)}&${normalized}`;
  }

  return `/rede?queryType=${encodeURIComponent(normalized)}`;
};
