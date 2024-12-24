import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { ChangeEvent, ChangeEventHandler, FocusEventHandler } from 'react';
type DateInputProp = {
  label: string;
  value: Dayjs | null;
  error: string;
  onChange: (value: Dayjs | null) => void;
};
export default function DateInput({
  label,
  value,
  error,
  onChange,
}: DateInputProp) {
  return (
    <FormControl fullWidth error={error !== ''}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
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
