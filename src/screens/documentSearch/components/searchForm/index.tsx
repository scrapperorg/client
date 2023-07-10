import React, { useContext } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DocumentSearchFormValues } from '../../hooks/useDocumentSearchForm';
import { DocumentSearchContext } from 'screens/documentSearch/context';
import { Dayjs } from 'dayjs';
import { Translations } from 'constants/translations';
import { ProjectDto } from 'services/api/dtos';
import { useProjectSearch } from 'screens/documentSearch/hooks/useProjectSearch';
import { useTranslation } from 'react-i18next';
import { sources } from 'constants/sources';

const Status: Record<string, string> = {
  nou: 'Nou',
  in_analiza: 'In analiza',
  revizuit: 'Revizuit',
}


const sourceOptions = sources.map((source: string) => <MenuItem key={`sursa-document-${source}`} value={source}>{Translations[source]}</MenuItem>)

interface SearchFormProps {
  form: UseFormReturn<DocumentSearchFormValues, any>,
  handleSubmit: (props: DocumentSearchFormValues) => Promise<void>,
}

const isInTheFuture = (date: Dayjs) => {
  return date.toDate() > new Date()
}

const onKeyDown = (e: React.KeyboardEvent) => {
  e.preventDefault();
};

export const SearchForm = (props: SearchFormProps) => {
  const { form, handleSubmit } = props;

  const { assignableResponsibles } = useContext(DocumentSearchContext);
  const { t } = useTranslation();

  const renderProjectOption = (props: React.HTMLAttributes<HTMLLIElement>, option: ProjectDto) => {
    return (
      <li {...props}>
        <Grid container alignItems="center">
          <Typography>
            {option.title}
          </Typography>
        </Grid>
      </li>
    );
  }

  const { 
    value: projectSearchValue,
    setValue: projectSearchSetValue,
    setInputValue: projectSearchSetInputValue,
    options: projectSearchOptions,
    setOptions: projectSearchSetOptions,
    persistSelectedProject,
   } = useProjectSearch()

   const onSubmit = (data: DocumentSearchFormValues) => {
    handleSubmit(data);
    persistSelectedProject(projectSearchValue);
   }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Box>
        <Grid container>
          <Grid item md={3}>
            <TextField
              fullWidth
              label={t('documentSearch.identifier')}
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('identificator')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label={t('documentSearch.title')}
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('title')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="sursa-document-label">{t('documentSearch.source')}</InputLabel>
              <Select
                labelId="sursa-document"
                id="sursa"
                label={t('documentSearch.source')}
                value={form.watch('source') || ''}
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
          <Grid item md={3} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="stare-document-label">{t('documentSearch.status')}</InputLabel>
              <Select
                labelId="stare-document"
                id="stare"
                label={t('documentSearch.status')}
                {...form.register('status')}
                value={form.watch('status') || ''}
                endAdornment={
                  form.getValues('status') && <IconButton
                    onClick={() => {
                      form.resetField('status');
                    }}
                    size="small"
                    sx={{marginRight: 5}}
                  >
                    <ClearIcon />
                  </IconButton>
              }
              >
                { Object.keys(Status).map((key: string) => <MenuItem key={`stare-document-${key}`} value={key}>{Status[key]}</MenuItem>) }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item md={3}>
            <FormControl fullWidth>
              <InputLabel id="responsabil-label">{t('documentSearch.responsible')}</InputLabel>
              <Select
                labelId="responsabil"
                id="responsabil"
                label={t('documentSearch.responsible')}
                value={form.watch('assignedUserId') || ''}
                {...form.register('assignedUserId')}
                endAdornment={
                  form.getValues('assignedUserId') && <IconButton
                    onClick={() => {
                      form.resetField('assignedUserId');
                    }}
                    size="small"
                    sx={{marginRight: 5}}
                  >
                    <ClearIcon />
                  </IconButton>
              }
              >
                {assignableResponsibles.map(responsible => <MenuItem key={`reponsabil-${responsible.id}`} value={responsible.id}>{`${responsible.name} ${responsible.surname}`}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <Controller
              name='projectId'
              control={form.control}
              render={({ field }) => (
                <Autocomplete
                  fullWidth
                  getOptionLabel={(option: unknown) => {
                      if (typeof option === 'string') return option;

                      function hasTitle(object: any): object is ProjectDto {
                        return 'title' in object;
                      }
                      
                      if (hasTitle(option)) return option.title;

                      return ''
                    }
                  }
                  filterOptions={(x) => x}
                  options={projectSearchOptions}
                  autoComplete
                  includeInputInList
                  filterSelectedOptions
                  value={projectSearchValue}
                  noOptionsText={t('documentSearch.noResults')}
                  onChange={(event: any, newValue: ProjectDto | null) => {
                    projectSearchSetOptions(newValue ? [newValue, ...projectSearchOptions] : projectSearchOptions);
                    projectSearchSetValue(newValue);
                    field.onChange(newValue?.id);
                  }}
                  onInputChange={(event, newInputValue) => {
                    projectSearchSetInputValue(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label={t('documentSearch.project')} fullWidth />
                  )}
                  renderOption={renderProjectOption}
                />
              )}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <Controller
              name="publishedAfter"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label={t('documentSearch.publishedAfter')}
                    renderInput={(params) => <TextField {...params} fullWidth onKeyDown={onKeyDown} />}
                    value={field.value || null}
                    shouldDisableDate={isInTheFuture}
                    onChange={(newDate: Dayjs | null) => field.onChange(newDate?.toString())}
                    componentsProps={{
                      actionBar: {
                        actions: ['clear', 'accept'],
                      },
                    }}
                    closeOnSelect={false}
                  />
                </LocalizationProvider>
              )}
              />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <Controller
              name="publishedBefore"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label={t('documentSearch.publishedBefore')}
                    renderInput={(params) => <TextField {...params} fullWidth onKeyDown={onKeyDown} />}
                    value={field.value || null}
                    shouldDisableDate={isInTheFuture}
                    onChange={(newDate: Dayjs | null) => field.onChange(newDate?.toString())}
                    componentsProps={{
                      actionBar: {
                        actions: ['clear', 'accept'],
                      },
                    }}
                    closeOnSelect={false}
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
          label={t('documentSearch.content')}
          variant='outlined'
          error={false}
          helperText={''}
          {...form.register('postOcrContent')}
        />
      </Box>

      <Box>
        <Grid container>
          <Grid item md={6}>
            <FormControlLabel
              control={
                <Controller
                  name="isRulesBreaker"
                  control={form.control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label={t('documentSearch.rulesBreaker')}
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button type='submit' variant='contained'>{t('generic.search')}</Button>
      </ButtonBox>
    </form>
  )
} 


const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;