import { createContext, useContext, useReducer } from 'react';
import { createData } from '../utils/dataUtils';
import { v4 as uuidv4 } from 'uuid';
import { getStoredTransactions, storeTransactions } from '../libs/localStorage';
const TransactionContext = createContext(null);
const TransactionDispatchContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transaction, dispatch] = useReducer(
    transactionReducer,
    getStoredTransactions()
  );
  return (
    <TransactionContext.Provider value={transaction}>
      <TransactionDispatchContext.Provider value={dispatch}>
        {children}
      </TransactionDispatchContext.Provider>
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  return useContext(TransactionContext);
}

export function useTransactionDispatch() {
  return useContext(TransactionDispatchContext);
}
const transactionReducer = function (transactions, action) {
  switch (action.type) {
    case 'added': {
      const id = uuidv4();
      const newTransactions = [
        ...transactions,
        {
          id,
          ...action.data,
        },
      ];
      storeTransactions(newTransactions);
      return newTransactions;
    }
  }
};
const initialData = [
  createData(1, '2024-11-01', 'Grocery shopping', 'Food', 'Expense', 50.75),
  createData(2, '2024-11-02', 'Monthly salary', 'Salary', 'Income', 2000),
  createData(
    3,
    '2024-11-03',
    'Gas station fill-up',
    'Transportation',
    'Expense',
    40
  ),
  createData(4, '2024-11-04', 'Dinner at restaurant', 'Food', 'Expense', 65.25),
  createData(
    5,
    '2024-11-05',
    'Car insurance payment',
    'Insurance',
    'Expense',
    120
  ),
  createData(6, '2024-11-06', 'Freelance project', 'Freelance', 'Income', 500),
  createData(7, '2024-11-07', 'Movie tickets', 'Entertainment', 'Expense', 25),
  createData(8, '2024-11-08', 'Electricity bill', 'Utilities', 'Expense', 80),
  createData(10, '2024-10-10', 'Gym membership', 'Health', 'Expense', 45),
  createData(9, '2024-11-09', 'Gift for friend', 'Gifts', 'Expense', 30),
];
