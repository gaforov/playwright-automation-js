import { expect, test } from '@playwright/test'

test.describe('Multi-window', () => {
    let googlePage;
    let bingPage;
    let youtubePage;
    test.beforeEach(async ({ context }) => {
        // await page.goto('https://practice.cydeo.com/windows');
        googlePage = await context.newPage();
        bingPage = await context.newPage();
        youtubePage = await context.newPage();
        
        googlePage.goto("https://google.com");
        bingPage.goto("https://bing.com");
        youtubePage.goto("https://www.youtube.com/");
    });

    test.afterEach(async ({}) => {
        await googlePage.close();
        await bingPage.close();
        await youtubePage.close();
    });



    test('Open multiple windows', async () => {
        googlePage.bringToFront();
        expect(googlePage).toHaveTitle("Google");
        const googleSearchInputField = googlePage.getByLabel('Search', { exact: true });
        await googlePage.waitForTimeout(1000);
        googleSearchInputField.fill('Playwright Automation');
        googleSearchInputField.press("Enter");
        await googlePage.waitForTimeout(2000);
        
        bingPage.bringToFront();
        const bingSearchInputField = bingPage.locator('//*[@id="sb_form_q"]');
        await googlePage.waitForTimeout(1000);
        bingSearchInputField.fill('Playwright Automation');
        bingSearchInputField.press("Enter");
        const bingSearchResult = bingPage.locator('#b_results');
        await expect(bingSearchResult).toContainText("Playwright");
        await bingPage.waitForTimeout(2000);
        
        youtubePage.bringToFront();
        const youtubeSearchInputField = youtubePage.getByRole('combobox');
        await googlePage.waitForTimeout(1000);
        youtubeSearchInputField.fill('Playwright Automation');
        youtubeSearchInputField.press("Enter");
        await youtubePage.waitForTimeout(2000);

    });
});