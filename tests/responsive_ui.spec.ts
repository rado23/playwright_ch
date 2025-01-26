import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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