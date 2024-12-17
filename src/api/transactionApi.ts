import axios from 'axios';
import Transaction from '../models/transaction';

const url = import.meta.env.VITE_API_URL;
export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<Transaction[]>(
      `${url}/api/v1/transactions`
    );
    const transactions: Transaction[] = response.data.map((transaction) => {
      return { ...transaction, date: new Date(transaction.date) };
    });
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
