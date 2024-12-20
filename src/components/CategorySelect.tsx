import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { Category } from '../models/category';

type CategorySelectType = {
  categories: Category[];
  value: string;
  setFieldValue: Function;
  error: string;
};
export default function CategorySelect({
  categories,
  value,
  setFieldValue,
  error,
}: CategorySelectType) {
  return (
    <FormControl fullWidth error={error !== ''}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value}
        label="Categroy"
        onChange={(e) => setFieldValue('category', e.target.value, false)}
      >
        {categories.map((cate) => (
          <MenuItem value={cate.id} key={cate.id}>
            {cate.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}
