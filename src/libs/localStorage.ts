import Transaction, { TransactionWithoutId } from '../models/transaction';
import { v4 as uuidv4 } from 'uuid';
export const getStoredTransactions = function (): Transaction[] {
  const storedTransactions = localStorage.getItem('transactions') || '';
  try {
    let transactions: Transaction[] = JSON.parse(storedTransactions) || [];
    return transactions.map((transaction) => {
      return { ...transaction, date: new Date(transaction.date) };
    });
  } catch (e) {
    console.error('Failed to parse transactions from localstorage: ', e);
    return [];
  }
};

export const storeTransactions = function (newTransactions: Transaction[]) {
  if (!newTransactions) {
    console.error("New transactions can't be empty");
    return;
  }
  localStorage.setItem('transactions', JSON.stringify(newTransactions));
};

export const getTransactions = async function (): Promise<Transaction[]> {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return getStoredTransactions();
};

export const addTransaction = async function (
  data: TransactionWithoutId
): Promise<Transaction[]> {
  const id = uuidv4();
  const transactions = await getTransactions();
  const newTransactions = [
    ...transactions,
    {
      id,
      ...data,
    },
  ];
  storeTransactions(newTransactions);
  return newTransactions;
};
