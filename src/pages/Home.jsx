import { Container, Grid2 } from '@mui/material';
import NumberCard from '../components/NumberCard';
import { red, teal } from '@mui/material/colors';
import ExpensesChart from '../components/ExpensesChart';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import ExpensesTable from '../components/ExpensesTable';
import { getFinancialSummary } from '../utils/currencyUtils';
import { useTransaction } from '../contexts/TransactionContext';
import { getExpensesChartData, getMonthlyExpenses } from '../utils/dataUtils';

export default function Home() {
  const data = useTransaction();
  const { totalSaving, totalExpenses, totalIncomes } =
    getFinancialSummary(data);
  const expenseChartData = getExpensesChartData(data, totalExpenses);
  const monthlyExpensesData = getMonthlyExpenses(data);
  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumberCard label={'Avaliable For Saving'} number={totalSaving} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumberCard
            label={'Incomes'}
            number={totalIncomes}
            bgcolor={teal['A700']}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumberCard
            label={'Expenses'}
            number={totalExpenses}
            bgcolor={red[500]}
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ExpensesChart data={expenseChartData} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <MonthlyExpensesChart data={monthlyExpensesData} />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={12}>
          <ExpensesTable />
        </Grid2>
      </Grid2>
    </Container>
  );
}
