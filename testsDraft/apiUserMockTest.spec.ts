import { expect, test } from '@playwright/test';

test('Mock user name', async ({ page }) => {
  await page.route('*/**/users/1', async route => {
    const apiResponse = await route.fetch();
    const json = await apiResponse.json()
    json.name = "Hacker";
    await route.fulfill({ json, response: apiResponse })
  });
  await page.goto('https://jsonplaceholder.typicode.com/users/1');
  const body = await page.locator('body pre').textContent();
  expect(body).toContain('Hacker');
});