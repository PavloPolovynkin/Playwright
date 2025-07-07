import { test, expect } from '@playwright/test';
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import GaragePage from "../pom/pages/GaragePage";


let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

let email = `aqa-lin+test@gmail.com`;
let name = 'Alex';
let lastName = 'Li';
let password = '1234567Ab';

test.use({ storageState: 'test-data/storageStates/mainStorageState.json' });

test.describe('Api tests', () => {
    test.beforeEach((async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
    }));

    test.describe('Task #1: На сторінці профілю юзера підмініть response body для вказаного запиту', () => {
        test('Mock response', async ({ page }) => {
            await homePage.navigate();
            // await homePage.openSignInForm();
            // await signInForm.loginWithCredentials(email, password);
            await garagePage.verifyPageIsOpen();
            await page.route('**/api/users/profile', route => route.fulfill({
                body: JSON.stringify({
                    status: "ok",
                    data: {
                        userId: 237414,
                        photoFilename: "default-user.png",
                        name: "Stanislav",
                        lastName: "Taran"
                    }
                }),
            }))
            await page.goto('/panel/profile');
            await garagePage.checkProfileFullName();
        })
    })

    test.describe('Task #2: Використовуючи APIRequestContext напишіть декілька API тестів для створення машин', () => {
        // test('Check 1st car in the garage and numbers of cars', async ({ request }) => {
        //     const response = await request.get('/api/cars');
        //     const body = await response.json();

        //     console.log(`Response: ${JSON.stringify(response)}`)
        //     console.log(`__________`)
        //     console.log(`Response: ${JSON.stringify(body.data)}`)

        //     expect(response.status()).toBe(200);
        //     expect(body.data[0].brand).toBe('Ford');
        //     expect(body.data[0].model).toBe('Focus');
        //     expect(body.data[0].mileage).toBe(1234);
        //     expect(body.data.length).toBe(2);
        // })

        test('Add one car', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    "carBrandId": 4,
                    "carModelId": 16,
                    "mileage": 9999
                }
            })
            const body = await response.json();

            console.log(`Response: ${JSON.stringify(response)}`);
            console.log(`---Resp---`);
            console.log(`Response: ${JSON.stringify(body.data)}`);

            expect(response.status()).toBe(201);
            expect(body.data.brand).toBe('Porsche');
            expect(body.data.model).toBe('911');
            expect(body.data.mileage).toBe(9999);
        })

        test('Add car with wrong carmodelId and verify 404', async ({ request }) => {
            const response = await request.post('/api/cars', {
                data: {
                    "carBrandId": 1,
                    "carModelId": 16,
                    "mileage": 765
                }
            })
            const body = await response.json();

            console.log(`Response: ${JSON.stringify(response)}`);
            console.log(`---Resp---`);
            console.log(`Response: ${JSON.stringify(body.data)}`);

            expect(response.status()).toBe(404);

        })

        test('Add car wrong car and verify number of cars in garage before and after adding', async ({ request }) => {
            let response1 = await request.get('/api/cars');
            let body1 = await response1.json();
            let numberOfCars = body1.data.length;
            console.log(`Lengs1: ${JSON.stringify(body1.data.length)}`);

            const response = await request.post('/api/cars', {
                data: {
                    "carBrandId": 5,
                    "carModelId": 1,
                    "mileage": 333,
                    //!!! if we will add invalid attributes we will receive status: 400 !!!
                    // "brand": "Porsche",
                    // "model": "911",
                }
            })
            const body = await response.json();
            expect(response.status()).toBe(404);

            //number of cars after adding invalid car = number of cars before adding 
            response1 = await request.get('/api/cars');
            body1 = await response1.json();
            expect(body1.data.length).toBe(numberOfCars);
            console.log(`Lengs2: ${JSON.stringify(body1.data.length)}`);
        })
    })

    test.describe('Delete all cars from garage', () => {
        test('Delete all cars from garage if number of cars more than 0', async ({ request }) => {
            const response = await request.get('/api/cars');
            const body = await response.json();

            const carIds = body.data.map((car: any) => car.id);
            console.log('CarIDs:', carIds);

            if (carIds.length > 0) {
                for (const id of carIds) {
                    const deleteResponse = await request.delete(`/api/cars/${id}`);
                    expect(deleteResponse.ok()).toBeTruthy();
                }
            }
        });
    })

})

