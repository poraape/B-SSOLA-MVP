# Obsolete Files Review — P01

## Itens removidos com segurança
- `src/domain/risk/__tests__/riskScore.test.ts.orig`
- `src/domain/risk/__tests__/riskScore.test.ts.rej`
- `src/src/features/resources/hooks/useSimulatorProgress.ts`
- `FETCH_HEAD`
- `git`

## Itens movidos para quarentena

### root-reports
- `audit-report.json` -> `archive/root-reports/audit-report.json`
- `build-results.txt` -> `archive/root-reports/build-results.txt`
- `bundle-analysis.txt` -> `archive/root-reports/bundle-analysis.txt`
- `diagnostico.txt` -> `archive/root-reports/diagnostico.txt`
- `test-results.txt` -> `archive/root-reports/test-results.txt`

### generated-reports
- `playwright-report/index.html` -> `archive/generated-reports/playwright-report-index.html`
- `test-results/.last-run.json` -> `archive/generated-reports/test-results-last-run.json`

### legacy-scripts
- `scripts/count-services.ts` -> `archive/legacy-scripts/count-services.ts`
- `scripts/test-model-loading.ts` -> `archive/legacy-scripts/test-model-loading.ts`
- `scripts/validate-services.ts` -> `archive/legacy-scripts/validate-services.ts`
- `scripts/generate-audit-report.ts` -> `archive/legacy-scripts/generate-audit-report.ts`

### legacy-ui
- `src/components/AlphabetNav.tsx` -> `archive/legacy-ui/AlphabetNav.tsx`
- `src/components/GlossaryCard.tsx` -> `archive/legacy-ui/GlossaryCard.tsx`
- `src/components/GlossaryFilters.tsx` -> `archive/legacy-ui/GlossaryFilters.tsx`
- `src/hooks/useGlossarySearch.ts` -> `archive/legacy-ui/useGlossarySearch.ts`
- `src/features/resources/glossary/` -> `archive/legacy-ui/glossary/`
- `src/features/home/components/CategoryGridPreview.tsx` -> `archive/legacy-ui/CategoryGridPreview.tsx`
- `src/features/home/components/InstitutionalFooter.tsx` -> `archive/legacy-ui/InstitutionalFooter.tsx`
- `src/utils/examples.ts` -> `archive/legacy-ui/examples.ts`
- `src/utils/typeUtils.ts` -> `archive/legacy-ui/typeUtils.ts`

### legacy-docs
- `REORGANIZATION_V2_SUMMARY.md` -> `archive/legacy-docs/REORGANIZATION_V2_SUMMARY.md`
- `RESPONSIVENESS_REPORT.md` -> `archive/legacy-docs/RESPONSIVENESS_REPORT.md`
- `VALIDACAO-FINAL.md` -> `archive/legacy-docs/VALIDACAO-FINAL.md`

## Itens preservados por cautela
- `metadata.json`
- `src/components/PrivacyNotice.tsx`
- `src/data/model.v2.extensions.json`
- `src/domain/model/loadPremiumExtensions.ts`
- `src/data/flowResultMessage.json`
- `src/data/v2/flowResultMessages.json`
- `src/domain/model/validateModel.ts`
- `src/domain/validation/validateModel.ts`
- `src/features/resources/glossaryGraph/*`
- `src/scripts/validateServices.ts`

## Itens indeterminados
- `metadata.json` (uso externo não confirmado no código local)
- papel de `PrivacyNotice` na experiência final (listado em contratos, sem acoplamento direto ao bootstrap atual)

## Backlog de revisão futura
1. `src/data/flowResultMessage.json` está preservado por compatibilidade/histórico e não é mais a fonte ativa da ResultPage (runtime usa `model.flowResultMessagesByFlowIdAndLevel` com origem em `src/data/v2/flowResultMessages.json`).
2. Remoção definitiva do legado de mensagens depende de saneamento posterior dedicado.
3. Definir validador de modelo único e aposentar duplicado.
4. Revisar necessidade de `model.v2.extensions` e loader associado.
5. Decidir destino definitivo para `metadata.json`.
