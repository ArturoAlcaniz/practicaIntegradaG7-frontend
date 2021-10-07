require('chromedriver');
const webdriver = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const assert = require('assert');

describe('webdriver', () => {
    let driver;
    before(async () => {
      driver = new webdriver.Builder().forBrowser('chrome')
      .build();
     
      await driver.get(`http://localhost:3000/`);
    }, 30000);
  
    after(async () => {
      await driver.quit();
    }, 40000);
  
    it('test hello world', async () => {
    
        await driver.findElement (By.xpath ("//*[contains(text(),'Hola Mundo!')]"));
        
    }, 35000);
  });