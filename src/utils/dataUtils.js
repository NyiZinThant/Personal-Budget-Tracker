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

export const getExpensesChartData = function (data, totalVal) {
  let result = [];
  let categories = data.reduce((prev, curr) => {
    if (curr.type === 'Income') return prev;
    if (!prev[curr.category]) {
      prev[curr.category] = curr.amount;
      console.log(prev, curr);
    } else {
      prev[curr.category] += curr.amount;
      console.log(prev, curr);
    }
    return prev;
  }, {});
  console.log(categories);
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
