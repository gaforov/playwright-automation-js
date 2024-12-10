import { test, expect } from '@playwright/test';

test.describe('Interaction Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com');
        // await page.goto('https://cps-check.com/double-click-test');  // enable for double-click when needed. 
    });
    
    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });
    
    
    test('Click Test', async ({ page }) => {
        await page.click("text='Checkboxes'");
    });
    
    test('Right Click Test', async ({ page }) => {
        await page.click("text='Checkboxes'", {button: 'right'});
    });
    
    test('Double Click Test', async ({ page }) => {
        await page.click("text='Checkboxes'");
        const pageTitle = page.locator("#content h3")
        await pageTitle.dblclick();
        // const clickButton = page.locator("#clicker")
        // await clickButton.dblclick();
    });

    test('Hover Test', async ({ page }) => {
        await page.click("text='Hovers'");
        const figureImages = page.locator("#content .figure img");

        // await page.waitForTimeout(1000);
        // await figureImages.nth(0).hover(); // First figure (profile image)
        // await page.waitForTimeout(1000);
        // await figureImages.nth(1).hover(); // Second figure
        // await page.waitForTimeout(1000);
        // await figureImages.nth(2).hover(); // Third figure

        // or loop it
        const imageCount = await figureImages.count(); //
        // The reason for not calling figureImages.count() directly inside the loop condition is that figureImages.count() is an asynchronous operation, and calling it repeatedly inside the loop would introduce unnecessary overhead and potential inefficiencies.
        for(let i = 0; i < imageCount; i++) {
            await page.waitForTimeout(1000);
            await figureImages.nth(i).hover();
        }
    });

    test('Mouse Scroll Test', async ({ page }) => {
        await page.waitForTimeout(1000);
        page.mouse.wheel(0, 2000)
    });

    test('Playwright Auto Scroll Test', async ({ page }) => {
        await page.waitForTimeout(1000);
        const typosLink = page.locator("text='Typos'"); 
        await typosLink.scrollIntoViewIfNeeded(); // Optionally, can add this. 
        await page.waitForTimeout(1000);
        typosLink.click();  // The 'Typos' link is located at the very bottom of the page, not visible on initial browser launch. Playwright automatically scrolls to the element and selects it. 
    });
    
    test("Drag and drop", async ({page}) => {
        await page.locator("text='Drag and Drop'").click();
        await page.waitForTimeout(2000);

        // First way
        await page.dragAndDrop("#column-a", "#column-b");  
        
        // Second way
        const source = page.locator("#column-a");
        const target = page.locator("#column-b");
        await source.dragTo(target);  
    });


});