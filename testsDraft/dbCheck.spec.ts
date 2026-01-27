import { test, expect } from '@playwright/test';
import { DatabaseClient } from '../db/DatabaseClient';

// Inicjalizacja
const dbClient = new DatabaseClient();

test.afterAll(async () => {
  // Zamykamy RAZ na końcu wszystkich testów w pliku
  await dbClient.close();
});

test('Check db connection', async () => {
  // Używamy executeQuery z typem generycznym any (lub stwórz interfejs UserDbModel!)
  const rows = await dbClient.executeQuery<any>('SELECT * FROM users WHERE id = 1');
  
  expect(rows.length).toBeGreaterThan(0);
  expect(rows[0]).toHaveProperty('id', 1);
});