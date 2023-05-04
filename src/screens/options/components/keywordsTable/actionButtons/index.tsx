import React from 'react';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { KeywordDto } from '../../../../../services/api/dtos/keyword';

export interface ActionButtonsProps {
  keyword: KeywordDto;
  onDeleteKeyword: (keyword: KeywordDto) => void;
  onUpdateKeyword: (keyword: KeywordDto) => void;
}

export const ActionButtons = ({
  onDeleteKeyword,
  onUpdateKeyword,
  keyword,
}: ActionButtonsProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={() => onUpdateKeyword(keyword)}>
        <EditIcon fontSize='small' />
      </IconButton>
      <IconButton onClick={() => onDeleteKeyword(keyword)}>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </Box>
  );
};
