@positive @regression
Feature: validating that both inflow and outflow and spending by category charts show the same spending categories
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: validating that the spending categories match
 
    Given the user navigates to the inflow tab
    And the user saves the spending categories in the tab
    And the user navigates to the Ppending by Categories tab
    Then the user verifies that the categories match with the previous tab