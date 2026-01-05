// To jest kontrakt. Mówi, jak MUSZĄ wyglądać dane.
export interface SearchScenario {
  testCaseId: string; // Np. do linkowania z Jira
  phrase: string;     // Co wpisujemy
  expectedTitle: string; // Czego oczekujemy
  shouldExist: boolean; // Czy spodziewamy się sukcesu?
}

export const searchScenarios: SearchScenario[] = [
  {
    testCaseId: 'TC-001',
    phrase: 'Playwright',
    expectedTitle: 'Playwright',
    shouldExist: true
  },
  {
    testCaseId: 'TC-002',
    phrase: 'Selenium',
    expectedTitle: 'Selenium',
    shouldExist: true
  },
  {
    testCaseId: 'TC-003',
    phrase: 'JakiśDziwnyCiągZnaków12345',
    expectedTitle: 'Wyniki wyszukiwania', // Wikipedia pewnie pokaże "nie znaleziono"
    shouldExist: false
  }
];