import servicesData from '../src/data/v2/services.json';

const services = servicesData.services;

const totalServices = services.length;
const withCoords = services.filter(
  s => s.location.lat !== null && s.location.lng !== null,
).length;
const withoutCoords = totalServices - withCoords;

const byCategory = services.reduce((acc: Record<string, number>, s: any) => {
  acc[s.category] = (acc[s.category] || 0) + 1;
  return acc;
}, {});

const byType = services.reduce((acc: Record<string, number>, s: any) => {
  acc[s.type] = (acc[s.type] || 0) + 1;
  return acc;
}, {});

console.log('===========================================================');
console.log('CONTAGEM DE SERVICOS - services.json');
console.log('===========================================================');
console.log(`Total de servicos: ${totalServices}`);
console.log(`Com coordenadas validas: ${withCoords}`);
console.log(`Sem coordenadas (null): ${withoutCoords}`);
console.log('\nPor categoria:');
Object.entries(byCategory)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });
console.log('\nPor tipo:');
Object.entries(byType)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
console.log('===========================================================');

const EXPECTED = {
  total: 30,
  withCoords: 30,
  withoutCoords: 0,
};

if (totalServices !== EXPECTED.total) {
  console.error(
    `ERRO: Esperado ${EXPECTED.total} servicos, encontrado ${totalServices}`,
  );
  process.exit(1);
}

if (withCoords !== EXPECTED.withCoords) {
  console.error(
    `ERRO: Esperado ${EXPECTED.withCoords} com coords, encontrado ${withCoords}`,
  );
  process.exit(1);
}

if (withoutCoords !== EXPECTED.withoutCoords) {
  console.error(
    `ERRO: Esperado ${EXPECTED.withoutCoords} sem coords, encontrado ${withoutCoords}`,
  );
  process.exit(1);
}

console.log('\nVALIDACAO PASSOU: Todos os servicos tem coordenadas validas');
