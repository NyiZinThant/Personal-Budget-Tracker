import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Ref } from 'react';

type AmountInputProp = {
  innerRef: Ref<HTMLInputElement>;
  error: string;
};
export default function AmountInput({ innerRef, error }: AmountInputProp) {
  return (
    <FormControl fullWidth size="medium" error={error !== ''}>
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
