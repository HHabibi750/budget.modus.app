const helper = require('../../lib/common/helper');
const config = new (require('../config'))();
const budgetPage = new (require('../../lib/page-objects/budget-page-objects'))();
const reportsPage = new (require('../../lib/page-objects/reports-page-objects'))();

describe('verify that the add button adds new item to the table on the budget tab', () => {
  // this.retries(CONSTANTS.AUTO_TEST_REPETITIONS);
  before(async () => {
    browser.waitForAngularEnabled(false);
    browser.get(config.budgetApp.url);
    helper.waitForElementToBeVisible(budgetPage.budgetButton);
  });


  it('the user selects the item category', async () => {

  });

  it('the user enters a description for the item', async () => {

  });

  it('the user enters the amount of the expense', async () => {

  });

  it('the user clicks the add button and verifies that the item has been added to the table', async () => {

  });

});
