import React from 'react';
import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { AddUserFormValues } from 'screens/usersManagement/hooks/useAddUserForm';
import styled from 'styled-components';
import { Role } from 'constants/roles';
import { RoleDescription } from 'constants/roles';
import ClearIcon from '@mui/icons-material/Clear';


interface AddUserFormProps {
  form: UseFormReturn<AddUserFormValues, any>,
  handleSubmit: (props: AddUserFormValues) => Promise<void>,
  successMessage: string | undefined,
}

const roles = [Role.ITA, Role.LSE, Role.LSS]

export const AddUserForm = (props: AddUserFormProps) => {
  const { form, handleSubmit, successMessage } = props;

  const SuccessMessage = () => (
    <ColoredSuccessMessage variant="h4" sx={{ mb: 8 }}>
      {successMessage}
    </ColoredSuccessMessage>
  )
  
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>

      <Typography variant="h2" sx={{ mb: 8 }}>
        Adauga utilizator:
      </Typography>

      {successMessage && <SuccessMessage />}
        
      <Box>
        <Grid container>
          <Grid item md={6}>
            <TextField
              fullWidth
              label='Prenume'
              variant='outlined'
              error={Boolean(form.formState.errors.name)}
              helperText={form.formState.errors.name?.message}
              {...form.register('name')}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Nume'
              variant='outlined'
              error={Boolean(form.formState.errors.surname)}
              helperText={form.formState.errors.surname?.message}
              {...form.register('surname')}
            />    
          </Grid>  
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item md={6}>
            <TextField
              fullWidth
              label='Email'
              variant='outlined'
              error={Boolean(form.formState.errors.email)}
              helperText={form.formState.errors.email?.message}
              {...form.register('email')}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
            <FormControl fullWidth sx={{ mb: 5 }}>
              <InputLabel id="role-label">Rol</InputLabel>
              <Select
                labelId="role"
                id="rol"
                label="Rol"
                value={form.watch('role') || ''}
                {...form.register('role')}
                endAdornment={
                  form.getValues('role') && <IconButton
                    onClick={() => {
                      form.resetField('role');
                    }}
                    size="small"
                    sx={{marginRight: 5}}
                  >
                    <ClearIcon />
                  </IconButton>
              }
              >
                { roles.map((role: Role) => <MenuItem key={role} value={role}>{`${RoleDescription[role]}` }</MenuItem>) }
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container>
          <Grid item md={6}>
            <TextField
              fullWidth
              label='Parola'
              type='password'
              variant='outlined'
              error={Boolean(form.formState.errors.password)}
              helperText={form.formState.errors.password?.message}
              {...form.register('password')}
            />
          </Grid>
          <Grid item md={6} sx={{ pl: 4 }}>
            <TextField
              fullWidth
              label='Confirma parola'
              type='password'
              variant='outlined'
              error={Boolean(form.formState.errors.confirmPassword)}
              helperText={form.formState.errors.confirmPassword?.message}
              {...form.register('confirmPassword')}
            />
          </Grid>
        </Grid>
      </Box>

      <ButtonBox>
        <Button type='submit' variant='contained'>Adauga</Button>
      </ButtonBox>
      
    </form>
  )
}

const ButtonBox = styled(Box)`
  display: flex;
  justify-content: end;
  padding: 15px 0;
`;

const ColoredSuccessMessage = styled(Typography)`
  color: green;
`;