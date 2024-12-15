import { test, expect } from '@playwright/test'
import path from 'path';
import fs from 'fs';

test.use({ baseURL: "https://practice.cydeo.com" });
test('File download example', async ({ page }) => {
    await page.goto('/download');
    const waitForDownload = page.waitForEvent("download");  // Create event listener for download
    await page.locator("text='class note.txt'").click(); // This action triggers the download.
    const fileDownload = await waitForDownload; // Captures the download object once the download event occurs.
    const filePath = path.join(__dirname, "downloads", fileDownload.suggestedFilename()); // if location is parent, then path would be '../../downloads' ("../" <--get outside of current dir). 
    await fileDownload.saveAs(filePath);

    const isFileDownloaded = fs.existsSync(filePath);
    test.expect(isFileDownloaded).toBeTruthy(); // Assertion to check file existence

    expect(fs.existsSync(filePath)).toBeTruthy(); // Another way. Combined into a single line. 

});

test('File upload example', async ({ page }) => {
    await page.goto("/upload");
    const filePath = path.join(__dirname, "uploads", "robo-profile.jpg");
    await page.waitForTimeout(2000); // adding for visualization only
    await page.setInputFiles("#file-upload", filePath);

    await page.locator("#file-submit").click();
    await expect(page.locator("h3")).toHaveText("File Uploaded!");
});

test('Select all links on a page', async ({ page }) => {
    await page.goto("https://practice.cydeo.com")
    const allLinks = await page.$$("a");  // Note: page.$() [with one $ sign] selects only the first matching element
    console.log(allLinks.length);
});

/* Download Steps:

1. Navigate to the page
    await page.goto('https://practice.cydeo.com/download');

2. Wait for the download event
    const waitForDownload = page.waitForEvent("download");

3. Trigger the download
    await page.locator("text='class note.txt'").click();

4. Capture the download
    const fileDownload = await waitForDownload;

5. Define the file path
    const filePath = path.join(__dirname, "downloads", fileDownload.suggestedFilename());

6. Save the file
    await fileDownload.saveAs(filePath);

7. Verify that the file exists 
    const isFileDownloaded = fs.existsSync(filePath);
    test.expect(isFileDownloaded).toBeTruthy(); // Assertion to check file existence
    */