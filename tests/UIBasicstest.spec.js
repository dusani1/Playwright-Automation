const {test,expect} = require('@playwright/test');


test('First Playwright Test', async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();

const userNameLocator = page.locator("#username");
const passwordLocator = page.locator("input#password");
const signInButtonLocator = page.locator("#signInBtn");
const cardTitlesLocator = page.locator(".card-body a");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userNameLocator.fill("rahulshettyacademy12");
await passwordLocator.fill("Learning@830$3mK2");
await signInButtonLocator.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await userNameLocator.fill("rahulshettyacademy");
await signInButtonLocator.click();
//console.log(await cardTitlesLocator.textContent());
//console.log(await cardTitlesLocator.first().textContent());
//console.log(await cardTitlesLocator.nth(0).textContent());
console.log(await cardTitlesLocator.allTextContents());
})

test('Second Playwright Test', async ({browser, page})=>
{
await page.goto("https://google.com");
console.log(await page.title());
await expect(page).toHaveTitle("Google");
})


test("Handeling Select Dropdowns", async ({browser, page})=>{
const userNameLocator = page.locator("#username");
const passwordLocator = page.locator("input#password");
const signInButtonLocator = page.locator("#signInBtn");
const dropdownLocator = page.locator("select.form-control");
const radioButtonLocator = page.locator(".radiotextsty");
const okButtonLocator = page.locator("#okayBtn");
const termsAndConditionsLocator = page.locator("#terms");
const blinkTextLocator = page.locator("[href*='job-ready']");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userNameLocator.fill("rahulshettyacademy");
await passwordLocator.fill("Learning@830$3mK2");
await dropdownLocator.selectOption("consult");
await radioButtonLocator.last().click();
await okButtonLocator.click();
console.log(await radioButtonLocator.last().isChecked());
await expect(radioButtonLocator.last()).toBeChecked();
await termsAndConditionsLocator.click();
await expect(termsAndConditionsLocator).toBeChecked();
await termsAndConditionsLocator.uncheck();
// await expect(termsAndConditionsLocator).not.toBeChecked();
expect(await termsAndConditionsLocator.isChecked()).toBeFalsy();
await expect(blinkTextLocator).toHaveAttribute("class", "blinkingText");

//await page.pause

})


test("Child Window Handlign", async ({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
const userNameLoactor = page.locator("#username");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentsRequestLink = page.locator("[href*='documents-request']");

const [newPage] =await Promise.all(
    [context.waitForEvent('page'),
    documentsRequestLink.click()]
)
const text = await newPage.locator(".red").textContent();
const email = text.split("@")[1].split(" ")[0];
console.log(email);
await userNameLoactor.fill(email);
//console.log(await userNameLoactor.textContent()); //textContent: print doc input value
console.log(await userNameLoactor.inputValue());


})