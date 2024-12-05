import { v4 as uuidv4 } from 'uuid';
import { calcPercentage } from './currencyUtils';
import stc from 'string-to-color';
import Transaction, { TransactionType } from '../models/transaction';

const Month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
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

// creating data format for transaction object
export const createData = function (
  id: string,
  date: string,
  description: string,
  category: string,
  type: TransactionType,
  amount: number
): Transaction {
  if (!id || !date || !description || !category || !type || !amount) {
    throw new Error(
      'Missing or invalid arguments for creating transaction data'
    );
  }
  const dateObj: Date = new Date(date);
  if (isNaN(dateObj.getTime())) throw new Error('Invalid date format');
  return { id, date: dateObj, description, category, type, amount };
};

// columns for transaction table
export const getColumns = function () {
  return ['Id', 'Date', 'Description', 'Category', 'Type', 'Amount'];
};

// filtering transactions by types
type TransactionFilter = 'All' | 'Income' | 'Expense';
export const filterData = function (
  data: Transaction[],
  name: TransactionFilter
) {
  if (name === 'All') return data;
  return data.filter((item) => item.type === name);
};

// sorting transaction based on date or id
export const sortDataBy = function (
  data: Transaction[],
  col: 'date' | 'id' = 'id'
) {
  const newData = [...data];
  if (col === 'date') {
    newData.sort((a, b) => {
      return a[col].getTime() - b[col].getTime();
    });
  } else {
    newData.sort((a, b) => {
      return a[col].localeCompare(b[col]);
    });
  }
  return newData;
};

// get monthly expenses data for bar chart
type MonthType = (typeof Month)[number];
export type MonthlyExpenses = {
  value: number;
  month: MonthType;
};
export const getMonthlyExpenses = function (
  data: Transaction[]
): MonthlyExpenses[] {
  if (!data) {
    console.error("data can't be null");
    return [];
  }
  let result: MonthlyExpenses[] = [];
  for (const month of Month) {
    const expenses: MonthlyExpenses = { value: 0, month };
    result.push(expenses);
  }
  for (const item of data) {
    if (item.type === 'Income') continue;
    result[item.date.getMonth()].value += item.amount;
  }
  return result;
};

// get expenses for chart
export type ExpensesChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
};
export const getExpensesChartData = function (
  data: Transaction[],
  totalVal: number
): ExpensesChartData[] {
  let result: ExpensesChartData[] = [];
  if (!data || !totalVal) {
    console.error('Missing argument');
    return result;
  }
  if (totalVal <= 0) {
    console.error('invalid total value');
    return result;
  }
  let categories = data.reduce((prev: any, curr) => {
    if (curr.type === 'Income') return prev;
    const category: string = curr.category;
    if (!(category in prev)) {
      prev[category] = curr.amount;
    } else {
      prev[category] += curr.amount;
    }
    return prev;
  }, {});

  for (const [key, value] of Object.entries(categories)) {
    if (typeof value === 'number')
      result.push({
        id: uuidv4(),
        label: key,
        value: calcPercentage(value, totalVal),
        color: stc(key),
      });
  }
  return result;
};
