import { categories } from '../utils/dataUtils';

export type CategoryType =
  | (typeof categories.income)[number]
  | (typeof categories.expense)[number];
export type TransactionWithoutId = {
  date: Date;
  description: string;
  category: CategoryType;
  type: 'Income' | 'Expense';
  amount: number;
};
type Transaction = TransactionWithoutId & {
  id: string;
};

export type TransactionType = 'Income' | 'Expense';

export default Transaction;
