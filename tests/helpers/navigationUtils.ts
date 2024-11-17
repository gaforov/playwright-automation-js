import { Page } from "@playwright/test";

export async function clickOnText(page, intendedText) {
    const link = page.locator(`text=${intendedText}`); // Using Playwright's text locator
    await link.waitFor({ state: 'visible' });  // Wait for the element to be visible
    await link.click();  // Click on the element if the text matches
}


// This function, for some reason, doesn't work. So, I will keep it for now and rename it to clickOnText2().
// Fix: Count() should be outside of the for loop, using it inside of the for loop didnt work. 
export async function clickOnText2(page: Page, intendedText: string) {
    const navigationLinks = page.locator(".list-group li a");
    const count = await navigationLinks.count(); // count outside of the for loop

    for (let i = 0; i < count; i++) {
            const link = navigationLinks.nth(i); // Get each link by index
            const text = await link.innerText(); // Get the text of link
            // Or chaain bove two lines into one line as this:
            //const text = await navigationLinks.nth(i).innerText();

            if (text === intendedText) { // Using trim() to avoid issues with whitespace
                await link.scrollIntoViewIfNeeded(); // Scroll into view if needed
                await link.waitFor({ state: 'visible' }); // Ensure the element is visible

                await link.click(); // Click the link if the text matches
                break;  // exit loop after clicking
            }
    }
}
//module.exports = {clickOnText};
