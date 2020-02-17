const helper = require('../../lib/common/helper');
const config = new (require('../config'))();
const budgetPage = new (require('../../lib/page-objects/budget-page-objects'))();

const expect = chai.expect;

const itemDescription = 'dinner with friends';
const itemAmount = 400;

describe('verify that the add button adds new item to the table on the budget tab', () => {
  // this.retries(CONSTANTS.AUTO_TEST_REPETITIONS);
  before(async () => {
    browser.waitForAngularEnabled(false);
    browser.get(config.budgetApp.url);
    helper.waitForElementToBeVisible(budgetPage.budgetButton);
  });

  it('the user selects the item category', async () => {
    await helper.waitForElementToBeVisible(budgetPage.categoryDropdown);
    await helper.clickVisibleElement(budgetPage.categoryDropdown);
    await helper.clickElement(budgetPage.categoryOptions);
  });

  it('the user enters a description for the item', async () => {
    await helper.clickElement(budgetPage.descriptionTextbox);
    await helper.replaceInputValue(budgetPage.descriptionTextbox, '', itemDescription);
  });

  it('the user enters the amount of the expense', async () => {
    await helper.replaceInputValue(budgetPage.amountTextbox, '', itemAmount);
    await helper.waitForElementToBeClickable(budgetPage.addButton);
  });

  it('the user clicks the add button and verifies that the item has been added to the table', async () => {
    await helper.clickElement(budgetPage.addButton);
    const tableContent = await budgetPage.reportTable.getText();
    expect(tableContent).to.include(itemDescription) && expect(tableContent).to.include(itemAmount);
  });
});
