import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Ref } from 'react';
type DateInputProp = {
  innerRef: Ref<HTMLInputElement>;
  error: string;
};
export default function DateInput({ innerRef, error }: DateInputProp) {
  return (
    <FormControl fullWidth error={error !== ''}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          inputRef={innerRef}
          slotProps={{
            textField: {
              helperText: error,
              error: error !== '',
            },
          }}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
