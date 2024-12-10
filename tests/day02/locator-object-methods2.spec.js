// create a test group with three test in in it with empty test body, use import not require:
import { test, expect } from '@playwright/test';

test.describe('Test Group', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });


    test('innerText() retrives the visible text, similar getText() in Selenium', async ({ page }) => {
        const headerName = page.locator(".h1y");
        const text = await headerName.innerText();
        console.log(text);
    });

    test('inputValue() works with <input>, <textarea>, and <select>', async ({ page }) => {
        // const inputLink = page.locator('text="Inputs"');
        // await inputLink.click();
        page.getByText('Inputs').click(); // or this
        const inputField = page.locator('input[type=number]');
        await inputField.fill('123');
        console.log(await inputField.inputValue());

    });

    test('inputValue() with scroll option', async ({ page }) => {
        const InputLink = page.getByText('Inputs');
        await page.waitForTimeout(2000);
        InputLink.scrollIntoViewIfNeeded(); // scroll is optional, playwright does it automatically. 
        await page.waitForTimeout(2000);
        await InputLink.click();
        const inputField = page.locator('input[type=number]');
        await inputField.fill('123');
        console.log(await inputField.inputValue());
    });


});


/* 

Feature:	  innerText()	                 textContent()
Visibility	  Visible text only	             All text, including hidden elements
Whitespace	  Collapses extra whitespace	 Preserves exact whitespace
Performance	  Slightly slower	             Slightly faster

*/