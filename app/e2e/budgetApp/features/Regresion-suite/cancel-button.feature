@positive @regression
Feature: validating that cancel button cancels the updating process of a record
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: validating that cancel button cancels the updating process of a record
 
    Given the user clicks on a record in the table
    And the user clicks the cancel button
    Then the user should see no change in the record
