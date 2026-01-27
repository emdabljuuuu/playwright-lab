import { test } from '../tests/my-test';

test('E2E: Create User Flow', async ({ userSteps }) => {
  const user = await userSteps.createDefaultUser();
  await userSteps.verifyUserInDb(user);
});