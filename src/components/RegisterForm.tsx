import { Link, Box, Button, Paper, Typography, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import Input from './ui/Input';
import DateInput from './DateInput';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { Dayjs } from 'dayjs';
import RadioGroupInput from './RadioGroupInput';
import { ChangeEvent } from 'react';
import { useRegister } from '../contexts/AuthContext';
import { storeToken } from '../libs/localStorage';
type Values = {
  fullName: string;
  gender: GenderType;
  email: string;
  dob: Dayjs | null;
  password: string;
  confirmPassword: string;
};
type Errors = {
  fullName?: string;
  email?: string;
  dob?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
};
type GenderType = 'Male' | 'Female' | 'Other';
export default function RegisterForm() {
  const navigate = useNavigate();
  const register = useRegister();
  const usedEmail: string[] = [];

  const formValidator = (values: Values) => {
    const errors: Errors = {};
    if (!values.fullName) {
      errors.fullName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
    if (usedEmail.includes(values.email)) {
      errors.email = 'Email is already used';
    }
    if (!values.gender) {
      errors.gender = 'Required';
    } else if (values.gender !== 'Male' && values.gender !== 'Female') {
      errors.gender = 'Invalid';
    }
    if (!values.dob) {
      errors.dob = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords not match';
    }
    return errors;
  };
  return (
    <Formik
      initialValues={{
        fullName: '',
        gender: 'Male',
        email: '',
        dob: null,
        password: '',
        confirmPassword: '',
      }}
      validate={formValidator}
      onSubmit={(values: Values, { setSubmitting }) => {
        if (values.dob === null) {
          return;
        }
        register?.registerUserMutate({ ...values, dob: values.dob });
        if (register?.isError) {
          return;
        }
        setSubmitting(false);
        navigate('/login', {
          state: {
            message: 'Your account has been successfully created!',
          },
        });
      }}
    >
      {({ values, errors, handleSubmit, isSubmitting, setFieldValue }) => (
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
            Register New Account
          </Typography>
          {register?.isError && (
            <Alert severity="error">{register?.error.message}</Alert>
          )}
          <Input
            label="Full Name"
            value={values.fullName}
            error={errors.fullName ?? ''}
            onChange={(e: ChangeEvent) => {
              const newName = (e.target as HTMLInputElement).value;
              setFieldValue('fullName', newName, false);
            }}
          />
          <Input
            label="Email"
            value={values.email}
            error={errors.email ?? ''}
            onChange={(e: ChangeEvent) => {
              const newEmail = (e.target as HTMLInputElement).value;
              setFieldValue('email', newEmail, false);
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Box width={'40%'}>
              <DateInput
                label="Date of Birth"
                value={values.dob}
                onChange={(value) => setFieldValue('dob', value, false)}
                error={errors.dob || ''}
              />
            </Box>
            <RadioGroupInput
              label="Gender"
              values={['Male', 'Female', 'Other']}
              value={values.gender}
              onChange={(e: ChangeEvent) => {
                const newGender = (e.target as HTMLInputElement).value;
                setFieldValue('gender', newGender, false);
              }}
            />
          </Box>
          <Input
            label="Password"
            value={values.password}
            error={errors.password ?? ''}
            onChange={(e: ChangeEvent) => {
              const newPassword = (e.target as HTMLInputElement).value;
              setFieldValue('password', newPassword, false);
            }}
            type="password"
          />
          <Input
            label="Confirm Password"
            value={values.confirmPassword}
            error={errors.confirmPassword ?? ''}
            onChange={(e: ChangeEvent) => {
              const newConfirmPassword = (e.target as HTMLInputElement).value;
              setFieldValue('confirmPassword', newConfirmPassword, false);
            }}
            type="password"
          />
          <Box>
            <Button
              variant="contained"
              endIcon={<LoginIcon />}
              type="submit"
              // disabled={isSubmitting}
            >
              Register
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            <Typography component={'p'}>Don't have an account?</Typography>
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: 'blue',
              }}
            >
              Sign In
            </Link>
          </Box>
        </Paper>
      )}
    </Formik>
  );
}
