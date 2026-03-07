import { expect, test } from '@playwright/test';

test.describe('Acessibilidade', () => {
  test('abre menu, aplica classes e persiste preferências no reload', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /Acessibilidade/i }).click();
    await expect(page.getByRole('heading', { name: 'Acessibilidade', exact: true })).toBeVisible();

    await page.getByRole('button', { name: /Alto Contraste/i }).click();

    await expect.poll(async () => {
      return page.evaluate(() => document.documentElement.classList.contains('high-contrast'));
    }).toBe(true);

    await page.reload();

    await expect.poll(async () => {
      return page.evaluate(() => {
        const hasClass = document.documentElement.classList.contains('high-contrast');
        const stored = window.localStorage.getItem('accessibility-settings');
        const parsed = stored ? JSON.parse(stored) : null;
        return hasClass && Boolean(parsed?.highContrast);
      });
    }).toBe(true);
  });
});
