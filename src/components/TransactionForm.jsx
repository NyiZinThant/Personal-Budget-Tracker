import { Button, Grid2, Paper, Box, Typography } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { useState, useRef } from 'react';
import DescriptionInput from './DescriptionInput';
import CategorySelect from './CategorySelect';
import DateInput from './DateInput';
import TypeRadioGroup from './TypeRadioGroup';
import AmountInput from './AmountInput';
import { useTransactionDispatch } from '../contexts/TransactionContext';
import { useNavigate } from 'react-router';
export default function TransactionForm() {
  const navigate = useNavigate();
  const transactionDispatch = useTransactionDispatch();
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({
    description: '',
    date: '',
    category: '',
    type: '',
    amount: '',
  });
  const descriptionInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const [type, setType] = useState('');
  const amountInputRef = useRef(null);
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    let data = {
      description: descriptionInputRef.current.value,
      date: dateInputRef.current.value,
      category: category,
      type,
      amount: amountInputRef.current.value,
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
    if (data.date === '') {
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
    if (data.type === '') {
      setErrors((prevErrors) => {
        return { ...prevErrors, type: 'Type is empty.' };
      });
      hasError = true;
    } else {
      setErrors((prevErrors) => {
        return { ...prevErrors, type: '' };
      });
    }
    if (data.amount === '') {
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
    transactionDispatch({ type: 'added', data });
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
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <CategorySelect
            category={category}
            onChange={handleChange}
            error={errors.category}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <DateInput innerRef={dateInputRef} error={errors.date} />
        </Grid2>
      </Grid2>
      <TypeRadioGroup
        type={type}
        onChange={handleTypeChange}
        error={errors.type}
      />
      <AmountInput innerRef={amountInputRef} error={errors.amount} />
      <Box>
        <Button variant="contained" endIcon={<PublishIcon />} type="submit">
          Send
        </Button>
      </Box>
    </Paper>
  );
}
