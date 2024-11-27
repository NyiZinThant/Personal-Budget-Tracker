import { TextField } from '@mui/material';

export default function DescriptionInput({ innerRef }) {
  return (
    <TextField
      inputRef={innerRef}
      id="description-input"
      label="Description"
      variant="outlined"
      size="12"
    />
  );
}
