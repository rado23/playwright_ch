import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Page Load Performance - Measure Load Time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://automationintesting.online/');

    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);

    // Adjust a threshold as needed.
    expect(loadTime).toBeLessThan(3000);
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