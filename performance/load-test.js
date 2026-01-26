import http from 'k6/http';
import { check, sleep } from 'k6';

// Konfiguracja testu (Options)
export const options = {
  // Usuwamy 'vus' i 'duration', bo stages to nadpisują
  stages: [
    { duration: '10s', target: 20 }, // Ramp-up do 20
    { duration: '20s', target: 20 }, // Stay at 20
    { duration: '10s', target: 0 },  // Ramp-down do 0
  ],
  
  thresholds: {
    http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(95)<200'], // Zwiększmy trochę limit, bo przy 20 VUs może być wolniej
  },
};

// Funkcja główna (wykonywana przez każdego VU w pętli)
export default function () {
  // Strzał do API
  const res = http.get('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'status is 200': (r) => r.status === 200,
    // Zmieniamy na logiczne sprawdzenie obecności treści
    'body is not empty': (r) => r.body.length > 0,
  });

  sleep(1);
}