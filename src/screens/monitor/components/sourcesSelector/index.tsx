import React from 'react';
import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import styled from 'styled-components';
import { Box } from '@mui/system';

const sources_of_interest_list = [
  'senat',
  'guvern',
  'camera_deputatilor'
]

interface SelectorProps {
  value: string[];
  onSelect: (value: string[]) => void;
};

export const SourcesSelector = (props: SelectorProps) => {

  const { value: selectedOptions, onSelect } = props;

  const sources = sources_of_interest_list.map(source => (
    <StyledMenuItem key={source} value={source}>
      <Checkbox checked={selectedOptions.indexOf(source) > -1}/>
      <ListItemText primary={source}/>
    </StyledMenuItem>
  ))

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string | string[];
    onSelect(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl>
      <InputLabel id='sources_of_interest_label'>Surse</InputLabel>
      <StyledSelect
        label='sources_of_interest_label'
        id='sources_of_interest'
        value={selectedOptions}
        multiple
        input={<OutlinedInput label="Surse" />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map((value: string) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        onChange={handleChange}
      >{sources}</StyledSelect>
    </FormControl>
  )
}

const StyledSelect = styled(Select)`
  width: 250px;
`;

const StyledMenuItem = styled(MenuItem)`
  width: 250px;
`;