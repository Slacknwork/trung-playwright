//     private final By sidebarMenuItems = By.cssSelector(".oxd-main-menu-item-wrapper a.oxd-main-menu-item");
//     private final By sidebarMenuNames = By.cssSelector(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name");

//     private final By hambugerMenu = By.cssSelector(".oxd-topbar-header-hamburger");
//     private final By dashboardTitle = By.cssSelector(".oxd-topbar-header-breadcrumb-module");
//     private final By sidebarPanel = By.cssSelector(".oxd-sidepanel");
//     private final By headerMenu = By.cssSelector(".oxd-topbar-header");

import {Page, Locator} from "@playwright/test"

export class HomePage {
    readonly page: Page;

    // locator
    readonly sideBarMenuItems: Locator
    readonly sideBarMenuNames: Locator

    constructor(page: Page){
        this.page = page

        this.sideBarMenuItems = page.locator(".oxd-main-menu-item-wrapper a.oxd-main-menu-item")
        this.sideBarMenuNames = page.locator(".oxd-main-menu-item-wrapper span.oxd-main-menu-item--name")
    }

    //  lay danh sach ten cac menu trong sidebar
    async getSideBarMenuItems():Promise<string[]>{
        // B1: Dem so luong locator sau khi tim 
        // => dung trong vong lap
        const count = await this.sideBarMenuNames.count();

        // B2: tao bien luu cac menu name
        const menuNames: string[] = []
        // B3: lap qua tung locator, lay test, push vao mang
        for (let i = 0; i < count; i++){
            // lay locator thu i => nth(i).textContent()
            const name = await this.sideBarMenuNames.nth(i).textContent()
            if (name) menuNames.push(name)
        }

        return menuNames
    }

    async clickMenuMyInfo(): Promise<void>{
        // const count = await this.sideBarMenuNames.count()
        await this.page.getByRole("link", {name: "My Info"}).click()
        // duyet tung menu trong sidebar
        // neu tim thay myInfo
        // => click vao menu va break vong lap
        // for( let i=0; i< count; i++){
        //     const name = await this.sideBarMenuNames.nth(i).textContent()
        //     if (name === "My Info"){
        //         // tim the a
        //        await this.sideBarMenuNames.nth(i).locator('xpath=./ancestor::a').click()
        //        return
        //     }
        // }
    }
    
}