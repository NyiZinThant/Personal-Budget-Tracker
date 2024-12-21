import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { ChangeEvent } from 'react';
export default function RadioGroupInput<T>({
  label,
  value,
  onChange,
  values,
}: {
  label: string;
  value: T;
  onChange: (event: ChangeEvent) => void;
  values: T[];
}) {
  return (
    <FormControl>
      <FormLabel id="type-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="type-radio-buttons-group-label"
        name="type-radio-buttons-group"
        onChange={onChange}
        value={value}
      >
        {values.map((value) => (
          <FormControlLabel
            key={value as string}
            value={value}
            control={<Radio />}
            label={value as string}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
