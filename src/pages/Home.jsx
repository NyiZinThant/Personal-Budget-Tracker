import { Container, Grid2 } from '@mui/material';
import NumberCard from '../components/NumberCard';
import { red, teal } from '@mui/material/colors';
import ExpensesChart from '../components/ExpensesChart';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import ExpensesTable from '../components/ExpensesTable';
const desktopOS = [
  {
    id: 1,
    label: 'Windows',
    value: 72.72,
  },
  {
    id: 2,
    label: 'OS X',
    value: 16.38,
  },
  {
    id: 3,
    label: 'Linux',
    value: 3.83,
  },
  {
    id: 4,
    label: 'Chrome OS',
    value: 2.42,
  },
  { id: 5, label: 'Other', value: 4.65 },
];
export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumberCard label={'Avaliable For Saving'} number={29399} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumberCard label={'Income'} number={29399} bgcolor={teal['A700']} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4 }}>
          <NumberCard label={'Expenses'} number={29399} bgcolor={red[500]} />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <ExpensesChart data={desktopOS} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <MonthlyExpensesChart />
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
