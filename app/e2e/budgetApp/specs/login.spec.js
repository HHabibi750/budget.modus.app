const helper = require('../../lib/common/helper');
const config = new (require('../config'))();
// const homePage = new (require('../../lib/page-objects/login-page-objects'))();

describe('verify we are connected to the app', function() {
    // this.retries(CONSTANTS.AUTO_TEST_REPETITIONS);
    before(async () => {
        console.log('Starting the spec file');
    });

    it('click on the budget button', () => {
        browser.waitForAngularEnabled(false);
        // browser.get('https://budget.modus.app/budget');
        browser.get(config.budgetApp.url);
        // return helper.clickElement(homePage.budgetButton);
    });

});
