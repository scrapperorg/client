import React from 'react';
import { Box, Button, Grid, styled, TextField } from "@mui/material";

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
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Titlu document'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              // make this select
              fullWidth
              label='Sursa'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              // make this select
              fullWidth
              label='Stare'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
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
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Proiect legislativ'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              // make calendar
              fullWidth
              label='Publicat de la:'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={3} sx={{ pl: 4 }}>
            <TextField
              // make calendar
              fullWidth
              label='Publicat pana la:'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container>
          <Grid item md={6}>
            <TextField
              // make checkbox
              fullWidth
              label='Document ce contravine normelor in vigoare'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
          <TextField
              // make checkbox
              fullWidth
              label='Proiect legislativ cu impact'
              variant='outlined'
              error={false}
              helperText={''}
              // {...loginForm.register('email')}
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
          // {...loginForm.register('email')}
        />
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