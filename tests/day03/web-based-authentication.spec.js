import { test, expect } from '@playwright/test';
import { clickOnText } from '../helpers/navigationUtils';

test.describe('New Test Group', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });

    test('TC1: Bypassing Auth by embedding the credentials in the URL.', async ({ page }) => {
        // https://username:password@example.com //  <-- Example format for embedding credentials into a URL.
        //clickOnText(page, "Basic Auth"); // passes because verifing the click, not the Auth page. 
        //await page.goto('https://practice.cydeo.com/basic_auth');  // Fails due to missing credentials.
        await page.goto('https://admin:admin@practice.cydeo.com/basic_auth'); // This passes, valid credentials embedded into URL. 

        // Verify success message, once authenticated to the page. 
        // 1. full text verification
        const successMessage = page.locator('text=Congratulations! You must have the proper credentials.');
        // 2. partial matching, useful if text changes dynamically. 
        const congratsMessage = page.locator('p', { hasText: 'Congratulations!' });

        await expect(successMessage).toBeVisible();
    });



    test('TC2: Bypassing Auth by encoding credentials in Base64 format.', async ({ page }) => {
        const encodedCredentials = Buffer.from("admin:admin").toString("base64"); // Encoding credentials in Base64
        page.setExtraHTTPHeaders({
            //Authorization: `Basic ${Buffer.from("admin:admin").toString("base64")}`,  // direct pass
            Authorization: `Basic ${encodedCredentials}`
        });

        await page.goto('https://practice.cydeo.com/basic_auth'); // URL without embedded credentials
        await expect(page.locator('text=Congratulations! You must have the proper credentials.')).toBeVisible();

    });


    test('Test Case 3', async ({ page }) => {
    });
});