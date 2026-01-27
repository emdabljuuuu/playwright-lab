import { test, expect } from '@playwright/test';

test('Visual: Wikipedia Main Page', async ({ page }) => {
    await page.goto('https://pl.wikipedia.org/');
    await expect(page).toHaveScreenshot('wiki-home-masked.png', {
      mask: [page.locator('.main-page-info'), page.locator('#main-page-content #main-page-column1'), page.locator('#main-page-content #main-page-column2'), page.locator('#footer-info-lastmod')],
      fullPage: true,
      timeout: 10000,
    });
});