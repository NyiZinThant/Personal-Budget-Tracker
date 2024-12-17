import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import Transaction from '../models/transaction';
import { ExpensesChartData } from '../utils/dataUtils';
const valueFormatter = (item: { value: number }) => `${item.value}%`;
type ExpensesChartProp = {
  data: ExpensesChartData[];
};
export default function ExpensesChart({ data }: ExpensesChartProp) {
  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
        Expenses
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <PieChart
          slotProps={{
            legend: { hidden: true },
          }}
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
          height={225}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {data.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '2px 8px',
                  gap: '5px',
                }}
              >
                <CircleIcon
                  sx={{
                    color: item.color,
                    width: '6px',
                    height: '6px',
                  }}
                />
                {/* fixed */}
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {item.label}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
