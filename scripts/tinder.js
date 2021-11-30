require('dotenv').config()
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const {
  PHONE_NUMBER,
} = process.env;

async function startBot() {
  
  try {

    // Build driver

    const driver = await new webdriver.Builder().forBrowser("chrome").build();

    // Go to google

    await driver.get("http://www.google.com");

    // Select "terms and conditions" pop up

    const agreetermsAndConditionsButton = await driver.findElement(By.xpath(`//*[@id="L2AGLb"]/div`))
    
    agreetermsAndConditionsButton.click();

    await driver.get("https://tinder.com/app/recs");

    // signin button

    const signInButtonRef = By.xpath(`//*[@id="c-13730025"]/div/div[1]/div/main/div[1]/div/div/div/div/header/div/div[2]/div[2]/a`);

    await driver.wait(until.elementLocated(signInButtonRef), 10000);

    let signInButton = driver.findElement(signInButtonRef);

    signInButton.click()

    // login with phone number

    const loginWithPhoneNumberButtonRef = By.xpath(`//*[@id="c207610411"]/div/div/div[1]/div/div[3]/span/div[3]/button`);

    await driver.wait(until.elementLocated(loginWithPhoneNumberButtonRef), 10000);

    let loginWithPhoneNumberButton = driver.findElement(loginWithPhoneNumberButtonRef);

    loginWithPhoneNumberButton.click()

    // seek and fill phone number input

    let phoneNumberInputRef = By.xpath(`//*[@id="c207610411"]/div/div/div[1]/div[2]/div/input`);
    
    await driver.wait(until.elementLocated(phoneNumberInputRef), 10000);

    let phoneNumberInput = driver.findElement(phoneNumberInputRef);

    driver.wait(until.elementIsVisible(phoneNumberInput), 10000)

    phoneNumberInput.sendKeys(PHONE_NUMBER);

    await driver.actions().pause(30000).perform();

    // you have 30 seconds for 
    // - receiving the text code
    // - insert the code
    // - click continue

    // TODO

  } catch (error) {

    console.log(error)

  }
}

startBot()