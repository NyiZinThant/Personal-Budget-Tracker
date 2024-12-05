import { Card, CardContent, Color, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';

type NumberCardProp = {
  label: string;
  number: number;
  bgcolor?: string;
};
export default function NumberCard({ label, number, bgcolor }: NumberCardProp) {
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
