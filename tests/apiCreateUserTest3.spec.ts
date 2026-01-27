import { test, expect } from '@playwright/test';
import { CreateUserDto, UserApiClient, UserDto } from '../api/UserApiClient';
import { UserFactory } from '../factories/UserFactory';

const user: CreateUserDto = UserFactory.createDefault();

test('Create user test 3', async ({request}) => {
  const userApiClient = new UserApiClient(request);
  const userResponse: UserDto = await userApiClient.createUser(user);
  expect(userResponse.id).toBe(11);
});