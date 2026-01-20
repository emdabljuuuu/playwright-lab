import { test, expect, APIRequestContext } from '@playwright/test';
import { UserApiClient } from '../api/UserApiClient';
import { ApiError } from '../api/ApiError';


test('Should throw ApiError when user not found', async ({request}) => {
  // const fakeRequest = {
  //   get: async () => ({
  //     ok: () => false,
  //     status: 404,
  //     json: async () => ({ message: 'Not Found' })
  //   })
  // } as unknown as APIRequestContext;
  const userApiClient = new UserApiClient(request);
  await expect(userApiClient.getUser(999)).rejects.toThrow(ApiError);
});