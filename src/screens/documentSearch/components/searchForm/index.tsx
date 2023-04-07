import React, { useContext } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import {
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
  TextField
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DocumentSearchFormValues } from '../../hooks/useDocumentSearchForm';
import { DocumentSearchContext } from 'screens/documentSearch/context';
import { Dayjs } from 'dayjs';
import { Translations } from 'constants/translations';

const Status: Record<string, string> = {
  nou: 'Nou',
  in_analiza: 'In analiza',
  revizuit: 'Revizuit',
}

const sources_of_interest_list = ['camera_deputatilor', 'mfinante', 'mmediu', 'mdezvoltarii', 'meducatiei', 'mtransport'];
const sources = sources_of_interest_list.map((source: string) => <MenuItem key={`sursa-document-${source}`} value={source}>{Translations[source]}</MenuItem>)

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

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Box>
        <Grid container>
          <Grid item md={3}>
            <TextField
              fullWidth
              label='Identificator'
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('identificator')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Titlu document'
              variant='outlined'
              error={false}
              helperText={''}
              {...form.register('title')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="sursa-document-label">Sursa</InputLabel>
              <Select
                labelId="sursa-document"
                id="sursa"
                label="Sursa"
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
                {sources}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="stare-document-label">Stare</InputLabel>
              <Select
                labelId="stare-document"
                id="stare"
                label="Stare"
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
              <InputLabel id="responsabil-label">Responsabil</InputLabel>
              <Select
                labelId="responsabil"
                id="responsabil"
                label="Responsabil"
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
            <TextField
              fullWidth
              label='Proiect legislativ'
              variant='outlined'
              error={false}
              helperText={''}
              disabled
              {...form.register('projectId')}
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
                    label="Publicat de la:"
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
          <Grid item md={3} sx={{ pl: 4 }}>
            <Controller
              name="publishedBefore"
              control={form.control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Publicat pana la:"
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
          label='Documentul contine textul...'
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
              control={<Checkbox />}
              label="Document ce contravine normelor in vigoare"
              {...form.register('isRulesBreaker')}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
            <FormControlLabel
              control={<Checkbox checked={false}/>}
              label="Proiect legislativ cu impact"
              disabled
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button type='submit' variant='contained'>Cauta</Button>
      </ButtonBox>
    </form>
  )
} 


const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;