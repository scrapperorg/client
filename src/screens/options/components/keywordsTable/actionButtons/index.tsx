import React from 'react';
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeywordDto } from '../../../../../services/api/dtos/keyword';

export interface ActionButtonsProps {
  keyword: KeywordDto;
  onDeleteKeyword: (id: string) => void;
}

export const ActionButtons = ({ onDeleteKeyword, keyword }: ActionButtonsProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/*<IconButton>*/}
      {/*  <EditIcon fontSize='small' />*/}
      {/*</IconButton>*/}
      <IconButton>
        <DeleteIcon fontSize='small' onClick={() => onDeleteKeyword(keyword.id)} />
      </IconButton>
    </Box>
  );
};
