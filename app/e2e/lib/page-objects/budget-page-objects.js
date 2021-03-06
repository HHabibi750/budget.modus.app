const BudgetPage = function() {
  this.budgetButton = element(by.cssContainingText('a[class="_3k5Wa _1ZQm-"]', 'Budget'));
  this.reportsButton = element(by.cssContainingText('a[class="_3k5Wa"]', 'Reports'));
  this.reportTable = element(by.css('tbody'));
  this.categories = element(by.xpath('//td/div[text()="Category"]/following-sibling::div'));
  this.descriptions = element(by.xpath('//td/div[text()="Description"]/following-sibling::div'));
  this.amounts = element(by.xpath('//td/div[text()="Amount"]/following-sibling::div'));
  this.totalInflow = element(by.xpath('//div[text()="Total Inflow"]/preceding-sibling::div'));
  this.totalOutflow = element(by.xpath('//div[text()="Total Outflow"]/preceding-sibling::div'));
  this.workingBalance = element(by.xpath('//div[text()="Working Balance"]/preceding-sibling::div'));
  this.categoryDropdown = element(by.css('select[name="categoryId"]'));
  this.categoryOptions = $$('select[name="categoryId"] option').get(2);
  this.descriptionTextbox = element(by.css('input[name="description"]'));
  this.amountTextbox = element(by.css('input[name="value"]'));
  this.addButton = element(by.css('button[type="submit"]'));
  this.negativeTableValues = $$('td.MBPvA');
  this.positiveTableValues = $$('td._3XkHf');
};
module.exports = BudgetPage;
