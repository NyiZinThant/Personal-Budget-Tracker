import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { expenseCategories } from '../utils/dataUtils';

export default function ({ category, onChange }) {
  return (
    <FormControl fullWidth>
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
    </FormControl>
  );
}
