import test from "@playwright/test";

test('Youtube Search', async ({page}) => {
    await page.goto('https://www.youtube.com/')

    await page.waitForTimeout(2000);
    const searchInput = page.locator('input#search');
    const searchButton = page.locator('#search-icon-legacy');
    
    await searchInput.fill('Playwright Automation');
    await page.waitForTimeout(2000);
    await searchButton.click();
    await searchInput.press('Enter')
    // await searchInput.waitFor({ state: 'visible' });
    // await searchInput.focus(); // Ensure the input is focused
    // await searchInput.fill('Playwright Automation');
    // await page.waitForTimeout(2000);
    // await searchInput.press('Enter');
});

/* 
<input id="search" autocapitalize="none" autocomplete="off" autocorrect="off" name="search_query" tabindex="0" type="text" spellcheck="false" placeholder="Search" aria-label="Search" role="combobox" aria-haspopup="false" aria-autocomplete="list" dir="ltr" class="ytd-searchbox" style="outline: none;">
*/