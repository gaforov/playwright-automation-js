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
        let alertMessage = ''; // Declare a variable to capture the alert message
        page.on('dialog', async (dialog) => {
            alertMessage = dialog.message();  // Capture the alert message
            console.log(`Alert message: ${alertMessage}`); // Optionally, log the message for debugging. 
            await dialog.accept();
        });
        await page.click("//button[@onclick='jsAlert()']");  // Click the button to trigger the alert
        expect(alertMessage).toBe("I am a JS Alert"); // Assert that the captured alert message is as expected
    });

    test('Confirm Dialog', async ({ page }) => {
        let confirmMessage = ''; // Variable to capture the confirm message

        // Set up the dialog listener
        page.on('dialog', async (dialog) => {
            confirmMessage = dialog.message(); // Capture the confirm message
            console.log(`Confirm message: ${confirmMessage}`); // Log the message
            await dialog.accept(); // Accept the confirm dialog
        });

        // Trigger the confirm dialog
        await page.click("//button[@onclick='jsConfirm()']"); // Click the button to trigger the confirm dialog

        // Assertion: Verify the confirm message
        expect(confirmMessage).toBe("I am a JS Confirm"); // Validate captured message

    });

    test('Prompt Dialog', async ({ page }) => {
        const inputText = "Hello, Playwright!"; // Text to enter in the prompt
        let promptMessage = ''; // Variable to capture the prompt message

        // Set up the dialog listener
        page.on('dialog', async (dialog) => {
            promptMessage = dialog.message(); // Capture the prompt message
            console.log(`Prompt message: ${promptMessage}`); // Log the message
            //await page.waitForTimeout(1000); // Allows the dialog to be visually seen before being handled.
            await dialog.accept(inputText); // Accept and send text to the prompt
        });

        // Trigger the prompt dialog
        await page.click("//button[@onclick='jsPrompt()']"); // Click the button to trigger the prompt

        // Assertion: Verify the prompt response on the page
        await expect(page.locator("p#result")).toHaveText(`You entered: ${inputText}`); // Validate response
    });
});