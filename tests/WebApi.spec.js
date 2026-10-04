const {test, expect, request} = require("@playwright/test");

const loginPayload = {userEmail: "venkatdusani@gmail.com", userPassword: "Venkat@123"};
let token;
test.beforeAll(async()=>
{
const apiContext = await request.newContext();
const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client/",
    {
        data: loginPayload
    })

    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

});



test.only("API Testing one", async({page})=>{
const productName = "ZARA COAT 3";
const products = page.locator(".card-body");
const cartLocator = page.locator("[routerlink*='cart']");
const cartList = page.locator("div li");
const checkoutButton = page.locator("text=Checkout");
const countrySearchDropdown = page.locator("section.ta-results");
const emailTextValue = page.locator(".user__name [type='text']");
const placeOrderButton = page.locator(".action__submit");

const email = "venkatdusani@gmail.com";

await page.addInitScript(value=>{
    windlow.locatorStorage.setItem('token', value);
}, token);

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
// await page.locator("#userEmail").fill(email);
// await page.locator("[type='password']").fill("Venkat@123");
// await page.locator("[type='submit']").click();
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
})