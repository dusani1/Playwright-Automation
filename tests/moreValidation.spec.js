const {test, expect} = require("@playwright/test");

test("More Validations", async({page})=> {
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goto("https://google.com");
// await page.goBack();
// await page.goForward();
// await page.goBack();
await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
await page.locator("[value='Hide']").click();
await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
page.on("dialog", dialog=>dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();

const iframe = page.frameLocator("#courses-iframe");
iframe.locator("li a[href*='lifetime-access']:visible").click();
const text = await iframe.locator(".text h2").textContent();
console.log(text.split(" ")[1]);

//await page.pause();

})