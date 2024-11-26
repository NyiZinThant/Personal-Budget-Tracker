import { Card, CardContent, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

export default function NumberCard({ label, number, bgcolor }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ bgcolor }}>
        <Typography
          variant="h4"
          component="p"
          textAlign={'center'}
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          ${number}
        </Typography>
        <Typography component="p" textAlign={'center'}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
}
