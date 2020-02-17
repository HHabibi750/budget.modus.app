const helper = require('../../lib/common/helper');
const config = new (require('../config'))();
const budgetPage = new (require('../../lib/page-objects/budget-page-objects'))();
const reportsPage = new (require('../../lib/page-objects/reports-page-objects'))();

const expect = chai.expect;

let totalInflowBudgetTab;
let totalOutflowBudgetTab;
let totalInflowReportsTab;
let totalOutflowReportsTab;


describe.only('verify that the add button adds new item to the table on the budget tab', () => {
  // this.retries(CONSTANTS.AUTO_TEST_REPETITIONS);
  before(async () => {
    browser.waitForAngularEnabled(false);
    browser.get(config.budgetApp.url);
    helper.waitForElementToBeVisible(budgetPage.budgetButton);
  });

  it('the user save the total inflow/outflow amounts on the budget tab', async () => {
    totalInflowBudgetTab = await budgetPage.totalInflow.getText();
    totalOutflowBudgetTab = await budgetPage.totalOutflow.getText();

  });

  it('the user navigates to the reports tab', async () => {
    await helper.clickElement(budgetPage.reportsButton);
    await helper.waitForUrlToHave('/reports/inflow-outflow');

  });

  it('the user reads the values of of the total inflow/outflow on the reports tab', async () => {
    totalInflowReportsTab = await reportsPage.totalInflow.getText();
    totalOutflowReportsTab = await reportsPage.totalOutflow.getText();
  });

  it('the verifies that the values match', async () => {
    expect(totalInflowBudgetTab).deep.equal(totalInflowReportsTab);
    expect(totalOutflowBudgetTab).deep.equal(totalOutflowReportsTab);

  });
});
