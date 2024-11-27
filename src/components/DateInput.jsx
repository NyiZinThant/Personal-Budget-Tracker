import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export default function DateInput({ innerRef }) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Date" inputRef={innerRef} />
      </LocalizationProvider>
    </FormControl>
  );
}
