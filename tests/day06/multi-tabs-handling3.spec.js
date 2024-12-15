import { expect, test } from '@playwright/test';

test.describe('Multi-window Handling Tests', () => {

    test('Handle new tab using "popup" event type', async ({ page }) => {
        await page.goto('https://practice.cydeo.com/windows');
        await expect(page).toHaveTitle('Windows');

        // Create event listener for monitoring a popup (new page)
        const waitForNewTab = page.waitForEvent('popup');
        page.getByText('Click Here').click();  // Triggers the popup (opens a new tab)
        const newTab = await waitForNewTab;  // Waits for the popup event to trigger

        await expect(newTab).toHaveTitle('New Window'); // Verify the title of the new tab
    });

    test('Handle new tab using "page" event type', async ({ page }) => {
        await page.goto('https://practice.cydeo.com/windows');
        await expect(page).toHaveTitle('Windows');

        // Click the link to open the new tab
        await page.getByText('Click Here').click();

        // Wait for the new tab to open using context
        const newTab = await page.context().waitForEvent('page'); // use page with context. Context is a contaier for single/multiple tabs. (page < context < browser)

        // Verify the title of the new tab
        await expect(newTab).toHaveTitle('New Window');

        // Verify new page's content visibility/presence
        await expect(newTab.locator('h3').getByText('New Window')).toBeVisible();

        // Other ways
        await expect(newTab.locator('h3', { hasText: 'New Window' })).toHaveText('New Window');
        await expect(newTab.locator('h3', { hasText: 'New Window' })).toBeVisible();

        const h3Text = await newTab.locator('h3').innerText();
        console.log('h3 text content:', h3Text);

    });

});



/* What is the difference?
Event Type "popup": This event is more specific and works well when you're testing for new tabs/windows opened by JavaScript actions (like clicking a link with target="_blank").
Event Type "page": This is a more general event type and works for any new page or tab within the same browser context. It listens for all new pages (including popups) that get opened.

page.context().waitForEvent('page') uses a more general approach, which works but is less specific. (remember, 'context().' is used between page and waitForEvent). Page is an instance of context, and context is an instance of a browser. 
page.waitForEvent('popup') uses a more specific approach, which is generally easier to understand when working with new tabs or windows, and would be the more common method.
*/