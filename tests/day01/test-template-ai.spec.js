import { test } from "@playwright/test";

// Test template
test.describe('Test Suite 2', () => {
  test('Test Case 1', async ({ page }) => {
    // Test steps go here
    await page.goto('https://google.com');
    //await expect(page).toHaveTitle('Google');

    let searchField = page.locator("//textarea[@class='gLFyf']");

    // enter 'Playwright' in the search field
    await searchField.fill('Playwright');

    // wait for the search results to appear
    await page.waitForSelector('text=Playwright', { timeout: 5000 });

  });
});

// Teardown
test.afterAll(async () => {
  // Perform any necessary teardown actions here
});
