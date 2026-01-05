import { test, expect } from '@playwright/test';

test('Mocking API (REST): Podmieniamy wyniki', async ({ page }) => {
  
  // Zmieńmy wzorzec na bardziej ogólny, łapiący REST API
  // Gwiazdki łapią wszystko: "coś tam /rest.php/ coś tam"
  await page.route('**/rest.php/v1/search/title**', async route => {
    console.log('Złapałem request REST!');

    // Nowa Wikipedia (REST) oczekuje obiektu "pages", a nie tablicy
    const fakeRestResponse = {
      pages: [
        {
          id: 123,
          key: "SDET",
          title: "SDET to przyszłość",
          excerpt: "To jest sfałszowany opis artykułu.",
          thumbnail: null
        }
      ]
    };

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(fakeRestResponse),
    });
  });

  await page.goto('https://pl.wikipedia.org/');
});