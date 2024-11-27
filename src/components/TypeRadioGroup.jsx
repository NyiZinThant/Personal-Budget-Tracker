import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function TypeRadioGroup({ type, onChange }) {
  return (
    <FormControl>
      <FormLabel id="type-radio-buttons-group-label">Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="type-radio-buttons-group-label"
        name="type-radio-buttons-group"
        onChange={onChange}
        value={type}
      >
        <FormControlLabel value="Income" control={<Radio />} label="Income" />
        <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
      </RadioGroup>
    </FormControl>
  );
}
