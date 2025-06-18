import { test, expect } from '@playwright/test';
//import { beforeEach } from 'node:test';

let randValueForEmail = Math.floor(Math.random() * 10000);
let email = `aqa-li+${randValueForEmail}@gmail.com`;
let name = 'Alex';
let lastName = 'Li';
let password = '1234567Ab';

test.describe('Sign In tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const signUpButton = page.getByRole('button', { name: 'Sign Up' });
    await signUpButton.click();
  })

  test('Validate title on "Registration" modal', async ({ page }) => {
    page.locator('//h4[@class="modal-title"]', { hasText: 'Registration' });  //Text "Registration"
  })

  test.describe('Validate errors for "Name"', () => {
    test('Empty field', async ({ page }) => {
      const input = page.locator('//input[@id="signupName"]');
      await input.focus();
      await input.blur();
      await expect(page.locator('//div[@class="invalid-feedback"]/p[.="Name required"]')).toBeVisible();
    });

    test('Wrong data', async ({ page }) => {
      const input = page.locator('//input[@id="signupName"]');
      await input.fill('111');
      await input.blur();
      await expect(page.locator('//div[@class="invalid-feedback"]/p[.="Name is invalid"]')).toBeVisible();
    });

    test('Wrong length', async ({ page }) => {
      const input = page.locator('//input[@id="signupName"]');
      await input.fill('u');
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Name has to be from 2 to 20 characters long');
    });

    test('Border color red', async ({ page }) => {
      const input = page.locator('#signupName');
      await input.focus();
      await input.blur();
      await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validate errors for "Last name" on "Registration" modal', () => {
    test('Empty field', async ({ page }) => {
      const input = page.locator('#signupLastName');
      await input.focus();
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Last name required');
    });

    test('Wrong data', async ({ page }) => {
      const input = page.locator('#signupLastName');
      await input.fill('111');
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Last name is invalid');
    });

    test('Wrong length', async ({ page }) => {
      const input = page.locator('#signupLastName');
      await input.fill('u');
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Last name has to be from 2 to 20 characters long');
    });

    test('Border color red', async ({ page }) => {
      const input = page.locator('#signupLastName');
      await input.focus();
      await input.blur();
      await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validate errors for "Email"', () => {
    const invalidEmails = ['qwert', 'qwert@', 'qwert@com'];

    for (const testEmail of invalidEmails) {
      test(`Invalid email: ${testEmail}`, async ({ page }) => {
        const input = page.locator('#signupEmail');
        await input.fill(testEmail);
        await input.blur();
        await expect(page.locator('.invalid-feedback')).toHaveText('Email is incorrect');
      });
    }

    test('Empty field', async ({ page }) => {
      const input = page.locator('#signupEmail');
      await input.focus();
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Email required');
    });

    test('Border color red', async ({ page }) => {
      const input = page.locator('#signupEmail');
      await input.focus();
      await input.blur();
      await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validate errors for "Password" on "Registration" modal"', () => {
    const wrongPasswords = [' ', '1234567', '1234567890123456', 'ABABABAB', '1234567A'];

    for (const testPass of wrongPasswords) {
      test(`Invalid password: "${testPass}"`, async ({ page }) => {
        const input = page.locator('#signupPassword');
        await input.fill(testPass);
        await input.blur();
        await expect(page.locator('.invalid-feedback')).toHaveText(
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );
      });
    }

    test('Empty field', async ({ page }) => {
      const input = page.locator('#signupPassword');
      await input.focus();
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Password required');
    });

    test('Border color red', async ({ page }) => {
      const input = page.locator('#signupPassword');
      await input.focus();
      await input.blur();
      await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test.describe('Validate errors for "Re-enter password" on "Registration" modal"', () => {
    const reenterPasswords = [' ', ' 1234567Ab', '1234567Ab'];

    test(`Invalid re-entered password`, async ({ page }) => {
      //await page.locator('//*[@id="signupPassword"]').fill(password);

      let arrayReEnterPass = [' ', '1234567 Ab', ' 1234567Ab', '1234567Ab'];

      function typePass(incorrectPass) {
        const input = page.locator('input#signupRepeatPassword');
        input.focus();
        input.clear();
        input.fill('incorrectPass');
        input.blur();
        expect(page.locator('.invalid-feedback')).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      }

      arrayReEnterPass.forEach(element => {
        typePass(arrayReEnterPass);
      });
    });


    test('Empty field', async ({ page }) => {
      await page.locator('//*[@id="signupPassword"]').fill(password);
      const input = page.locator('#signupRepeatPassword');
      await input.focus();
      await input.blur();
      await expect(page.locator('.invalid-feedback')).toHaveText('Re-enter password required');
    });

    test('Border color red', async ({ page }) => {
      await page.locator('//*[@id="signupPassword"]').fill(password);
      const input = page.locator('#signupRepeatPassword');
      await input.focus();
      await input.blur();
      await expect(input).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });
  });

  test('Validate Registration is completed', async ({ page }) => {
    // await page.goto('/');
    // const signUpButton = page.getByRole('button', {name:'Sign Up'});
    // await signUpButton.click();
    //page.locator('.modal-title', { hasText: 'Registration' });
    await expect(page.locator('button.btn.btn-primary:disabled')).toBeVisible();
    await page.locator('//*[@id="signupName"]').fill(name);
    await page.getByLabel('Name');
    await page.locator('//*[@id="signupLastName"]').fill(lastName);
    await page.locator('//*[@id="signupEmail"]').fill(email);
    await page.locator('//*[@id="signupPassword"]').fill(password);
    await page.locator('//*[@id="signupRepeatPassword"]').fill(password);
    const registerButton = page.getByRole('button', { name: 'Register' });
    await registerButton.click();

    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  });
});
