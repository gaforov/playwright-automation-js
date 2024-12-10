import { test, expect } from '@playwright/test';

test.describe('Web Table Tests', () => {
    let table;
    let rows;
    let cols;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://practice.cydeo.com/web-tables');
        table = page.locator("#ctl00_MainContent_orderGrid");
        rows = table.locator("tr");
        cols = table.locator("th");
    });

    test.afterEach(async ({ page }) => {
        await page.waitForTimeout(3000);
        await page.close();
    });

    test('Validate number of rows and columns in web table', async ({ page }) => {
        // const the number of rows
        expect(await rows.count()).toBeGreaterThanOrEqual(9);

        // Another way
        rows = await table.locator("tr").all();
        expect(rows.length==9).toBeTruthy();

        // Count the number of columns
        expect(await cols.count()).toBeGreaterThanOrEqual(13);
    });

    test('Read all data from the web table', async ({ page }) => {
        rows = await rows.all(); // convert rows to array of elements by appending .all(); they can be iterated now. 
        for(let i = 1; i <rows.length; i++) { // start from 2nd row, skip header row. 
            let cols = await rows[i].locator("td").all();
            for(let j = 1; j < cols.length-1; j++) {  // exclude last column which is 'edit'
                let cellText = await cols[j].textContent();
                console.log(cellText);
            }
            console.log("--------------------");
        }

        // Another way
        // const rowCount = await rows.count(); // Use rows.count() to get the number of rows
        // for (let i = 0; i < rowCount; i++) {
        //     const row = rows.nth(i); // Get the locator for the current row
        //     const cellTexts = await row.locator("td").allTextContents(); // Fetch all cell texts in the row
        //     cellTexts.forEach(cellText => console.log(cellText.trim()));
        // }       
    });

    test('Read specific data from the web table', async ({ page }) => {

    });

    test('Check checkboxes next to row from the web table', async ({ page }) => {
        // const checkboxes = page.locator("tbody tr td input[type='checkbox']");
        const checkboxes = await rows.locator(" td input").all();
        // const checkboxes = await rows.locator("td:first-child input[type='checkbox']").all(); // more precise targeting. Preferred. 
        for (const checkbox of checkboxes) {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }

    });

    test('Verify Bob Martin ordered Cheese pizza', async () => {
        // Find the column index for "Pizza Type"
        const colCount = await cols.count();
        let pizzaTypeColIndex = -1;

        for (let i = 0; i < colCount; i++) {
            const headerText = await cols.nth(i).textContent();
            if (headerText?.trim() === "Pizza Type") {
                pizzaTypeColIndex = i + 1; // Convert to 1-based index for nth-child
                break;
            }
        }

        // Ensure the column was found
        expect(pizzaTypeColIndex).toBeGreaterThan(0);

        // Locate the row for Bob Martin
        const bobMartinRow = table.locator('tr:has(td:text("Bob Martin"))');

        // Get the Pizza Type value from Bob Martin's row
        const pizzaType = await bobMartinRow.locator(`td:nth-child(${pizzaTypeColIndex})`).textContent();
        expect(pizzaType?.trim()).toBe('Cheese');

        console.log('Bob Martin ordered Cheese pizza. Test passed!');
    });

});