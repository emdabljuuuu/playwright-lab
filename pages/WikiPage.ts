import { type Locator, type Page, expect } from '@playwright/test';

export class WikiPage {
  // Prywatne pola na selektory - nikt z zewnątrz nie powinien ich dotykać
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    // Definiujemy selektory RAZ, w jednym miejscu
    this.searchInput = page.locator('#searchform [name="search"]');
    this.searchResults = page.locator('.cdx-menu-item__content').first(); // Dostosuj selektor do swojej wersji wikipedii
    this.heading = page.locator('#firstHeading');
  }

  // Metody biznesowe - "Co użytkownik robi", a nie "jak klika"
  async goto() {
    await this.page.goto('https://pl.wikipedia.org/');
  }

  async searchFor(phrase: string) {
    await this.searchInput.fill(phrase);
    // Tu możemy dodać logikę czekania, jeśli trzeba
  }

  async selectFirstResult() {
    await this.searchResults.click();
  }

  async verifyArticleTitle(title: string) {
    await expect(this.heading).toContainText(title);
  }
}