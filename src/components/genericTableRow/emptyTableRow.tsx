import React from 'react';
import { Grid, TableCell, TableRow, Typography } from '@mui/material';

export const EmptyTableRow = () => (
  <TableRow>
    <TableCell colSpan={6}>
      <Grid container alignItems='center' justifyContent='center'>
        <Typography variant='h5' color='grey'>
          Nu exista rezultate
        </Typography>
      </Grid>
    </TableCell>
  </TableRow>
)