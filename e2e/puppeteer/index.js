const puppeteer = require('puppeteer');
const config = require('./config');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`${config.url}/sign/in`);
  await page.waitFor('input[name="email"]')

  await page.type('input[name="email"]', config.user.email),
  await page.type('input[name="password"]', config.user.password)
  const navigationPromise = page.waitForNavigation();
  page.click('.sign-in__submit-btn')

  navigationPromise
    .then((...data) => {
      browser.close()
    })
})();
