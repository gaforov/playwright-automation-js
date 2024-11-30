// create a test function with import test from playwright. 
import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});


test('TC1: Unsecure SEP Login.', async ({ page }) => {
    const password = Buffer.from("automation-user:123abc").toString("base64");

    await page.setExtraHTTPHeaders({
        Authorization: `Basic ${password}`
    });

    await page.goto('https://qa.sep.tdtm.cydeo.com/taws'); // go to page

    expect(await page.title()).toContain('Checkout'); // verify page accessible

    /** NOTE: If you push this to GitHub as this, its not safe. Your credentials are exposed.
    One way to solve this issue, is to store your credentials in User Settings 'settings.json' file 
    Search exactly like this: "> Open User Seetings (JSON)" [More explained in TC2 below]

    Example code:
      "playwright.env": {
        "SEP_USERNAME": "automation-user",
        "SEP_PASSWORD": "123abc"
    }
        
    */
});



test('TC2: Secure SEP Login. Auth using local environment (settings.json)', async ({ page }) => {

    const password = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");

    await page.setExtraHTTPHeaders({
        Authorization: `Basic ${password}`
    });

    // await page.goto(process.env.SEP_URL);   // this works too. 
    await page.goto(`${process.env.SEP_URL}`); 

    expect(await page.title()).toContain('Checkout');

    // Print credentials in the console, for debugging purposes only.
    console.log(`Username is: ${process.env.SEP_USERNAME}`);
    console.log(`Password is: ${process.env.SEP_PASSWORD}`);
});


test('TC3: SEP Login. Attempt to login without credentials. Fails. Debugging test', async ({ page }) => {

    await page.goto('https://qa.sep.tdtm.cydeo.com/taws');
    expect(await page.title()).toContain('Checkout');
});