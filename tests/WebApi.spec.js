const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require('./utils/APIUtils')

const loginPayload = { userEmail: "venkatdusani@gmail.com", userPassword: "Venkat@123" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});



test("API Testing one", async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const productName = "ZARA COAT 3";
    const email = "venkatdusani@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    const products = page.locator(".card-body");
    const cartLocator = page.locator("[routerlink*='cart']");
    const cartList = page.locator("div li");
    const checkoutButton = page.locator("text=Checkout");
    const countrySearchDropdown = page.locator("section.ta-results");
    const emailTextValue = page.locator(".user__name [type='text']");
    const placeOrderButton = page.locator(".action__submit");


    // await page.locator("#userEmail").fill(email);
    // await page.locator("[type='password']").fill("Venkat@123");
    // await page.locator("[type='submit']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
    //ZARA COAT 3
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        //console.log(await products.nth(i).locator("b").textContent());   
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }

    await cartLocator.click();
    await cartList.first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkoutButton.click();
    await page.locator("[placeholder = 'Select Country']").pressSequentially("ind", { delay: 150 });//150 ms delay betwen each key press
    await countrySearchDropdown.waitFor();
    const countySearchResultCount = await countrySearchDropdown.locator("button").count();
    for (let i = 0; i < countySearchResultCount; ++i) {
        const country = await countrySearchDropdown.locator("button").nth(i).textContent();
        if (country === " India") {
            await countrySearchDropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator("//label[@type='text']")).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator("//div[@class='col-text -main']").textContent();
    //await page.pause();
    expect(orderID.includes(orderIdDetails)).toBeTruthy
    console.log(orderIdDetails);
})


test("API Place the order", async ({ page }) => {

    await page.addInitScript(token => {
        window.localStorage.setItem("token", token);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderID.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator("//div[@class='col-text -main']").textContent();
    //await page.pause();
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy
    console.log(orderIdDetails);
});