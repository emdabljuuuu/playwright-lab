import { test } from '@playwright/test';
import { UserApiClient } from '../api/UserApiClient';
import { UserDto } from '../api/UserApiClient';

test('Get user id', async ({request}) => {
  const userApiClient = new UserApiClient(request);
  const user: UserDto = await userApiClient.getUser(1);
  console.log(user)
});