const puppeteer = require('puppeteer');
const config = require('./config');

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(config.url);
  await delay(4000)
  await page.goto(`${config.url}/sign/in`);
  await page.waitFor('input[name="email"]');

  await page.type('input[name="email"]', config.user.email);
  await page.type('input[name="password"]', config.user.password);
  const navigationPromise = page.waitForNavigation();
  page.click('.sign-in__submit-btn')

  navigationPromise
    .then(() => {
      browser.close()
    })
})();
