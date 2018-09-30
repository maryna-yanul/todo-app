const puppeteer = require('puppeteer');
const config = require('./config');
const { delay } = require('./util')

describe('Sign', () => {
  let browser = null;
  let page = null;

  before(async done => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    page = await browser.newPage();
    await page.goto(config.url);

    await delay(5000)

    done()
  })

  it('Sign in', async done => {
    await page.goto(`${config.url}/sign/in`);
    await page.waitFor('input[name="email"]');
  
    await page.type('input[name="email"]', config.user.email);
    await page.type('input[name="password"]', config.user.password);
    const navigationPromise = page.waitForNavigation();
    page.click('.sign-in__submit-btn')
  
    navigationPromise
      .then(() => {
        done()
      })
  })

  after(() => browser.close())
})
