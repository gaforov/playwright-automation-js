import { test } from "@playwright/test";

test.describe('Test Group 1', () => {

    test.beforeAll(async () => {
        console.log('Before All Tests');
    });

    test.afterAll(async () => {
        console.log('After All Tests');
    });

    test.beforeEach(async ({ page }) => {
        console.log('Before Each Test');
    });

    test.afterEach(async () => {
        console.log('After Each Test');
    });

    test('Test Case 1', async ({ page }) => {
        console.log('Test Case 1');
    });

    test('Test Case 2', async ({ page }) => {
        console.log('Test Case 2');
    });

    test('Test Case 3', async ({ page }) => {
        console.log('Test Case 3');
    });

});


/* Execution order of Test Hooks:

      test.beforeAll()
          test.beforeEach()
              Test Case 1
          test.afterEach()
          test.beforeEach()
              Test Case 2
          test.afterEach()
      test.afterAll()

   */