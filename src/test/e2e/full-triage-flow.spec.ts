import { expect, test } from '@playwright/test';

test.describe('Jornada completa de triagem', () => {
  test('gateway -> fluxo -> resultado -> cópia de encaminhamento', async ({ page }) => {
    await page.addInitScript(() => {
      const clipboardStore: { value: string } = { value: '' };
      Object.defineProperty(window.navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            clipboardStore.value = text;
            (window as typeof window & { __copiedText?: string }).__copiedText = text;
          },
        },
      });
    });

    await page.goto('/atendimento');
    await expect(page.getByRole('heading', { name: /Há risco de vida ou integridade/i })).toBeVisible();

    await page.getByRole('button', { name: /^NÃO$/i }).click();
    await expect(page).toHaveURL('/');

    await page.getByRole('heading', { name: /Navegar por Categorias/i }).click();
    await page.getByRole('heading', { name: /Saúde e Bem-Estar|Saude e Bem-Estar/i }).click();
    await expect(page).toHaveURL(/\/categoria\/saude_bem_estar$/);

    await page.getByRole('heading', { name: /Febre ou Suspeita de Infeccao/i }).click();
    await expect(page).toHaveURL(/\/fluxo\/flow_febre$/);

    await page.getByRole('button', { name: /Não|Nao/i }).click();
    await page.getByRole('button', { name: /Não|Nao/i }).click();

    await expect(page).toHaveURL(/\/resultado\/flow_febre$/);

    await expect(page.getByText('Resultado da Orientação')).toBeVisible();
    await expect(page.getByText(/Risco:\s*(low|moderate|high|critical)/i)).toBeVisible();
    await expect(page.getByText(/Recomendações Institucionais/)).toBeVisible();

    page.on('dialog', async dialog => {
      expect(dialog.message()).toMatch(/copiada|copiado/i);
      await dialog.accept();
    });

    await page.getByRole('button', { name: /Copiar relatório técnico|Copiar versão técnica \(gestão\)/i }).click();

    const copied = await page.evaluate(() => {
      return (window as typeof window & { __copiedText?: string }).__copiedText || '';
    });
    expect(copied).toContain('RELATÓRIO TÉCNICO - BÚSSOLA');
    expect(copied).toContain('Serviço prioritário');
    expect(copied).toContain('Roteiro institucional');
  });
});
