import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Nav from './components/Nav';
import { TransactionProvider } from './contexts/TransactionContext';

const expenseCategories = [
  'housing',
  'transportation',
  'foodAndGroceries',
  'healthAndWellness',
  'personalCare',
  'entertainment',
  'debtRepayment',
  'childrenAndFamily',
  'pets',
  'travel',
  'giftsAndDonations',
  'education',
  'miscellaneous',
];

export default function App() {
  return (
    <TransactionProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </TransactionProvider>
  );
}
