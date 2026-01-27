import { expect, test } from '@playwright/test';

test('Mock user name', async ({ page }) => {
  await page.route('*/**/users/1', async route => {
    // const apiResponse = await route.fetch();
    // const json = await apiResponse.json()
    // json.name = "Hacker";
    // await route.fulfill({ body: "Server Error", status: 500 })
    await route.abort('connectionrefused')
  });
  try {
    await page.goto('https://jsonplaceholder.typicode.com/users/1')
  } catch(e) {
    expect(e).toContain('ERR_CONNECTION_REFUSED');
  }
  // await expect(page.goto('https://jsonplaceholder.typicode.com/users/1')).rejects.toThrow();
  // const body = await page.locator('body pre').textContent();
  // expect(body).toContain('Server Error');
});