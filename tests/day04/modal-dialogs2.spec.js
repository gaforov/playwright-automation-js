// Create a group test with three test case functions, one for each dialogs: 1. Alert, 2.Confirm, 3.Prompt import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';

test.describe('Modal Dialogs Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com/javascript_alerts');
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });

    test('Handling Alert Dialog with assertion', async ({ page }) => {
        const alertButton = page.locator("//button[@onclick='jsAlert()']");

        page.on("dialog", async (alert) => {
            console.log(`Alert message: ${alert.message()}`);
            // Adding a wait (e.g., waitForTimeout) allows the browser to visually render the dialog before Playwright handles it.
            // By default, Playwright intercepts and processes dialogs programmatically almost instantly when a 'dialog' event listener is attached.
            // This default behavior suppresses the visual display of the dialog because it is dismissed too quickly.
            // Including a delay (e.g., 1000 ms) gives the browser enough time to display the dialog before it is programmatically accepted.
            await page.waitForTimeout(1000); // Allows the dialog to be visually seen before being handled.
            await alert.accept(); // Accept the alert
        });
        await alertButton.click();

        // Add Assertion
        await expect(page.locator("text='You successfully clicked an alert'"), "Alert text not visible as expected.").toBeVisible();
    });

    test('Alert Message Verification, TestNG style Approach', async ({ page }) => {
        const expectedAlertResultText = "You successfully clicked an alert";

        page.on('dialog', async (dialog) => {
            await dialog.accept(); // Accept the alert
        });
    
        await page.click("//button[@onclick='jsAlert()']");
    
        // Retrieve the actual result text from the page after interacting with the alert
        const actualAlertResultText = await page.locator("text='You successfully clicked an alert'").textContent();
    
        // Assert that the actual alert result matches the expected value
        expect(actualAlertResultText?.trim()).toBe(expectedAlertResultText, "Alert result text does not match the expected value.");
    });



    test('Handling Confirm Dialog', async ({ page }) => {
        page.on("dialog", async (confirmButton) => {
            console.log(confirmButton.message()); // Optinally, log the message for debugging
            await page.waitForTimeout(1000);  // This is also optioanl, for visual display of pop-up dialog, wihtout wait Playwright will handle it silently (programatically). 
            await confirmButton.dismiss(); // Select Cancel
        });

        await page.click("//button[@onclick='jsConfirm()']");
        await expect(page.locator("text='You clicked: Cancel'"), "Alert text not visible as expected.").toBeVisible();
    });

    test('Hnadling Prompt Dialog', async ({ page }) => {
        page.on("dialog", async (promtButton) => {
            await page.waitForTimeout(1000); 
            await promtButton.accept("Hello!"); // Accept and enter text into input field
        });
        await page.click("//button[@onclick='jsPrompt()']");
        await expect(page.locator("text='You entered: Hello!'"), "Alert text not visible as expected.").toBeVisible();
    });

    test('Prompt Dialog with Dynamic Input', async ({ page }) => {
        const userInput = "Dynamic User Input"; // Dynamically define the input text
        page.on("dialog", async (promptDialog) => {
            await page.waitForTimeout(1000); // Optional: To visually observe the dialog
            await promptDialog.accept(userInput); // Accept and enter dynamic text into the input field
        });
    
        await page.click("//button[@onclick='jsPrompt()']");
        await expect(page.locator(`text='You entered: ${userInput}'`), "Alert text not visible as expected.").toBeVisible();
    });
    
});