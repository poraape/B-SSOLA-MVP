import { getServices } from '../../domain/flows/selectors';
import type { Service } from '../../types';

export function executeNetworkServices(): Service[] {
  return getServices();
}
