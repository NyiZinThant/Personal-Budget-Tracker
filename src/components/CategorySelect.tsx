import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { CategoryType } from '../models/transaction';

type CategorySelectType = {
  categories: CategoryType[];
  category: CategoryType;
  onChange: (event: SelectChangeEvent) => void;
  error: string;
};
export default function CategorySelect({
  categories,
  category,
  onChange,
  error,
}: CategorySelectType) {
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
        {categories.map((cate) => (
          <MenuItem value={cate} key={cate}>
            {cate}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
