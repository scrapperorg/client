import React from 'react';
import { TableCell, TableRow, } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import styled from 'styled-components';

interface GenericTableRowProps {
  id: string;
  values: Array<string | number | JSX.Element>;
}

export const GenericTableRow = (props: GenericTableRowProps ) => {
  const { id, values } = props;
  const cells = values.map((value, i) => {
    return <StyledTableCell component='th' key={i}>{value}</StyledTableCell>
  })
  return (
    <StyledTableRow key={id}>{cells}</StyledTableRow>
  )
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
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