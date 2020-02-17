@positive @regression
Feature: validating that update button updates the current record
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: validating that update buttons updates tue current record
 
    Given the user clicks on a record in the table
    And the user clicks the update button
    And the user enters a new amount for the record
    Then the user should see the updated number show up for the record
