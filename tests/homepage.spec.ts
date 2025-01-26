import { test, expect } from '@playwright/test';

test.describe('Automation Testing Site - Functional Tests', () => {

  test('Verify homepage loads successfully', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    await expect(page).toHaveTitle(/Restful-booker-platform/);
  });

  test('Verify Contact Us form submission', async ({ page }) => {
    await page.goto('https://automationintesting.online/');
    
    await page.fill('input[data-testid="ContactName"]', 'John Doe');
    await page.fill('input[data-testid="ContactEmail"]', 'johndoe@example.com');
    await page.fill('input[data-testid="ContactPhone"]', '07535555555');
    await page.fill('input[data-testid="ContactSubject"]', 'TEST Message');
    await page.fill('textarea[data-testid="ContactDescription"]', 'This is a test message. Please ignore.');
    
    await page.click('button[id="submitContact"]');
    
    await expect(page.locator('h2', { hasText: 'Thanks for getting in touch' })).toBeVisible();
  });

});
