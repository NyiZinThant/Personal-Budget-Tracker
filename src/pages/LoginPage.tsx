import { Container } from '@mui/material';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
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
      <LoginForm />
    </Container>
  );
}
