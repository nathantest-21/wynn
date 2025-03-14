const { test, expect } = require('@playwright/test');

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.success')).toBeVisible();
    await expect(page).toHaveURL(/secure/);
  });

  test('Failed login with invalid password', async ({ page }) => {
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'wrongpassword');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your password is invalid!');
  });

  test('Empty fields submission', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

  test('Boundary: Long username', async ({ page }) => {
    const longUsername = 'a'.repeat(256);
    await page.fill('#username', longUsername);
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });
});