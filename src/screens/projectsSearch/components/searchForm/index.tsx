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
import { Controller, UseFormReturn } from 'react-hook-form';
import { ProjectSearchFormValues } from 'screens/projectsSearch/hooks/useProjectSearchForm';
import { Dayjs } from 'dayjs';

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

interface SearchFormProps {
  form: UseFormReturn<ProjectSearchFormValues, any>,
  handleSubmit: (props: ProjectSearchFormValues) => Promise<void>,
}

const isInTheFuture = (date: Dayjs) => {
  return date.toDate() > new Date()
}

const onKeyDown = (e: React.KeyboardEvent) => {
  e.preventDefault();
};

export const SearchForm = (props: SearchFormProps) => {
  const { form, handleSubmit } = props;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box>
        <Grid container>
          <Grid item md={4}>
            <TextField
              fullWidth
              label='Nume proiect'
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('title')}
            />
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Nr. de inregistrare'
              variant='outlined'
              error={false}
              helperText={''}
              disabled
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
                disabled
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
                disabled
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
            <Controller
              name="createdBefore"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Inregistrat de la:"
                    renderInput={(params) => <TextField {...params} fullWidth onKeyDown={onKeyDown} />}
                    value={field.value || null}
                    shouldDisableDate={isInTheFuture}
                    onChange={(newDate: Dayjs | null) => field.onChange(newDate?.toString())}
                    componentsProps={{
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
              />
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <Controller
              name="createdAfter"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Inregistrat pana la:"
                    renderInput={(params) => <TextField {...params} fullWidth onKeyDown={onKeyDown} />}
                    value={field.value || null}
                    shouldDisableDate={isInTheFuture}
                    onChange={(newDate: Dayjs | null) => field.onChange(newDate?.toString())}
                    componentsProps={{
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
              />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <TextField
          fullWidth
          label='Proiectul contine textul...'
          variant='outlined'
          error={false}
          disabled
          helperText={''}
          // {...form.register('')}
        />
      </Box>

      <Box>
        <Grid container>
          <Grid item md={6}>
            <FormControlLabel
              control={<Checkbox />}
              label='Proiect legislativ de interes/cu impact'
              {...form.register('presentsInterest')}
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button type='submit' variant='contained'>Cauta</Button>
      </ButtonBox>
    </form>
  );
};

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
