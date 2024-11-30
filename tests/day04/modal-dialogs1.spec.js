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

    });

    test('Prompt Dialog', async ({ page }) => {

    });
});