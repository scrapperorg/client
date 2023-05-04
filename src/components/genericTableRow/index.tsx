import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import styled from 'styled-components';

interface GenericTableRowProps {
  id: string;
  values: Array<string | number | JSX.Element | Array<JSX.Element>>;
  className?: string;
}

export const GenericTableRow = (props: GenericTableRowProps) => {
  const { id, values, className } = props;
  const cells = values.map((value, i) => {
    const statusCellWidth = i === 7 ? {width: '90px'} : {};
    return (
      <StyledTableCell component='th' key={i} style={statusCellWidth}>
        {value}
      </StyledTableCell>
    );
  });
  return (
    <StyledTableRow key={id} className={className}>
      {cells}
    </StyledTableRow>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.new': {
    backgroundColor: '#81B9D7',
    '& > th': {
      fontWeight: 700,
      '&:nth-child(8)': {
        textTransform: 'uppercase',
      },
    },
    '& > th > a:hover': {
      color: theme.palette.common.white,
    },
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&.disabled': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));
