import { test, expect } from '@playwright/test';

const viewports = [
    { width: 1920, height: 1080, name: 'Desktop' },
    { width: 1366, height: 768, name: 'Laptop' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 375, height: 812, name: 'Mobile' }
];

viewports.forEach(viewport => {
    test(`Responsive UI Test - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('https://automationintesting.online/');

        // Ensure that the header is visible
        await expect(page.locator('h1', { hasText: 'Welcome to Restful Booker Platform' })).toBeVisible();

        // Capture a screenshot for review
        await page.screenshot({ path: `screenshots/${viewport.name}.png` });

        console.log(`✅ Responsive test passed for ${viewport.name}`);
    });
});
