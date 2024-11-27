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
import TransactionForm from '../components/TransactionForm';

export default function AddTransaction() {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    >
      <TransactionForm />
    </Container>
  );
}
