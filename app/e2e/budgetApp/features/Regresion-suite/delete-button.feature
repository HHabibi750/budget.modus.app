@positive @regression
Feature: validating that delete button omits a record
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: validating that delete button omits a record
 
    Given the user clicks on a record in the table
    And the user clicks the delete
    Then the user should no longer see that record