import { expect, test } from '@playwright/test'
import { promises } from 'dns';

test('First test automation with Playwright with browser fixtute' , async ( { browser } ) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const title =  await page.title();
    console.log(title);
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

    //add locators and fill form
     const username = page.locator('input#username')
     const password = page.locator('input#password')
     const signInBtn = page.locator('input#signInBtn')
     const allTitles = page.locator('.card-body a')
     const dropdown = page.locator('select.form-control')
     const userRadioBtn = page.locator('[value=user]')
     const selectTerms = page.locator('input#terms')
     const documentLink = page.locator('[href*=documents-request]')

     await username.fill('rahulshettyacademy1');
     await password.fill('learning');
     await userRadioBtn.click();
     await page.locator('button#okayBtn').click();
    // verify radio button is selected
     await expect(userRadioBtn).toBeChecked()
     await selectTerms.check()
     
    // check locator attribute
     await expect(documentLink).toHaveAttribute("class",'blinkingText');

     // verify checkbox is checked
     await expect(selectTerms).toBeChecked()
     await signInBtn.click()

     const errorMsg =  await page.locator('[style*="block"]').innerText();
     console.log(errorMsg);
     expect(errorMsg).toBe('Incorrect username/password.')

     await username.fill('rahulshettyacademy');

     // dropdown selection
     await dropdown.selectOption('Teacher')
     await selectTerms.uncheck();

     // check checkboox is checked or not
     await expect(selectTerms.isChecked()).toBeTruthy();
     await signInBtn.click()

     // use this when you need to wait for page to load and then perform actions
     await page.waitForLoadState('networkidle');
     await allTitles.first().waitFor()

     // user to get all content of element
     console.log(await allTitles.allTextContents())
    
});


test('First test automation with Playwright with page fixure' , async ( { page } ) =>{
    await page.goto('https://google.com');
    const title  = await page.title();
    console.log(title);
    await expect(page).toHaveTitle('Google');
});

test('handle different tabs', async ({ browser })=>{

    const context = await browser.newContext();
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*=documents-request]')

    const[newPage] = await Promise.all
    ([
        context.waitForEvent('page'),
        documentLink.click(),
    ])

    await newPage.pause()

    const text1 =  await newPage.locator('[class="im-para red"]').textContent();

    const splitText = text1.split("@");
    const newUser = splitText[1].split(' ')[0];
    console.log(newUser)


});