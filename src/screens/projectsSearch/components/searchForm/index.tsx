import React from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ProjectSearchFormValues } from 'screens/projectsSearch/hooks/useProjectSearchForm';
import { Dayjs } from 'dayjs';
import { useTranslation } from 'react-i18next'
import { sources } from 'constants/sources';
import { Translations } from 'constants/translations';

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

const sourceOptions = sources.map((source: string) => <MenuItem key={`sursa-document-${source}`} value={source}>{Translations[source]}</MenuItem>)

export const SearchForm = (props: SearchFormProps) => {
  const { form, handleSubmit } = props;
  const { t } = useTranslation();

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box>
        <Grid container>
          <Grid item md={4}>
            <TextField
              fullWidth
              label={t('projectSearch.title')}
              variant='outlined'
              error={Boolean(form.formState.errors.title)}
              helperText={form.formState.errors.title?.message}
              {...form.register('title')}
            />
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id='sursa-document-label'>{t('projectSearch.forum')}</InputLabel>
              <Select
                labelId='forum-legislativ'
                id='forum'
                value={form.watch('source') || ''}
                label={t('projectSearch.forum')}
                {...form.register('source')}
                endAdornment={
                    form.getValues('source') && <IconButton
                      onClick={() => {
                        form.resetField('source');
                      }}
                      size="small"
                      sx={{marginRight: 5}}
                    >
                      <ClearIcon />
                    </IconButton>
                }
              >
                {sourceOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} sx={{ pl: 4 }}>
          <TextField
              fullWidth
              label='Initiator'
              variant='outlined'
              error={Boolean(form.formState.errors.initiator)}
              helperText={form.formState.errors.initiator?.message}
              {...form.register('initiator')}
            />
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item md={4}>
            <Controller
              name="createdAfter"
              control={form.control}

              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label={t('projectSearch.createdAfter')}
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
              name="createdBefore"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label={t('projectSearch.createdBefore')}
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

      <ButtonBox>
        <Button type='submit' variant='contained'>{t('generic.search')}</Button>
      </ButtonBox>
    </form>
  );
};

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;
