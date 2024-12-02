export const getFinancialSummary = function (data) {
  if (!data) {
    console.error("data can't be null");
    return { totalSaving: 0, totalExpenses: 0, totalIncomes: 0 };
  }
  let totalExpenses = 0;
  let totalIncomes = 0;
  data.forEach((el) => {
    if (!el.type) return;
    if (el.type === 'Income') {
      totalIncomes += el.amount;
    } else {
      totalExpenses += el.amount;
    }
  });
  let totalSaving = totalIncomes - totalExpenses;
  return { totalSaving, totalExpenses, totalIncomes };
};

export const calcPercentage = function (val, total) {
  if (!val) {
    console.error("value can't be null");
    return -1;
  }
  if (!total) {
    console.error("total can't be null");
    return -1;
  }
  if (val > total) {
    console.error("val can't be greater than total");
    return -1;
  }
  return +((val / total) * 100).toFixed(2);
};
