import { Box, Button, Grid2, Paper, Typography } from '@mui/material';
import Input from './ui/Input';
import DateInput from './DateInput';
import LoginIcon from '@mui/icons-material/Login';
import { Formik, FormikHelpers } from 'formik';
type Values = {
  fullName: string;
  email: string;
  dob: Date | null;
  password: string;
};
type Errors = {
  fullName?: string;
  email?: string;
  dob?: string;
  password?: string;
};
export default function RegisterForm() {
  const formValidator = (values: Values) => {
    const errors: Errors = {};
    if (!values.fullName) {
      errors.fullName = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    }
    if (!values.dob) {
      errors.dob = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };
  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        dob: null,
        password: '',
      }}
      validate={formValidator}
      onSubmit={(values: Values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
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
          }}
          onSubmit={handleSubmit}
        >
          <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
            Register New Account
          </Typography>
          <Input
            label="Full Name"
            value={values.fullName}
            error={errors.fullName ?? ''}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {/* <Grid2 size={{ xs: 12, md: 6 }}>
            <DateInput innerRef={dateInputRef} error={errors.date} />
          </Grid2> */}
          <Box>
            <Button variant="contained" endIcon={<LoginIcon />} type="submit">
              Register
            </Button>
          </Box>
        </Paper>
      )}
    </Formik>
  );
}
