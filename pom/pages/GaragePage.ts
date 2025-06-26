import { Locator, Page } from "@playwright/test";
import BasePage from "../../BasePage";
// import HomePage from "./HomePage";

export default class GaragePage extends BasePage {
    // private readonly regCompleteAlert: Locator = this.page.locator('//div[@class="alert alert-success"]/p');
    private readonly regCompleteAlert: Locator = this.page.locator('//div[@class="alert alert-success"]/p["Registration complete"]');

    get regCompAlertVisible() {
        return this.regCompleteAlert;
    }
}
