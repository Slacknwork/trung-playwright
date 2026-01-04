import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

test.describe("Home Page tests", () => {
    // Setup moi truong 
    // Login voi account
    // goto page dashboard
    test.beforeEach(async ({page}, testInfo) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        // Login
        await loginPage.login("Admin", "admin123")

        // doi nen khi trang home xuat hien
        // => check URL cua trang Home (co "dashboard" xuat hien)
        // **: khong quan tam gia tri la gi
        // dang truoc hay dang sau dashboard ko quan trong
        await page.waitForURL("**/dashboard**", {timeout: 20000})

        // doi den khi menu item xuat hien 
        await homePage.sideBarMenuNames.first().waitFor({timeout:10000})

    })

    test("Verify cac menu co day du khong", async ({page}) =>{
        const homePage = new HomePage(page)
        const menuItems = await homePage.getSideBarMenuItems()

        // kiem tra
        // case 1: menuItems > 0
        expect(menuItems.length).toBeGreaterThan(0)
        // case 2: menuItems co chua gia tri mong muon 
        // kiem tra xem menu Admin co ton tai trong menuItems khing
        expect(menuItems).toContain("Admin")
        // case 3: Kiem tra menuItems co day du gia tri mong muon khong
    })
})