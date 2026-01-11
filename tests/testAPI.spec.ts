import {test, expect} from '@playwright/test'

test.describe('API test - expected', () => {
    test('API GET list movie', async({page}) => {
        const response = await page.request.get(
            'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
            {
                headers: {
                    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJUZXN0aW5nIDA5IiwiSGV0SGFuU3RyaW5nIjoiMTcvMDYvMjAyNiIsIkhldEhhblRpbWUiOiIxNzgxNjU0NDAwMDAwIiwibmJmIjoxNzU3NzgyODAwLCJleHAiOjE3ODE4MDIwMDB9.-_5VIe7kzZRPNtHEjW0NXKsmWqPh8yyd-pUQ9bQfMrM'
                }
            }
        )
        // verify status code
        expect(response.status()).toBe(200)

        // verify response body
        // convert string data ve dang json
        const responseBody = await response.json()
        console.log(response)
        expect(responseBody).toHaveProperty('statusCode')
        expect(responseBody).toHaveProperty('message')
        expect(responseBody).toHaveProperty('content')
        expect(responseBody).toHaveProperty('dateTime')

    })
})