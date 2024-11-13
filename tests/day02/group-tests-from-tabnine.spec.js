import { test } from '@playwright/test';

test.describe('Another Test Group', () => {
  test('Another Test Case 1', async ({ page }) => {
    console.log('Test Case 1');
  });

  test('Another Test Case 2', async ({ page }) => {
    console.log('Test Case 2');
  });

  test('Another Test Case 3', async ({ page }) => {
    console.log('Test Case 3');
  });
});