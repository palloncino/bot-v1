const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

async function startBot() {
  
  try {

    const driver = await new webdriver.Builder().forBrowser("chrome").build();

    await driver.get("http://www.google.com");

    const agreetermsAndConditionsButton = await driver.findElement(By.xpath(`//*[@id="L2AGLb"]/div`))

    agreetermsAndConditionsButton.click();

  } catch (error) {

    console.log('ERROR', error);

  }
}

startBot()