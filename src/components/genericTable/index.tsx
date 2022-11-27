import React from 'react';
import { TableContainer, Table, TableHead, Paper, TableCell, TableBody, TableRow, TablePagination } from '@mui/material';

interface GenericTableProps {
  columns: string[];
  tableRows: JSX.Element[];
}

export const GenericTable = (props: GenericTableProps) => {
  const { columns, tableRows } = props;
  const tableHeadCells = columns.map((column, i) => (
    <TableCell key={i}>{column}</TableCell>
  ))

  const handlePageChange = () => {
    console.log('page change');
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableHead>
            <TableRow>
              {tableHeadCells}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={tableRows.length}
        rowsPerPage={2}
        page={0}
        rowsPerPageOptions={[]}
        onPageChange={handlePageChange}
      />
    </Paper>
  )
}