import { createContext, ReactNode, useContext } from 'react';
import Transaction, { TransactionWithoutId } from '../models/transaction';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addTransaction, getTransactions } from '../api/transactionApi';
export const TransactionContext = createContext<Transaction[]>([]);
const AddTransactionMutationContext = createContext<
  ((data: TransactionWithoutId) => Promise<Transaction[]>) | null
>(null);
type TransactionProvider = {
  children: ReactNode;
};
export function TransactionProvider({ children }: TransactionProvider) {
  const queryClient = useQueryClient();
  const { data: transaction } = useQuery<Transaction[]>({
    queryFn: getTransactions,
    queryKey: ['transaction'],
  });
  const { mutateAsync: AddTransactionMutation } = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transaction'] });
    },
  });

  return (
    <TransactionContext.Provider value={transaction ?? []}>
      <AddTransactionMutationContext.Provider value={AddTransactionMutation}>
        {children}
      </AddTransactionMutationContext.Provider>
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  return useContext(TransactionContext);
}
export function useAddTransactionMutation() {
  return useContext(AddTransactionMutationContext);
}
