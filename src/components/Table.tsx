import {
  TableCell,
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
} from '@mui/material';
import stc from 'string-to-color';
import Transaction from '../models/transaction';
type TableProp = {
  columnNames: string[];
  data: Transaction[];
};
export default function Table({ columnNames, data }: TableProp) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnNames.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Object.entries(row).map(([key, value]) => (
                <TableCell
                  component={'th'}
                  scope="row"
                  key={key}
                  sx={{ bgcolor: key === 'category' ? stc(value) : undefined }}
                >
                  {value instanceof Date
                    ? value.toLocaleDateString('en-CA')
                    : value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
