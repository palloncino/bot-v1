require('dotenv').config()
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const {
  EMAIL,
  PASSWORD
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

    await driver.get("https://antonioguiotto.com");

    // create reference to selector, select once is visible, select "signin"

    const signInButtonRef = By.xpath(`//*[@id="root"]/div/div/div[1]/div[3]/div/div[2]/div/div/button`);

    await driver.wait(until.elementLocated(signInButtonRef), 10000);

    let signInButton = driver.findElement(signInButtonRef);

    signInButton.click()

    await driver.actions().pause(1000).perform();

    // create reference to selector, select once is visible, select input "email"

    let emailInpputRef = By.xpath(`//*[@id="root"]/div/div/div[1]/div[3]/div/div[2]/div/div[2]/div/div[1]/div[1]/div/div[2]/input`);
    
    await driver.wait(until.elementLocated(emailInpputRef), 10000);

    let emailInpput = driver.findElement(emailInpputRef);

    driver.wait(until.elementIsVisible(emailInpput), 10000)

    emailInpput.sendKeys(EMAIL);

    // click next button

    let nextButton1Ref = By.xpath(`//*[@id="root"]/div/div/div[1]/div[3]/div/div[2]/div/div[2]/div/div[1]/div[2]/button[2]`);
    
    await driver.wait(until.elementLocated(nextButton1Ref), 10000);
    
    let nextButton1 = driver.findElement(nextButton1Ref);
    
    driver.wait(until.elementIsVisible(nextButton1), 10000)

    nextButton1.click();

    await driver.actions().pause(1000).perform();
    
    // second login input: password

    let passwordInputRef = By.xpath(`//*[@id="root"]/div/div/div[1]/div[3]/div/div[2]/div/div[2]/div/div[1]/div[1]/div/div[2]/input`);
    
    await driver.wait(until.elementLocated(passwordInputRef), 10000);

    let passwordInput = await driver.findElement(passwordInputRef);

    driver.wait(until.elementIsVisible(passwordInput), 10000)

    passwordInput.sendKeys(PASSWORD);

    // click next button

    let nextButton2Ref = By.xpath(`//*[@id="root"]/div/div/div[1]/div[3]/div/div[2]/div/div[2]/div/div[1]/div[2]/button[2]`);
    
    await driver.wait(until.elementLocated(nextButton2Ref), 10000);
    
    let nextButton2 = driver.findElement(nextButton2Ref);
    
    driver.wait(until.elementIsVisible(nextButton2), 10000)

    nextButton2.click();

  } catch (error) {

    console.log(error)

  }
}

startBot()