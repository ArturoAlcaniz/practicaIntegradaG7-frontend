import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';

//const webdriver = require("selenium-webdriver");
var assert = import('assert')
const driver = new webdriver.Builder().forBrowser("chrome").build();
var value = "";
const mssg = "12345678A"; 
const until = webdriver.until;
// Instantiate a web browser page
const By = webdriver.By; // Locator utility to describe a query for a WebElement
driver.navigate().to("http://localhost:3000/appointment")
.then(() => driver.findElement(By.id("DNI"))) //Find textbox
.then(element => element.textContent = mssg) //Type 'mssg' into textbox (the DNI)
.then(() => driver.findElement(By.id("SubmitButton")).click()) //Click the button to ask for an appointment
.then(() => driver.wait(until.elementTextContains(driver.findElement(By.id("txtSuccess")), ':'))) //Wait until the text that displays the assigned date populates
.then(() => value = driver.findElement(By.id("txtSuccess")).textContent)
.then(() => assert(value.includes(mssg))); //Assert wether the message includes the DNI of the textbox (everything went fine)
