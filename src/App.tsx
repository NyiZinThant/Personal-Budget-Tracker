import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Nav from './components/Nav';
import { TransactionProvider } from './contexts/TransactionContext';
import AddTransaction from './pages/AddTransaction';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddTransaction />} />
          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </QueryClientProvider>
  );
}
