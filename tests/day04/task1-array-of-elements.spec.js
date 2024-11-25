import { test, expect } from '@playwright/test';
/* Practice Tasks:
URL used for testing: https://practice.cydeo.com/
1. Verify that there are exactly 50 link elements within the <ul> element.
2. Verify that each of the 50 link elements within the <ul> element is visible.
3. Verify that each of the 50 link elements within the <ul> element are enabled.
4. Verify that each of the 50 link elements within the <ul> element have a valid `href' attribute.
*/

test.describe('Practice Arrays', () => {
  let allLinks;
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.cydeo.com');
    allLinks = await page.locator(".list-group li a").all();
  });

  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
  });


  test('Verify exactly 50 link elements within the <ul> element', async ({ page }) => {
    //expect(page.locator(".list-group li a")).toHaveCount(50); // to have count used directly with locator. 
    expect(allLinks.length).toBe(50);
    // Print each link text
    for (var i = 0; i < allLinks.length; i++) {
      const linkText = await allLinks[i].innerText();
      console.log(`Link ${i + 1}: ${linkText?.trim()}`);
    }
  });


  test('Verify each link element is visible', async ({ page }) => {
    // onw way
    for (var i = 0; i < allLinks.length; i++) {
      const isVisible = await allLinks[i].isVisible(); // assert 1st way
      //expect(isVisible).toBeTruthy();  // assert 2nd way
    }

    // second way
    for (let link of allLinks) {
      expect(await link.isVisible()).toBeTruthy(); // assert 1st way
      //await expect(link).toBeVisible();  // assert 2nd way
    }
  });


  test('Verify each link element is enabled', async ({ page }) => {
    for (let link of allLinks) {
      expect(await link.isEnabled()).toBeTruthy(); // assert 1st way
      await expect(link).toBeEnabled();  // assert 2nd way
    }
  });

  test('Verify each link element has a valid href attribute', async ({ page }) => {
    let count = 1;
    for (let link of allLinks) {
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy(); // assert 1st way
      expect(href).not.toBeNull();  // assert 2nd way

      const linkText = await link.innerText();
      console.log(`Link ${count}: ${linkText}, href: ${href}`);
      count++;  // there wont be a need if used for... loop  instead. 
    }
    /* When to Use Which
      Use Case	                              Recommended Loop
      Need numbering or indices	              for Loop
      Simple iteration without numbering	    for...of Loop 
      */

    // anotehr way, using forEach() loop 
    allLinks.forEach(async (link, index) => {
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy(); // assert 1st way
      expect(href).not.toBeNull();  // assert 2nd way
      console.log(`href ${index + 1}: ${href}`);
    });
  });

});
