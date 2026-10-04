const {test, expect} = require("@playwright/test")

test("Locators Practice", async({page})=>{

await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("abcdef");
await page.getByRole("button", {name:"Submit"}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

//5 sec default timeout for expect assertions
//await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

//to overwrite default wait time if required in step level
await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 70000});

await page.getByRole("link",{name:'Shop'}).click();
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button", {name:'Add'}).click();

await page.pause();
})


test("expects waits Practice", async({page})=>{

const slowExpect = expect.configure({timeout: 9000});
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("abcdef");
await page.getByRole("button", {name:"Submit"}).click();
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

//5 sec default timeout for expect assertions
//await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

//to overwrite default wait time if required in step level
//await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 7000});

// test level overwrite all expect timeout
await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

await page.getByRole("link",{name:'Shop'}).click();
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button", {name:'Add'}).click();

await page.pause();
})


test("test Level timeout", async({page})=>{
test.setTimeout(100000); // this test overall execution time is overwrite to 60 sec: default is 30 sec
page.setDefaultTimeout(9000); // test level action timeout
const slowExpect = expect.configure({timeout: 9000});
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Employed").check();
await page.getByLabel("Gender").selectOption("Female");
await page.getByPlaceholder("Password").fill("abcdef");
//Step level action timeout
await page.getByRole("button", {name:"Submit"}).click({timeout:2000});
await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

await page.getByRole("link",{name:'Shop'}).click();
await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button", {name:'Add'}).click();

//await page.pause();
})


