import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const initiator: Record<string, string> = {
  TO_CHANGE_1: 'TO_CHANGE_1',
  TO_CHANGE_2: 'TO_CHANGE_2',
  TO_CHANGE_3: 'TO_CHANGE_3',
};

const forumLegislativ: Record<string, string> = {
  TO_CHANGE_4: 'TO_CHANGE_4',
  TO_CHANGE_5: 'TO_CHANGE_5',
  TO_CHANGE_6: 'TO_CHANGE_6',
};

export const SearchForm = () => {
  return (
    <form
      onSubmit={() => {
        /** */
      }}
    >
      <Box>
        <Grid container>
          <Grid item md={4}>
            <TextField
              fullWidth
              label='Nume proiect'
              variant='outlined'
              error={false}
              helperText={''}
              // {...form.register('')}
            />
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Nr. de inregistrare'
              variant='outlined'
              error={false}
              helperText={''}
              // {...form.register('')}
            />
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id='sursa-document-label'>Forum Legislativ</InputLabel>
              <Select
                labelId='forum-legislativ'
                id='forum'
                value={''}
                label='Forum legislativ'
                onChange={() => {
                  /** */
                }}
              >
                {Object.entries(forumLegislativ).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel id='sursa-document-label'>Initiator</InputLabel>
              <Select
                labelId='initiator'
                id='initiator'
                value={''}
                label='Initiator'
                onChange={() => {
                  /** */
                }}
              >
                {Object.entries(initiator).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Inregistrat de la:'
                value={null}
                onChange={() => {
                  /** */
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Inregistrat pana la:'
                value={null}
                onChange={() => {
                  /** */
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TextField
          fullWidth
          label='Proiectul contine textul...'
          variant='outlined'
          error={false}
          helperText={''}
          // {...form.register('')}
        />
      </Box>

      <Box>
        <Grid container>
          <Grid item md={6}>
            <FormControlLabel
              control={<Checkbox checked />}
              label='Proiect legislativ de interes/cu impact'
              onChange={() => {
                /** */
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button variant='contained'>Cauta</Button>
      </ButtonBox>
    </form>
  );
};

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
