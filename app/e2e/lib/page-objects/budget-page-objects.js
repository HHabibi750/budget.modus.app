'use strict';

const BudgetPage = function() {
    this.budgetButton = element(by.cssContainingText('a[class="_3k5Wa _1ZQm-"]', 'Budget'));
    this.reportsButton = element(by.cssContainingText('a[class="_3k5Wa"]', 'Budget'));
    this.reportTable = element(by.css('tbody'));
    this.categories = element(by.xpath('//td/div[text()="Category"]/following-sibling::div'));
    this.descriptions = element(by.xpath('//td/div[text()="Description"]/following-sibling::div'));
    this.amounts = element(by.xpath('//td/div[text()="Amount"]/following-sibling::div'));
    this.totalInFlow = element(by.xpath('//div[text()="Total Inflow"]/preceding-sibling::div'));
    this.totalOutFlow = element(by.xpath('//div[text()="Total Outflow"]/preceding-sibling::div'));
    this.workingBalance = element(by.xpath('//div[text()="Working Balance"]/preceding-sibling::div'));
    this.categoryDropdown = element(by.css('select[name="categoryId"]'));
    this.categoryOptions = $$('select[name="categoryId"] option').get(2);
    this.descriptionTextbox = element(by.css('input[name="description"]'));
    this.amountTextbox = element(by.css('input[name="value"]'));
    this.addButton = element(by.css('button[type="submit"]'));
    this.negativeTableValues = element(by.css('td.MBPvA'));
    this.positiveTableValues = element(by.css('td._3XkHf'));




};
module.exports = BudgetPage;
