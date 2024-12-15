import test from "@playwright/test";

test('Youtube Search', async ({page}) => {
    await page.goto('https://www.youtube.com/')

    await page.waitForTimeout(2000);
    // const searchInput = page.getByRole('combobox');
    const searchInput = page.getByRole('combobox', { name: 'Search' }); // adds an additional layer of specificity. The name: 'Search' part refers to the accessible name associated with the element, which could come from a label, aria-label, or placeholder. 
    await searchInput.fill('Playwright Automation');
    await searchInput.press('Enter')
});