import { v4 as uuidv4 } from 'uuid';
import { calcPercentage } from './currencyUtils';
import stc from 'string-to-color';

export const createData = function (
  id,
  date,
  description,
  category,
  type,
  amount
) {
  date = new Date(date);
  return { id, date, description, category, type, amount };
};

export const getColumns = function () {
  return ['Id', 'Date', 'Description', 'Category', 'Type', 'Amount'];
};

export const filterData = function (data, name) {
  if (name === 'All') return data;
  return data.filter((item) => item.type === name);
};

export const sortDataBy = function (data, col = 'id') {
  const newData = [...data];
  newData.sort((a, b) => {
    console.log(a[col], col);
    return a[col] - b[col];
  });
  return newData;
};
export const getMonthlyExpenses = function (data) {
  const result = [
    {
      value: 0,
      month: 'Jan',
    },
    {
      value: 0,
      month: 'Feb',
    },
    {
      value: 0,
      month: 'Mar',
    },
    {
      value: 0,
      month: 'Apr',
    },
    {
      value: 0,
      month: 'May',
    },
    {
      value: 0,
      month: 'June',
    },
    {
      value: 0,
      month: 'July',
    },
    {
      value: 0,
      month: 'Aug',
    },
    {
      value: 0,
      month: 'Sept',
    },
    {
      value: 0,
      month: 'Oct',
    },
    {
      value: 0,
      month: 'Nov',
    },
    {
      value: 0,
      month: 'Dec',
    },
  ];
  for (const item of data) {
    if (item.type === 'Income') continue;
    result[item.date.getMonth()].value += item.amount;
  }
  return result;
};

export const getExpensesChartData = function (data, totalVal) {
  let result = [];
  let categories = data.reduce((prev, curr) => {
    if (curr.type === 'Income') return prev;
    if (!prev[curr.category]) {
      prev[curr.category] = curr.amount;
    } else {
      prev[curr.category] += curr.amount;
    }
    return prev;
  }, {});
  for (const [key, value] of Object.entries(categories)) {
    result.push({
      id: uuidv4(),
      label: key,
      value: calcPercentage(value, totalVal),
      color: stc(key),
    });
  }
  return result;
};

export const expenseCategories = [
  'Housing',
  'Transportation',
  'FoodAndGroceries',
  'HealthAndWellness',
  'PersonalCare',
  'Entertainment',
  'DebtRepayment',
  'ChildrenAndFamily',
  'Pets',
  'Travel',
  'GiftsAndDonations',
  'Education',
  'Miscellaneous',
  'Other',
];
