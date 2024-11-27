import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { expenseCategories } from '../utils/dataUtils';

export default function ({ category, onChange, error }) {
  return (
    <FormControl fullWidth error={error !== ''}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={category}
        label="Categroy"
        onChange={onChange}
      >
        {expenseCategories.map((cate) => (
          <MenuItem value={cate} key={cate}>
            {cate}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
