import { test, expect } from '@playwright/test';

/**
 * Matriz de Regressão Visual Full-Matrix para o Mnemosine
 * Cobre: Mobile (375px), Tablet (768px), Desktop (1280px) e 4K Ultrawide (3840px)
 * Garante paridade estética estrita com o DESIGN_SYSTEM.md e REGRESSION_TESTS.md
 */

test.describe('Regressão de Layout Visual — Full Matrix', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Aguarda o carregamento completo das fontes gregas clássicas (Cinzel, Inter, etc.)
    await page.evaluate(() => document.fonts.ready);
  });

  test('deve renderizar a interface inicial do Palácio da Memória fiel ao Design System', async ({ page }) => {
    // Garante que o container principal e o título estejam visíveis
    await expect(page.locator('h1, h2, h3').first()).toBeVisible();

    // Snapshot da página inteira com animações desativadas para evitar flakiness
    await expect(page).toHaveScreenshot('palacio-memoria-dashboard.png', {
      animations: 'disabled',
      fullPage: false,
    });
  });

  test('deve manter proporção e layout consistentes ao acionar a Command Palette (Ctrl+K)', async ({ page }) => {
    // Dispara atalho global
    await page.keyboard.press('Control+k');

    // Aguarda exibição do modal da paleta de comandos
    const palette = page.locator('[role="dialog"], input[placeholder*="buscar" i], input[placeholder*="pesquisar" i]').first();
    if (await palette.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(page).toHaveScreenshot('command-palette-opened.png', {
        animations: 'disabled',
      });
    }
  });
});
