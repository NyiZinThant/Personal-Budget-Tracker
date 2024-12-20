import { TextField } from '@mui/material';
import { FocusEventHandler, Ref } from 'react';
type InputProp = {
  label: string;
  value: string;
  error: string;
  onChange: FocusEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  id?: string;
  className?: string;
};
export default function Input({
  label,
  value,
  error,
  onChange,
  onBlur,
  ...rest
}: InputProp) {
  return (
    <TextField
      error={error !== ''}
      helperText={error}
      //   id="description-input"
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="outlined"
      {...rest}
      // fixed
      size="medium"
    />
  );
}
