import { test } from './my-test';

const userId = 1;
const userEmail = 'Sinceraae@april.biz';

test('E2E: Delete User Flow', async ({ userSteps }) => {
    const user = await userSteps.createDefaultUser();
    // Sprawdź, czy jest w bazie (opcjonalne)

    await userSteps.deleteUser(userId);

    // Kluczowe: Sprawdź, czy zniknął (lub jest oznaczony jako usunięty)
    await userSteps.verifyUserDeleted(userId, userEmail);
});