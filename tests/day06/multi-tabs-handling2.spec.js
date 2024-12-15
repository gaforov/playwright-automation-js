import { expect, test } from '@playwright/test';


test('Multi-window handling', async ({ page }) => {
    await page.goto('https://practice.cydeo.com/windows');
    await expect(page).toHaveTitle('Windows');
    page.getByText('Click Here').click(); // This will open a new tab(page)
    await expect(page).toHaveTitle('New Window'); // <-- You need to switch to the new window before verification
});

test('Multi-window simpler way', async ({ page }) => {
    await page.goto('https://practice.cydeo.com/windows');
    await expect(page).toHaveTitle('Windows');

    // Click the link to open the new tab
    await page.getByText('Click Here').click();

    // Wait for the new tab to open
    const newTab = await page.context().waitForEvent('page');

    // Verify the title of the new tab
    await expect(newTab).toHaveTitle('New Window');
});

test('Multi-window handling advanced way', async ({ page }) => {
    await page.goto('https://practice.cydeo.com/windows');
    await expect(page).toHaveTitle('Windows');

    // Click the link to open the new window (tab)
    const [newTab] = await Promise.all([
        page.context().waitForEvent('page'), // Wait for the new page (tab) to open
        page.getByText('Click Here').click()  // Click the link to open the new tab
    ]);

    // Verify the title of the new tab
    await expect(newTab).toHaveTitle('New Window');
});