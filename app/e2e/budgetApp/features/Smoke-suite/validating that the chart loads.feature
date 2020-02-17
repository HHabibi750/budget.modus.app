@smoke @positive @regression
Feature: validating that donut chart loads in the reports tab under spending by category tab
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: verify that chart loads once the user opens the spending by category tab
 
    Given the user navigates to the reports tab
    And the user navigates to the spending by category tab
    And the user validates the dount loads within a reasonable time-frame