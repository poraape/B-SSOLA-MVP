import { Service } from '../types';

/**
 * Calculates a 0-100 score based on the contact channels available in a service.
 */
export function calculateContactCompleteness(service: Service): number {
  const checks = [
    Boolean(service.contact.phone),
    Boolean(service.contact.alternatePhone),
    Boolean(service.contact.email),
    Boolean(service.contact.website),
  ];

  const available = checks.filter(Boolean).length;
  return Math.round((available / checks.length) * 100);
}
