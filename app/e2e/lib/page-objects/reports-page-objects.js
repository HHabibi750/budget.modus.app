const ReportsPage = function() {
  this.inflowOutflowTab = element(by.xpath('//a[text()="Inflow vs Outflow"]'));
  this.spendingTab = element(by.xpath('//a[text()="Spending by Category"]'));
  this.totalInflow = $$('text._1UVu9').get(0);
  this.totalOutflow = $$('text._1UVu9').get(1);
  this.totalOutflow = element(by.css('svg._27stx'));
};
module.exports = ReportsPage;
