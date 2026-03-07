import servicesData from '../src/data/v2/services.json';

interface ValidationResult {
  totalServices: number;
  withValidCoords: number;
  withNullCoords: number;
  precision5plus: number;
  invalidCategories: string[];
  outOfBounds: string[];
  schemaErrors: string[];
  duplicateIds: string[];
  missingGeocodingSource: string[];
}

const VALID_CATEGORIES = [
  'institucional',
  'saude',
  'saude_mental',
  'assistencia_social',
  'protecao',
  'seguranca',
  'emergencia',
  'denuncia',
] as const;

const BRAZIL_BOUNDS = {
  minLat: -33.75,
  maxLat: 5.27,
  minLng: -73.98,
  maxLng: -34.79,
};

const decimalPlaces = (value: number): number => {
  const text = value.toString();
  const [, decimals = ''] = text.split('.');
  return decimals.length;
};

function validateServices(): ValidationResult {
  const services = servicesData.services;
  const result: ValidationResult = {
    totalServices: services.length,
    withValidCoords: 0,
    withNullCoords: 0,
    precision5plus: 0,
    invalidCategories: [],
    outOfBounds: [],
    schemaErrors: [],
    duplicateIds: [],
    missingGeocodingSource: [],
  };

  const idSet = new Set<string>();

  services.forEach((service: any) => {
    if (!service.id || !service.name || !service.category || !service.type) {
      result.schemaErrors.push(
        `${service.id || 'unknown'}: campos obrigatorios ausentes`,
      );
    }

    if (idSet.has(service.id)) {
      result.duplicateIds.push(service.id);
    } else {
      idSet.add(service.id);
    }

    if (!VALID_CATEGORIES.includes(service.category)) {
      result.invalidCategories.push(
        `${service.id}: categoria invalida "${service.category}"`,
      );
    }

    if (service.location.lat === null || service.location.lng === null) {
      result.withNullCoords += 1;
    } else {
      result.withValidCoords += 1;

      const latPrecision = decimalPlaces(service.location.lat);
      const lngPrecision = decimalPlaces(service.location.lng);
      if (latPrecision >= 5 && lngPrecision >= 5) {
        result.precision5plus += 1;
      }

      const { lat, lng } = service.location;
      if (
        lat < BRAZIL_BOUNDS.minLat ||
        lat > BRAZIL_BOUNDS.maxLat ||
        lng < BRAZIL_BOUNDS.minLng ||
        lng > BRAZIL_BOUNDS.maxLng
      ) {
        result.outOfBounds.push(`${service.id}: lat=${lat}, lng=${lng}`);
      }
    }

    if (!service.metadata?.geocodingSource) {
      result.missingGeocodingSource.push(service.id);
    }
  });

  return result;
}

const result = validateServices();
console.log(JSON.stringify(result, null, 2));

process.exit(
  result.withNullCoords === 0 &&
    result.invalidCategories.length === 0 &&
    result.schemaErrors.length === 0 &&
    result.duplicateIds.length === 0 &&
    result.outOfBounds.length === 0
    ? 0
    : 1,
);
