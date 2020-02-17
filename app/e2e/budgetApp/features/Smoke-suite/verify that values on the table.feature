@smoke @negative @regression
Feature: validating the numbers accuracy of the table
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: verify that the values on the table add up to the Total Inflow/Outflow values
 
    Given the user the user adds up the positive and negative values
    And the user navigates to the reports tab
    And the user validates that the total positive values equal total inflow number shown on the app
    Then the user validates that the total negative values equal total inflow number shown on the app