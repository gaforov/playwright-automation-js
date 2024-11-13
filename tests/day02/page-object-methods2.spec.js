import { expect, test } from '@playwright/test';

test.describe('@smoke Test Group', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com/');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(2000);
    });

    test('Getting title of the page', async ({ page }) => {
        let actualTitle = await page.title(); 
        console.log('Actual title:', actualTitle);
        expect(actualTitle).toBe('Practice');
    });

    test('Getting current URL of the page', async ({ page }) => {
        let actualURL = page.url(); 
        console.log(actualURL);
        expect(actualURL).toContain('practice.cydeo.com');
    });

});

