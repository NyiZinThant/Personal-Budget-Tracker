import { Container } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <RegisterForm />
    </Container>
  );
}
