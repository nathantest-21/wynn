
const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('File Upload Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/upload');
  });

  test('Successful file upload', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../../sample.txt');
    await page.setInputFiles('#file-upload', filePath);
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toContainText('sample.txt');
  });

  test('No file selected', async ({ page }) => {
    await page.click('#file-submit');
    await expect(page.locator('h1')).toContainText(/Error|Upload/, { timeout: 2000 }) //waits for 2 seconds
  });

  test('Large file upload attempt', async ({ page }) => {
    const largeFilePath = path.resolve(__dirname, '../../large-file.txt');
    await page.setInputFiles('#file-upload', largeFilePath);
    await page.click('#file-submit');
    await page.waitForTimeout(10000); // Wait 10 seconds for page to respond"
    await expect(page.locator('h1')).toContainText(/Error|Upload/);
  });
});
