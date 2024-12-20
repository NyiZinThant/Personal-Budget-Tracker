import { FormControl } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
type DateInputProp = {
  value: Dayjs | null;
  error: string;
  setFieldValue: Function;
};
export default function DateInput({
  value,
  error,
  setFieldValue,
}: DateInputProp) {
  return (
    <FormControl fullWidth error={error !== ''}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={value}
          onChange={(date) => setFieldValue('date', date, false)}
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
