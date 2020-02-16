const chance = new (require('chance'))();

let inputElementsObject = [];
let until = protractor.ExpectedConditions;
require('./constants');

class helper {
  static waitForElement(elm, timeout = CONSTANTS.MAX_WAIT_FOR_ELEMENT, retryCount = 0) {
    return browser.wait(() => elm.isPresent(), timeout, `Element ${elm} was not found within ${timeout} milliseconds.`)
      .catch(async () => {
        retryCount++;
        if (retryCount < CONSTANTS.AUTO_TEST_REPETITIONS) {
          await browser.refresh();
          return this.waitForElement(elm, timeout, retryCount);
        }
        return Promise.reject(new Error(`Element ${elm.locator().toString()} was not found within ${timeout} milliseconds.`));
      });
  }

  static async waitForElementToBeClickable(elm, sleep = 0, retryCount = 0) {
    return browser.wait(
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
        return Promise.reject(new Error(`Element ${elm.locator().toString()} was not found within ${CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT} milliseconds.`));
      });
  }

  static async waitForElementToBeVisible(elm, retryCount = 0) {
    return browser.wait(
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
        return Promise.reject(new Error(`Element ${elm.locator().toString()} was not found within ${CONSTANTS.MAX_TIME_FOR_BROWSER_WAIT} milliseconds.`));
      });
  }
  static waitForElementToBePresent(elm, retryCount = 0) {
    return browser.wait(
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
        return Promise.reject(new Error(`Element ${elm.locator().toString()} is taking too long to appear in the DOM.`));
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

  static async waitAndClick(elm) {
    await this.waitForElementToBeClickable(elm);
    return this.clickElement(elm);
  }

  // This clicks elements with same class one by one.
  static async clickMultipleElementsWithSameClass(elmsToClick) {
    const promises = [];
    await this.waitForElementToBePresent(elmsToClick);
    const elem = await elmsToClick.each;
    promises.push(elem.click(), browser.sleep(500));
    return Promise.all(promises);
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

  static hoverOver(elm) {
    return browser
      .actions()
      .mouseMove(elm)
      .perform();
  }

  static async replaceInputAndSaveValue(inputElement, inputType, params) {
    if (inputType && (typeof params !== 'string' || typeof params !== 'number')) {
      params = chance[inputType](params);
    }
    await inputElement.clear().sendKeys(params);
    return this.setSavedValues(inputElement, params);
  }

  static replaceInputValue(inputElement, inputType, params) {
    if (inputType && (typeof params !== 'string' || typeof params !== 'number')) {
      params = chance[inputType](params);
    }
    return inputElement.clear().sendKeys(params);
  }

  static async setSavedValues(inputElement, params) {
    const id = await inputElement.getAttribute('id');
    return inputElementsObject.push({
      id: id,
      value: params,
    });
  }

  static getSavedValues() {
    return inputElementsObject;
  }

  static clearSavedValues() {
    inputElementsObject = [];
  }

  static clearInput(inputElement) {
    return inputElement.clear();
  }

  static scrollToElement(elem) {
    return browser
      .actions()
      .mouseMove(elem)
      .perform();
  }

  // This will align the top of the element to the top of the visible area.
  static scrollElemFinderIntoView(elem) {
    return browser.executeScript('arguments[0].scrollIntoView(true)', elem);
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

  static async getBrowserInfo() {
    const browserInfo = await browser.getCapabilities();
    return {
      name: browserInfo.get('name') || browserInfo.get('browserName'),
      version: browserInfo.get('version'),
      platform: browserInfo.get('platform'),
    };
  }

  static waitForElementToBeInvisible(element) {
    const EC = protractor.ExpectedConditions;
    return browser.wait(EC.invisibilityOf(element), 10000);
  }

  static getTypeAndValue(field, options) {
    const type = field || field === '' ? '' : CONSTANTS[options.type.toUpperCase()];
    const value = field || field === '' ? field : options;
    return {
      type,
      value,
    };
  }

  static anyTextToBePresentInElement(elementFinder) {
    const EC = protractor.ExpectedConditions;
    const hasText = async () => {
      const actualText = await elementFinder.getText();
      return !!actualText;
    };
    return EC.and(EC.presenceOf(elementFinder), hasText);
  }
}

module.exports = helper;
