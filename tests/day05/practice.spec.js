import { test, expect } from '@playwright/test';

test.describe('Self Enrollment Portal Application (SEP)', () => {

    test.beforeEach(async ({ page }) => {
        // await page.goto(process.env.SEP_URL); // BeforeEach doesnt work for secure launch. Embed URL into the same test function. 

    });
    // test.afterEach(async ({ page }) => {
    //     await page.waitForTimeout(3000);
    //     await page.close();
    // });



    test('SEP Login', async ({ page }) => {
        const password = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString("base64");

        await page.setExtraHTTPHeaders({
            Authorization: `Basic ${password}`
        });
        // await page.goto(`${process.env.SEP_URL}`); // this works too. 
        await page.goto(process.env.SEP_URL);

        // Start Application page
        const firstName = page.getByLabel('First Name');
        const lastName = page.getByLabel('Last Name');
        const email = page.getByLabel('Email');
        const phoneNumber = page.getByLabel('Phone');
        const dropdown = page.getByText('How did you hear about us?');
        const option = page.getByRole('option', { name: 'Google' });
        const nextButton = page.getByRole('button', { name: 'Next' });

        await firstName.fill('John');
        await lastName.fill('Smith');
        await email.fill('johnsmith@example.com');
        await phoneNumber.fill('1234567890');
        await page.waitForTimeout(2000);
        await dropdown.click();
        await option.click();
        await nextButton.click(); // Selecting this will navigate to the next page -- > Payment plan page

        // Payment plan page
        const upfrontPayment = page.getByRole('button', { name: 'Upfront $500 $400 pay once' });
        await upfrontPayment.click();
        nextButton.click(); // Reuse same 'Next' button from the previous page. Selecting this will navigate to the next page -- > Review page


        // Review page (Payment info is embedded in an iFrame)
        const paymentIframe = page.frameLocator("#payment-element > div > iframe");

        const cardNumberInput = paymentIframe.getByPlaceholder('1234 1234 1234');
        const expirationDateInput = paymentIframe.getByPlaceholder('MM / YY');
        const securityCodeInput = paymentIframe.getByPlaceholder('CVC');
        const CountryInput = paymentIframe.getByLabel('Country');
        const zipCodeInput = paymentIframe.getByPlaceholder('12345')

        await cardNumberInput.fill('5555555555554444');
        await expirationDateInput.fill('12/28');
        await securityCodeInput.fill('123');
        await CountryInput.selectOption({ value: 'US' });
        await zipCodeInput.fill('90503');

        const termsAndConditionsCheckbox = page.locator('#defaultCheck2');
        await termsAndConditionsCheckbox.check();

        await page.waitForTimeout(2000);
        const payButton = page.locator("text='Pay'");
        await payButton.click();
    });


});