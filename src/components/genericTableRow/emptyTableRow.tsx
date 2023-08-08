import React from 'react';
import { Grid, TableCell, TableRow, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EmptyTableRowProps {
  colSpan?: number;
}
export const EmptyTableRow = (props: EmptyTableRowProps) => {
    const { t } = useTranslation();

    return (
      <TableRow key='emptyTableRow'>
        <TableCell colSpan={props.colSpan || 10}>
          <Grid container alignItems='center' justifyContent='center'>
            <Typography variant='h5' color='grey'>
                {t('generic.noResults')}
            </Typography>
          </Grid>
        </TableCell>
      </TableRow>
    );
};