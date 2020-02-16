const specs = [
  {
    key: 'BUDGETAPP',
    path: 'budgetApp/specs/index.js',
  },
];

let subject, url;
const now = new Date();
const dateString = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['*.spec.js'],
  baseURL: 'http://localhost:8080/',
  framework: 'mocha',

  onPrepare: function() {
    // Declaring chai here so it can be accessed through out the tests and
    // there is no need to declare it in every test.
    const chai = require('chai');
    chai.use(require('chai-smoothie'));
    const chaiAsPromised = require('chai-as-promised');
    const chaiSmoothie = require('chai-smoothie');
    chai.use(chaiAsPromised);
    chai.use(chaiSmoothie);
    global.chai = chai;
    browser.manage().deleteAllCookies();
    browser.driver
      .manage()
      .window()
      .setSize(1680, 1023);

    browser.getProcessedConfig().then(config => {
      const specPath = config.specs[0].replace(`${__dirname}/`, '');
      const specObj = specs.find(obj => obj.path === specPath);
      subject = ` (${specObj.key})`;
    });
  },

  afterEach: function() {
    browser.driver.close();
  },

  mochaOpts: {
    timeout: 1000000,
    reporter: 'mochawesome-screenshots',
    reporterOptions: {
      reportDir: `e2e/reports/${dateString}`, // The directory which stores the reports
      reportName: 'TestExecutionReport',
      reportTitle: 'BudgeApp Reports',
      reportPageTitle: 'customReportPageTitle',
      clearOldScreenshots: false,
      jsonReport: false,
      multiReport: true,
      overwrite: true,
      runPercentage: true,
    },
  },
  specs: specs.map(spec => spec.path),
};
