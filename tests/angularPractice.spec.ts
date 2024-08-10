import { expect, test } from '@playwright/test'

test('Platwright spcial locators', async ({ page })=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    
    await page.getByPlaceholder("Password").fill("TestOne");

    await page.getByLabel("Gender").selectOption("Male");

    await page.locator("[name='name']").first().fill("Enter name")

    await page.locator("[name=email]").fill("Mail.@mail.com")

    await page.getByRole("button",{name:'Submit'}).click();

    await page.getByText("Two-way Data Binding example:").isVisible()

    await page.getByRole("link",{name:'Shop'}).click();

    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole("button").click()

});


test.only('test calender' ,async({ page })=>{

    const month = 5;
    const year = '2016';
    const day = 17;

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    
    //Click calender button
    await page.locator("[class='react-date-picker__calendar-button react-date-picker__button']").click()

    //get year
    let monthAndYear = await page.locator('.react-calendar__navigation__label span').textContent();

    let Year = monthAndYear?.split(' ')[1];
    
    while(Year!=year){
        await page.locator("[class='react-calendar__navigation__arrow react-calendar__navigation__prev2-button']").click()
        monthAndYear = await page.locator('.react-calendar__navigation__label span').textContent();
        Year = monthAndYear?.split(' ')[1];
    }

    //Click month year text
    await page.locator('.react-calendar__navigation__label span').click();

    //select month
    await page.locator("[class='react-calendar__tile react-calendar__year-view__months__month']").nth(month-1).click();

    //select day
    await page.locator("//abbr[text()='"+day+"']").first().click();

    const getMonth = await page.locator(".react-date-picker__inputGroup input").nth(1).getAttribute('value');
    expect(parseInt(getMonth)).toBe(month)
    
    const getDate = await page.locator(".react-date-picker__inputGroup input").nth(2).getAttribute('value');
    expect(parseInt(getDate)).toBe(day)
    
    const getYear = await page.locator(".react-date-picker__inputGroup input").nth(3).getAttribute('value');
    expect(getYear).toBe(year)

})