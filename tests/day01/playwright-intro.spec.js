import { test } from "@playwright/test";

test.describe("Test Suite 1 - Playwright Introduction", () => {
  test("Test Case 1", async ({ page }) => {
    await page.goto("https://www.google.com/");

    await page.waitForTimeout(2000);

    let searchField = page.locator("//textarea[@class='gLFyf']");

    // await searchField.fill("Playwright Automation");
    await searchField.type("Playwright Automation");

    await page.waitForTimeout(2000);
  });
});

