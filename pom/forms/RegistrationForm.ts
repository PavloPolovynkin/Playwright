import { expect, Locator } from "@playwright/test";
import BasePage from "../../BasePage";

export default class RegistrationForm extends BasePage {
    private readonly titleForm: Locator = this.page.locator('//h4[@class="modal-title"]');
    private readonly nameField: Locator = this.page.locator('//input[@id ="signupName"]');
    private readonly lastNameField: Locator = this.page.locator('//input[@id ="signupLastName"]');
    private readonly emailField: Locator = this.page.locator('//input[@id ="signupEmail"]');
    private readonly passwordField: Locator = this.page.locator('//input[@id ="signupPassword"]');
    private readonly reEnterPasswordFiled: Locator = this.page.locator('//input[@id ="signupRepeatPassword"]');
    private readonly registerButton: Locator = this.page.locator('//button[@class ="btn btn-primary"]');
    //private readonly invalidFeedbackName: Locator = this.page.locator('/div[@class="invalid-feedback"]');
    private readonly invalidFeedbackName: Locator = this.page.locator('//div[contains(@class, "form-group")]/div[@class="invalid-feedback"]');
    private readonly registerButtonIsDisabled: Locator = this.page.locator('//button[@disabled]');

    get disabledRegButton() {
        return this.registerButtonIsDisabled
    }

    get regButton() {
        return this.registerButton
    }

    get title() {
        return this.titleForm;
    }

    get errorFOrName() {
        return this.invalidFeedbackName;
    }

    get nameF() {
        return this.nameField;
    }

    get lastNameF() {
        return this.lastNameField;
    }

    get getEmailField() {
        return this.emailField;
    }

    get getPasswordField() {
        return this.passwordField;
    }

    get getReEnterPasswordField() {
        return this.reEnterPasswordFiled;
    }

    // async checkTitle() {
    //     await this.titleForm;
    //     // expect(this.titleForm).toHaveText('Registration');
    // }

    async enterName(name: string): Promise<any> {
        await this.nameField.fill(name);
    }

    async enterlastName(lastName: string): Promise<any> {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string): Promise<any> {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string): Promise<any> {
        await this.passwordField.fill(password);
    }

    async reEnterPassword(password: string): Promise<any> {
        await this.reEnterPasswordFiled.fill(password);
    }

    async clickRegButton(): Promise<any> {
        await this.registerButton.click();
    }

    //page.locator('//h4[@class="modal-title"]', { hasText: 'Registration' });  //Text "Registration"
}