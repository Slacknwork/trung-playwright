import {Page, Locator} from "@playwright/test"
import { highlightAndScreenshot } from "../utils/screenshot";

export class LoginPage{
    // locator
    readonly page: Page; // Pgae object giup tuong tac voi trang web
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator
    //readonly homeTitle: Locator // verify login thanh cong

    // function: login, validate
    constructor(page: Page){ // ham khoi tao
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.locator('button[type="submit"]')
    }

    async login(username: string, password: string): Promise<void>{
        // B1: navigate vao web page login
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
            {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            }
        )
        // B2: fill username vao input
        await this.usernameInput.waitFor({timeout: 10000})

        await this.usernameInput.fill(username)
        await highlightAndScreenshot(this.page, this.usernameInput, 'LoginTest', 'fill_username')

        // B3: fill password vao input
        await this.passwordInput.fill(password)
        await highlightAndScreenshot(this.page, this.passwordInput, 'LoginTest', 'fill_password')

        // B4: enter nut login
        await highlightAndScreenshot(this.page, this.loginButton, 'LoginTest', 'click_login_btn')
        await this.loginButton.click()

    }

    async isLoginSuccessful():Promise<boolean>{
        // case 1: test URL co chu dashboard
        let url = this.page.url();
        return url.includes("dashboard");
    }

}