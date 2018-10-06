const puppeteer = require('puppeteer');
const { expect } = require('chai')
const config = require('./config');
const { delay } = require('./util')

describe('Simple', function () {
  this.timeout(120000)
  let browser = null;
  let page = null;

  before(async () => {
    browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    page = await browser.newPage();
    await page.goto(config.url);

    await delay(5000)

    return Promise.resolve()
  })

  it('Sign in', async () => {
    await page.waitFor('input[name="email"]');
  
    await page.type('input[name="email"]', config.user.email);
    await page.type('input[name="password"]', config.user.password);
    const navigationPromise = page.waitForNavigation();
    page.click('.sign-in__submit-btn')
  
    return navigationPromise
  })

  it('Create todo', async () => { 
    await page.click('.new-todo')

    await page.type('input[name="title"]', config.todo.title);
    await page.$eval('.text-description', el => el.value = 'text');

    await page.click('button[type="submit"]')

    await delay(2000)
    
    await page.goto(config.url);

    await delay(5000)

    await page.click('.todo-conteiner > a')

    await delay(5000)

    const title = await page.evaluate(() => document.querySelector('.todo-title').innerText)
    expect(title === config.todo.title).to.be.true

    await page.goto(config.url);

    return delay(2000)
  })

  it('Delete todo', async () => {
    // await page.waitFor('.todo-conteiner > a');

    await page.hover('.todo-conteiner')
    await page.click('.todo-conteiner > .todo-delete')

    await delay(5000)

    expect(await page.$('.todo-conteiner')).to.be.null
  })

  after(() => browser.close())
})
