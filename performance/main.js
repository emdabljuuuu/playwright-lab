import { sleep } from 'k6';
import { getPost } from './api.js';
import { loadTestOptions } from './config.js';

// 1. IMPORTUJEMY BIBLIOTEKĘ DO RAPORTÓW (bezpośrednio z URL - magia k6)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = loadTestOptions;

export default function () {
  getPost(1);
  sleep(Math.random() * 1 + 0.5);
}

// 2. EXPORTUJEMY FUNKCJĘ OBSŁUGI RAPORTU
// Ta funkcja uruchamia się RAZ, po zakończeniu wszystkich testów
export function handleSummary(data) {
  return {
    // Mówimy k6: "Zapisz wynik funkcji htmlReport do pliku raport.html"
    "summary.html": htmlReport(data),
    
    // Opcjonalnie: Zapisz też standardowy tekst do konsoli (żeby nie zniknął)
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

// Helper do zachowania logów w konsoli (k6 standardowo nadpisuje konsolę, jak zdefiniujesz handleSummary)
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";