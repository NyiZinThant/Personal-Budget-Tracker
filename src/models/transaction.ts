import { categories } from '../utils/dataUtils';

export type TransactionWithoutId = {
  transaction_date: Date;
  description: string;
  categories: {
    name: string;
  };
  type: TransactionType;
  amount: number;
};
type Transaction = TransactionWithoutId & {
  id: string;
};

export type TransactionType = 'Income' | 'Expense';

export default Transaction;
