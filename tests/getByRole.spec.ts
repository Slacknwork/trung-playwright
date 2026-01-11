import {test, expect} from '@playwright/test'
import { readFileSync } from 'node:fs';
import { join } from "node:path";
import { highlightAndScreenshot } from '../utils/screenshot';

test.describe("Test getByRole voi HTML local", () => {
    // setup load file HTML truoc moi test case
    test.beforeEach(async ({page}) => {
        // B1: doc file HTML tu cai folder public
        const htmlPath = join(__dirname, "..", "public", "index.html")
        // B2: set file HTML vao page playwright
        const htmlContent = readFileSync(htmlPath, "utf-8")
        await page.setContent(htmlContent, {waitUntil: 'domcontentloaded'})
    })

    // test case 1: button
    test("Test button", async ({page}) =>{
        // <button type="submit" class="btn-primary" aria-label="Submit form button">
        //             Submit
        const submitBtn = page.getByRole('button', {name: 'Submit'})
        await expect(submitBtn).toBeVisible()

        const cancelBtn = page.getByRole('button', {name: 'Cancel'})
        await expect(cancelBtn).toBeVisible()

        await page.waitForTimeout(2000)
    })

    test('Test input', async ({page}) =>{
         //</button>
        // <input 
        //                 type="text" 
        //                 id="username" 
        //                 name="username" 
        //                 placeholder="Nhập username"
        //                 aria-label="Username input field"
        //>
        const usernameInput = page.getByRole('textbox', {name: 'username'})
        await expect(usernameInput).toBeVisible()

        await page.waitForTimeout(2000)
    })

    test('Drop down select', async ({page}) =>{
        // <select id="country" name="country" aria-label="Country selection">
        //     <option value="">-- Select --</option>
        //     <option value="vn">Vietnam</option>
        //     <option value="us">United States</option>
        //     <option value="uk">United Kingdom</option>
        // </select>
        const countrySelect = page.getByRole('combobox', {name: 'country'})
        await highlightAndScreenshot(page, countrySelect, 'getByRole', 'countrySelect')
        await expect(countrySelect).toBeVisible()

        await countrySelect.selectOption({label: 'Vietnam'})
        await expect(countrySelect).toHaveValue('vn')

        await page.waitForTimeout(2000)
    })

    test('Test checkbox', async ({page}) => {
        // <label>
        //     <input 
        //        type="checkbox" 
        //        id="agree" 
        //        name="agree"
        //        aria-label="Agree to terms checkbox"
        //      >
        //    Tôi đồng ý với điều khoản
        //</label>
        const agreeCheckBox = page.getByRole('checkbox', {name: 'agree'})
        await expect(agreeCheckBox).toBeVisible()

        await agreeCheckBox.check()
        await expect(agreeCheckBox).toBeChecked()

        await page.waitForTimeout(2000)
    })

    test('Test radio', async ({page}) => {
        const maleRadio = page.getByRole('radio', {name: 'male'}).first()
        await expect(maleRadio).toBeVisible()

        maleRadio.check()
        await expect(maleRadio).toBeChecked()
    })

    test('Test table', async ({page})=>{
        const table = page.getByRole('table')
        await expect(table).toBeVisible()

        // kiem tra data trong table
        const johnRow = table.getByRole('cell', {name: 'John Doe'})
        await expect(johnRow).toBeVisible()

        // kiem tra trong table co bao nhieu data
        const rows = table.getByRole('row')
        let countRow = await rows.count()
        await expect(countRow).toEqual(4) // 1 header + 3 data
    })

    test('Test link', async ({page})=>{
        const navigation = page.getByRole('navigation')
        await expect(navigation).toBeVisible()

        const homeLink = navigation.getByRole('link').filter({hasText: 'Home'}).first()
        await expect(homeLink).toBeVisible()
    })
})