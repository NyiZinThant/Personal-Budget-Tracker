import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

export default function AmountInput({ innerRef }) {
  return (
    <FormControl fullWidth size="12">
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
        inputRef={innerRef}
      />
    </FormControl>
  );
}
