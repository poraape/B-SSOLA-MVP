import { AppModel } from '../../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateModel = (model: AppModel): ValidationResult => {
  const errors: string[] = [];

  // Check unique IDs
  const categoryIds = new Set(model.categories.map(c => c.id));
  if (categoryIds.size !== model.categories.length) {
    errors.push('IDs de categoria duplicados detectados.');
  }

  const flowIds = new Set(model.flows.map(f => f.meta.id));
  if (flowIds.size !== model.flows.length) {
    errors.push('IDs de fluxo duplicados detectados.');
  }

  const serviceIds = new Set(model.services.map(s => s.id));
  if (serviceIds.size !== model.services.length) {
    errors.push('IDs de serviço duplicados detectados.');
  }

  // Check referenced services exist
  model.flows.forEach(flow => {
    Object.values(flow.results).forEach(result => {
      if (result.primaryService && !serviceIds.has(result.primaryService.id)) {
        errors.push(`Fluxo "${flow.meta.title}" referencia serviço primário inexistente: ${result.primaryService.id}`);
      }
      if (result.secondaryService && !serviceIds.has(result.secondaryService.id)) {
        errors.push(`Fluxo "${flow.meta.title}" referencia serviço secundário inexistente: ${result.secondaryService.id}`);
      }
    });
  });

  // Check coordinates
  model.services.forEach(service => {
    if (service.location.lat !== null && (service.location.lat < -90 || service.location.lat > 90)) {
      errors.push(`Latitude inválida para o serviço: ${service.name}`);
    }
    if (service.location.lng !== null && (service.location.lng < -180 || service.location.lng > 180)) {
      errors.push(`Longitude inválida para o serviço: ${service.name}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};
