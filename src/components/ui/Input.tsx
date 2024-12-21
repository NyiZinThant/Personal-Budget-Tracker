import { TextField } from '@mui/material';
import { FocusEventHandler, HTMLInputTypeAttribute, Ref } from 'react';
type InputProp = {
  label: string;
  value: string;
  error: string;
  onChange: FocusEventHandler<HTMLInputElement>;
  id?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
};
export default function Input({
  label,
  value,
  error,
  onChange,
  type = 'text',
  ...rest
}: InputProp) {
  return (
    <TextField
      error={error !== ''}
      helperText={error}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      type={type}
      {...rest}
      // fixed
      size="medium"
    />
  );
}
