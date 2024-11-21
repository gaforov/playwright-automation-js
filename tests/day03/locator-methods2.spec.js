import { test, expect } from '@playwright/test';
import { clickOnText, clickOnText2 } from '../helpers/navigationUtils';

test.describe('My New Test Group', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });

    test('TC 01', async ({ page }) => {
        const pageTitle = page.locator(".h1y")
        console.log(await pageTitle.isVisible()); // if visible, prints True
        // console.log(pageTitle.innerText); // innerText method is missing () still test passes, which I dont like about non OOPS. 
        console.log(await pageTitle.innerText());
    });

    /** use .toBeTruthy() when you want to assert that a value is truthy, meaning it is neither null, undefined, false, 0, an empty string (""), nor NaN. It ensures the value exists and evaluates to a truthy state. */
    test('TC 02. toBeTruthy() assertion', async ({ page }) => {
        const isVisible = await page.isVisible('.h1y');
        expect(isVisible).toBeTruthy();

    });

    test('TC 03. verify that element is enabled.', async ({ page }) => {
        const autoCompleteLink = page.locator("text='Autocomplete'");
        console.log(await autoCompleteLink.isEnabled()); // if true test passes
        expect(await autoCompleteLink.isEnabled()).toBeTruthy(); // if truthy, more explicit, check to see it is NOT null, NaN, 0 or false. 
        // Another way
        await expect(autoCompleteLink).toBeEnabled(); // leveraging Playwright’s built-in matcher for conciseness and clarity.
    });
});