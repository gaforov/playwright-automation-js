import { expect, test } from '@playwright/test';

test('Getting title of the page', async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');
    // let actualTitle = page.title();  // this fails because of missing await
    let actualTitle = await page.title();  // this will wait for the title to load before proceeding with the rest of the test
    console.log('The title of the page:', actualTitle);
    expect(actualTitle).toBe('Practice');
});

test('Getting current URL of the page', async ({ page }) => {
    await page.goto('https://practice.cydeo.com/');
    let actualURL = page.url(); // unlike title, no need to use wait() because its not returning a promise. 
    console.log(actualURL);
    expect(actualURL).toContain('practice.cydeo.com');
    // expect(actualURL).toEqual('https://practice.cydeo.com/'); // this assertion works too
});

test('Set the window size', async ({ page }) => {
    await page.goto('https://practice.cydeo.com');
    await page.setViewportSize({ width: 1700, height: 900 });
});
