import { test, expect } from "@playwright/test";

// Test configuration with Microsoft Edge
test.use({
  browserName: 'chromium', // Edge uses the Chromium engine
  channel: 'msedge', // Specify Edge as the browser channel
});

test.describe("Test Suite 1 - Playwright Introduction", () => {
  test("Test Case 1", async ({ page }) => {
    await page.goto("https://www.google.com/");

    await page.waitForTimeout(2000);

    let searchField = page.locator("//textarea[@class='gLFyf']");

    // await searchField.fill("Playwright Automation");
    await searchField.type("Playwright Automation");
    await page.keyboard.press('Enter');

    await page.waitForTimeout(3000);

    const title = await page.title();
    console.log(`Page Title: ${title}`);
    expect(title).toContain("Playwright Automation");
  });
});

