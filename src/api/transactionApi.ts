import axios from 'axios';
import Transaction, { TransactionWithoutId } from '../models/transaction';
import axiosInstance from '../axioConfig';

const url = import.meta.env.VITE_API_URL;
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axiosInstance.get<Transaction[]>(`transactions`);
    const transactions: Transaction[] = response.data.map((transaction) => {
      return { ...transaction, date: new Date(transaction.transaction_date) };
    });
    console.log(transactions);

    return transactions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);
    } else {
      console.error(error);
    }
    return [];
  }
};

export const addTransaction = async function (
  newTransaction: TransactionWithoutId
): Promise<Transaction[]> {
  try {
    await axiosInstance.post(`transactions`, {
      ...newTransaction,
      date: newTransaction.transaction_date.toISOString().split('T')[0],
    });
    console.log(newTransaction);

    return await getTransactions();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.code, error.message);
    } else {
      console.error(error);
    }
    return [];
  }
};
