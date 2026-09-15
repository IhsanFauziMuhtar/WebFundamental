const { Builder, By, until, Options } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome')


describe("Add User Feature Test", function () {
  this.timeout(60000);

  let driver;

  before(async function () {
    let Options = new chrome.Options();
    Options.addArguments("--headless")
    driver = await new Builder().forBrowser("firefox").setChromeOptions(Options).build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("Should successfully add a new user and display toast notification", async function () {

    await driver.get("https://belajar-bareng.onrender.com/");

    let usernameInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="username-input"]')), 
      30000
    );
    let passwordInput = await driver.findElement(By.css('[data-testid="password-input"]'));
    let loginButton = await driver.findElement(By.css('[data-testid="login-button"]'));

    await usernameInput.sendKeys("admin");
    await passwordInput.sendKeys("admin");
    await loginButton.click();

    let addButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="add-button"]')), 
      10000
    );
    await addButton.click();

    let addUsernameInput = await driver.wait(
      until.elementLocated(By.css('[data-testid="username-input"]')), 
      10000
    );
    let addAgeInput = await driver.findElement(By.css('[data-testid="age-input"]'));
    let submitButton = await driver.findElement(By.css('[data-testid="submit-button"]'));

    let isFormVisible = await addUsernameInput.isDisplayed();
    assert.strictEqual(isFormVisible, true, "Form Add Users gagal ditampilkan!");

    await addUsernameInput.sendKeys("messi");
    await addAgeInput.sendKeys("45");
    await submitButton.click();

    let toastElement = await driver.wait(
      until.elementLocated(By.css('#success-added [data-testid="toast-content"]')), 
      10000
    );


    await driver.wait(until.elementIsVisible(toastElement), 5000);

    let toastText = await toastElement.getText();
    console.log("Pesan Toast yang tertangkap:", `"${toastText}"`);

    const isMatched = /User successfully added/i.test(toastText);

    assert.strictEqual(
      isMatched, 
      true, 
      `Pesan toast tidak sesuai! Teks yang didapat: "${toastText}"`
    );
  });
});


// 