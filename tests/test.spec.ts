import { test, expect } from '@playwright/test';


test.describe('test', () => {
    test('test', async ({ page }) => {
    console.log(`|${process.env.BASE_URL} | ${process.env.HTTP_CREDENTIALS_USERNAME} | ${process.env.HTTP_CREDENTIALS_PASSWORD}|`)
  })
    

});