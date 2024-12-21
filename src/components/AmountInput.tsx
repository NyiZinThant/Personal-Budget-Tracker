import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { FocusEventHandler, Ref } from 'react';

type AmountInputProp = {
  value: number;
  error: string;
  onChange: FocusEventHandler<HTMLInputElement>;
  id?: string;
  class?: string;
};
export default function AmountInput({
  value,
  error,
  onChange,
  ...rest
}: AmountInputProp) {
  return (
    <FormControl fullWidth size="medium" error={error !== ''}>
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        onChange={onChange}
        value={value}
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
        {...rest}
      />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
