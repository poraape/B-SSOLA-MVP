import { Service } from '../types';

/**
 * Example structure demonstrating a `Service` with the expanded contact model.
 */
export const serviceExample: Service = {
  id: 'service-001',
  name: 'Centro de Apoio Psicossocial',
  category: 'psychosocial',
  type: 'public',
  needsGeoReview: false,
  contact: {
    phone: '(11) 4002-8922',
    alternatePhone: '(11) 98888-0000',
    otherPhones: ['(11) 3000-0000', '(11) 97777-1111'],
    email: 'contato@caps.exemplo.br',
    website: 'caps.exemplo.br',
  },
  contactAvailability: {
    hasPhone: true,
    hasAlternate: true,
    hasEmail: true,
    hasWebsite: true,
    completenessScore: 100,
  },
  location: {
    name: 'Unidade Centro',
    address: 'Rua Exemplo, 123 - Centro',
    lat: -23.55052,
    lng: -46.633308,
  },
};
