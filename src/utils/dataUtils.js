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
  if (!id || !date || !description || !category || !type || !amount) {
    console.error('Missing data');
    return;
  }
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
    return a[col] - b[col];
  });
  return newData;
};
export const getMonthlyExpenses = function (data) {
  if (!data) {
    console.error("data can't be null");
    return;
  }
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
  if (!data || !totalVal) {
    console.error('Missing argument');
    return [];
  }
  if (totalVal <= 0) {
    console.error('invalid total value');
    return [];
  }
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
export const categories = {
  expense: [
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
  ],
  income: [
    'Salary/Wages',
    'Freelance/Contract Income',
    'Business Revenue',
    'Investments',
    'Dividends',
    'Capital Gains',
    'Rental Income',
    'Royalties',
    'Gifts/Donations Received',
    'Pension/Retirement Income',
    'Social Security',
    'Bonuses',
    'Grants/Scholarships',
    'Tax Refunds',
    'Side Hustle/Part-Time Work',
    'Stock Dividends',
    'Interest Income (Savings/Fixed Deposits)',
    'Cryptocurrency Earnings',
    'Mutual Fund Payouts',
    'Product Sales',
    'Service Revenue',
    'Consultation Fees',
    'Project Milestone Payments',
    'Lottery Winnings',
    'Inheritance',
    'Insurance Payouts',
    'Refunds (Overpayments, Utility, etc.)',
    'Found Money',
    'Affiliate Marketing Revenue',
    'Ad Revenue (YouTube, Blogs)',
    'Streaming Income (Twitch, Patreon)',
    'E-commerce Sales',
    'Crowdfunding Contributions',
    'Miscellaneous',
  ],
};
