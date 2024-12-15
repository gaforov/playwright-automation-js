import { test, expect } from '@playwright/test'

/* baseURL fixture: 
Provides a default base URL to simplify writing tests for applications hosted on a consistent domain.*/
test.use({ baseURL: 'https://practice.cydeo.com' });

test('Base URL test', async ({ page }) => {
    await page.goto('/windows'); // Automatically resolves to 'https://practice.cydeo.com/windows'
});

/* Trace fixture: 
A utility to enable and manage tracing for debugging purposes. */
// test('Trace example', async ({ page, context }) => {
//     await context.tracing.start({ screenshots: true, snapshots: true });   // Start tracing
//     await page.goto('https://practice.cydeo.com/windows');    // Perform actions   
//     await context.tracing.stop({ path: 'trace.zip' });   // Stop tracing and export the trace
// });


/* storageState fixture: 
Stores and loads browser state (e.g., cookies, localStorage) between tests. Useful for creating 
authenticated test sessions. First you need to capture and store data in the 'state.json' file */
// test.use({ storageState: 'state.json' });

// test('Storage state test', async ({ page }) => {
//     await page.goto('https://example.com/dashboard');
// });

/* browserName fixture: 
The name of the browser being used in the test (chromium, firefox, or webkit). */
test('Check browser name', async ({ browserName }) => {
    console.log(`Running tests on ${browserName}`);
});

/* viewport fixture:
You can use the viewport fixture to set a specific viewport size for the tests. By default, the browser will use the full screen or the default viewport size unless specified otherwise. */
test('Test with specific viewport size', async ({ page, viewport }) => {
    // Set the viewport size
    await page.setViewportSize({ width: 1280, height: 720 });

    // Perform actions or assertions with the new viewport size
    await page.goto('https://example.com');
    await expect(page).toHaveTitle('Example Domain');
});

// Mobile View: Emulate mobile devices by setting smaller viewport dimensions, or by using Playwright’s built-in mobile viewport presets.
test.describe('Responsive design tests', () => {
    test.use({
        viewport: { width: 375, height: 812 },  // iPhone X dimensions
    });

    test('should render correctly on 1280x720', async ({ page }) => {
        await page.goto('https://example.com');
        await expect(page).toHaveTitle('Example Domain');
    });
});





