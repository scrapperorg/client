import React from 'react';
import { ScrollableTable } from 'components/scrollableTable/table';
import { GenericTableRow } from 'components/genericTableRow';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface OptionsTableProps {
  keywords: string[];
}

const columns = ['Termen', 'Actiuni'];

const deleteIcon = (
  <IconButton>
    <DeleteIcon fontSize='small' />
  </IconButton>
);

export const OptionsTable = (props: OptionsTableProps) => {
  const { keywords } = props;

  const rows = keywords.map((keyword) => (
    <GenericTableRow id={keyword} key={keyword} values={[keyword, deleteIcon]} />
  ));

  return <ScrollableTable columns={columns} tableRows={rows} maxHeight='75vh' />;
};
