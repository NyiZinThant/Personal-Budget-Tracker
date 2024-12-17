import {
  Button,
  Grid2,
  Paper,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import DescriptionInput from './DescriptionInput';
import CategorySelect from './CategorySelect';
import DateInput from './DateInput';
import TypeRadioGroup from './TypeRadioGroup';
import AmountInput from './AmountInput';
import { useAddTransactionMutation } from '../contexts/TransactionContext';
import { useNavigate } from 'react-router';
// import { categories } from '../utils/dataUtils';
import { TransactionType, TransactionWithoutId } from '../models/transaction';
import { useQuery } from 'react-query';
import { getCategories } from '../api/categoryApi';
import { Category } from '../models/category';
export default function TransactionForm() {
  const { data: categories } = useQuery<Category[]>({
    queryFn: getCategories,
    queryKey: ['todos'],
  });
  const navigate = useNavigate();
  const addTransactionMutation = useAddTransactionMutation();
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({
    description: '',
    date: '',
    category: '',
    amount: '',
  });
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<TransactionType>('Income');
  const amountInputRef = useRef<HTMLInputElement>(null);
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };
  const handleTypeChange = (e: ChangeEvent) => {
    const newType = (e.target as HTMLInputElement).value;
    if (newType !== 'Income' && newType !== 'Expense') return;
    setType(newType);
  };
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (
      !descriptionInputRef.current ||
      !dateInputRef.current ||
      !amountInputRef.current
    ) {
      return;
    }
    const date: Date = new Date(dateInputRef.current.value);
    let data: TransactionWithoutId = {
      description: descriptionInputRef.current.value,
      date,
      category: category,
      type,
      amount: +amountInputRef.current.value,
    };
    if (data.description === '') {
      setErrors((prevErrors) => {
        return { ...prevErrors, description: 'Description is empty.' };
      });
      hasError = true;
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, description: '' };
      });
    }
    if (isNaN(data.date.getTime())) {
      setErrors((prevErrors) => {
        return { ...prevErrors, date: 'Date is empty.' };
      });
      hasError = true;
    } else {
      data.date = new Date(data.date);
      setErrors((prevErrors) => {
        return { ...prevErrors, date: '' };
      });
    }
    if (data.category === '') {
      setErrors((prevErrors) => {
        return { ...prevErrors, category: 'Category is empty.' };
      });
      hasError = true;
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, category: '' };
      });
    }
    if (!data.amount) {
      setErrors((prevErrors) => {
        return { ...prevErrors, amount: 'Amount is empty.' };
      });
      hasError = true;
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, amount: '' };
      });
    }
    if (hasError) return;
    navigate('/');

    addTransactionMutation && addTransactionMutation(data);
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
      onSubmit={handleFormSubmit}
    >
      <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
        Add New Transaction
      </Typography>
      <DescriptionInput
        innerRef={descriptionInputRef}
        error={errors.description}
      />
      <TypeRadioGroup type={type} onChange={handleTypeChange} />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <CategorySelect
            categories={
              categories?.filter((category) => category.type === type) || []
            }
            category={category}
            onChange={handleChange}
            error={errors.category}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DateInput innerRef={dateInputRef} error={errors.date} />
        </Grid2>
      </Grid2>
      <AmountInput innerRef={amountInputRef} error={errors.amount} />
      <Box>
        <Button variant="contained" endIcon={<PublishIcon />} type="submit">
          Send
        </Button>
      </Box>
    </Paper>
  );
}
