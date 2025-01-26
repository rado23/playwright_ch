import { test, expect } from '@playwright/test';

test('Security Test - No Mixed Content (HTTP on HTTPS)', async ({ page }) => {
    await page.goto('https://automationintesting.online/');

    const requests = page.request;
    
    // Capture all network requests
    page.on('request', request => {
        const url = request.url();
        if (url.startsWith('http://')) {
            console.warn(`🚨 Mixed content detected: ${url}`);
            expect(url.startsWith('http://')).toBe(false);
        }
    });
});

test('Security Test - No JavaScript Errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('pageerror', error => {
        errors.push(error.message);
    });

    await page.goto('https://automationintesting.online/');
    
    console.log(`🚨 JavaScript Errors: ${errors}`);

    expect(errors.length).toBe(0);
});