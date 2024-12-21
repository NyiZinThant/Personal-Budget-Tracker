import { Button, Grid2, Paper, Box, Typography } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { ChangeEvent } from 'react';
import CategorySelect from './CategorySelect';
import DateInput from './DateInput';
import TypeRadioGroup from './RadioGroupInput';
import AmountInput from './AmountInput';
import { useAddTransactionMutation } from '../contexts/TransactionContext';
import { useNavigate } from 'react-router';
import { TransactionType } from '../models/transaction';
import { useQuery } from 'react-query';
import { getCategories } from '../api/categoryApi';
import { Category } from '../models/category';
import { Formik } from 'formik';
import Input from './ui/Input';
import { Dayjs } from 'dayjs';
type Values = {
  category: string;
  description: string;
  date: Dayjs | null;
  amount: number;
  type: TransactionType;
};
type Errors = {
  category?: string;
  description?: string;
  date?: string;
  amount?: string;
  type?: string;
};
export default function TransactionForm() {
  const { data: categories } = useQuery<Category[]>({
    queryFn: getCategories,
    queryKey: ['todos'],
  });
  const formValidator = (values: Values) => {
    const errors: Errors = {};
    if (!values.description) {
      errors.description = 'Required';
    }
    if (!values.category) {
      errors.category = 'Required';
    }
    if (values.amount <= 0) {
      errors.amount = 'Must be greater than 0';
    }
    if (values.type !== 'Income' && values.type !== 'Expense') {
      errors.type = 'Required';
    }
    if (!values.date) {
      errors.date = 'Invalid Date';
    }
    return errors;
  };
  const navigate = useNavigate();
  const addTransactionMutation = useAddTransactionMutation();
  return (
    <Formik
      initialValues={{
        description: '',
        date: null,
        category: '',
        type: 'Income',
        amount: 0,
      }}
      validate={formValidator}
      onSubmit={(values: Values, { setSubmitting }) => {
        const date = values.date?.toDate() || new Date();
        addTransactionMutation && addTransactionMutation({ ...values, date });
        setSubmitting(false);
        navigate('/');
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => (
        <Paper
          component={'form'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: { xs: 1, md: 3 },
            width: { xs: '100%', md: 600 },
            height: 'fit-content',
          }}
          onSubmit={handleSubmit}
        >
          <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
            Add New Transaction
          </Typography>
          <Input
            label="Description"
            value={values.description}
            error={errors.description || ''}
            onChange={handleChange}
          />
          <TypeRadioGroup<TransactionType>
            label="Type"
            value={values.type}
            onChange={(e: ChangeEvent) => {
              const newType = (e.target as HTMLInputElement).value;
              setFieldValue('type', newType, false);
            }}
            values={['Income', 'Expense']}
          />
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <CategorySelect
                categories={
                  categories?.filter(
                    (category) => category.type === values.type
                  ) || []
                }
                value={values.category}
                setFieldValue={setFieldValue}
                error={errors.category || ''}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <DateInput
                label="date"
                value={values.date}
                setFieldValue={setFieldValue}
                error={errors.date || ''}
              />
            </Grid2>
          </Grid2>
          <AmountInput
            value={values.amount}
            error={errors.amount || ''}
            onChange={handleChange}
          />
          <Box>
            <Button
              variant="contained"
              endIcon={<PublishIcon />}
              type="submit"
              disabled={isSubmitting}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </Formik>
  );
}
