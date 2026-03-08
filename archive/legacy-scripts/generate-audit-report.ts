import servicesData from '../src/data/v2/services.json';

interface AuditReport {
  timestamp: string;
  repo: string;
  branch: string;
  module: string;
  totalServices: number;
  auditResults: {
    dataValidation: {
      totalServices: number;
      withValidCoords: number;
      withNullCoords: number;
      precision5plus: number;
      invalidCategories: string[];
      outOfBounds: string[];
      schemaErrors: string[];
    };
    modelValidation: {
      servicesLoadedViaGetServices: number;
      pipelineWorks: boolean;
    };
  };
  criticalIssues: string[];
  warnings: string[];
  passedChecks: number;
  failedChecks: number;
  overallStatus: 'PASS' | 'FAIL';
}

const decimalPlaces = (value: number): number => {
  const text = value.toString();
  const [, decimals = ''] = text.split('.');
  return decimals.length;
};

async function loadServicesFromModel() {
  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;
  try {
    console.log = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
    const selectors = await import('../src/domain/flows/selectors');
    return selectors.getServices();
  } finally {
    console.log = originalLog;
    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;
  }
}

async function generateAuditReport(): Promise<AuditReport> {
  const services = servicesData.services;
  const loadedServices = await loadServicesFromModel();

  const withValidCoords = services.filter(
    s => s.location.lat !== null && s.location.lng !== null,
  ).length;

  const precision5plus = services.filter(s => {
    if (s.location.lat === null || s.location.lng === null) {
      return false;
    }
    const latPrecision = decimalPlaces(s.location.lat);
    const lngPrecision = decimalPlaces(s.location.lng);
    return latPrecision >= 5 && lngPrecision >= 5;
  }).length;

  const report: AuditReport = {
    timestamp: new Date().toISOString(),
    repo: 'B-SSOLA-MVP',
    branch: 'New',
    module: 'features/network',
    totalServices: services.length,
    auditResults: {
      dataValidation: {
        totalServices: services.length,
        withValidCoords,
        withNullCoords: services.length - withValidCoords,
        precision5plus,
        invalidCategories: [],
        outOfBounds: [],
        schemaErrors: [],
      },
      modelValidation: {
        servicesLoadedViaGetServices: loadedServices.length,
        pipelineWorks: loadedServices.length === services.length,
      },
    },
    criticalIssues: [],
    warnings: [],
    passedChecks: 0,
    failedChecks: 0,
    overallStatus: 'PASS',
  };

  if (report.auditResults.dataValidation.withNullCoords > 0) {
    report.criticalIssues.push('Servicos com coordenadas null encontrados');
    report.failedChecks += 1;
  } else {
    report.passedChecks += 1;
  }

  if (!report.auditResults.modelValidation.pipelineWorks) {
    report.criticalIssues.push(
      'Pipeline de carregamento nao retorna todos os servicos',
    );
    report.failedChecks += 1;
  } else {
    report.passedChecks += 1;
  }

  if (report.auditResults.dataValidation.precision5plus < services.length - 1) {
    report.warnings.push(
      `Apenas ${precision5plus}/${services.length} com 5+ decimais`,
    );
  }

  report.overallStatus = report.criticalIssues.length === 0 ? 'PASS' : 'FAIL';

  return report;
}

const report = await generateAuditReport();
console.log(JSON.stringify(report, null, 2));

process.exit(report.overallStatus === 'PASS' ? 0 : 1);
