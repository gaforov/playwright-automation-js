import { test, expect } from '@playwright/test'
import path from 'path';

test.use({ baseURL: "https://practice.cydeo.com" });
test('File download example', async ({ page }) => {
    await page.goto('/download');  // Navigate to the page where the download button is located

    const downloadPromise = page.waitForEvent('download');  // Create a download promise before triggering the download
    await page.locator("text='SShot.png'").click();  // Trigger the download

    page.on('download', async (download) => {
        const filePath = path.join(__dirname, "downloads", download.suggestedFilename()); // suggestedFilename is original name of the file
        await download.saveAs(filePath);  // Save the file to the 'downloads' folder
        console.log(`File downloaded to: ${filePath}`);
    });

    await downloadPromise;   // Wait for the download to complete
});

test('File upload example', async ({ page }) => {
});