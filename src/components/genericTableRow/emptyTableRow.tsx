import React from 'react';
import { Grid, TableCell, TableRow, Typography } from '@mui/material';

interface EmptyTableRowProps {
  colSpan?: number;
}

export const EmptyTableRow = (props: EmptyTableRowProps) => (
  <TableRow>
    <TableCell colSpan={props.colSpan || 10}>
      <Grid container alignItems='center' justifyContent='center'>
        <Typography variant='h5' color='grey'>
          Nu exista rezultate
        </Typography>
      </Grid>
    </TableCell>
  </TableRow>
)