@smoke @positive @regression
Feature: verify that the add button adds new item to the table on the budget tab
 
 Background: the user navigates to the application URL
  And the user waits for the anchor icon to apear

    Scenario: the add button becomes clickable once the item type, desciption and amount is entered and it adds the item to the table
 
    Given the user selects the item category
    And Start to type your And step here the user enters a description for the item
    And the user enters the amount of the expense
    Then the user clicks the add button and verifies that the item has been added to the table