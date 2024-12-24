import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Nav from './components/Nav';
import AddTransaction from './pages/AddTransaction';
import { QueryClient, QueryClientProvider } from 'react-query';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AuthProvider from './contexts/AuthContext';
import HomeWithTransaction from './pages/HomeWithTransaction';
import { TransactionProvider } from './contexts/TransactionContext';
import Home from './pages/Home';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
          <TransactionProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddTransaction />} />
            </Routes>
          </TransactionProvider>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
