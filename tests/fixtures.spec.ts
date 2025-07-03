import { Locator, Page, expect } from "@playwright/test";
import { chromium } from "@playwright/test";
import { test } from '../fixtures/userGaragePage';

test.describe('---TEST---', () => {

    test.use({ storageState: 'test-data/storageStates/mainStorageState.json' });

    test.describe('Validate "Register" button is disabled on "Registration" modal', () => {
        test('Add BMW X5', async ({ garageAsUserWithRemovingCars }) => {
            await garageAsUserWithRemovingCars.verifyPageIsOpen();
            await garageAsUserWithRemovingCars.addNewCar('BMW', 'X5', '777');
            await garageAsUserWithRemovingCars.verifyLastAddedCarName('BMW X5');
        });

        test('Add Ford Focus', async ({ garageAsUserWithRemovingCars }) => {
            await garageAsUserWithRemovingCars.verifyPageIsOpen();
            await garageAsUserWithRemovingCars.addNewCar('Ford', 'Focus', '321');
            await garageAsUserWithRemovingCars.verifyLastAddedCarName('Ford Focus');
        });

        test('Add car', async ({ garageAsUserWithRemovingCars }) => {
            await garageAsUserWithRemovingCars.verifyPageIsOpen();
            await garageAsUserWithRemovingCars.addNewCar('Porsche', '911', '333');
        });


        // test('2', async ({ page }) => {

        // });
    });

});