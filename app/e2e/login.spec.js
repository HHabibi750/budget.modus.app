// const helper = require('../e2e/lib/common/helper');
// const homePage = new (require('../../lib/page-objects/login-page-objects'))();

describe('verify we are connected to the app', function() {
    // this.retries(CONSTANTS.AUTO_TEST_REPETITIONS);
    before(async () => {
        console.log('the file outside the budgetApp folder is running');
    });

    it('click on the budget button', () => {
        browser.waitForAngularEnabled(false);
        browser.get('https://budget.modus.app/budget');
        // return helper.clickElement(homePage.budgetButton);
    });

});
