import { Alert, Box, Button, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router';
import { Formik } from 'formik';
import Input from '../components/ui/Input';
import { ChangeEvent } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { useLogin } from '../contexts/AuthContext';
import { AuthType } from '../models/auth';
import { storeToken } from '../libs/localStorage';

type Values = {
  email: string;
  password: string;
};
type Errors = {
  fullName?: string;
  email?: string;
  dob?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
};
export default function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();
  const formValidator = (values: Values) => {
    const errors: Errors = {};
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={formValidator}
      onSubmit={async (values: Values, { setSubmitting }) => {
        const data = await login?.loginUserMutate({ ...values });
        if (login?.isError) {
          return;
        }
        storeToken(data?.token ?? '');
        setSubmitting(false);
        navigate('/');
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
            Login Your Account
          </Typography>
          {login?.isError && (
            <Alert severity="error">{login?.error.message}</Alert>
          )}
          <Input
            label="Email"
            value={values.email}
            error={errors.email ?? ''}
            onChange={(e: ChangeEvent) => {
              const newEmail = (e.target as HTMLInputElement).value;
              setFieldValue('email', newEmail, false);
            }}
          />
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
          <Box>
            <Button
              variant="contained"
              endIcon={<LoginIcon />}
              type="submit"
              disabled={isSubmitting}
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
              to="/register"
              sx={{
                color: 'blue',
              }}
            >
              Sign up
            </Link>
          </Box>
        </Paper>
      )}
    </Formik>
  );
}
