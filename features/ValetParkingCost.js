const {Given,When,Then} = require("@cucumber/cucumber");
const {chromium,expect} = require("@playwright/test");

let browser,page;

// Scenario: Calculate Valet Parking Cost for 1 hour
Given("I enter start date time 1pm and endtime 2pm", async() => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://www.shino.de/parkcalc/');
    await page.locator('#StartingDate').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('row', { name: 'Please input entry date and' }).getByRole('link').click();
    const page1 = await page1Promise;
    await page1.getByRole('link', { name: '1', exact: true }).click();
    await page.locator('#StartingTime').click();
    await page.locator('#StartingTime').fill('13:00');
    const page2Promise = page.waitForEvent('popup');
    await page.getByRole('row', { name: 'Please input leaving date and' }).getByRole('link').click();
    const page2 = await page2Promise;
    await page2.getByRole('link', { name: '1', exact: true }).click();
    await page.locator('#LeavingTime').click();
    await page.locator('#LeavingTime').fill('14:00');
    await page.locator('#LeavingTime').press('Enter');
});

When("I press Calculate", async() => {
    await page.getByRole('button', { name: 'Calculate' }).click();
});

Then("I see cost \$12", async() => {
    await expect(page.getByText('$ 12.00')).toBeVisible();
    await expect(page.getByText('(0 Days, 1 Hours, 0 Minutes)')).toBeVisible();
    await browser.close();
});

