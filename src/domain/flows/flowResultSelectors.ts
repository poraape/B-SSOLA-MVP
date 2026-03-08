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

export type NetworkNavigationServiceType = 'interno' | 'externo';
export type NetworkNavigationSlot = 'priority' | 'complementary';
export type NetworkNavigationSource = 'result';

interface BuildNetworkNavigationTargetParams {
  serviceId: string;
  serviceType?: NetworkNavigationServiceType | null;
  slot: NetworkNavigationSlot;
  source?: NetworkNavigationSource;
}

const isNetworkServiceType = (
  value: string | null | undefined
): value is NetworkNavigationServiceType => value === 'interno' || value === 'externo';

export const buildNetworkNavigationTarget = ({
  serviceId,
  serviceType,
  slot,
  source = 'result',
}: BuildNetworkNavigationTargetParams): string => {
  const normalizedServiceId = serviceId.trim();
  if (!normalizedServiceId) return '/rede';

  const encodedServiceId = encodeURIComponent(normalizedServiceId);
  const query = new URLSearchParams();
  query.set('highlight', normalizedServiceId);
  if (serviceType) {
    query.set('type', serviceType);
  }
  query.set('source', source);
  query.set('slot', slot);
  return `/rede/servico/${encodedServiceId}?${query.toString()}`;
};

export const buildNetworkServiceLink = (
  queryType: string,
  options?: {
    slot?: NetworkNavigationSlot;
    source?: NetworkNavigationSource;
  }
): string => {
  const normalized = queryType.trim();
  if (!normalized) return '/rede';

  if (normalized.startsWith('highlight=')) {
    const serviceId = normalized.slice('highlight='.length).trim();
    if (!serviceId) return '/rede';
    return buildNetworkNavigationTarget({
      serviceId,
      slot: options?.slot ?? 'priority',
      source: options?.source ?? 'result',
    });
  }

  if (normalized.startsWith('type=')) {
    const rawType = normalized.slice('type='.length).trim();
    const serviceType = isNetworkServiceType(rawType) ? rawType : null;
    const query = new URLSearchParams();
    query.set('queryType', normalized);
    if (serviceType) {
      query.set('type', serviceType);
    }
    if (options?.source) {
      query.set('source', options.source);
    }
    if (options?.slot) {
      query.set('slot', options.slot);
    }
    return `/rede?${query.toString()}`;
  }

  // Mantem compatibilidade com a Rede atual e preserva o valor bruto de queryType.
  if (normalized.includes('=')) {
    const query = new URLSearchParams();
    query.set('queryType', normalized);
    if (options?.source) {
      query.set('source', options.source);
    }
    if (options?.slot) {
      query.set('slot', options.slot);
    }
    return `/rede?${query.toString()}&${normalized}`;
  }

  const query = new URLSearchParams();
  query.set('queryType', normalized);
  if (options?.source) {
    query.set('source', options.source);
  }
  if (options?.slot) {
    query.set('slot', options.slot);
  }
  return `/rede?${query.toString()}`;
};
