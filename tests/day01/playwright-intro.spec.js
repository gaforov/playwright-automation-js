// const{test} = require('@playwright/test'); older version of importing
import { test } from "@playwright/test";

test("Test Description", async ({ page }) => {
  await page.goto("https://www.google.com/");

  await page.waitForTimeout(2000);

  let searchField = page.locator("//textarea[@class='gLFyf']");

  searchField.type("Playwright Automation");

  await page.waitForTimeout(2000);
});

/* 
<textarea class="gLFyf" aria-controls="Alh6id" aria-owns="Alh6id" autofocus="" title="Search" value="" jsaction="paste:puy29d;" aria-label="Search" aria-autocomplete="both" aria-expanded="true" aria-haspopup="false" autocapitalize="off" autocomplete="off" autocorrect="off" id="APjFqb" maxlength="2048" name="q" role="combobox" rows="1" spellcheck="false" data-ved="0ahUKEwiBht-chbOJAxWZkO4BHUpPD2cQ39UDCA8" aria-activedescendant="" style=""></textarea>

//textarea

 */
