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

export const calcPercentage = function (val, total) {
  return ((val / total) * 100).toFixed(2);
};
