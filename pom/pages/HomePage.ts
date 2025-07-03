import { Locator, Page } from "@playwright/test";
import BasePage from "../../BasePage";

export default class HomePage extends BasePage {
    private readonly signUpButton: Locator = this.page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]');
    private readonly signInButton: Locator = this.page.locator('//button[@class="btn btn-outline-white header_signin"]');

    async navigate(): Promise<any> {
        await this.page.goto('');
    }

    async openSignUpForm(): Promise<any> {
        await this.signUpButton.click();
    }

    async penSignInForm() {
        await this.signInButton.click();
    }
}

// export default new HomePage();