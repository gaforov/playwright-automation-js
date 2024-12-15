import {test, chromium, firefox} from '@playwright/test'

test('Create multiple contexts', async ({browser}) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    const page3 = await context2.newPage();

    await page1.goto('https://example.com');
    await page2.goto('https://google.com');
    await page3.goto('https://youtube.com');
});


test('Multiple-browser', async () => {
    const chromeBrowser = await chromium.launch();
    const chromeContext = await chromeBrowser.newContext();
    const chromePage = await chromeContext.newPage();
    chromePage.goto('https://example.com');
    
    await chromePage.waitForTimeout(3000);
    
    const firefoxBrowser = await firefox.launch();
    const firefoxContext = await firefoxBrowser.newContext();
    const firefoxPage = await firefoxContext.newPage();
    firefoxPage.goto('https://google.com');
    
    await firefoxPage.waitForTimeout(3000);

});