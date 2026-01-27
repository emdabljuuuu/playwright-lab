import { expect, test } from '@playwright/test';

test('Should wait for network idle', async ({ page }) => {
    // Startujemy wyścig
    const [response] = await Promise.all([
        // Uczestnik 1: Czekaj na odpowiedź sieciową
        page.waitForResponse(res => res.url().includes('/photos') && res.status() === 200),
        
        // Uczestnik 2: Wywołaj akcję (wejście na stronę)
        page.goto('https://jsonplaceholder.typicode.com/photos')
    ]);

    // Tutaj mamy pewność 100%, że sieć skończyła mielić
    const json = await response.json();
    expect(json.length).toBe(5000);
});