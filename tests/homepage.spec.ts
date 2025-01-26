import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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

test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
        const reportDir = 'bug-reports';
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir);
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const bugReportFile = path.join(reportDir, `bug-report-${timestamp}.txt`);
        const screenshotPath = path.join(reportDir, `screenshot-${timestamp}.png`);

        await page.screenshot({ path: screenshotPath, fullPage: true });

        const bugReportContent = `
### Bug Report
- **Test Name:** ${testInfo.title}
- **Test File:** ${testInfo.file}
- **Status:** ${testInfo.status}
- **Error Message:** ${testInfo.error?.message || 'No error message'}
- **Timestamp:** ${timestamp}
- **Screenshot:** ${screenshotPath}

#### Steps to Reproduce:
1. Run the test: \`${testInfo.title}\`
2. Observe the failure in the logs.

#### Expected Behavior:
- The test should pass.

#### Actual Behavior:
- The test failed with the above error.

#### Additional Notes:
- Refer to the attached screenshot.
`;

        fs.writeFileSync(bugReportFile, bugReportContent.trim());
        console.log(`🚨 Bug report generated: ${bugReportFile}`);
    }
});
