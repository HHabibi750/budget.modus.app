# Framework Introduction
In order to test this application, I have implemented a selenium based framework with Mocha and protractor. I have used chai assertion libraries for the final assertion and validations.
I am using protractor despite the fact that it is not an angular application because I believe it handles the waits for the page loads very well and it also has great integration with Mocha and selenium. 

Although Mocha is best for unit and integration tests but I have customized it so each 'It' is a test step with a describe NOT a standalone test case. I am includign the final chai assertion and validation in the last 'It. This implementation gives my custom framework a Cucumber like functionality where in the log each It that passes clearly prints as passed and since there is only one or a few action in each 'It' it is much easier to debug if there is a test failure or if there is actually a bug in the application it is much easier to trace.

# Environment setup
You would need node.js and JDK to run this framework.

The following npm libraries are needed in order to run this framework locally.

npm install mochawesome-extended 
npm install mochawesome-screenshots
npm install chai
npm install chai-as-promised
npm install chai-smoothie

I have added these under the dev-dependencies in the package.json file.

# How to Execute the tests
The tests could be executed with running this command. 

- npm run e2eTest

I have added this command in the package.json file. This command runs the app/e2e/conf.js file that sets all the settings for the framework. 
You can chose which tests to run from the index.js file. You can comment out the ones  you don't want to run. By default all test files required in the index.js file will be run. 

Please note that for the first time execution you will need to run, the following commands to start the selenium server and get the necessary binaries:

- npm run webdriver-update
- npm run pree2e


# Reporting
I am using "mochawecome" library for the reporting purposes. Mochawesome is avialable through npm and it create wonderful HTML reports and screenshorts that saves automatically after each run in the e2e/reports folder. I have included this folder in the .gitignore file so the reports only stays local.

# Framework structure
The framework design is very user friendly. Pursuant to the requirements, I have created an e2e folder in the top most directory of the cloned project that contains everything. This folder has three sub folders that are namely 'budgetApp', 'lib' and 'reports'. The 'budgetApp' folder has the spec folder where all the Mocha Test cases are. I have written three test cases for the purposes of this exercise that can be sucessfully executed.

 - lib folder includes the constant global variables, and helper methods used accross the project;
 - page objects folder: has all the locators for each page
 - reports folder will save the html report for each run
 - configurations could include to local configuration for each test engineer if this project were to scale;

# Cucumber Integration
I have added the following library for incorporting cucumber into the framework as can be seen in the package.json:
"protractor-cucumber-framework": "^6.2.0"

PLEASE NOTE THAT NONE OF THE FEATURE FILES HAVE STEP DEFINITIONS ADDED FOR THEM SO THEY WON'T RUN AT THIS TIME. I HAVE WRITTEN MY SOLUTION FOR THIS EXERCIZE IN MOCHA. I HAVE CUSTOMIZED MY SOLUTION TO GIVE IT A CUCUMBER LIKE FLAVOR. I CAN TALK MORE ABOUT THIS DURING THE INTERVIEW.

However I have only written the feature files for the test cases that we could implement. I am very familiar with the Gherkin syntax and how cucumber works, 
In the interest of time, I have not written the step definitions for any tests as I would need to modify the conf.js file for that to add the cucumber options an setup.

# Testing Scope
The automated tests that I have written comprise a subset of the smoke suite for the applicaion. I am testing the major functionalities for the application such as:
- the ability to add new budget item
- the basic arithmitcs and computations for the totals
- the coherence of the two tabs in the application

THE FOLLOWING TEST validating-numbers-between-tabs-spec IS A NEGATIVE TEST THAT I HAVE ADDED TO THE SMOKE SUITE AS PER THE REQUIREMENT OF THE EXERCISE. I AM INTENTIONALLY FAILING THIS TEST AT THE VERY FINAL STEP. It fails at the very last assertion. The numbers on both tabs should always be equal. In my assertion I am asserting that they are not equal in the statement below:
"expect(totalOutflowBudgetTab).to.not.equal(totalOutflowReportsTab);" hence it fails.

I have included in the gherkin syntax in the cucumber feature file the other potential test cases that could be automated that could make a bigger regression suite for the application and provide more thorough testing. Please note that this list is not comprehensive but it attempts to show my ability to test this applicaiton. I can talk more about how I can scale the testing to provide a full test coverage during the interview.

# Test cases

The test cases for this particular exercise could be found in the e2e/budgetApp/features folder in gherkin sytax.





