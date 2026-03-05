import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface Service {
  id?: string;
  name?: string;
  category?: string;
  location?: {
    lat?: number | null;
    lng?: number | null;
    address?: string;
  };
  address?: string;
  needsGeoReview?: boolean;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    total: number;
    withCoords: number;
    precisionOk: number;
    missingFields: string[];
  };
}

const BRAZIL_BOUNDS = {
  minLat: -33.75,
  maxLat: 5.27,
  minLng: -73.98,
  maxLng: -34.79,
} as const;

function decimalPlaces(value: number): number {
  const valueAsString = value.toString();
  const [, decimals = ''] = valueAsString.split('.');
  return decimals.length;
}

export function validateServices(): ValidationResult {
  const scriptDir = fileURLToPath(new URL('.', import.meta.url));
  const servicesPath = resolve(scriptDir, '../data/v2/services.json');
  const payload = JSON.parse(readFileSync(servicesPath, 'utf-8')) as { services?: Service[] };
  const services = Array.isArray(payload.services) ? payload.services : [];

  const errors: string[] = [];
  const warnings: string[] = [];
  const missingFields = new Set<string>();
  let withCoords = 0;
  let precisionOk = 0;

  services.forEach((service, index) => {
    if (!service.id) {
      errors.push(`Service ${index}: missing 'id'`);
      missingFields.add('id');
    }

    if (!service.name) {
      errors.push(`Service ${index}: missing 'name'`);
      missingFields.add('name');
    }

    if (!service.category) {
      errors.push(`Service ${index}: missing 'category'`);
      missingFields.add('category');
    }

    const lat = service.location?.lat;
    const lng = service.location?.lng;
    const hasLat = typeof lat === 'number' && Number.isFinite(lat);
    const hasLng = typeof lng === 'number' && Number.isFinite(lng);

    if (!hasLat || !hasLng) {
      if (!service.needsGeoReview) {
        warnings.push(
          `Service "${service.name ?? service.id ?? `#${index}`}": missing coordinates, should set needsGeoReview=true`
        );
      }
    } else {
      withCoords += 1;

      const latPrecision = decimalPlaces(lat);
      const lngPrecision = decimalPlaces(lng);

      if (latPrecision >= 5 && lngPrecision >= 5) {
        precisionOk += 1;
      } else {
        warnings.push(
          `Service "${service.name ?? service.id ?? `#${index}`}": low precision coords (${latPrecision}, ${lngPrecision} decimals)`
        );
      }

      if (
        lat < BRAZIL_BOUNDS.minLat ||
        lat > BRAZIL_BOUNDS.maxLat ||
        lng < BRAZIL_BOUNDS.minLng ||
        lng > BRAZIL_BOUNDS.maxLng
      ) {
        errors.push(`Service "${service.name ?? service.id ?? `#${index}`}": coords outside Brazil bounds`);
      }
    }

    const address = service.address ?? service.location?.address;
    if (!address && !service.needsGeoReview) {
      warnings.push(`Service "${service.name ?? service.id ?? `#${index}`}": missing address`);
    }
  });

  const totalServices = services.length;
  const coordsCoverage = totalServices > 0 ? (withCoords / totalServices) * 100 : 0;
  const precisionCoverage = withCoords > 0 ? (precisionOk / withCoords) * 100 : 0;

  if (coordsCoverage < 90) {
    errors.push(
      `BLOQUEANTE: Only ${coordsCoverage.toFixed(1)}% services have coords (required: 90%)`
    );
  }

  if (precisionCoverage < 80) {
    warnings.push(
      `WARNING: Only ${precisionCoverage.toFixed(1)}% coords have 5+ decimals (recommended: 80%)`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      total: totalServices,
      withCoords,
      precisionOk,
      missingFields: Array.from(missingFields).sort(),
    },
  };
}

const isMainModule = process.argv[1]
  ? fileURLToPath(import.meta.url) === resolve(process.argv[1])
  : false;

if (isMainModule) {
  const result = validateServices();

  console.log('═══════════════════════════════════════');
  console.log('SERVICES.JSON VALIDATION REPORT');
  console.log('═══════════════════════════════════════');
  console.log(`Total services: ${result.stats.total}`);
  console.log(`With coordinates: ${result.stats.withCoords}`);
  console.log(`Precision OK (≥5 decimals): ${result.stats.precisionOk}`);

  if (result.stats.missingFields.length > 0) {
    console.log(`Missing required field keys detected: ${result.stats.missingFields.join(', ')}`);
  }

  console.log('');

  if (result.errors.length > 0) {
    console.error('❌ ERRORS:');
    result.errors.forEach((error) => console.error(`  - ${error}`));
    console.log('');
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  WARNINGS:');
    result.warnings.forEach((warning) => console.warn(`  - ${warning}`));
    console.log('');
  }

  if (result.valid) {
    console.log('✅ Validation PASSED');
    process.exit(0);
  }

  console.error('🔴 Validation FAILED');
  process.exit(1);
}
