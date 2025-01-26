import { chromium } from '@playwright/test';

async function globalSetup() {
    console.log('Global setup is running...');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://automationintesting.online/');
    await browser.close();
}

export default globalSetup;
