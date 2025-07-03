import { Locator, Page, expect } from "@playwright/test";
import BasePage from "../../BasePage";
// import HomePage from "./HomePage";

export default class GaragePage extends BasePage {
    // private readonly regCompleteAlert: Locator = this.page.locator('//div[@class="alert alert-success"]/p');
    private readonly regCompleteAlert: Locator = this.page.locator('//div[@class="alert alert-success"]/p["Registration complete"]');
    private readonly logCompleteAlert: Locator = this.page.locator('//div[@class="alert alert-success"]/p["You have been successfully logged in"]');
    private readonly carAddedCompleteAlert: Locator = this.page.locator('//div[@class="alert alert-success"]/p["Car added"]');
    private readonly addNewCarButton: Locator = this.page.locator('//button[contains(@class, "btn-primary")]');
    private readonly brandDropdown: Locator = this.page.locator('//select[@id="addCarBrand"]');
    private readonly modelDropdown: Locator = this.page.locator('//select[@id="addCarModel"]');
    private readonly mileageField: Locator = this.page.locator('//input[@id="addCarMileage"]');
    private readonly submitAddingCarButton: Locator = this.page.locator('//app-add-car-modal//button[contains(@class, "btn-primary")]');
    private readonly allAddedCarNames: Locator = this.page.locator('//p[contains(@class,"car_name")]');
    private readonly pageHeader: Locator = this.page.locator('//h1', { hasText: 'Garage' });


    get logCompAlertVisible() {
        return this.regCompleteAlert;
    }

    get carAddedCompAlertVisible() {
        return this.logCompleteAlert;
    }

    get regCompAlertVisible() {
        return this.carAddedCompleteAlert;
    }

    async navigate(): Promise<void> {
        await this.page.goto('/panel/garage');
    }

    async addNewCar(brand: string, model: string, mileage: string): Promise<void> {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.submitAddingCarButton.click();
        await this.page.waitForTimeout(500);
    }

    async verifyLastAddedCarName(expectedName: string): Promise<void> {
        await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
    }

    async verifyPageIsOpen(): Promise<void> {
        await expect(this.pageHeader).toBeVisible();
    }

    async verifyCarDeletedByIndex(expectedName: string): Promise<void> {
        // await expect(this.pageHeader).toBeVisible();
    }
}

