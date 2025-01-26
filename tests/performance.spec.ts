import { test, expect } from '@playwright/test';

test('Page Load Performance - Measure Load Time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://automationintesting.online/');

    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);

    // Adjust a threshold as needed.
    expect(loadTime).toBeLessThan(3000);
});
