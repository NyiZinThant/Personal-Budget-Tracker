import { TransactionProvider } from '../contexts/TransactionContext';
import Home from './Home';

export default function HomeWithTransaction() {
  return (
    <TransactionProvider>
      <Home />
    </TransactionProvider>
  );
}
