import { TextField } from '@mui/material';

export default function DescriptionInput({ innerRef, error }) {
  return (
    <TextField
      error={error !== ''}
      helperText={error}
      inputRef={innerRef}
      id="description-input"
      label="Description"
      variant="outlined"
      size="12"
    />
  );
}
