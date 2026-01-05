import { test } from './my-test'; // Twój customowy test z Fixture
import { searchScenarios } from '../test-data/search.data';

// PĘTLA GENERUJĄCA TESTY
// Playwright stworzy tyle testów, ile jest obiektów w tablicy
for (const data of searchScenarios) {
  
  test(`[${data.testCaseId}] Szukanie frazy: ${data.phrase}`, async ({ wikiPage }) => {
    
    await wikiPage.searchFor(data.phrase);
    
    if (data.shouldExist) {
      // Scenariusz pozytywny
      await wikiPage.selectFirstResult();
      await wikiPage.verifyArticleTitle(data.expectedTitle);
    } else {
      // Scenariusz negatywny (obsługa błędu)
      // Tutaj przydałaby się metoda w WikiPage np. verifyNoResults()
      // Na razie zostawmy to lub dopisz sam :)
      console.log('Sprawdzam obsługę braku wyników');
    }
    
  });
  
}