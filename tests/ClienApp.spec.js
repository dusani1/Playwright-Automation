const {test, expect} = require('@playwright/test');

//https://rahulshettyacademy.com/client/#/auth/login
//venkatdusani@gmail.com
//Venkat@123


test("First Client App Test", async ({ browser,page }) => {
const productName = "ZARA COAT 3";
const products = page.locator(".card-body");
const cartLocator = page.locator("[routerlink*='cart']");
const cartList = page.locator("div li");
const checkoutButton = page.locator("text=Checkout");
const countrySearchDropdown = page.locator("section.ta-results");
const emailTextValue = page.locator(".user__name [type='text']");
const placeOrderButton = page.locator(".action__submit");

const email = "venkatdusani@gmail.com";


await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill(email);
await page.locator("[type='password']").fill("Venkat@123");
await page.locator("[type='submit']").click();
//await page.waitForLoadState('networkidle');
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

// await page.locator("div:has-text('CVV Code')").locator("input").fill("855");
// await page.locator("div:has-text('Name on Card')").locator("input").fill("DV SR");
// await page.locator("[name='coupon']").fill("rahulshettyacademy");
// await page.locator("text=Apply Coupon").click();
//Name on Card 

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