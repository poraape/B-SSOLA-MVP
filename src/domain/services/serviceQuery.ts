import type { Service } from '../../types';

export type ParsedServiceQuery =
  | { kind: 'highlight'; id: string; queryType: string }
  | { kind: 'type'; serviceType: 'interno' | 'externo'; queryType: string };

const SERVICE_QUERY_REGEX = /^(highlight=[a-z0-9-]+|type=(interno|externo))$/;

export function parseServiceQuery(queryType: string): ParsedServiceQuery | null {
  if (!SERVICE_QUERY_REGEX.test(queryType)) {
    return null;
  }

  if (queryType.startsWith('highlight=')) {
    const id = queryType.slice('highlight='.length);
    return { kind: 'highlight', id, queryType };
  }

  const serviceType = queryType.slice('type='.length) as 'interno' | 'externo';
  return { kind: 'type', serviceType, queryType };
}

export function assertServiceQueryAllowed(
  queryType: string,
  servicesById: Map<string, Service>
): ParsedServiceQuery {
  const parsed = parseServiceQuery(queryType);
  if (!parsed) {
    throw new Error(`queryType inválido: "${queryType}".`);
  }

  if (parsed.kind === 'highlight' && !servicesById.has(parsed.id)) {
    throw new Error(`queryType inválido: highlight id inexistente "${parsed.id}".`);
  }

  return parsed;
}

export function toSafeServiceQuery(
  queryType: string | null | undefined,
  servicesById: Map<string, Service>
): ParsedServiceQuery {
  if (!queryType) {
    return { kind: 'type', serviceType: 'externo', queryType: 'type=externo' };
  }

  try {
    return assertServiceQueryAllowed(queryType, servicesById);
  } catch {
    return { kind: 'type', serviceType: 'externo', queryType: 'type=externo' };
  }
}
