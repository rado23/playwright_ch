import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility Test - Detect Issues', async ({ page }) => {
    await page.goto('https://automationintesting.online/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    console.log('Accessibility Violations:', accessibilityScanResults.violations);

    // Fail test if there are accessibility violations
    expect(accessibilityScanResults.violations.length).toBe(0);
});
