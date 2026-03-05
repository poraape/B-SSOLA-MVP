import flowResultMessages from '../../data/flowResultMessage.json';
import { FlowPriority, FlowResultMessage } from '../../types';

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

  return flowResultMessages.find(
    message => message.flowId === flowId && message.level === level
  ) as FlowResultMessage | undefined;
};

export const buildNetworkServiceLink = (queryType: string): string => {
  const normalized = queryType.trim();
  if (!normalized) return '/rede';

  // Mantem compatibilidade com a Rede atual e preserva o valor bruto de queryType.
  if (normalized.includes('=')) {
    return `/rede?queryType=${encodeURIComponent(normalized)}&${normalized}`;
  }

  return `/rede?queryType=${encodeURIComponent(normalized)}`;
};
