import {Page, Locator} from "@playwright/test"

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
        await this.page.waitForTimeout(3000)
        // B1: navigate vao web page login
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        // B2: fill username vao input
        await this.usernameInput.fill(username)

        // B3: fill password vao input
        await this.passwordInput.fill(password)

        // B4: enter nut login
        await this.loginButton.click()
    }

    async isLoginSuccessful():Promise<boolean>{
        // case 1: test URL co chu dashboard
        let url = this.page.url();
        return url.includes("dashboard");
    }

}