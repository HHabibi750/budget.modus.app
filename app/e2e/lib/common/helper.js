const chance = new (require('chance'))();

let inputElementsObject = [];
const until = protractor.ExpectedConditions;
require('./constants');

class helper {
  static waitForElement(elm, timeout = CONSTANTS.MAX_WAIT_FOR_ELEMENT, retryCount = 0) {
    return browser
      .wait(() => elm.isPresent(), timeout, `Element ${elm} was not found within ${timeout} milliseconds.`)
      .catch(async () => {
        retryCount++;
        if (retryCount < CONSTANTS.AUTO_TEST_REPETITIONS) {
          await browser.refresh();
          return this.waitForElement(elm, timeout, retryCount);
        }
        return Promise.reject(
          new Error(`Element ${elm.locator().toString()} was not found within ${timeout} milliseconds.`)
        );
      });
  }

  static async waitForElementToBeClickable(elm, sleep = 0, retryCount = 0) {
    return browser
      .wait(
        until.elementToBeClickable(elm),
        CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT + sleep,
        `Element ${elm.locator().toString()} was not found within ${CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT} milliseconds`
      )
      .catch(async () => {
        retryCount++;
        if (retryCount < CONSTANTS.AUTO_TEST_REPETITIONS) {
          await browser.refresh();
          return this.waitForElementToBeClickable(elm, sleep, retryCount);
        }
        return Promise.reject(
          new Error(
            `Element ${elm.locator().toString()} was not found within ${
            CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT
            } milliseconds.`
          )
        );
      });
  }

  static async waitForElementToBeVisible(elm, retryCount = 0) {
    return browser
      .wait(
        until.visibilityOf(elm),
        CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT,
        `Element ${elm.locator().toString()} was not found within ${CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT} milliseconds.`
      )
      .catch(async () => {
        retryCount++;
        if (retryCount < CONSTANTS.AUTO_TEST_REPETITIONS) {
          await browser.refresh();
          return this.waitForElementToBeVisible(elm, retryCount);
        }
        return Promise.reject(
          new Error(
            `Element ${elm.locator().toString()} was not found within ${
            CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT
            } milliseconds.`
          )
        );
      });
  }

  static waitForElementToBePresent(elm, retryCount = 0) {
    return browser
      .wait(
        until.presenceOf(elm),
        CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT,
        `Element ${elm.locator().toString()} is taking too long to appear in the DOM`
      )
      .catch(async () => {
        retryCount++;
        if (retryCount < CONSTANTS.AUTO_TEST_REPETITIONS) {
          await browser.refresh();
          return this.waitForElementToBePresent(elm, retryCount);
        }
        return Promise.reject(
          new Error(`Element ${elm.locator().toString()} is taking too long to appear in the DOM.`)
        );
      });
  }

  // This clicks an elements.  If the element is unique, then you do not need to pass in a position,
  // if it is not unique, then it will pick the first one, unless a position is passed in.  The position
  // is not 0 based.
  static clickElement(elmToClick, position) {
    let typeOfElm;
    position = typeof position === 'undefined' ? 0 : position - 1;

    return this.waitForElement(elmToClick).then(async () => {
      const elmText = await elmToClick.getText();
      typeOfElm = typeof elmText;
      if (typeOfElm == 'object') {
        return elmToClick.get(position).click();
      }
      return elmToClick.click();
    });
  }


  // This clicks an elements.  If the element is unique, then you do not need to pass in a position,
  // if it is not unique, then it will pick the first one, unless a position is passed in.  The position
  // is not 0 based.
  static async clickVisibleElement(elmToClick, position) {
    let typeOfElm;
    const elmText = await elmToClick.getText();
    typeOfElm = typeof elmText;
    position = typeof position === 'undefined' ? 0 : position - 1;
    await this.waitForElementToBeVisible(elmToClick);
    if (typeOfElm == 'object') {
      return elmToClick.get(position).click();
    }
    return elmToClick.click();
  }




  static replaceInputValue(inputElement, inputType, params) {
    if (inputType && (typeof params !== 'string' || typeof params !== 'number')) {
      params = chance[inputType](params);
    }
    return inputElement.clear().sendKeys(params);
  }

  // Wait for the URL to NOT contain urlShouldNotExit
  static waitForUrlToChange(urlShouldNotExit) {
    return browser.wait(async () => {
      const url = await browser.getCurrentUrl();
      return !url.includes(urlShouldNotExit);
    }, 10000);
  }

  static async waitForUrlToHave(expectedUrl) {
    return browser.wait(async () => {
      const url = await browser.getCurrentUrl();
      return url.includes(expectedUrl);
    });
  }


  static removeDollarSign(formattedNumber) {
    const intValue = parseFloat(
      formattedNumber
        .toString()
        .replace('$', '')
        .replace(/,/, '')
    );
    return intValue;
  }

  static addNumbers(array) {
    let sum = 0;
    let intValue = 0;
    for (let i = 0; i < array.length; i++) {
      intValue = helper.removeDollarSign(array[i]);
      sum += parseFloat(intValue);
    }
    return sum;
  }

}

module.exports = helper;
