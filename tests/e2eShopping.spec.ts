import { expect, test } from '@playwright/test';

let username ='bgtkher@gmail.com';
let password = 'Bhagat$123'
test('client app login' , async ( { page }) =>{

    await page.goto('https://rahulshettyacademy.com/client/');
    
    const enterEmail = page.locator('#userEmail')
    const enterPass =  page.locator('#userPassword')
    await enterEmail.fill(username);
    await enterPass.fill(password);

    const clickLogin = page.locator('#login')
    await clickLogin.click()

    console.log(await page.title())
    await page.waitForLoadState('networkidle')
    const allProduct = page.locator('.card-body')
    
    let countProduct = await allProduct.count();

    for(let i=0;i<countProduct;i++){
        if(await allProduct.nth(i).locator('b').textContent()== 'ZARA COAT 3'){
            await allProduct.nth(i).locator("text=  Add To Cart").click()
        }

        if(await allProduct.nth(i).locator('b').textContent()== 'ADIDAS ORIGINAL'){
            await allProduct.nth(i).locator("text=  Add To Cart").click()
        }
    }
    await page.locator('[routerlink*= "cart"]').click()

    await page.locator("[class='items even ng-star-inserted']").waitFor();

    // user this way to get text
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(bool).toBeTruthy()

    await page.locator('text=Checkout').click();

    await page.locator("[placeholder*= 'Select Country']").pressSequentially("ind");
    const suggest = page.locator('[type="button"]')
    await suggest.first().waitFor()
    const numberOdSuggest= await suggest.count();

    for(let i=0;i<numberOdSuggest;i++){
        if(await suggest.locator('span').nth(i).textContent() == ' India'){
            await suggest.locator('span').nth(i).click();
            break;
        }
    }

    await page.locator("a:has-text('Place Order ')").click();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
    console.log(orderId);
   
    await page.locator("[routerlink='/dashboard/myorders']").first().click()
    await page.locator("tbody").waitFor();
    const getAllIds = page.locator('tbody tr');
    const countOfIds = await getAllIds.count()
    for(let i=0;i<countOfIds;i++){
        const orderIdtext = await getAllIds.nth(i).locator('th').textContent();
        if(orderId.includes(orderIdtext)){
            await getAllIds.nth(i).locator('button').first().click();
            break;
        }
       
    }
    await page.locator('.tagline').first().waitFor()
    console.log(await page.locator('.col-text').textContent());
});