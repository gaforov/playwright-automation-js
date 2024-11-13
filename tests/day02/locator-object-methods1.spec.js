// create a test group with three test in in it with empty test body, use import not require:
import { test, expect } from '@playwright/test';

test.describe('Test Group', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://practice.cydeo.com');
    });

    test.afterEach(async ({page}) => {
        await page.waitForTimeout(2000);
        await page.close();
    });


    test('Check() checks the radio buttons & checkboxes, if not checked yet', async ({page}) => {
        let checkboxesLink = page.locator("text='Checkboxes'");
        await checkboxesLink.click();
        await page.waitForTimeout(2000);

        let checkbox1 = page.locator("#box1")
        // await checkbox1.click(); // this will check the checkbox as well
        await checkbox1.check();
        
    });

    test('Uncheck() unchecks the radio buttons & checkboxes, if not unchecked yet', async ({page}) => {
        let checkboxesLink = page.locator("text='Checkboxes'");
        await checkboxesLink.click();
        await page.waitForTimeout(2000);

        let checkbox2 = page.locator("#box2")
        await checkbox2.uncheck();
    });

    test('selectOption() selects dropdown 1', async ({page}) => {
        let dropdownLink = page.locator("text='Dropdown'");  // Locate the dropdown page link
        dropdownLink.click();  // Navigate to dropdown page

        await page.waitForTimeout(2000); // wait for two seconds before selecting the dropdown

        const simpleDropdown = page.locator("#dropdown"); // locate simple dropdown
        //await simpleDropdown.selectOption("Option 2");  // select by visible text 1st way
        //await simpleDropdown.selectOption({label: 'Option 2'}); // select by visible text 2nd way
        //await simpleDropdown.selectOption("1");  // select by value 1st way
        await simpleDropdown.selectOption({value: '1'}); // select by value 2nd way
        //await simpleDropdown.selectOption({index:2});  // select by index

    });

    test('selectOption() selects dropdown 2', async ({page}) => {
        let dropdownLink = page.locator("text='Dropdown'");  // Locate the dropdown page link
        dropdownLink.click();  // Navigate to dropdown page
        await page.waitForTimeout(2000); // wait for two seconds before selecting the dropdown
        const statesDropdown = page.locator("#state"); // locate States dropdwon
        await statesDropdown.selectOption("California");  // select by visible text

    });

    test('selectOption() selects dropdown 3', async ({page}) => {
        let dropdownLink = page.locator("text='Dropdown'");  // Locate the dropdown page link
        dropdownLink.click();  // Navigate to dropdown page
        await page.waitForTimeout(2000); // wait for two seconds before selecting the dropdown
        const languagesDropdown = page.locator('[name="Languages"]'); // locate Languages dropdown
        await languagesDropdown.selectOption([
            { label: "Java", value: "java" },
            { label: "JavaScript", value: "js" },
            { label: "Python", value: "python" }
        ]);  // Array of 'select by visible text', label is sufficient, values are optional.

    });
        

});


/* 
Different methods available for selecting dropdown options.

By Visible Text:
First way: await simpleDropdown.selectOption("Option 2");
Second way: await simpleDropdown.selectOption({ label: "Option 2" });

By Value:
First way: await simpleDropdown.selectOption("1");
Second way: await simpleDropdown.selectOption({ value: "1" });

By Index (Only one way):
await simpleDropdown.selectOption({ index: 2 });

*/