//Login UI --> store session in .json
//test, cart-order, orderDetails, order history

const {test, expect} = require('@playwright/test');

let WebContext;
const email = "venkatdusani@gmail.com";
test.beforeAll(async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill(email);
await page.locator("[type='password']").fill("Venkat@123");
await page.locator("[type='submit']").click();
await page.waitForLoadState('networkidle');
await context.storageState({path: 'state.json'});
WebContext = await browser.newContext({storageState:'state.json'});

})


test("First Client App Test", async() => {
const productName = "ZARA COAT 3";
const page = await WebContext.newPage();
const products = page.locator(".card-body");
const cartLocator = page.locator("[routerlink*='cart']");
const cartList = page.locator("div li");
const checkoutButton = page.locator("text=Checkout");
const countrySearchDropdown = page.locator("section.ta-results");
const emailTextValue = page.locator(".user__name [type='text']");
const placeOrderButton = page.locator(".action__submit");

await page.goto("https://rahulshettyacademy.com/client");
await page.locator(".card-body b").first().waitFor();
console.log(await page.locator(".card-body b").allTextContents());
//ZARA COAT 3
const count  = await products.count();
for(let i=0; i<count; ++i){
 //console.log(await products.nth(i).locator("b").textContent());   
if(await products.nth(i).locator("b").textContent() === productName){
    await products.nth(i).locator("text= Add To Cart").click();
    break;
}

}

await cartLocator.click();
await cartList.first().waitFor();
const  bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();
await checkoutButton.click();
await page.locator("[placeholder = 'Select Country']").pressSequentially("ind", {delay:150});//150 ms delay betwen each key press
await countrySearchDropdown.waitFor();
const countySearchResultCount = await countrySearchDropdown.locator("button").count();
for(let i=0; i<countySearchResultCount; ++i){
const country = await countrySearchDropdown.locator("button").nth(i).textContent();
if(country===" India"){
 await countrySearchDropdown.locator("button").nth(i).click();
 break;
}
}

console.log(await emailTextValue.first().textContent());
await expect(emailTextValue.first()).toHaveText(email);
await placeOrderButton.click();
expect(page.locator("td h1")).toHaveText(" Thankyou for the order. ");
const orderId = await page.locator("label.ng-star-inserted").textContent();
const updatedOrderId = orderId.replaceAll("|", "").trim();
await page.locator("[routerlink*='myorders']").first().click();
await page.locator("tbody").waitFor();
const orderIdTableRows = page.locator("tbody tr");
const rowsCount  = await orderIdTableRows.count();
for(let i=0; i<rowsCount; ++i){
    const rowOrderId = await orderIdTableRows.nth(i).locator("th").textContent();
    if(rowOrderId===updatedOrderId){
        await orderIdTableRows.nth(i).locator("td button.btn-primary").click();
        console.log("Item identified")
        break;
    }
    
}

await expect(page.locator(".col-text")).toHaveText(updatedOrderId);

})

test("Second Client App Test", async() => {
const productName = "ADIDAS ORIGINAL";
const page = await WebContext.newPage();
const products = page.locator(".card-body");
const cartLocator = page.locator("[routerlink*='cart']");
const cartList = page.locator("div li");
const checkoutButton = page.locator("text=Checkout");
const countrySearchDropdown = page.locator("section.ta-results");
const emailTextValue = page.locator(".user__name [type='text']");
const placeOrderButton = page.locator(".action__submit");

await page.goto("https://rahulshettyacademy.com/client");
await page.locator(".card-body b").first().waitFor();
console.log(await page.locator(".card-body b").allTextContents());
//ZARA COAT 3
const count  = await products.count();
for(let i=0; i<count; ++i){
 //console.log(await products.nth(i).locator("b").textContent());   
if(await products.nth(i).locator("b").textContent() === productName){
    await products.nth(i).locator("text= Add To Cart").click();
    break;
}

}

await cartLocator.click();
await cartList.first().waitFor();
const  bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
expect(bool).toBeTruthy();
await checkoutButton.click();
await page.locator("[placeholder = 'Select Country']").pressSequentially("ind", {delay:150});//150 ms delay betwen each key press
await countrySearchDropdown.waitFor();
const countySearchResultCount = await countrySearchDropdown.locator("button").count();
for(let i=0; i<countySearchResultCount; ++i){
const country = await countrySearchDropdown.locator("button").nth(i).textContent();
if(country===" India"){
 await countrySearchDropdown.locator("button").nth(i).click();
 break;
}
}

console.log(await emailTextValue.first().textContent());
await expect(emailTextValue.first()).toHaveText(email);
await placeOrderButton.click();
expect(page.locator("td h1")).toHaveText(" Thankyou for the order. ");
const orderId = await page.locator("label.ng-star-inserted").textContent();
const updatedOrderId = orderId.replaceAll("|", "").trim();
await page.locator("[routerlink*='myorders']").first().click();
await page.locator("tbody").waitFor();
const orderIdTableRows = page.locator("tbody tr");
const rowsCount  = await orderIdTableRows.count();
for(let i=0; i<rowsCount; ++i){
    const rowOrderId = await orderIdTableRows.nth(i).locator("th").textContent();
    if(rowOrderId===updatedOrderId){
        await orderIdTableRows.nth(i).locator("td button.btn-primary").click();
        console.log("Item identified")
        break;
    }
    
}

await expect(page.locator(".col-text")).toHaveText(updatedOrderId);

})