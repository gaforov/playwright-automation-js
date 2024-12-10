/* 
iFrame URL: https://practice.cydeo.com/tinymce
TC1. Locate iFrame by ID 
TC2. Locate iFrame by CSS
TC3. Locate iFrame by xPath
*/

import { test, expect } from '@playwright/test';

test.describe('iFrame Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com/tinymce');
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
  });


  test('TC1. Locate iFrame by ID', async ({ page }) => {
    let myFrame = page.frameLocator("#mce_0_ifr"); // First locating iFrame
    let textAreaInsideiFrame = myFrame.locator("#tinymce"); // Then moving/switching to inside iframe. 
    await page.waitForTimeout(1000); // slow down to see clearing of body text. 
    // await textAreaInsideiFrame.clear(); // Cannot interact with the page anymore, form is not editable. 
    // await page.waitForTimeout(1000); // slow down to see the action
    // textAreaInsideiFrame.fill("Hey Said!"); // Cannot interact with the form anymore, form is not editable.

    //verify text presence
    await expect(textAreaInsideiFrame).toHaveText("Your content goes here.");        // one way
    expect(await textAreaInsideiFrame.innerText()).toBe("Your content goes here.");  // another way

    // can interact outside the iframe without switching back to parent (unlike Selenium).
    const pageTitle = await page.locator(".example h3").innerText();
    console.log(pageTitle);
  });



  test('TC2. Locate iFrame by CSS', async ({ page }) => {
    let myFrame = page.frameLocator("iframe[title='Rich Text Area']");
    let textAreaInsideiFrame = myFrame.locator("#tinymce"); 

    // await page.waitForTimeout(1000);
    // await textAreaInsideiFrame.press("Control+A");
    // await page.waitForTimeout(1000);
    // await textAreaInsideiFrame.press("Backspace");
    
    //OR combine both Control+A and Backspace
    await textAreaInsideiFrame.press("Control+A", "Backspace");
    
    await page.waitForTimeout(1000);
    await textAreaInsideiFrame.type("Playwright Automation!", { delay: 100 });
    //textAreaInsideiFrame.fill("Hey Said!");
  });




});