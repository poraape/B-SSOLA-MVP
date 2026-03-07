# Deploy Checklist - Bussola MVP

## Requisitos de ambiente

- Node.js 22+
- npm 10+
- Servidor estatico com suporte a SPA (rewrite para `index.html`)

## Variaveis de ambiente

### Obrigatorias

- Nenhuma variavel obrigatoria para o runtime basico do MVP.

### Opcionais

- `VITE_TELEMETRY_ENDPOINT` (optional): endpoint HTTP institucional para recepcao de eventos de telemetria.
  - Sem essa variavel, a aplicacao continua funcional e registra eventos apenas localmente.
- `GEMINI_API_KEY` (reservada): nao utilizar em producao nesta fase.

## Build e artefato

- Comando de build:

```bash
npm ci && npm run build
```

- Pasta de output: `dist/`

## Checklist pre-deploy

1. Executar `npm run model:check` com zero erros criticos.
2. Executar `npm run typecheck` com zero erros.
3. Executar `npm run build` sem falhas.
4. Executar `npm run test:coverage` acima dos thresholds definidos.
5. Executar `npx playwright test` com jornada critica passando.

## Exemplo Nginx (SPA routing)

```nginx
server {
    listen 80;
    server_name exemplo.instituicao.gov.br;

    root /var/www/bussola/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
        try_files $uri =404;
    }
}
```
