@smoke @positive @regression
Feature: Validating that the values match across different tabs
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: the user verifies that the totals on both budget tab and report tab matches
 
    Given the user save the total inflow/outflow amounts on the budget tab (44ms)
    And the user navigates to the reports tab (150ms)
    And the user reads the values of of the total inflow/outflow on the reports tab (60ms)
    Then the user verifies that the values match