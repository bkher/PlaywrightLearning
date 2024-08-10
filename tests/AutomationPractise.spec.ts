import {expect, test } from '@playwright/test'
import { text } from 'stream/consumers';

test (' test more validations', async ( { page })=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // hide and show the element
    await expect(page.locator('#displayed-text')).toBeVisible();
    await  page.locator("#hide-textbox").click()
    await expect(page.locator('#displayed-text')).toBeHidden();


    // alert/dialogue check

   
    page.on('dialog',dialog => dialog.accept());
    await page.locator('#alertbtn').click();

    //mouse hover
    await page.locator("#mousehover").hover();
    await page.getByRole('link',{name:'Top'}).click()

    // iframes test

    const framePage = await page.frameLocator('#courses-iframe');
    await framePage.locator("li a[href='lifetime-access']:visible" ).click()
    const textcheck= await framePage.locator('.text h2').textContent();
    const number = textcheck?.split(' ')[1];
    console.log(number);

})