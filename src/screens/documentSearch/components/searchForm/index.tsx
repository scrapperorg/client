import React from 'react';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Status: Record<string, string> = {
  NOU: 'nou',
  IN_ANALIZA: 'in analiza',
  REVIZUIT: 'revizuit',
}

const Sursa: Record<string, string> = {
  CAMERA_DEPUTATILOR: 'camera_deputatilor',
  SENAT: 'senat',
  GUVERN: 'guvern',
}

export const SearchForm = () => {
  return (
    <form onSubmit={() => { /** */ }}>
      <Box>
        <Grid container>
          <Grid item md={3}>
            <TextField
              fullWidth
              label='Identificator'
              variant='outlined'
              error={false}
              helperText={''}
              // {...form.register('')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Titlu document'
              variant='outlined'
              error={false}
              helperText={''}
              // {...form.register('')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="sursa-document-label">Sursa</InputLabel>
              <Select
                labelId="sursa-document"
                id="sursa"
                value={''}
                label="Sursa"
                onChange={() => { /** */ }}
              >
                { Object.keys(Sursa).map((key: string) => <MenuItem key={`sursa-document-${key}`} value={key}>{Sursa[key]}</MenuItem>) }
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
          <FormControl fullWidth>
            <InputLabel id="stare-document-label">Stare</InputLabel>
            <Select
              labelId="stare-document"
              id="stare"
              value={''}
              label="Stare"
              onChange={() => { /** */ }}
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
            <TextField
              // make this select
              fullWidth
              label='Responsabil'
              variant='outlined'
              error={false}
              helperText={''}
              // {...form.register('')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Proiect legislativ'
              variant='outlined'
              error={false}
              helperText={''}
              // {...form.register('')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Publicat de la:"
                value={null}
                onChange={() => { /** */ }}
                renderInput={(params) => <TextField { ...params} fullWidth/>}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Publicat pana la:"
                value={null}
                onChange={() => { /** */ }}
                renderInput={(params) => <TextField {...params} fullWidth/>}
              />
            </LocalizationProvider>  
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
          // {...form.register('')}
        />
      </Box>

      <Box>
        <Grid container>
          <Grid item md={6}>
            <FormControlLabel
              sx={{ ml: 0 }}
              control={<Checkbox checked />}
              label="Document ce contravine normelor in vigoare"
              onChange={() => {/** */}}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
            <FormControlLabel
              sx={{ ml: 0 }}
              control={<Checkbox checked={false}/>}
              label="Proiect legislativ cu impact"
              onChange={() => {/** */}}
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button variant='contained'>Cauta</Button>
      </ButtonBox>
    </form>
  )
} 


const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;