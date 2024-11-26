import { Card, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { red } from '@mui/material/colors';

export function valueFormatter(value) {
  return `$${value}`;
}
export default function MonthlyExpensesChart({ data }) {
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
