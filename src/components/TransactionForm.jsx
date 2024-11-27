import {
  Button,
  Container,
  Grid2,
  Paper,
  TextField,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  OutlinedInput,
  InputAdornment,
  Box,
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { expenseCategories } from '../utils/dataUtils';
import DescriptionInput from './DescriptionInput';
import CategorySelect from './CategorySelect';
import DateInput from './DateInput';
import TypeRadioGroup from './TypeRadioGroup';
import AmountInput from './AmountInput';
export default function TransactionForm() {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <Paper
      component={'form'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: { xs: 1, md: 3 },
        width: { xs: '100%', md: 600 },
      }}
    >
      <DescriptionInput />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <CategorySelect category={category} onChange={handleChange} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DateInput />
        </Grid2>
      </Grid2>
      <TypeRadioGroup />
      <AmountInput />
      <Box>
        <Button variant="contained" endIcon={<PublishIcon />} type="submit">
          Send
        </Button>
      </Box>
    </Paper>
  );
}
