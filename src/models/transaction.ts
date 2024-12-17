import { categories } from '../utils/dataUtils';

export type TransactionWithoutId = {
  date: Date;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
};
type Transaction = TransactionWithoutId & {
  id: string;
};

export type TransactionType = 'Income' | 'Expense';

export default Transaction;
