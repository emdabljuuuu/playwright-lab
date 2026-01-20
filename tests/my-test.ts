import { test as base } from '@playwright/test';
import { WikiPage } from '../pages/WikiPage';
import { UserSteps } from '../steps/UserSteps';

// Rozszerzamy podstawowy test o naszą stronę
type MyFixtures = {
  wikiPage: WikiPage;
  userSteps: UserSteps;
};

export const test = base.extend<MyFixtures>({
  // Definiujemy, jak stworzyć 'wikiPage'
  wikiPage: async ({ page }, use) => {
    const wiki = new WikiPage(page);
    await wiki.goto(); // Możemy nawet automatycznie wchodzić na stronę!
    await use(wiki);   // Przekazujemy gotowy obiekt do testu
  },
  userSteps: async({request}, use) => {
    const steps = new UserSteps(request);
    await use(steps);

    await steps.close();
  }
});

export { expect } from '@playwright/test';