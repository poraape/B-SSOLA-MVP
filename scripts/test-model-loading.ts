import { getServices } from '../src/domain/flows/selectors';

try {
  const services = getServices();

  console.log('===========================================================');
  console.log('TESTE DE CARREGAMENTO DO MODELO');
  console.log('===========================================================');
  console.log(`Servicos carregados via getServices(): ${services.length}`);

  const withCoords = services.filter(
    s => s.location.lat !== null && s.location.lng !== null,
  );
  console.log(`Servicos com coordenadas validas: ${withCoords.length}`);

  const missingCoords = services.filter(
    s => s.location.lat === null || s.location.lng === null,
  );

  if (missingCoords.length > 0) {
    console.error('\nERRO: Servicos sem coordenadas:');
    missingCoords.forEach(s => console.error(`  - ${s.id}: ${s.name}`));
    process.exit(1);
  }

  if (services.length !== 30) {
    console.error(
      `\nERRO: Esperado 30 servicos via getServices(), encontrado ${services.length}`,
    );
    process.exit(1);
  }

  console.log('\nVALIDACAO PASSOU: getServices() retorna 30 servicos com coords');
  console.log('===========================================================');
} catch (error) {
  console.error('ERRO AO CARREGAR MODELO:', error);
  process.exit(1);
}
