import React from 'react';
import { TableContainer, Table, TableHead, Paper, TableCell, TableBody, TableRow, TablePagination } from '@mui/material';

interface GenericTableProps {
  columns: string[];
  tableRows: JSX.Element[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
}

export const GenericTable = (props: GenericTableProps) => {
  const {
    columns,
    tableRows,
    count,
    rowsPerPage,
    page,
    onPageChange
  } = props;
  const tableHeadCells = columns.map((column, i) => (
    <TableCell key={i}>{column}</TableCell>
  ))

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    onPageChange(page);
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
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[]}
        onPageChange={handlePageChange}
      />
    </Paper>
  )
}