const vusTarget = __ENV.VUS ? parseInt(__ENV.VUS) : 5;

export const loadTestOptions = {
  stages: [
    { duration: '5s', target: vusTarget },
    { duration: '10s', target: vusTarget },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
  },
};