import { Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { red } from '@mui/material/colors';
import { MonthlyExpenses } from '../utils/dataUtils';

export function valueFormatter(value: number | null) {
  return `$${value}`;
}
type MonthlyExpensesChartType = {
  data: MonthlyExpenses[];
};
export default function MonthlyExpensesChart({
  data,
}: MonthlyExpensesChartType) {
  return (
    <Card variant="outlined" sx={{ p: { xs: 0, md: 2 } }}>
      <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
        Monthly Expenses
      </Typography>
      <BarChart
        dataset={data}
        yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        series={[{ dataKey: 'value', valueFormatter, color: red[500] }]}
        layout="horizontal"
        grid={{ vertical: true }}
        xAxis={[
          {
            label: 'Total Amount (Dollar)',
          },
        ]}
        height={400}
      />
    </Card>
  );
}
