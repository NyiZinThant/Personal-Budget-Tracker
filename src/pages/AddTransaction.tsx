import { Container } from '@mui/material';
import TransactionForm from '../components/TransactionForm';

export default function AddTransaction() {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    >
      <TransactionForm />
    </Container>
  );
}
