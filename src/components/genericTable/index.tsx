import React from 'react';
import { TableContainer, Table, TableHead, Paper, TableCell, TableBody, TableRow, TablePagination, useTheme } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import styled from 'styled-components';

interface GenericTableProps {
  columns: string[];
  tableRows: JSX.Element[];
  count?: number;
  maxHeight?: number | string;
  rowsPerPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

export const GenericTable = (props: GenericTableProps) => {
  const {
    columns,
    tableRows,
    count,
    maxHeight,
    rowsPerPage,
    page,
    onPageChange,
    onPageSizeChange,
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

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(onPageSizeChange) onPageSizeChange(parseInt(event.target.value, 10));
    if(onPageChange) onPageChange(0);
  };
  
  return (
    <Paper>
      <TableContainer component={Paper} sx={{ maxHeight: maxHeight || 'maxContent' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" >
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
          rowsPerPageOptions={[5, 10, 15]}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage={"Numar de intrari pe pagina:"}
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