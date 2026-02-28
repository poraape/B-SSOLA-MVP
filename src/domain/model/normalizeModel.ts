import { ProtocolModel } from './schema';

export function normalizeModel(model: ProtocolModel): ProtocolModel {
  return {
    ...model,
    categories: model.categories.map(c => ({
      ...c,
      isEmergencyCategory: Boolean(c.isEmergencyCategory)
    })),
    services: model.services.map(s => ({
      ...s,
      type: s.type || 'externo',
      contact: {
        phone: s.contact?.phone ?? null,
        otherPhones: s.contact?.otherPhones,
        email: s.contact?.email,
        website: s.contact?.website,
        alternatePhone: s.contact?.alternatePhone,
      }
    })),
    flows: model.flows.map(f => ({
      ...f,
      triage: {
        ...f.triage,
        questions: f.triage?.questions || []
      },
      results: f.results || {}
    }))
  };
}
