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
      contact: s.contact || {}
    })),
    flows: model.flows.map(f => ({
      ...f,
      questions: f.questions || [],
      results: f.results || {}
    }))
  };
}
