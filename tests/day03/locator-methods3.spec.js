import { test, expect } from '@playwright/test';

test.describe('My New Test Group', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });

    test('TC1', async ({ page }) => {
        await clickOnText(page, 'Checkboxes');
        const checkbox1 = page.locator("#box1"); // Target the element checkbox itself, not its text 'Checkbox 1'
        const checkbox2 = page.locator("#box2");
        expect(await checkbox1.isChecked()).toBeFalsy(); // verify element is not checked, first way.
        await expect(checkbox1).not.toBeChecked(); // verify element is not checked, second way.
        expect(await checkbox2.isChecked()).toBeTruthy(); // verify element is checked by default. 
        await expect(checkbox2).toBeChecked(); // 2nd way
    });


    test('TC2.', async ({ page }) => {
    });

    test('TC3.', async ({ page }) => {
    });
});
