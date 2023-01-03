import React from 'react';
import { TableContainer, Table, TableHead, Paper, TableCell, TableBody, TableRow, TablePagination, useTheme } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import styled from 'styled-components';

interface GenericTableProps {
  columns: string[];
  tableRows: JSX.Element[];
  count?: number;
  rowsPerPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
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

  const theme = useTheme();

  const tableHeadCells = columns.map((column, i) => (
    <StyledTableCell key={i} theme={theme}>{column}</StyledTableCell>
  ))

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    if(onPageChange) onPageChange(page);
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
      {
        typeof count !== 'undefined'
        && typeof rowsPerPage !== 'undefined'
        && typeof page !== 'undefined'
        && typeof onPageChange !== 'undefined'
        && (
          <TablePagination
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[]}
          onPageChange={handlePageChange}
        />
        )}
    </Paper>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.secondary,
  },
}));