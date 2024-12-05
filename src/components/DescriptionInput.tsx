import { TextField } from '@mui/material';
import { Ref } from 'react';
type DescriptionInputProp = {
  innerRef: Ref<HTMLInputElement>;
  error: string;
};
export default function DescriptionInput({
  innerRef,
  error,
}: DescriptionInputProp) {
  return (
    <TextField
      error={error !== ''}
      helperText={error}
      inputRef={innerRef}
      id="description-input"
      label="Description"
      variant="outlined"
      // fixed
      size="medium"
    />
  );
}
