import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export function getPost(id) {
  const res = http.get(`${BASE_URL}/posts/${id}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'body has content': (r) => r.body.length > 0,
  });

  return res;
}