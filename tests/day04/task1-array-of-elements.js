/* Practice Tasks:
URL used for testing: https://practice.cydeo.com/
1. Verify that there are exactly 50 link elements within the <ul> element.
2. Verify that each of the 50 link elements within the <ul> element is visible.
3. Verify that each of the 50 link elements within the <ul> element are enabled.
4. Verify that each of the 50 link elements within the <ul> element have a valid `href' attribute.
*/
import { test, expect } from '@playwright/test';

test.describe('Practice Arrays', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com');
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
  });

  test('Verify exactly 50 link elements within the <ul> element', async ({ page }) => {

  });

  test('Verify each link element is visible', async ({ page }) => {

  });

  test('Verify each link element is enabled', async ({ page }) => {

  });

  test('Verify each link element has a valid href attribute', async ({ page }) => {

  });
});
