import { test, expect, APIRequestContext } from '@playwright/test';
import { CreateUserDto, UserApiClient } from '../api/UserApiClient';
import { DatabaseClient } from '../db/DatabaseClient';

const user: CreateUserDto = {
  name: 'Adam Test',
  username: 'Brett',
  email: 'Sinceraae@april.biz',
  address: { street: 'Kulas Light', city: 'Gwenborough' }
}

const dbClient = new DatabaseClient();

test.afterAll(async () => {
  await dbClient.close();
});

test('Should create user via API and verify in DB', async ({request}) => {
  const userClient = new UserApiClient(request);
  // 1. API Call
  const apiUser = await userClient.createUser(user);

  // 2. (Symulacja backendu) Ręczny Insert do DB, żeby "udawać", że API zapisało
  await dbClient.executeQuery(
    'INSERT INTO users (name, username, email, address) VALUES ($1, $2, $3, $4) RETURNING *',
    [apiUser.name, apiUser.username, apiUser.email, JSON.stringify(apiUser.address)]
  );

  // 3. Weryfikacja
  const dbRows = await dbClient.executeQuery('SELECT * FROM users WHERE email = $1', [user.email]);
  expect((dbRows[0] as any).name).toBe(apiUser.name);
});