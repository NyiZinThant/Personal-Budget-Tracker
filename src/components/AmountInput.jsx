import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';

export default function AmountInput({ innerRef, error }) {
  return (
    <FormControl fullWidth size="12" error={error !== ''}>
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
        inputRef={innerRef}
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
