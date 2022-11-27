import React from 'react';
import { TableCell, TableRow } from '@mui/material';

interface GenericTableRowProps {
  id: string;
  values: Array<string | number>;
}

export const GenericTableRow = (props: GenericTableRowProps ) => {
  const { id, values } = props;
  const cells = values.map((value, i) => {
    return <TableCell component='th' key={i}>{value}</TableCell>
  })
  return (
    <TableRow key={id}>{cells}</TableRow>
  )
}