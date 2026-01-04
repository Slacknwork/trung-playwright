import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/LoginPage'

test.describe('Login Tests', () => {
    test("Test login thanh cong", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login('Admin', 'admin123')

        await loginPage.isLoginSuccessful()
    })

    test("Test login that bai", async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.login('wronguser', 'wrongpass')
        await loginPage.isLoginSuccessful() == false
    })
})


