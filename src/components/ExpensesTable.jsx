import { Card, Typography, Grid2 } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SortIcon from '@mui/icons-material/Sort';
import { useState, useRef } from 'react';
import Table from './Table';
import { filterData, getColumns, sortDataBy } from '../utils/dataUtils';
import { useTransaction } from '../contexts/TransactionContext';

export default function ExpensesTable() {
  const [alignment, setAlignment] = useState('All');
  const [selected, setSelected] = useState(null);
  const data = useTransaction();
  const modifedDataRef = useRef(filterData(data, 'All'));
  modifedDataRef.current = !selected
    ? sortDataBy(modifedDataRef.current)
    : sortDataBy(modifedDataRef.current, 'date');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    modifedDataRef.current = filterData(data, newAlignment);
  };
  const handleToggle = () => {
    modifedDataRef.current = selected
      ? sortDataBy(modifedDataRef.current)
      : sortDataBy(modifedDataRef.current, 'date');
    setSelected((prevSelected) => !prevSelected);
  };
  return (
    <Card variant="outlined" sx={{ padding: 2 }}>
      <Typography component={'h5'} variant="h5" sx={{ p: 1 }}>
        Transactions
      </Typography>
      <Grid2 container sx={{ justifyContent: 'space-between' }} spacing={2}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="All">All</ToggleButton>
          <ToggleButton value="Income">Incomes</ToggleButton>
          <ToggleButton value="Expense">Expenses</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButton value="check" selected={selected} onChange={handleToggle}>
          <SortIcon />
          <Typography component={'p'} sx={{ marginLeft: 1 }}>
            Sort by Date
          </Typography>
        </ToggleButton>
      </Grid2>
      <Grid2 container>
        <Grid2 size={12}>
          <Table columnNames={getColumns()} data={modifedDataRef.current} />
        </Grid2>
      </Grid2>
    </Card>
  );
}
