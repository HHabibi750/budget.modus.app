const helper = require('../../lib/common/helper');
const config = new (require('../config'))();
const budgetPage = new (require('../../lib/page-objects/budget-page-objects'))();

const expect = chai.expect;

let totalPositive;
let totalNegative;

describe('verify that the values on the table add up to the Total Inflow/Outflow values', () => {
  // this.retries(CONSTANTS.AUTO_TEST_REPETITIONS);
  before(async () => {
    browser.waitForAngularEnabled(false);
    browser.get(config.budgetApp.url);
    helper.waitForElementToBeVisible(budgetPage.budgetButton);
  });

  it('the user adds up the positive and negative values', async () => {
    const positiveValues = await budgetPage.positiveTableValues.getText();
    const negativeValues = await budgetPage.negativeTableValues.getText();
    totalPositive = await helper.addNumbers(positiveValues);
    totalNegative = await helper.addNumbers(negativeValues);
  });

  it('the user validates that the total positive values equal total inflow number shown on the app', async () => {
    const totalInflow = await budgetPage.totalInflow.getText();
    const totalInflowFormatted = await helper.removeDollarSign(totalInflow);
    expect(totalPositive).to.equal(totalInflowFormatted);
  });

  it('the user validates that the total negative values equal total inflow number shown on the app', async () => {
    const totalOutflow = await budgetPage.totalOutflow.getText();
    let totalOutflowFormatted = await helper.removeDollarSign(totalOutflow);
    totalOutflowFormatted = -Math.abs(totalOutflowFormatted);
    expect(totalNegative).to.equal(totalOutflowFormatted);
  });
});
