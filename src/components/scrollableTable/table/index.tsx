import React from 'react';
import { TableContainer, Table, TableHead, Paper, TableCell, TableBody, TableRow, useTheme } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import styled from 'styled-components';

interface ScrollableTableProps {
  columns: string[];
  tableRows: JSX.Element[];
  maxHeight?: number | string;
}

export const ScrollableTable = (props: ScrollableTableProps) => {
  const {
    columns,
    tableRows,
    maxHeight,
  } = props;

  const theme = useTheme();

  const tableHeadCells = columns.map((column, i) => (
    <StyledTableCell key={i} theme={theme}>{column}</StyledTableCell>
  ))
  
  return (
    <Paper>
      <TableContainer component={Paper} sx={{ maxHeight: maxHeight || 500 }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" >
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
    </Paper>
  )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.text.secondary,
  },
}));
