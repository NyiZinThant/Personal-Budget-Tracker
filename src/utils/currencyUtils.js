export const getFinancialSummary = function (data) {
  let totalExpenses = 0;
  let totalIncomes = 0;
  for (let el of data) {
    if (el.type === 'Income') {
      totalIncomes += el.amount;
    } else {
      totalExpenses += el.amount;
    }
  }
  let totalSaving = totalIncomes - totalExpenses;
  return { totalSaving, totalExpenses, totalIncomes };
};
