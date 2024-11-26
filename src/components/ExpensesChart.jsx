import { PieChart } from '@mui/x-charts/PieChart';
import { Card, Typography } from '@mui/material';
const valueFormatter = (item) => `${item.value}%`;

export default function ExpensesChart({ data }) {
  return (
    <Card variant="outlined" sx={{ p: { xs: 0, md: 2 } }}>
      <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
        Expenses
      </Typography>
      <PieChart
        series={[
          {
            data,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: {
              innerRadius: 30,
              additionalRadius: -5,
              color: 'gray',
            },
            valueFormatter,
          },
        ]}
        height={200}
      />
    </Card>
  );
}
