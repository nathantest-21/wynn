const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});