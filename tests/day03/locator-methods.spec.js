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

    test('TC 01: getAttribute() retrives the attribute value', async ({ page }) => {
        console.log(await page.locator("text='A/B Testing'").getAttribute('href'));
        console.log(await page.locator("text='Home'").getAttribute("class"));
    });

    test('Test Case 2', async ({ page }) => {
        await clickOnText(page, "Dropdown");
        // await clickOnText2(page, "Dropdown"); // this works too. Different implementations. 
    });

    test('Test Case 3', async ({ page }) => {
        const dropdownLink = page.locator("text=Dropdown");
        await dropdownLink.click();
    });
});