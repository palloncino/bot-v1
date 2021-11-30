require('dotenv').config()
const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

const {
  EMAIL_BADOO,
  PASSWORD_BADOO
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

    await driver.get("https://badoo.com/encounters");

    // signin button

    const signInButtonRef = By.xpath(`//*[@id="header"]/div/div[2]/div/div/a`);

    await driver.wait(until.elementLocated(signInButtonRef), 10000);

    let signInButton = driver.findElement(signInButtonRef);

    signInButton.click()

    // seek and fill email input

    let emailInpputRef = By.className(`js-signin-login`);
    
    await driver.wait(until.elementLocated(emailInpputRef), 10000);

    let emailInpput = driver.findElement(emailInpputRef);

    driver.wait(until.elementIsVisible(emailInpput), 10000)

    emailInpput.sendKeys(EMAIL_BADOO);

    await driver.actions().pause(1000).perform();
    
    // seek and fill password input

    let passwordInputRef = By.className(`js-signin-password`);
    
    await driver.wait(until.elementLocated(passwordInputRef), 10000);

    let passwordInput = await driver.findElement(passwordInputRef);

    driver.wait(until.elementIsVisible(passwordInput), 10000)

    passwordInput.sendKeys(PASSWORD_BADOO);

    await driver.actions().pause(1000).perform();

    // click next button

    let loginButtonRef = By.xpath(`/html/body/div[2]/div[1]/div[3]/section/div/div/div[1]/form/div[5]/div/div[1]/button`);
    
    await driver.wait(until.elementLocated(loginButtonRef), 10000);
    
    let loginButton = driver.findElement(loginButtonRef);
    
    driver.wait(until.elementIsVisible(loginButton), 10000)

    loginButton.click();

    await driver.actions().pause(5000).perform();

    // logged in, click first like

    let likeButtonRef = By.xpath(`//*[@id="mm_cc"]/div[1]/section/div/div[2]/div/div[2]/div[1]/div[1]`);

    await driver.wait(until.elementLocated(likeButtonRef), 10000);

    let likeButton = await driver.findElement(likeButtonRef);

    driver.wait(until.elementIsVisible(likeButton), 10000)
    
    likeButton.click();

    // pop up for chorme notifications

    await driver.actions().pause(500).perform();

    const wantToBeNotifiedButtonRef = By.xpath(`/html/body/aside/section/div[1]/div/div/section/div/div/div/div[1]/div`);

    await driver.wait(until.elementLocated(wantToBeNotifiedButtonRef), 10000);
    
    let wantToBeNotifiedButton = await driver.findElement(wantToBeNotifiedButtonRef);

    await driver.wait(until.elementIsVisible(wantToBeNotifiedButton), 10000)
    
    wantToBeNotifiedButton.click();
    
    // now looping likes

    while(true) {

      await driver.actions().pause(1000).perform();

      let likeButtonRef = By.xpath(`//*[@id="mm_cc"]/div[1]/section/div/div[2]/div/div[2]/div[1]/div[1]`);

      await driver.wait(until.elementLocated(likeButtonRef), 10000);

      let likeButton = await driver.findElement(likeButtonRef);

      driver.wait(until.elementIsVisible(likeButton), 10000)
      
      likeButton.click();

    }

  } catch (error) {

    console.log(error)

  }
}

startBot()