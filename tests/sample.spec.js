const {test, expect} = require("@playwright/test")

test("Locators Practice", async({page})=>{
await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
await page.locator("button[routerlink='myorders']").click();
})