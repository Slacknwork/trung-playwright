// B1: highlight element tren trang web
// B2: chup anh man hinh va luu vao file
// nhan cac tham so
// param1: page -> object Page cua playwright
// param2: locator -> object Locator cua playwright
// param3: testName -> de dat folder luu hinh co highlight
// param4: stepName -> de dat ten file hinh chup

import { Locator, Page } from "@playwright/test";
import { mkdir, mkdirSync } from "node:fs";
import { join } from "node:path";

export async function highlightAndScreenshot(
    page: Page,
    locator: Locator,
    testName: string,
    stepName: string
):Promise<void> {
    // B1: tao ten folder
    const folderName = testName.toLowerCase()

    // B2: tao duong dan de luu folder do
    // __dirname: thu muc (folder) chua file code
    // .. : quay len thu muc cha
    const screenshotDir = join(__dirname, '..', 'screenshot', folderName)

    // B3: tao folder
    mkdirSync(screenshotDir, {recursive: true})

    // B4: hightligh element
    await locator.evaluate((el) => {
        // them vien do
        (el as HTMLElement).style.border = "4px solid red";
        // them mau nen: vang
        (el as HTMLElement).style.backgroundColor = "yellow";
    })
    await page.waitForTimeout(1000)

    // B5: chup anh man hinh va luu vao file
    const filePath = join(screenshotDir, `${stepName}.png`)
    await page.screenshot({path: filePath})
}