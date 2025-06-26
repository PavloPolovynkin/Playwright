import { Locator, Page } from "@playwright/test";
import BasePage from "../../BasePage";

export default class HomePage extends BasePage {
    private readonly signUpButton: Locator =  this.page.locator('//button[@class="hero-descriptor_btn btn btn-primary"]');

    async navigate(): Promise<any> {
        await this.page.goto('');
    }

    async openSignUpForm(): Promise<any> {
        await this.signUpButton.click();
    }

    //     openSignInForm() {
    //         this.signInButton.click();
    //     }
}

// export default new HomePage();