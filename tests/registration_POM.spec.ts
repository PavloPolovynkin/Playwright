import { test, expect } from '@playwright/test';
//import { beforeEach } from 'node:test';
import HomePage from '../pom/pages/HomePage';
import RegistrationForm from '../pom/forms/RegistrationForm';
import GaragePage from '../pom/pages/GaragePage';

let homePage: HomePage;
let regForm: RegistrationForm;
let garagePage: GaragePage;

let randValueForEmail = Math.floor(Math.random() * 10000);
let email = `aqa-lin+${randValueForEmail}@gmail.com`;
let name = 'Alex';
let lastName = 'Li';
let password = '1234567Ab';

test.describe('Sign Up tests', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        regForm = new RegistrationForm(page);
        await homePage.navigate();
        await homePage.openSignUpForm();
    })

    test('Validate title on "Registration" modal', async ({ page }) => {
        await expect(regForm.title).toHaveText('Registration');
        //await regForm.checkTitle;      
    })

    test.describe('Validate errors for "Name"', () => {
        test('Empty field', async ({ page }) => {
            //homePage = new HomePage(page);
            regForm = new RegistrationForm(page);
            await regForm.nameF.focus();
            await regForm.nameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveText('Name required');
        });

        test('Wrong data', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.nameF.fill('111');
            await regForm.nameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveText('Name is invalid');
        });

        test('Wrong length', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.nameF.fill('u');
            await regForm.nameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveText('Name has to be from 2 to 20 characters long');
        });

        test('Border color red', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.nameF.fill('u');
            await regForm.nameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.nameF).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe('Validate errors for "Last name" on "Registration" modal', () => {
        test('Empty field', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.lastNameF.focus();
            await regForm.lastNameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveText('Last name required');
        });

        test('Wrong data', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.lastNameF.fill('111');
            await regForm.lastNameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveText('Last name is invalid');
        });

        test('Wrong length', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.lastNameF.fill('u');
            await regForm.lastNameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveText('Last name has to be from 2 to 20 characters long');
        });

        test('Border color red', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.lastNameF.focus();
            await regForm.lastNameF.blur();
            await expect(regForm.errorFOrName).toBeVisible();
            await expect(regForm.errorFOrName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe('Validate errors for "Email" on "Registration" modal', () => {
        const invalidEmails = ['qwert', 'qwert@', 'qwert@com'];

        for (const testEmail of invalidEmails) {
            test(`Invalid email: "${testEmail}"`, async ({ page }) => {
                regForm = new RegistrationForm(page);
                await regForm.getEmailField.fill(testEmail);
                await regForm.getEmailField.blur();
                await expect(regForm.errorFOrName).toHaveText('Email is incorrect');
            });
        }

        test('Empty field', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.getEmailField.focus();
            await regForm.getEmailField.blur();
            await expect(regForm.errorFOrName).toHaveText('Email required');
        });

        test('Border color red', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.getEmailField.focus();
            await regForm.getEmailField.blur();
            await expect(regForm.errorFOrName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe('Validate errors for "Password" on "Registration" modal', () => {
        const wrongPasswords = [' ', '1234567', '1234567890123456', 'ABABABAB', '1234567A'];

        for (const testPass of wrongPasswords) {
            test(`Invalid password: "${testPass}"`, async ({ page }) => {
                regForm = new RegistrationForm(page);
                await regForm.getPasswordField.fill(testPass);
                await regForm.getPasswordField.blur();
                await expect(regForm.errorFOrName).toHaveText(
                    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
                );
            });
        }

        test('Empty field', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.getPasswordField.focus();
            await regForm.getPasswordField.blur();
            await expect(regForm.errorFOrName).toHaveText('Password required');
        });

        test('Border color red', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.getPasswordField.focus();
            await regForm.getPasswordField.blur();
            await expect(regForm.errorFOrName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe('Validate errors for "Re-enter password" on "Registration" modal"', () => {
        const reenterPasswords = [' ', ' 1234567Ab', '1234567Ab'];

        test(`Invalid re-entered password`, async ({ page }) => {
            //await page.locator('//*[@id="signupPassword"]').fill(password);

            let arrayReEnterPass = [' ', '1234567ab', '     1234567Ab  ', '1234567AB'];

            const typePass = async (incorrectPass: string) => {
                regForm = new RegistrationForm(page);
                await regForm.getReEnterPasswordField.focus();
                // await regForm.getReEnterPasswordField.fill('');
                await regForm.getReEnterPasswordField.fill(incorrectPass);
                await regForm.getReEnterPasswordField.blur();
                await expect(regForm.errorFOrName).toHaveText(
                    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
                );
            };

            for (const incorrectPass of arrayReEnterPass) {
                await typePass(incorrectPass);
            }
        });

        test('Empty field', async ({ page }) => {
            regForm = new RegistrationForm(page);
            await regForm.getReEnterPasswordField.focus();
            // await regForm.getReEnterPasswordField.fill('');
            await regForm.getReEnterPasswordField.focus();
            await regForm.getReEnterPasswordField.blur();
            await expect(regForm.errorFOrName).toHaveText('Re-enter password required');
        });

        test('Border color red', async ({ page }) => {
            await regForm.getReEnterPasswordField.focus();
            // await regForm.getReEnterPasswordField.fill('');
            await regForm.getReEnterPasswordField.focus();
            await regForm.getReEnterPasswordField.blur();
            await expect(regForm.errorFOrName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        });
    });

    test.describe('Validate "Register" button on "Registration" modal', () => {
        test.describe('Validate "Register" button is disabled on "Registration" modal', () => {
            test('Validate "Register" button is disabled when Name is empty on "Registration" modal', async ({ page }) => {
                regForm = new RegistrationForm(page);
                // await regForm.enterName(name);
                await regForm.enterlastName(lastName);
                await regForm.enterEmail(email);
                await regForm.enterPassword(password);
                await regForm.reEnterPassword(password);
                await expect(regForm.regButton).toBeDisabled();
            });

            test('Validate "Register" button is disabled when Re-enter password is incorrect on "Registration" modal', async ({ page }) => {
                await regForm.enterName(name);
                await regForm.enterlastName(lastName);
                await regForm.enterEmail(email);
                await regForm.enterPassword(password);
                await regForm.reEnterPassword("password");
                await expect(regForm.regButton).toBeDisabled();
            });
        });

        test('Validate "Register" button is enabled, Registration is completed and User is created', async ({ page }) => {
            await regForm.enterName(name);
            await regForm.enterlastName(lastName);
            await regForm.enterEmail(email);
            await regForm.enterPassword(password);
            await regForm.reEnterPassword(password);
            await expect(regForm.regButton).toBeEnabled();
            await regForm.clickRegButton();

            garagePage = new GaragePage(page);
            await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
            
            await expect(garagePage.regCompAlertVisible).toContainText('Registration complete');
        });
    });
});
