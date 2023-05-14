import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import { Translations } from '../../../../constants/translations';

interface SelectorProps {
  value: string[];
  onSelect: (value: string[]) => void;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

const sources_of_interest_list = [
  'camera_deputatilor',
  'mfinante',
  'mmediu',
  'mdezvoltarii',
  'meducatiei',
  'mtransport',
  'mai',
  'mae',
  'mapn',
  'mjustitiei',
  'senat_pl',
  'camera_deputatilor_pl',
];

const translatedSources = sources_of_interest_list.map((source) => Translations[source]);

const translationToValueMap = sources_of_interest_list.reduce((map, source) => {
  const translation = Translations[source];
  map[translation] = source;
  return map;
}, {} as Record<string, string>);


export const SourcesSelector = (props: SelectorProps) => {
  const { value: selectedOptions, onSelect, onMenuOpen, onMenuClose } = props;

  const handleChange = (_: any, newValue: string[]) => {
    const originalValues = newValue.map((translation) => translationToValueMap[translation]);
    onSelect(originalValues);
  };

  return (
    <div>
      <Autocomplete
        multiple
        id="sources_of_interest"
        sx={{ width: 250 }}
        options={translatedSources}
        value={selectedOptions.map((value) => Translations[value])}
        onChange={handleChange}
        onOpen={onMenuOpen}
        onClose={onMenuClose}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Surse"
            placeholder="Search"
            InputLabelProps={{ shrink: true }}
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox checked={selected} />
            <Box component="span" sx={{ ml: 1 }}>
              {option}
            </Box>
          </li>
        )}
      />
    </div>
  );
};
