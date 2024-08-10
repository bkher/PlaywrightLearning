import {test, request, expect} from '@playwright/test'

const loginPayload = {userEmail:"bgtkher@gmail.com",userPassword:"Bhagat$123"}
let Logintoken=null;
test.beforeAll(async ()=>{

    const apiContext = await request.newContext();
    const loginResponse =await apiContext.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {data:loginPayload}
    )
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    Logintoken = loginResponseJson.token;
    const userId = loginResponseJson.userId;
    const message = loginResponseJson.message;
    console.log(Logintoken+' '+userId+' '+message);
});

test('check first test', async({page})=>{

    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },Logintoken);
    
    await page.goto('https://rahulshettyacademy.com/client/');
    
    console.log(await page.title())
    await page.waitForLoadState('networkidle')
    const allProduct = page.locator('.card-body')
    
    let countProduct = await allProduct.count();
    console.log(countProduct)

})