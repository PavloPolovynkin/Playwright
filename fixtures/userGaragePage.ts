import { test as base, Page, expect } from '@playwright/test';
import GaragePage from '../pom/pages/GaragePage';
import HomePage from "../pom/pages/HomePage";
import SignInForm from '../pom/forms/SignInForm';
//import { usersList } from "../test-data/users";

type PageFixtures = {
    garagePage: GaragePage,
    garageAsUserWithRemovingCars: GaragePage,

};

let email = `aqa-lin+test@gmail.com`;
let password = '1234567Ab';

export const test = base.extend<PageFixtures>({
    garagePage: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await use(garagePage);
    },
    garageAsUserWithRemovingCars: async ({ page }, use) => {
        let homePage = new HomePage(page);
        let signInForm = new SignInForm(page);
        let garagePage = new GaragePage(page);

        // await garagePage.navigate();
        // await garagePage.penSignInForm();
        // await signInForm.loginWithCredentials(email, password);
        // await garagePage.verifyPageIsOpen();
        // await expect(garagePage.logCompAlertVisible).toBeVisible;
        await garagePage.navigate();
        await use(garagePage);
        await page.waitForTimeout(4000);
        await expect(garagePage.carAddedCompAlertVisible).toContainText('Car added');
        await page.locator('//span[@class="icon icon-edit"]').first().click();
        await page.locator('//button[@class="btn btn-outline-danger"]').click();
        await page.locator('//button[@class="btn btn-danger"]').last().click();
        
    },
})

export { expect } from '@playwright/test';