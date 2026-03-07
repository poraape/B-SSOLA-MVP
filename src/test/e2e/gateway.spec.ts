import { expect, test } from '@playwright/test';

test.describe('Gateway inicial', () => {
  test('exibe triagem inicial e redireciona para fluxo de emergência', async ({ page }) => {
    await page.goto('/');

    const startGuidedCareButton = page.getByRole('button', { name: /Iniciar Atendimento Guiado/i }).first();
    await expect(startGuidedCareButton).toBeVisible();
    await startGuidedCareButton.click();

    await expect(page.getByRole('heading', { name: /Há risco imediato neste momento\?/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /^SIM$/i })).toBeVisible();

    await page.getByRole('button', { name: /^SIM$/i }).click();

    await expect(page).toHaveURL(/\/fluxo\/flow_emergencia_medica$/);
  });
});

