import { defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  timeout: 40 * 1000, // to overwrite the default test timeout of 30 seconds
  expect: {
    timeout: 5000, // to overwrite the default expect timeout of 5 seconds
  },

  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    // trace: 'on',  //to trace all the steps
    trace : 'retain-on-failure', //to trace only failure steps,//off, on
    actionTimeout : 50*1000,
    navigationTimeout: 50*1000
    },
});
module.exports = config;